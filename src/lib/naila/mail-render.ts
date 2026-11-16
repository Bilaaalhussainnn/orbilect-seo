const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeMail = (text: string) => text.replace(/[&<>"']/g, value => entities[value]);
const paragraph = (text: string) => escapeMail(text).replace(/\r?\n/g, "<br>");


export function emailCard(title: string, subtitle: string, body: string, poweredBy = true) {
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<body style="margin:0;background:#f3f4f6;color:#151922;font-family:Poppins,Arial,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 10px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fff;border:1px solid #dce0e5">
<tr><td style="${poweredBy ? "padding:22px;background:#080b10;color:white" : "padding:18px 22px;background:#fff;color:#004aad;border-bottom:1px solid #dce0e5"}"><strong>Orbilect SEO</strong></td></tr>
<tr><td style="padding:22px"><h1 style="font-size:22px;margin:0 0 6px">${escapeMail(title)}</h1>
<p style="font-size:13px;color:#4e5664;margin:0 0 20px">${escapeMail(subtitle)}</p>${body}</td></tr>
${poweredBy ? `<tr><td style="padding:14px 22px;border-top:1px solid #ddd;color:#505865;font-size:12px">Orbilect SEO · Powered by Orbilect Labs</td></tr>` : ""}
</table></td></tr></table></body></html>`;
}


const home = "https://orbilectseo.com/";
const socials = [
  ["Facebook", "https://www.facebook.com/orbilectseo/", "facebook"],
  ["X (Twitter)", "https://x.com/orbilectseo", "x"],
  ["LinkedIn", "https://www.linkedin.com/company/orbilect-seo", "linkedin"],
  ["Pinterest", "https://www.pinterest.com/orbilectseo/", "pinterest"],
] as const;
const reason = "You received this email because a transcript of an Orbilect SEO chat was requested for this email address.";
const ignore = "If you don’t recognize this request, you can ignore this email.";
const copyright = "Copyright 2026 orbilectseo.com";
const transcriptFooterText = [
  "", "", "Visit Orbilect SEO: " + home, reason, ignore,
  ...socials.map(([name, url]) => name + ": " + url), copyright, "Orbilect SEO", "All rights reserved.",
].join("\n");

export function transcriptPlainText(transcript: string) {
  return intro + "\n\n" + transcript.replace(/^\[(Naila|You)(?:\|([0-2]\d:[0-5]\d))?\] /gm,
    (_line, speaker: string, time?: string) => speaker + (time ? " (" + time + ")" : "") + ": ") + transcriptFooterText;
}

const intro = "Thanks for chatting with Naila. Here’s a copy of your conversation with Orbilect SEO.";

function transcriptLayout(title: string, body: string) {
  const safeTitle = escapeMail(title);
  const displayTitle = safeTitle.replace("Chat Transcript",
    '<span style="color:#004aad">Chat Transcript</span>');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safeTitle}</title></head>
<body style="margin:0;background:#f3f4f6;color:#151922;font-family:Poppins,Arial,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fff;border:1px solid #dce0e5;border-radius:14px">
<tr><td style="padding:18px 23px;border-bottom:2px solid #004aad">
<a href="${home}" style="color:#151922;font-size:20px;font-weight:700;text-decoration:none">
<img src="cid:orbilect-seo-wordmark" width="212" height="56" alt="Orbilect SEO" style="display:block;border:0"></a>
</td></tr>
<tr><td style="padding:25px 23px 21px">
<h1 style="font-size:26px;line-height:1.25;margin:0 0 10px;color:#151922">${displayTitle}</h1>
<p style="font-size:14px;line-height:1.55;color:#4e5664;margin:0 0 23px">${intro}</p>${body}</td></tr>
</table></td></tr></table></body></html>`;
}

function transcriptFooter() {
  const links = socials.map(([name, url, icon]) =>
    `<a href="${url}" style="display:inline-block;padding:5px;color:#004aad;text-decoration:none"><img src="cid:naila-social-${icon}" width="32" height="32" alt="${name}" style="display:inline-block;width:32px;height:32px;border:0;vertical-align:middle"></a>`
  ).join(" ");
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:26px">
<tr><td align="center">
<a href="${home}" style="display:block;color:#004aad;text-decoration:none">
<img src="cid:orbilect-seo-cta" width="592" alt="Get found by your customers. Visit Orbilect SEO." style="display:block;width:100%;max-width:592px;height:auto;border:0;border-radius:12px"></a>
</td></tr></table>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #dce0e5;text-align:center;color:#4e5664;font-size:12px;line-height:1.6">
<p style="margin:0 0 10px">${reason}<br>${ignore}</p>
<p style="margin:0 0 8px">${links}</p>
<p style="margin:0"><a href="https://orbilectseo.com/" style="text-decoration:none"><img src="cid:orbilect-seo-wordmark" width="134" height="36" alt="Orbilect SEO" style="display:inline-block;width:134px;height:36px;border:0;vertical-align:middle;margin:4px 0"></a><br>All rights reserved.<br>Copyright 2026 <a href="https://orbilectseo.com/" style="color:#004aad">orbilectseo.com</a></p>
</div>`;
}

export function transcriptCard(title: string, transcript: string) {
  const entries: {speaker: string; time?: string; lines: string[]}[] = [];
  for (const line of transcript.split(/\r?\n/)) {
    const match = /^\[(Naila|You)(?:\|([0-2]\d:[0-5]\d))?\] (.*)$/.exec(line);
    if (match) entries.push({speaker: match[1], time: match[2], lines: [match[3]]});
    else if (entries.length) entries.at(-1)?.lines.push(line.replace(/^ {2}/, ""));
  }
  const rows = entries.map(entry => {
    const visitor = entry.speaker === "You";
    const align = visitor ? "right" : "left";
    const background = visitor ? "#004aad" : "#080b10";
    const portrait = visitor ? "" : `<img src="cid:naila-avatar" width="26" height="26" alt="Naila" style="display:inline-block;vertical-align:middle;border-radius:50%;margin-right:8px">`;
    const time = entry.time ? `<span style="margin-left:7px;color:#596576;font-size:12px">${entry.time}</span>` : "";
    return `<tr><td align="${align}" style="padding:0 0 16px">
<table role="presentation" align="${align}" cellspacing="0" cellpadding="0" style="max-width:92%">
<tr><td align="${align}" style="padding:0 0 5px;color:#151922">${portrait}<strong>${entry.speaker}</strong>${time}</td></tr>
<tr><td bgcolor="${background}" style="text-align:left;background:${background};color:#fff;padding:9px 12px;border-radius:10px;overflow-wrap:anywhere;font-size:14px;line-height:1.55">${paragraph(entry.lines.join("\n").trimEnd())}</td></tr>
</table></td></tr>`;
  }).join("");
  const messages = rows ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>` : `<p>${paragraph(transcript)}</p>`;
  return transcriptLayout(title, messages + transcriptFooter());
}
