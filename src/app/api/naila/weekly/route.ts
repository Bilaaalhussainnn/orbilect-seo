import { createHash, timingSafeEqual } from "node:crypto";
import { previousWeek, reportDb } from "../../../../lib/naila/reporting";
import { emailCard, escapeMail } from "../../../../lib/naila/mail-render";
import { sendNailaMail, teamEmail } from "../../../../lib/naila/server";

type Report = { visits: number; chats: number; countries: { country: string; count: number }[]; sent: boolean };
const digest = (value: string) => createHash("sha256").update(value).digest();

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization") ?? "";
  if (!secret || !timingSafeEqual(digest(supplied), digest("Bearer " + secret))) {
    return new Response(null, { status: 401 });
  }
  if (process.env.NAILA_WEEKLY_REPORTS_ENABLED !== "1") return new Response(null, { status: 204 });
  const {start, end, label} = previousWeek();
  try {
    const response = await reportDb("rpc/naila_weekly_report", "POST", { week_start: start, week_end: end });
    const result: Report = await response.json();
    if (result.sent) return Response.json({ status: "already sent", week: label });
    const regions = new Intl.DisplayNames(["en"], {type: "region"});
    const name = (code: string) => /^[A-Z]{2}$/.test(code) && code !== "ZZ" ? regions.of(code) ?? code : "Unknown";
    const rows = result.countries.map(({country, count}) =>
      `<tr><th scope="row" style="text-align:left;padding:7px;border-bottom:1px solid #ddd">${escapeMail(name(country))}</th><td align="right" style="padding:7px;border-bottom:1px solid #ddd">${count}</td></tr>`
    ).join("");
    const title = "Orbilect SEO Weekly Chat & Visit Report";
    const text = [title, label + " (Karachi time)", "Opted-in visits: " + result.visits, "Naila chats started: " + result.chats,
      "Visits by country:", ...result.countries.map(({country, count}) => name(country) + ": " + count)].join("\n");
    const html = emailCard(title, label + " · Karachi time",
      `<p style="background:#080b10;color:#fff;padding:12px"><strong>${result.visits}</strong> opted-in visits</p>
<p style="background:#004aad;color:#fff;padding:12px"><strong>${result.chats}</strong> Naila chats started</p>
<h2 style="font-size:17px">Visits by country</h2>${rows ? '<table width="100%" cellspacing="0" cellpadding="0">' + rows + '</table>' : '<p>No opted-in visits this week.</p>'}`);
    await sendNailaMail({ to: teamEmail, subject: title + " (" + label + ")", text, html }, "naila-weekly/" + start);
    await reportDb("rpc/naila_mark_report_sent", "POST", { week_start: start });
    return Response.json({ status: "sent", week: label });
  } catch {
    return Response.json({ error: "Weekly report could not be sent." }, { status: 503 });
  }
}
