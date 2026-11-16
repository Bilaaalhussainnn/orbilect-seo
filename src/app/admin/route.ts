import { createHash, timingSafeEqual } from "node:crypto";
import { listLeads, notifyLead, uuidPattern } from "../../lib/leads/server";


const headers = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
};

function escapeHtml(value: string | null) {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return (value ?? "—").replace(/[&<>"']/g, (character) => entities[character]);
}

function authorize(request: Request): Response | null {
  const username = process.env.LEAD_ADMIN_USERNAME;
  const password = process.env.LEAD_ADMIN_PASSWORD;

  if (!username || !password || password.length < 20) {
    return new Response("Lead inbox credentials need to be configured.", { status: 503, headers });
  }

  const authorization = request.headers.get("Authorization") ?? "";
  const encoded = authorization.match(/^Basic ([A-Za-z0-9+/=]+)$/i)?.[1] ?? "";
  const credentials = Buffer.from(encoded, "base64");
  const expected = createHash("sha256").update(username + ":" + password).digest();
  const received = createHash("sha256").update(credentials).digest();

  if (!timingSafeEqual(expected, received)) {
    return new Response("Sign in to view leads.", {
      status: 401,
      headers: { ...headers, "WWW-Authenticate": 'Basic realm="Orbilect SEO leads", charset="UTF-8"' },
    });
  }

  return null;
}

export async function GET(request: Request) {
  const denied = authorize(request);
  if (denied) return denied;

  const requestedPage = Number(new URL(request.url).searchParams.get("page") ?? "1");
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 && requestedPage <= 100_000
    ? requestedPage : 1;

  try {
    const leads = await listLeads((page - 1) * 50);
    const rows = leads.slice(0, 50).map((lead) => `<tr>
      <td><strong>${escapeHtml(lead.inquiry_code)}</strong><br>${escapeHtml(lead.form_name)}<br>${escapeHtml(lead.source_page)}
        <small>${escapeHtml(lead.id)}<br>${escapeHtml(lead.created_at)}</small></td>
      <td>${escapeHtml(lead.name)}<br>${escapeHtml(lead.email)}<br>${escapeHtml(lead.phone)}</td>
      <td>${escapeHtml(lead.website)}<br>${escapeHtml(lead.service)}<small>${escapeHtml(lead.message)}</small></td>
      <td>${lead.email_status === "accepted" ? "Accepted by Resend" : lead.email_status === "failed" ? "Failed — check server logs" : "Pending"}
        ${lead.email_id ? `<small>${escapeHtml(lead.email_id)}</small>` : ""}
        ${lead.email_error ? `<small>${escapeHtml(lead.email_error)}</small>` : ""}
        ${lead.email_status !== "accepted" ? `<form method="post">
          <input type="hidden" name="id" value="${escapeHtml(lead.id)}">
          <button type="submit">Retry email</button>
        </form>` : ""}</td>
    </tr>`).join("");

    const document = `<!doctype html><html lang="en"><meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Orbilect SEO Lead Inbox</title>
      <style>
        body{font:16px/1.5 system-ui,sans-serif;background:#f6f7f9;color:#111827;margin:0;padding:clamp(1rem,5vw,4rem)}
        main{max-width:80rem;margin:auto}h1{margin:0 0 1rem}h1 span,a{color:#004aad}
        .table{overflow:auto;background:#fff;border:1px solid #d8dce2;border-radius:.7rem}
        table{border-collapse:collapse;width:100%;min-width:48rem;text-align:left}
        th,td{padding:.85rem;border-bottom:1px solid #e2e5ea;vertical-align:top;overflow-wrap:anywhere}
        th{background:#edf0f4}td{max-width:24rem}small{display:block;color:#505966;margin-top:.45rem;white-space:pre-wrap}
        nav{display:flex;gap:1rem;margin-top:1rem}
      </style>
      <main><h1>Orbilect SEO <span>Lead Inbox</span></h1>
      <div class="table"><table><thead><tr><th scope="col">Form and source</th><th scope="col">Contact</th>
      <th scope="col">Request</th><th scope="col">Email status</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="4">No leads on this page.</td></tr>'}</tbody></table></div>
      <nav aria-label="Lead pages">${page > 1 ? `<a href="?page=${page - 1}">Previous</a>` : ""}
      ${leads.length > 50 && page < 100_000 ? `<a href="?page=${page + 1}">Next</a>` : ""}</nav></main></html>`;

    return new Response(document, { headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } });
  } catch (error) {
    console.error("Lead inbox failed", error instanceof Error ? error.message : "Unknown error");
    return new Response("Could not load leads. Check the server configuration and logs.", { status: 503, headers });
  }
}

export async function POST(request: Request) {
  const denied = authorize(request);
  if (denied) return denied;

  const url = new URL(request.url);
  if (request.headers.get("origin") !== url.origin) {
    return new Response("Invalid request origin.", { status: 403, headers });
  }

  let id: FormDataEntryValue | null;
  try {
    id = (await request.formData()).get("id");
  } catch {
    return new Response("Invalid request.", { status: 400, headers });
  }

  if (typeof id !== "string" || !uuidPattern.test(id)) {
    return new Response("Invalid lead ID.", { status: 400, headers });
  }

  await notifyLead(id.toLowerCase());
  return new Response(null, { status: 303, headers: { ...headers, Location: "/admin" } });
}
