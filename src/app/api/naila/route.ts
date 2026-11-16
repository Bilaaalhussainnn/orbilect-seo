import { chatIdPattern, humanChat, humanChatAvailable, humanChatHistory } from "@/lib/naila/human-chat";
import { transcriptAvatarAttachment, transcriptBrandAttachment, transcriptCtaAttachment, transcriptSocialAttachments } from "../../../lib/naila/transcript-avatar";
import { after } from "next/server";
import { transcriptCard, transcriptPlainText } from "../../../lib/naila/mail-render";
import { countChat, hashChatId } from "../../../lib/naila/reporting";
import { transcriptName } from "../../../lib/naila/transcript-name";
import { NextRequest } from "next/server";
import { answer } from "../../../lib/naila/answers";
import { sendNailaMail, teamEmail, validEmail } from "../../../lib/naila/server";
import { calculateQuote } from "../../../lib/naila/quote";
import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";

const secret = process.env.NAILA_SESSION_SECRET || randomBytes(32).toString("hex");
const cookieName = "orbilect_naila";
const profanity = /\b(?:fuck(?:ing|er)?|shit(?:ty)?|bitch|cunt|asshole|motherfucker)\b/gi;
const day = 86400;
type Session = { id: string; warnings: number; curses: number; expires: number; messages?: number; emailed?: boolean; submitted?: boolean };

function stamp(text: string) {
  return createHmac("sha256", secret).update(text).digest("hex");
}

function session(request: NextRequest): Session {
  const [token, signature] = (request.cookies.get(cookieName)?.value ?? "").split(".");
  if (token && signature && /^[a-f0-9]{64}$/.test(signature) &&
      timingSafeEqual(Buffer.from(stamp(token), "hex"), Buffer.from(signature, "hex"))) {
    try {
      const value = JSON.parse(Buffer.from(token, "base64url").toString()) as Session;
      if (value.expires > Math.floor(Date.now() / 1000)) return value;
    } catch { /* Start a new session for an invalid cookie. */ }
  }
  return { id: randomBytes(16).toString("hex"), warnings: 0, curses: 0, expires: Math.floor(Date.now() / 1000) + day };
}

function respond(request: NextRequest, state: Session, payload: object, status = 200) {
  const token = Buffer.from(JSON.stringify(state)).toString("base64url");
  const cookie = cookieName + "=" + token + "." + stamp(token) + "; Path=/api/naila; Max-Age=" + day +
    "; HttpOnly; SameSite=Strict" + (request.nextUrl.protocol === "https:" ? "; Secure" : "");
  const headers = new Headers({ "Set-Cookie": cookie, "Cache-Control": "no-store" });
  const timeZone = process.env.VERCEL === "1" ? request.headers.get("x-vercel-ip-timezone") : null;
  if (timeZone) headers.set("x-naila-timezone", timeZone);
  return Response.json(payload, { status, headers });
}

async function readBody(request: NextRequest, limit = 8192) {
  const stream = request.body?.getReader();
  if (!stream) throw Error("Missing body.");
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  try {
    for (;;) {
      const {value, done} = await stream.read();
      if (done) return JSON.parse(text + decoder.decode());
      size += value.byteLength;
      if (size > limit) {
        await stream.cancel();
        throw Error("Message too large.");
      }
      text += decoder.decode(value, { stream: true });
    }
  } finally {
    stream.releaseLock();
  }
}

// Best-effort abuse protection for one running server instance.
const blocks = new Map<string, number>();

function ipKey(request: NextRequest) {
  if (process.env.VERCEL !== "1" || !process.env.NAILA_SESSION_SECRET) return "";
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ?? "";
  return isIP(ip) ? stamp("naila-ip:" + ip) : "";
}

