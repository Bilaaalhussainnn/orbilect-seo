import { NextRequest, after } from "next/server";
import { sendNailaMail, teamEmail } from "../../../../lib/naila/server";

function routePath(value: unknown) {
  return typeof value === "string" && value.length <= 250 && /^\/(?!\/)[\w./~-]*$/.test(value) && !/^\/(?:admin|api)(?:\/|$)/.test(value) ? value : "/";
}

function referrer(value: unknown) {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    return url.origin;
  } catch { return null; }
}

export async function POST(request: NextRequest) {
  if (process.env.NAILA_VISITS_ENABLED !== "1" || request.headers.get("origin") !== request.nextUrl.origin ||
      !/^1[01]$/.test(request.cookies.get("orbilect_cookie_choices_v1")?.value ?? "")) {
    return new Response(null, { status: 204 });
  }
  const endpoint = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!endpoint || !key) return new Response(null, { status: 503 });
  const controller = request.body?.getReader();
  if (!controller) return new Response(null, { status: 400 });
  let text = "";
  let length = 0;
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const {value, done} = await controller.read();
      if (done) break;
      length += value.byteLength;
      if (length > 4096) { await controller.cancel(); return new Response(null, {status: 413}); }
      text += decoder.decode(value, {stream: true});
    }
    const input = JSON.parse(text + decoder.decode());
    if (typeof input.id !== "string" || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(input.id)) {
      return new Response(null, { status: 400 });
    }
    const country = process.env.VERCEL === "1" ? request.headers.get("x-vercel-ip-country") : null;
    const city = process.env.VERCEL === "1" ? request.headers.get("x-vercel-ip-city") : null;
    const source = referrer(input.referrer);
    const page = routePath(input.page);
    const headers = new Headers({ apikey: key, "Content-Type": "application/json" });
    if (!key.startsWith("sb_secret_")) headers.set("Authorization", "Bearer " + key);
    const result = await fetch(new URL("/rest/v1/rpc/naila_record_visit", endpoint), {
      method: "POST", headers, signal: AbortSignal.timeout(5000), cache: "no-store",
      body: JSON.stringify({ visit_id: input.id, page_path: page, source_origin: source,
        country_code: country?.slice(0, 2) ?? null, city_name: city?.slice(0, 100) ?? null }),
    });
    if (!result.ok) return new Response(null, { status: 503 });
    const visit = await result.json();
    if (visit?.fresh && process.env.NAILA_VISIT_EMAILS_ENABLED === "1") {
      after(async () => {
        try {
          await sendNailaMail({ to: teamEmail, subject: "Orbilect SEO visitor " + visit.label,
            text: ["Visitor: " + visit.label, "Approximate city and country: " + ([city, country].filter(Boolean).join(", ") || "Unavailable"),
              "Referral: " + (source ?? "Direct or unavailable"), "Landing page: " + page,
              "Internal visitor log: /admin/naila"].join("\n") }, "naila-visit/" + input.id);
        } catch { console.error("Naila visitor notification failed."); }
      });
    }
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  } finally { controller.releaseLock(); }
}
