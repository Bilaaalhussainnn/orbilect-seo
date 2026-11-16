import { createHash, timingSafeEqual } from "node:crypto";
import { type NextRequest } from "next/server";
import { chatIdPattern, humanChat, humanChatAvailable, type HumanConversation } from "@/lib/naila/human-chat";
import { reportDb } from "@/lib/naila/reporting";

const headers = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
};

function authorize(request: Request) {
  const username = process.env.LEAD_ADMIN_USERNAME;
  const password = process.env.LEAD_ADMIN_PASSWORD;
  if (!humanChatAvailable() || !username || !password || password.length < 20) {
    return new Response("Live chat or inbox credentials need to be configured.", { status: 503, headers });
  }
  const token = request.headers.get("authorization")?.match(/^Basic ([a-z0-9+/=]+)$/i)?.[1] ?? "";
  const digest = (value: string | Buffer) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(digest(Buffer.from(token, "base64")), digest(username + ":" + password))) {
    return new Response("Sign in to view support chats.", {
      status: 401,
      headers: { ...headers, "WWW-Authenticate": 'Basic realm="Orbilect SEO leads", charset="UTF-8"' },
    });
  }
}

function escape(value: unknown) {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value ?? "").replace(/[&<>"']/g, char => entities[char]);
}

const path = "/admin/naila/chats";
const visitor = (number: number) => "Vis" + String(number).padStart(2, "0");

function page(title: string, contents: string) {
  return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title><style>body{margin:2rem auto;padding:0 1rem;max-width:900px;font:16px system-ui,sans-serif;color:#101823}a{color:#004aad}article,form{padding:1rem;border:1px solid #cbd5e3;margin:1rem 0;border-radius:.5rem}p{white-space:pre-wrap;overflow-wrap:anywhere}textarea,input{display:block;max-width:100%;width:100%;box-sizing:border-box;margin:.4rem 0}button{padding:.6rem;border:0;border-radius:.3rem;background:#004aad;color:white}small{color:#3c4c60}nav a{margin-right:1rem}</style><nav><a href="/admin/naila">Visitor dashboard</a><a href="' + path + '">Chat inbox</a></nav><main><h1>' + title + '</h1>' + contents + '</main></html>',
    { headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } });
}

function form(chat: HumanConversation, action: string, content: string) {
  return '<form method="post" action="' + path + '"><input type="hidden" name="chat" value="' + escape(chat.id) + '"><input type="hidden" name="action" value="' + action + '">' + content + '</form>';
}

export async function GET(request: NextRequest) {
  const denied = authorize(request);
  if (denied) return denied;
  const requested = request.nextUrl.searchParams.get("id") ?? "";
  try {
    if (requested && chatIdPattern.test(requested)) {
      const chat = await humanChat(requested, null, "status");
      if ("error" in chat) return new Response("Conversation unavailable.", { status: 404, headers });
      const history = chat.history.map(({ role, text, at }) => "<article><strong>" +
        escape(role === "agent" ? chat.agent : role === "assistant" ? "Naila" : visitor(chat.number)) + "</strong> " +
        (at ? "<small>" + escape(at) + "</small>" : "") + "<p>" + escape(text) + "</p></article>").join("");
      const controls = chat.state === "waiting" ?
        form(chat, "claim", '<label>Agent display name <input name="agent" required maxlength="80"></label><button>Join conversation</button>') :
        chat.state === "live" ?
          form(chat, "agent-message", '<label>Reply <textarea name="text" required maxlength="1000" rows="3"></textarea></label><button>Send reply</button>') +
          (chat.history.some((message) => message.role === "agent") ? form(chat, "close", '<button>Close chat and request a rating</button>') : "") :
          "<h2>Private agent rating</h2><p>" + (chat.rating ? escape(chat.rating) + " / 5" : "Awaiting a rating.") + "</p><p>" + escape(chat.review) + "</p>";
      return page(visitor(chat.number) + " support chat",
        '<p><strong>Status:</strong> ' + escape(chat.state) + ' · ' + escape(chat.agent ?? "Unassigned") +
        '</p><a href="' + path + "?id=" + encodeURIComponent(chat.id) + '">Refresh conversation</a>' + history + controls);
    }
    const query = new URLSearchParams({
      select: "id,number,state,agent,rating,updated_at", order: "updated_at.desc", limit: "100",
    });
    const response = await reportDb("naila_human_chats?" + query, "GET");
    const rows: HumanConversation[] = await response.json();
    return page("Naila support chats", '<p><a href="' + path + '">Refresh inbox</a></p>' +
      (rows.length ? rows.map((row) =>
        '<article><a href="' + path + "?id=" + encodeURIComponent(row.id) + '">' + escape(visitor(row.number)) +
        '</a><p>' + escape(row.state) + " · " + escape(row.agent ?? "Unassigned") +
        (row.rating ? " · " + escape(row.rating) + "/5" : "") + '</p><small>' + escape(row.updated_at) + '</small></article>').join("") : "<p>No live support chats yet.</p>"));
  } catch {
    return new Response("Support chat storage is unavailable.", { status: 503, headers });
  }
}

export async function POST(request: NextRequest) {
  const denied = authorize(request);
  if (denied) return denied;
  if (request.headers.get("origin") !== request.nextUrl.origin ||
      !request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) {
    return new Response("Invalid request.", { status: 403, headers });
  }
  try {
    const formData = await request.formData();
    const id = formData.get("chat");
    const operation = formData.get("action");
    if (typeof id !== "string" || !chatIdPattern.test(id) ||
        (operation !== "claim" && operation !== "agent-message" && operation !== "close")) {
      return new Response("Invalid action.", { status: 400, headers });
    }
    const agent = String(formData.get("agent") ?? "").trim();
    const text = String(formData.get("text") ?? "").trim();
    const result = await humanChat(id, null, operation, { agent, text });
    if ("error" in result) return new Response(result.error, { status: 409, headers });
    return new Response(null, { status: 303, headers: { ...headers, Location: path + "?id=" + encodeURIComponent(id) } });
  } catch {
    return new Response("Support chat storage is unavailable.", { status: 503, headers });
  }
}
