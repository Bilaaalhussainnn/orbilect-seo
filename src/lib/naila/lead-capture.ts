import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import { proposalServices } from "../leads/sources";
import { validEmail } from "./server";
import type { Reply } from "./answers";

type Step = "name" | "email" | "phone" | "website" | "service" | "message" | "confirm";
export type ContactDraft = { id: string; step: Step; name: string; email: string; phone: string; website: string; service: string; interest: string; message: string; editing?: boolean };
export const contactInvitation = "Sure, I can collect your information here and share it with our product experts so they can get in touch within the next 24 hours. 🙂 What is your full name?";
export function isContactRequest(message: string) {
  const q = message.toLowerCase().replace(/[’‘]/g, "'");
  if (/\b(?:don't|do not|never|stop) (?:contact|call|email|phone)|\b(?:unsubscribe|no callback)\b/.test(q)) return false;
  return /\b(?:call\s?back|contact me|call me|email me|phone me|reach me|get in touch|reach out to me|follow up with me|request a call)\b/.test(q)
    || /\b(?:how|where|way)\b.*\b(?:contact|reach|speak to|talk to)\b.*\b(?:you|team|expert|strategist|specialist|someone)\b/.test(q)
    || /\b(?:speak|talk|connect|chat)\b.*\b(?:person|human|team|expert|specialist|strategist|sales)\b/.test(q)
    || /\b(?:arrange|schedule|book)\b.*\b(?:call|consultation|discussion)\b/.test(q);
}
export function startContactReply(): Reply { return { text: contactInvitation }; }
export function sealContactDraft(draft: ContactDraft, secret: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", createHash("sha256").update(secret).digest(), iv);
  const bytes = Buffer.concat([cipher.update(JSON.stringify(draft), "utf8"), cipher.final()]);
  return [iv, bytes, cipher.getAuthTag()].map(value => value.toString("base64url")).join(".");
}
export function openContactDraft(value: string | undefined, secret: string): ContactDraft | undefined {
  if (!value || value.length > 2800) return;
  try {
    const [iv, bytes, tag] = value.split(".").map(part => Buffer.from(part, "base64url"));
    const decipher = createDecipheriv("aes-256-gcm", createHash("sha256").update(secret).digest(), iv);
    decipher.setAuthTag(tag);
    const draft = JSON.parse(Buffer.concat([decipher.update(bytes), decipher.final()]).toString("utf8")) as ContactDraft;
    if (!["name", "email", "phone", "website", "service", "message", "confirm"].includes(draft.step)) return;
    return draft;
  } catch { return; }
}
const prompts: Record<Step, string> = {
  name: "What is your full name?", email: "What email address should our product experts use?",
  phone: "What contact number should we use, including the country code? You can say email only if you prefer.",
  website: "What is your website address? If you do not have one yet, say no website.",
  service: "Which service would you like to discuss, such as SEO, website redesign, marketing or offshore staffing?",
  message: "Briefly tell me what you would like to improve or build so our experts have the right context.",
  confirm: "May I share these details with our product experts so they can contact you within 24 hours? Reply yes to submit, change a field to correct it, or cancel.",
};
const skip = /^(?:skip|none|no website(?: yet)?|not yet|don't have (?:one|a website)(?: yet)?|email only|prefer email|no phone)[.!\s]*$/i;
function summary(draft: ContactDraft) {
  return `Please check your details:\nName: ${draft.name}\nEmail: ${draft.email}\nPhone: ${draft.phone || "Email preferred"}\nWebsite: ${draft.website || "Not provided"}\nService: ${draft.interest}\nProject: ${draft.message}\n\n${prompts.confirm}`;
}
export function advanceContact(message: string, current?: ContactDraft): { draft?: ContactDraft; reply?: Reply; ready?: ContactDraft; interrupted?: boolean } | undefined {
  const text = message.trim().replace(/[’‘]/g, "'");
  if (/^(?:cancel|stop(?: collecting)?|don't contact me|do not contact me|no callback|never mind|nevermind)[.!\s]*$/i.test(text)) {
    return current ? { reply: { text: "Of course. I have not submitted your contact request. We can keep chatting about your questions." } } : undefined;
  }
  if (!current) {
    if (!isContactRequest(text)) return;
    return { draft: { id: randomUUID(), step: "name", name: "", email: "", phone: "", website: "", service: "Help me choose", interest: "", message: "" }, reply: startContactReply() };
  }
  const draft = { ...current };
  const change = text.match(/^(?:change|edit|correct|update) (?:my )?(name|email|phone|website|service|message|project)(?: address| number)?[.!\s]*$/i);
  if (change) {
    draft.step = (change[1].toLowerCase() === "project" ? "message" : change[1].toLowerCase()) as Step;
    draft.editing = true;
    return { draft, reply: { text: prompts[draft.step] } };
  }
  if (draft.step === "confirm") {
    if (/^(?:yes(?: please)?|confirm|submit|go ahead|please (?:submit|share)|yes[, ]+(?:submit|share|please share).*)[.!\s]*$/i.test(text)) return { draft, ready: draft };
    if (/^(?:no(?: thanks)?|not now)[.!\s]*$/i.test(text)) return { reply: { text: "No problem. I have not submitted those details. What would you like help with next?" } };
    if (/\?|^(?:how|what|why|when|where|can|could|do|does|is|are|explain|tell me)\b/i.test(text)) return { draft, interrupted: true, reply: { text: prompts.confirm } };
    return { draft, reply: { text: summary(draft) } };
  }
  if (isContactRequest(text)) return { draft, reply: { text: "I'm ready to help with that here. " + prompts[draft.step] } };
  // Questions can interrupt collection without resetting it or interpreting them as a name.
  if ((/\?/.test(text) || /^(?:how|what|why|when|where|can|could|do|does|is|are|explain|tell me)\b/i.test(text)) && !/^my name is\b/i.test(text)) {
    return { draft, interrupted: true, reply: { text: prompts[draft.step] } };
  }
  const next: Record<Exclude<Step, "confirm">, Step> = { name: "email", email: "phone", phone: "website", website: "service", service: "message", message: "confirm" };
  const step = draft.step;
  if (step === "name") {
    const name = text.replace(/^(?:my name is|i am|i'm|this is)\s+/i, "").replace(/[.!]+$/, "");
    if (name.length < 2 || name.length > 100 || Buffer.byteLength(name) > 180 || !/^[\p{L}\p{M} .'-]+$/u.test(name)) return { draft, reply: { text: "Please enter the name you would like our team to use, without a phone number or email address." } };
    draft.name = name;
  } else if (step === "email") {
    const email = text.replace(/^(?:my email(?: address)? is|email:)\s*/i, "").trim();
    if (!validEmail(email)) return { draft, reply: { text: "Please check the email address, for example name@example.com." } };
    draft.email = email;
  } else if (step === "phone") {
    const digits = text.replace(/\D/g, "");
    if (skip.test(text)) draft.phone = "";
    else if (digits.length >= 7 && digits.length <= 15 && /^\+?[\d().\s-]+$/.test(text)) draft.phone = text;
    else return { draft, reply: { text: "Please include a valid contact number with its country code, or say email only." } };
  } else if (step === "website") {
    if (Buffer.byteLength(text) > 300) return { draft, reply: { text: "Please share a website address under 300 bytes, without a long tracking link." } };
    if (skip.test(text)) draft.website = "";
    else {
      try {
        const address = new URL(/^https?:\/\//i.test(text) ? text : "https://" + text);
        if (!address.hostname.includes(".") || !["http:", "https:"].includes(address.protocol) || address.username || address.password || address.href.length > 300 || text.length > 240 || /\s/.test(text)) throw Error();
        draft.website = address.href;
      } catch { return { draft, reply: { text: "Please enter a website such as example.com, or say no website." } }; }
    }
  } else if (step === "service") {
    if (Buffer.byteLength(text) > 160) return { draft, reply: { text: "Please give me a short service name; I'll ask for the project details next." } };
    draft.interest = text;
    draft.service = proposalServices.find(service => service.toLowerCase() === text.toLowerCase())
      ?? (/\bredesign|website design|build.*website/i.test(text) ? "Website Redesign" : /\bseo\b/i.test(text) ? "On-page SEO" : /\bstaff|offshore/i.test(text) ? "Dedicated Offshore Staffing" : "Help me choose");
  } else {
    if (text.length < 4 || Buffer.byteLength(text) > 500) return { draft, reply: { text: "Please share a brief project description between 4 and 500 bytes." } };
    draft.message = text;
  }
  draft.step = draft.editing ? "confirm" : next[step];
  delete draft.editing;
  return { draft, reply: { text: draft.step === "confirm" ? summary(draft) : "Thanks. " + prompts[draft.step] } };
}
