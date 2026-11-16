const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
export const validEmail = (email: string) => email.length <= 254 && emailPattern.test(email);
export const teamEmail = [
  "bilalhussain@orbilectseo.com",
  "bilalhussain@orbilectlabs.com",
  "hussainnbilall@gmail.com",
];

export async function sendNailaMail(input: {
  to: string[];
  subject: string;
  text: string;
  html?: string;
  reply_to?: string;
  attachments?: {filename: string; content: string; content_id?: string; content_type?: string}[];
}, idempotency: string) {
  const from = process.env.RESEND_FROM_EMAIL ?? process.env.LEAD_NOTIFICATION_FROM;
  const key = process.env.RESEND_API_KEY;
  if (!from || !key) throw Error("Mail unavailable.");
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST", signal: AbortSignal.timeout(7000),
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json", "Idempotency-Key": idempotency },
    body: JSON.stringify({ from, ...input }),
  });
  if (!result.ok) throw Error("Mail provider did not accept the message.");
}
