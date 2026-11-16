import { leadNotificationCard } from "../naila/mail-render";
import { transcriptBrandAttachment } from "../naila/transcript-avatar";
import { leadSources, proposalServices, type LeadSource } from "./sources";

export type Lead = {
  id: string;
  source: LeadSource;
  form_name: string;
  source_page: string;
  name: string | null;
  email: string;
  phone: string | null;
  website: string;
  service: string;
  message: string;
};

export type StoredLead = Lead & {
  created_at: string;
  inquiry_code: string;
  email_error: string | null;
  email_status: "pending" | "failed" | "accepted";
  email_id: string | null;
};

export const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(input: Record<string, unknown>, key: string, max: number) {
  const value = input[key];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string" || value.length > max) {
    throw new Error("Check the " + key + " field and try again.");
  }
  return value.trim();
}

export function parseLead(value: unknown): Lead {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("Enter your details and try again.");
  }

  const input = value as Record<string, unknown>;
  const source = field(input, "source", 64);
  const id = field(input, "id", 36);

  if (!uuidPattern.test(id) || !Object.hasOwn(leadSources, source)) {
    throw new Error("Reload the form and try again.");
  }

  const leadSource = source as LeadSource;
  const { kind, name: formName } = leadSources[leadSource];
  const name = field(input, "name", 120);
  const phone = field(input, "phone", 40);
  const email = field(input, "email", 254);
  const address = field(input, "website", 2048);
  const message = field(input, "message", 2000);
  const page = field(input, "page", 300);

  if (!emailPattern.test(email)) throw new Error("Enter a valid email address.");
  if (kind === "proposal" || leadSource === "starter-offer") {
    const digits = phone.replace(/\D/g, "").length;
    if (!name || digits < 7 || digits > 15 || !/^\+?[\d().\s-]+$/.test(phone)) {
      throw new Error("Enter your full name and a valid phone number.");
    }
  }

  let website: URL;
  try {
    if (!address || /\s/.test(address)) throw new Error();
    const hasScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(address);
    website = new URL(hasScheme ? address : "https://" + address);
    if (
      !["http:", "https:"].includes(website.protocol) ||
      !website.hostname.includes(".") ||
      website.username || website.password
    ) throw new Error();
  } catch {
    throw new Error("Enter a website URL such as example.com.");
  }

  const service = kind === "proposal" ? field(input, "service", 100) : "Free SEO audit";
  if (kind === "proposal" && (!proposalServices.some((item) => item === service) || !message)) {
    throw new Error("Choose a service and tell us about your project.");
  }

  return {
    id: id.toLowerCase(),
    source: leadSource,
    form_name: formName,
    source_page: /^\/(?!\/)[\w./%~-]*$/.test(page) ? page : "/",
    name: name || null,
    email,
    phone: phone || null,
    website: website.href,
    service,
    message,
  };
}

async function database(query: URLSearchParams, init: RequestInit = {}) {
  const endpoint = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!endpoint || !key) throw new Error("Lead database is not configured");

  const url = new URL("/rest/v1/orbilect_leads", endpoint);
  url.search = query.toString();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  if (!key.startsWith("sb_secret_")) headers.set("Authorization", "Bearer " + key);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(6000) });
  if (!response.ok) throw new Error("Lead database returned HTTP " + response.status);
  return response;
}

export async function saveLead(lead: Lead) {
  const response = await database(new URLSearchParams({ on_conflict: "id" }), {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify(lead),
  });
  const rows: StoredLead[] = await response.json();
  if (rows[0]) return { isNew: true, code: rows[0].inquiry_code };

  const lookup = await database(new URLSearchParams({ id: "eq." + lead.id, limit: "1" }));
  const [existing]: StoredLead[] = await lookup.json();
  if (!existing || !Object.entries(lead).every(([key, value]) => existing[key as keyof Lead] === value)) {
    throw new Error("Submission identifier conflict");
  }
  return { isNew: false, code: existing.inquiry_code };
}