function emailList(value: unknown) {
  if (typeof value !== "string") return [];
  const emails = [...new Set(value.split(",").map(email => email.trim().toLowerCase()).filter(Boolean))];
  return emails.length <= 50 && emails.every(validEmail) ? emails : [];
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin ||
      request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return Response.json({ error: "Invalid request." }, { status: 403 });
  }

  const state = session(request);
  const ip = ipKey(request);
  const now = Date.now();
  if (!process.env.NAILA_SESSION_SECRET && process.env.NODE_ENV === "production") {
    return Response.json({ error: "Chat is temporarily unavailable." }, { status: 503 });
  }
  for (const [key, expiry] of blocks) if (expiry <= now) blocks.delete(key);
  if ((state.warnings >= 3 && state.curses > 3) || (ip && (blocks.get(ip) ?? 0) > now)) {
    return respond(request, state, { blocked: true, text: "This chat is temporarily unavailable." }, 429);
  }

  try {
    const handoff = humanChatAvailable() && request.headers.get("x-naila-handoff") === "1";
    const input = await readBody(request, handoff ? 524_288 : 32_768);
    if (handoff && input?.action !== "human-start") return respond(request, state, { error: "Invalid handoff." }, 400);
    if (typeof input?.action === "string" && input.action.startsWith("human-")) {
      if (!humanChatAvailable()) return respond(request, state, { error: "Live support is currently unavailable." }, 503);
      if (typeof input.chatId !== "string" || !chatIdPattern.test(input.chatId)) return respond(request, state, { error: "Invalid conversation." }, 400);
      const owner = stamp("human:" + state.id);
      const operation = input.action.slice("human-".length);
      let payload: object = {};
      if (operation === "start") {
        const history = humanChatHistory(input.history);
        if (!history || input.agreed !== true) return respond(request, state, { error: "Confirm transcript sharing before starting." }, 400);
        payload = { history };
      } else if (operation === "visitor-message") {
        if (typeof input.text !== "string" || !input.text.trim() || input.text.length > 1000) return respond(request, state, { error: "Enter a message up to 1,000 characters." }, 400);
        payload = { text: input.text };
      } else if (operation === "rate") {
        if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5 ||
            typeof input.text !== "string" || input.text.length > 2000 || input.text.trim().split(/\s+/).filter(Boolean).length > 160) {
          return respond(request, state, { error: "Choose a rating and use up to 160 words." }, 400);
        }
        payload = { rating: input.rating, text: input.text };
      } else if (operation !== "status") {
        return respond(request, state, { error: "Invalid action." }, 400);
      }
      try {
        const chat = await humanChat(input.chatId, owner, operation, payload);
        return respond(request, state, chat, "error" in chat ? 409 : 200);
      } catch {
        return respond(request, state, { error: "Live support is temporarily unavailable." }, 503);
      }
    }
    const emails = emailList(input?.email);
    if (input?.action === "transcript") {
      if (process.env.NAILA_TRANSCRIPT_EMAILS_ENABLED !== "1") {
        return respond(request, state, { error: "Email transcripts are unavailable. Use Download to save a copy." }, 503);
      }
      if (!emails.length ||
          typeof input.transcript !== "string" || !input.transcript.trim() || input.transcript.length > 6500) {
        return respond(request, state, { error: "Enter valid email addresses separated by commas and a transcript up to 6,500 characters." }, 400);
      }
      const title = transcriptName("Naila");
      await sendNailaMail({ to: emails, subject: title, text: transcriptPlainText(input.transcript), html: transcriptCard(title, input.transcript), attachments: [transcriptAvatarAttachment, transcriptBrandAttachment, transcriptCtaAttachment, ...transcriptSocialAttachments] },
        "naila-transcript/" + randomUUID());
      return respond(request, state, { text: "Thanks! A chat transcript has been sent to your email. ✉️" });
    }
    if (input?.action === "proposal") {
      if (!emails.length || (input.action === "proposal" && state.submitted)) {
        return respond(request, state, { error: "Check the contact email addresses or use the proposal form for another quotation." }, 400);
      }
      const details = typeof input.details === "string" ? input.details.trim().slice(0, 1000) : "";
      if (!details) return respond(request, state, { error: "Enter a short description." }, 400);
      await sendNailaMail({ to: teamEmail, reply_to: emails[0],
        subject: "Naila quotation request",
        text: details + "\n\nContact emails: " + emails.join(", ") },
        "naila-proposal/" + state.id);
      if (input.action === "proposal") state.submitted = true;
      return respond(request, state, { text: "Thanks for sharing your project details. One of our product specialists will get back to you within 24 hours." });
    }
    if (input?.action === "quote" && Array.isArray(input.services) && typeof input.scope === "string") {
      const estimate = calculateQuote(input.services, input.scope);
      state.messages = (state.messages ?? 0) + 1;
      return respond(request, state, estimate);
    }
    if (input?.action !== "message" || typeof input.text !== "string" || !input.text.trim() || input.text.length > 1000) {
      return respond(request, state, { error: "Enter a message up to 1,000 characters." }, 400);
    }
    const count = (input.text.match(profanity) ?? []).length;
    if (count) {
      if (state.warnings >= 3 && state.curses + count > 3) {
        state.curses += count;
        if (ip && blocks.size < 5000) blocks.set(ip, now + day * 1000);
        return respond(request, state, { blocked: true, text: "I’m closing this chat for now. You can try again after 24 hours." }, 429);
      }
      state.curses += count;
      state.warnings = Math.min(3, state.warnings + 1);
      return respond(request, state, { text: "I’m here to help. Please keep the conversation professional. I can’t continue while the language is abusive." });
    }
    state.messages = (state.messages ?? 0) + 1;
    if (typeof input.chatId === "string" && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(input.chatId)) {
      const key = hashChatId(input.chatId);
      if (process.env.NAILA_WEEKLY_REPORTS_ENABLED === "1") after(() => countChat(key));
    }
    return respond(request, state, answer(input.text, input.humor !== false,
      typeof input.previousMessage === "string" ? input.previousMessage.slice(0, 1000) : ""));
  } catch {
    return respond(request, state, { error: "Please check your request and try again." }, 400);
  }
}
