import { closeAfter, type CloseReason } from "./conversation";

type Event = {
  chatId: string;
  owner: string;
  eventId: string;
  kind: "turn" | "warning" | "close";
  visitorText?: string;
  replyText?: string;
  reason?: CloseReason;
  humanId?: string;
  humanOwner?: string;
};

export async function recordChatEvent(event: Event) {
  const endpoint = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!endpoint || !key) return;

  const headers = new Headers({ apikey: key, "Content-Type": "application/json" });
  if (!key.startsWith("sb_secret_")) headers.set("Authorization", "Bearer " + key);
  const now = new Date();
  try {
    const response = await fetch(new URL("/rest/v1/rpc/naila_record_chat_event", endpoint), {
      method: "POST",
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        p_chat_id: event.chatId, p_owner: event.owner, p_event_id: event.eventId,
        p_kind: event.kind, p_visitor: event.visitorText ?? null, p_reply: event.replyText ?? null,
        p_reason: event.reason ?? null, p_at: now.toISOString(),
        p_human_id: event.humanId ?? null, p_human_owner: event.humanOwner ?? null,
        p_expires_at: new Date(now.getTime() + closeAfter).toISOString(),
      }),
    });
    if (!response.ok) console.error("Naila transcript archive failed", response.status);
  } catch {
    console.error("Naila transcript archive request failed");
  }
}
