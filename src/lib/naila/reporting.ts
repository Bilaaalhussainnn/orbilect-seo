import { createHash } from "node:crypto";

export const hashChatId = (id: string) => createHash("sha256").update(id.toLowerCase()).digest("hex");

function database() {
  const endpoint = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!endpoint || !key) throw Error("Configure the Supabase service connection.");
  const headers = new Headers({ apikey: key, "Content-Type": "application/json" });
  if (!key.startsWith("sb_secret_")) headers.set("Authorization", "Bearer " + key);
  return { endpoint, headers };
}

export async function reportDb(path: string, method: string, body?: object) {
  const {endpoint, headers} = database();
  const response = await fetch(new URL("/rest/v1/" + path, endpoint), {
    method, headers, body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(5000), cache: "no-store",
  });
  if (!response.ok) throw Error("Weekly reporting storage request failed.");
  return response;
}

export async function countChat(id: string) {
  if (process.env.NAILA_WEEKLY_REPORTS_ENABLED !== "1") return;
  try {
    await reportDb("rpc/naila_count_chat", "POST", { chat_id: id });
  } catch { console.error("Naila chat count could not be recorded."); }
}

export function previousWeek(now = new Date()) {
  const offset = 5 * 3600_000;
  const local = new Date(now.getTime() + offset);
  local.setUTCHours(0, 0, 0, 0);
  local.setUTCDate(local.getUTCDate() - (local.getUTCDay() + 6) % 7);
  const end = new Date(local.getTime() - offset);
  const start = new Date(end.getTime() - 7 * 86400_000);
  const format = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", dateStyle: "medium" });
  return { start: start.toISOString(), end: end.toISOString(),
    label: format.format(start) + " – " + format.format(new Date(end.getTime() - 1)) };
}
