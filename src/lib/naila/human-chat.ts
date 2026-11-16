import { reportDb } from "./reporting";

export const chatIdPattern = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;

export type HumanMessage = { role: "visitor" | "assistant" | "agent"; text: string; at?: string };
export type HumanConversation = {
  id: string;
  number: number;
  state: "waiting" | "live" | "closed";
  agent: string | null;
  history: HumanMessage[];
  rating: number | null;
  review: string | null;
  created_at: string;
  updated_at: string;
};

export function humanChatAvailable() {
  return process.env.NAILA_HUMAN_CHAT_ENABLED === "1" && Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY && process.env.NAILA_SESSION_SECRET);
}

export async function humanChat(
  chat: string, owner: string | null, operation: string, payload: object = {},
): Promise<HumanConversation | { error: string }> {
  const result = await reportDb("rpc/naila_human_chat", "POST", { chat, owner_key: owner, operation, payload });
  return result.json();
}

export function humanChatHistory(value: unknown): HumanMessage[] | undefined {
  if (!Array.isArray(value) || value.length > 450) return;
  const messages: HumanMessage[] = [];
  for (const item of value) {
    if (!item || (item.role !== "visitor" && item.role !== "assistant") ||
        typeof item.text !== "string" || !item.text.trim() || item.text.length > 6500) return;
    messages.push({ role: item.role, text: item.text });
  }
  return messages;
}
