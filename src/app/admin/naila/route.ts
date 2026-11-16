import { createHash, timingSafeEqual } from "node:crypto";

const common = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
};

function safe(value: unknown) {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value ?? "—").replace(/[&<>"']/g, character => entities[character]);
}

type RecordRow = { number: number; referrer?: string; city?: string; country?: string; created_at: string; last_seen_at: string; pages: {path: string; at: string}[] };

export async function GET(request: Request) {
  const username = process.env.LEAD_ADMIN_USERNAME;
  const password = process.env.LEAD_ADMIN_PASSWORD;
  if (!username || !password || password.length < 20) return new Response("Configure the lead inbox credentials.", { status: 503, headers: common });
  const digest = (input: string | Buffer) => createHash("sha256").update(input).digest();
  const token = request.headers.get("Authorization")?.match(/^Basic ([a-z0-9+/=]+)$/i)?.[1] ?? "";
  if (!timingSafeEqual(digest(Buffer.from(token, "base64")), digest(username + ":" + password))) {
    return new Response("Sign in to view visits.", { status: 401, headers: { ...common, "WWW-Authenticate": 'Basic realm="Orbilect SEO leads"' } });
  }
  const endpoint = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!endpoint || !key) return new Response("Visitor storage is unavailable.", {status: 503, headers: common});
  const url = new URL("/rest/v1/naila_visits", endpoint);
  url.search = new URLSearchParams({ select: "number,referrer,city,country,created_at,last_seen_at,pages",
    created_at: "gt." + new Date(Date.now() - 45 * 86400_000).toISOString(),
    order: "created_at.desc", limit: "100" }).toString();
  const headers = new Headers({ apikey: key });
  if (!key.startsWith("sb_secret_")) headers.set("Authorization", "Bearer " + key);
  try {
    const result = await fetch(url, { headers, cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!result.ok) throw Error("Storage unavailable");
    const rows: RecordRow[] = await result.json();
    const body = rows.map(row => "<tr><th>Vis" + safe(String(row.number).padStart(2, "0")) + "</th><td>" +
      safe(row.referrer) + "</td><td>" + safe([row.city,row.country].filter(Boolean).join(", ") || "Unavailable") +
      "</td><td>" + safe(row.created_at) + "</td><td>" +
      Math.max(0, Math.round((Date.parse(row.last_seen_at) - Date.parse(row.created_at)) / 1000)) + "s</td><td>" +
      row.pages.map(page => safe(page.path)).join(" → ") + "</td></tr>").join("");
    return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Naila visitor log</title><style>body{font:14px Poppins,sans-serif;margin:2rem;color:#101823}a{color:#004aad}main{overflow:auto}table{border-collapse:collapse;width:100%}td,th{padding:.6rem;text-align:left;border-bottom:1px solid #d5e1ef;vertical-align:top}thead{background:#004aad;color:#fff}</style><a href="/admin">Lead inbox</a> · <a href="/admin/naila/chats">Human support chats and ratings</a><h1>Naila visitor log</h1><p>Latest 100 consented visits. Time reflects the first and last observed events.</p><main><table><thead><tr><th>Visitor</th><th>Referrer</th><th>Approximate location</th><th>First seen</th><th>Observed time</th><th>Page path</th></tr></thead><tbody>'+body+'</tbody></table></main></html>',
      {headers: {...common, "Content-Type": "text/html; charset=utf-8"}});
  } catch {
    return new Response("Visitor storage is unavailable.", {status:503, headers:common});
  }
}
