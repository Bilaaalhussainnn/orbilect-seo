import type { LeadSource } from "./sources";

const attempts = new WeakMap<HTMLFormElement, { body: string; id: string }>();

export async function submitLead(form: HTMLFormElement, source: LeadSource, page: string) {
  const fields = Object.fromEntries(new FormData(form));
  const payload = { ...fields, message: fields.message ?? fields.details ?? "", source, page };
  const body = JSON.stringify(payload);
  const prior = attempts.get(form);
  const id = prior?.body === body ? prior.id : crypto.randomUUID();
  attempts.set(form, { body, id });

  let response: Response;
  try {
    response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, id }),
    });
  } catch {
    throw new Error("The request could not reach us. Your details are still here.");
  }

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.accepted !== true) {
    if (response.status === 400 && typeof result?.error === "string") {
      throw new Error(result.error);
    }

    throw new Error("We couldn’t save your request right now. Your details are still here.");
  }

  attempts.delete(form);
}