export async function listLeads(offset: number) {
  const response = await database(new URLSearchParams({
    order: "created_at.desc,id.desc", limit: "51", offset: String(offset),
  }));
  return await response.json() as StoredLead[];
}

async function sendNotification(lead: StoredLead) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.LEAD_NOTIFICATION_FROM?.trim();
  const to = [...new Set((process.env.LEAD_EMAILS?.trim() || process.env.LEAD_NOTIFICATION_TO || "")
    .split(",").map((address) => address.trim().toLowerCase()).filter(Boolean))];

  if (!key || !from || !to.length || to.length > 50 || to.some((address) => !emailPattern.test(address))) {
    throw new Error("Lead email configuration is incomplete");
  }

  const subject = lead.source === "starter-offer"
    ? "Orbilect SEO $500 Promo Inquiry - " + lead.inquiry_code
    : "Orbilect SEO Inquiry - " + lead.service + " - " + lead.inquiry_code;
  const details: [string, string][] = [
    ["Inquiry code", lead.inquiry_code], ["Lead ID", lead.id], ["Form", lead.form_name],
    ["Source page", lead.source_page], ["Service", lead.service], ["Email", lead.email],
    ["Phone", lead.phone ?? "—"], ["Website", lead.website],
  ];
  const body = JSON.stringify({
    from, to, reply_to: lead.email, subject,
    html: leadNotificationCard(subject, lead.name ?? "—", details, lead.message),
    attachments: [transcriptBrandAttachment],
    text: [
      "Inquiry code: " + lead.inquiry_code, "Lead ID: " + lead.id, "Form: " + lead.form_name, "Page: " + lead.source_page,
      "Service: " + lead.service, "Name: " + (lead.name ?? "—"), "Email: " + lead.email,
      "Phone: " + (lead.phone ?? "—"), "Website: " + lead.website, "", lead.message,
    ].join("\n"),
  });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
        "Idempotency-Key": "orbilect-seo-lead/" + lead.id,
      },
      body,
      signal: AbortSignal.timeout(5000),
    }).catch(() => null);

    if (response?.ok) {
      const result = await response.json();
      if (typeof result.id !== "string") throw new Error("Resend did not return a message ID");
      return result.id as string;
    }

    if (attempt === 1 || (response && response.status < 500 && response.status !== 429)) {
      const result = await response?.json().catch(() => null);
      const reason = typeof result?.name === "string" && /^[a-z_]{1,60}$/.test(result.name)
        ? " (" + result.name + ")" : "";
      throw new Error("Resend send failed: " + (response?.status ?? "network error") + reason);
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  throw new Error("Resend send failed");
}

export async function notifyLead(id: string) {
  const claimedAt = new Date().toISOString();
  const expiredAt = new Date(Date.now() - 120_000).toISOString();

  try {
    const claim = await database(new URLSearchParams({
      id: "eq." + id,
      email_status: "in.(pending,failed)",
      or: "(email_claimed_at.is.null,email_claimed_at.lt." + expiredAt + ")",
    }), {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ email_status: "pending", email_claimed_at: claimedAt }),
    });
    const [lead]: StoredLead[] = await claim.json();
    if (!lead) return;

    let emailId: string | null = null;
    let emailError: string | null = null;

    try {
      emailId = await sendNotification(lead);
    } catch (error) {
      emailError = error instanceof Error ? error.message : "Unknown email error";
      console.error("Lead notification failed", lead.inquiry_code, emailError);
    }

    await database(new URLSearchParams({ id: "eq." + id, email_claimed_at: "eq." + claimedAt }), {
      method: "PATCH",
      body: JSON.stringify({
        email_status: emailId ? "accepted" : "failed",
        email_id: emailId,
        email_error: emailError,
        email_claimed_at: null,
      }),
    });
  } catch (error) {
    console.error("Could not process lead notification", id, error instanceof Error ? error.message : "Unknown error");
  }
}
