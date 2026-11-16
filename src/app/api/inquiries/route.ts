import { after } from "next/server";
import { notifyLead, parseLead, saveLead } from "../../../lib/leads/server";

async function readJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing request body");

  let bytes = 0;
  let text = "";
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16_384) {
        await reader.cancel();
        throw new Error("Request too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ accepted: false, error: "Expected a JSON request." }, { status: 415 });
  }

  let input: unknown;
  try {
    input = await readJson(request);
  } catch {
    return Response.json({ accepted: false, error: "The request was invalid or too large." }, { status: 400 });
  }

  let lead: ReturnType<typeof parseLead>;
  try {
    lead = parseLead(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Check your details and try again.";
    return Response.json({ accepted: false, error: message }, { status: 400 });
  }

  try {
    const { isNew, code } = await saveLead(lead);
    if (isNew) after(() => notifyLead(lead.id));
    return Response.json({ accepted: true, id: lead.id, code }, { status: isNew ? 201 : 200 });
  } catch (error) {
    console.error("Lead save failed", lead.id, error instanceof Error ? error.message : "Unknown error");
    return Response.json({ accepted: false, error: "Lead storage is unavailable." }, { status: 503 });
  }
}
