import { paymentMethods } from "../payment-policy";
import { resolveIntent } from "./intent-replies";
import { siteFaqs } from "./site-faqs";

export type Action = { text: string; href: string; brand?: string };
export type Reply = { text: string; actions?: Action[]; startQuote?: boolean };
const contact = "/contact#request-proposal";
const pricing = "/pricing#seo-plans";
const social: Action[] = [
  { text: "Visit LinkedIn", href: "https://www.linkedin.com/company/orbilect-seo/", brand: "LinkedIn" },
  { text: "Visit Instagram", href: "https://www.instagram.com/orbilectseo/", brand: "Instagram" },
  { text: "Visit Facebook", href: "https://www.facebook.com/orbilectseo/", brand: "Facebook" },
  { text: "Visit X", href: "https://x.com/orbilectseo", brand: "X" },
  { text: "Visit Pinterest", href: "https://www.pinterest.com/orbilectseo/", brand: "Pinterest" },
];

const serviceOverview = [
  "On-page SEO — improve page content, titles, and internal links",
  "Off-page SEO — build visibility through relevant links, mentions, and digital PR",
  "Technical SEO — fix crawling, indexing, and site performance issues",
  "Ecommerce SEO — improve visibility for product and category pages",
  "Digital marketing — manage paid search, social campaigns, and analytics",
  "Website redesign — improve site structure, usability, and conversion paths",
];
const serviceDetails = [
  { match: /\b(?:on[- ]page|content writing|seo content)\b/, text: "On-page SEO improves what’s on each page: its content, title, headings, and internal links. We start by checking what customers search for and whether the page answers that search. For a service page, that might mean rewriting the offer, adding answers to common questions, and linking it from related pages." },
  { match: /\b(?:off[- ]page|backlinks?|link building|digital pr)\b/, text: "Off-page SEO helps other sites discover and reference your business. We can review your current backlinks and look for relevant editorial mentions, digital PR opportunities, and links that make sense for your audience." },
  { match: /\b(?:technical|crawl(?:ing)?|indexing|sitemaps?)\b/, text: "Technical SEO helps search engines discover and index the right pages. We check issues such as broken redirects, duplicate URLs, sitemap coverage, and slow templates, then prioritize fixes based on the pages they affect." },
  { match: /\b(?:e[- ]?commerce|shopify|woocommerce|online store|product pages?)\b/, text: "Ecommerce SEO helps shoppers find your products and categories through search. We review category structure, product descriptions, internal links, and duplicate URLs created by filters or product variants." },
  { match: /\b(?:digital marketing|social media marketing|paid social|email marketing|marketing analytics)\b/, text: "Our digital marketing work can include paid search, paid social, email marketing, and analytics. We start with the audience and the result you want to measure, such as qualified enquiries or purchases, so we can choose the right channel and track what it delivers." },
  { match: /\b(?:redesign|landing pages?|conversion rate optimization)\b/, text: "Website redesign can cover page structure, navigation, mobile usability, and enquiry or purchase flows. If you already get search traffic, we also plan how to preserve important URLs or redirect them when the new site launches." },
];

const ignored = new Set("a the an i im you your my it is are or of for to and on in how what can do does will with me about".split(" "));
const words = (text: string) => [...new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? [])].filter(word => !ignored.has(word));

export function answer(message: string, humor: boolean, previousMessage = ""): Reply {
  return resolveIntent(message, previousMessage, question => answerQuestion(question, humor));
}

function answerQuestion(message: string, humor: boolean): Reply {
  const q = message.toLowerCase().replace(/’/g, "'");
  if (/^(?:(?:thank you|thanks)(?: so much| a lot)?|thx|cheers|appreciate it)[.!\s]*$/.test(q)) {
    return { text: "You’re welcome!" };
  }
  if (/^(?:how are you(?: doing)?|how's it going|what's up)[.!?\s]*$/.test(q)) {
    return { text: "I’m doing well, thanks! What can I help you with?" };
  }
  if (/^(?:ok(?:ay)?|got it|understood|sure)[.!\s]*$/.test(q)) {
    return { text: "Sounds good. I’m here if you have another question." };
  }
  if (/\b(?:project brief|brief|docs?|docx|documents?|pdfs?|attachments?)\b/.test(q) ||
      /\b(?:send|share|upload|attach)\b.*\bfiles?\b/.test(q)) {
    return {
      text: "Sure. Email your project brief or document to info@orbilectseo.com. Attach your file and tell us what you’d like to achieve.",
      actions: [{ text: "Email your project brief", href: "mailto:info@orbilectseo.com?subject=Project%20brief" }],
    };
  }

  if (/\b(?:slap|hit|hurt)\b.*\b(?:kid|child|baby)\b/.test(q)) {
    return { text: "I can help with Orbilect products and services. If you feel like you might hurt a child, step away, make sure they’re with a safe adult, and ask someone for help." };
  }
  if (/cookie/.test(q)) return { text: "Sure. The site remembers your cookie choices. Optional analytics and marketing are controlled in Cookie choices.", actions: [{ text: "View cookie policy", href: "/privacy-policy#cookies" }] };
  if (/\b(?:build|make|create|develop)\b.*(?:chat\s?bot|like you|naila)/.test(q)) return {
    text: (humor ? "Hehe, it seems like you’re starting to like me 😄\n\n" : "Sure.\n\n") + "Of course. Orbilect Labs can review a chatbot project with you. Tell us what it should answer, where it should run, and when it should hand off to a person.",
    actions: [{ text: "Share your project", href: contact }, { text: "View terms", href: "/terms-and-conditions" }, { text: "Visit Orbilect Labs", href: "https://orbilectlabs.com" }],
  };
  if (/\b(?:payment|payments|pay|paypal|cheques?|checks?|wire|bank transfer)\b/.test(q)) return { text: paymentMethods, actions: [{ text: "View terms", href: "/terms-and-conditions" }] };
  if (/\b(?:cost|price|pricing|quotation|quote|rates|600|estimate|starter offer|seo offer|special offer)\b/.test(q)) return {
    text: "Sure. Regular Starter SEO starts at $650 USD, and Essential is $1,500 USD per 30-day billing cycle. Custom services are quoted after we review your website, goals, and the work you need.",
    actions: [{ text: "Get a quote", href: "/pricing#pricing-checklist" }],
  };
  if (/\b(?:ppc|pay per click|google ads|paid search)\b/.test(q)) return { text: "Absolutely. PPC means paying for ad clicks to reach people searching for what you offer. Orbilect SEO can review campaign structure, targeting, ad copy, landing pages and conversion tracking. Ad spend and management are scoped separately. Which product or service would you want to advertise?", actions: [{ text: "Explore PPC management", href: "/services/ppc-management" }, { text: "View pricing", href: pricing }] };
  if (/\b(?:email|e-mail|write to)\b/.test(q)) return { text: "Sure. Write to us at info@orbilectseo.com.", actions: [{ text: "Write to us", href: "mailto:info@orbilectseo.com" }] };
  if (/\b(?:phone|call|telephone)\b/.test(q)) return { text: "Of course. You can reach us at +1 (646) 640-0070.", actions: [{ text: "Call us", href: "tel:+16466400070" }] };
  const channel = social.filter(item => new RegExp("\\b" + item.brand?.toLowerCase() + "\\b").test(q) || (item.brand === "X" && /twitter/.test(q)));
  if (channel.length || /social (?:links|profiles|accounts|media)/.test(q)) return { text: "Sure. Here’s where you can follow Orbilect SEO.", actions: channel.length ? channel : social };
  if (/\b(?:privacy|terms)\b/.test(q)) return { text: "Of course. You can read our privacy policy or terms here.", actions: [{ text: "View privacy policy", href: "/privacy-policy" }, { text: "View terms", href: "/terms-and-conditions" }] };
  if (/\b(?:products|orbilect cx|reviews|orbilect hire|orbilect flow|orbilect create)\b/.test(q)) return { text: "Sure. Orbilect Labs and Orbilect SEO are live. Orbilect CX, Reviews, Flow, Hire, and Create are in development.", actions: [{ text: "Visit Orbilect Labs", href: "https://orbilectlabs.com" }, { text: "Explore Orbilect SEO", href: "/" }] };
  if (/\b(?:who are you|your name|how old|when were you built)\b/.test(q)) return { text: humor ? "I’m Naila, built by Orbilect Labs. I’m still growing up, but I already know my way around SEO. 🙂" : "I’m Naila, Orbilect SEO’s assistant, built by Orbilect Labs." };
  const terms = words(q);
  let candidate: (typeof siteFaqs)[number] | undefined;
  let bestScore = 0;
  for (const faq of siteFaqs) {
    const keys = words(faq.question);
    const matches = terms.filter(term => keys.includes(term)).length;
    const score = matches >= 2 ? 2 * matches / (terms.length + keys.length) : 0;
    if (score > bestScore) { candidate = faq; bestScore = score; }
  }
  const detail = serviceDetails.find(service => service.match.test(q));
  if (!detail && (/\b(?:services|your offerings|what (?:do you|does orbilect seo) (?:do|offer|provide)|what can you (?:do|help(?: me)? with))\b/.test(q) &&
      (/^(?:seo )?services[.!?\s]*$/.test(q) || /\b(?:what|which|list|show|tell|offer|provide|your|available|all)\b/.test(q)))) {
    return {
      text: "Sure, here are our main services:\n\n" + serviceOverview.map(service => "• " + service).join("\n"),
      actions: [{ text: "Explore services", href: "/services" }],
    };
  }
  if (candidate && bestScore >= (detail ? .65 : .55)) return { text: "Sure. " + candidate.answer, actions: [{ text: "Read more", href: candidate.href }] };
  if (detail) return { text: detail.text };
  if (/\b(?:seo|search engine optimization)\b/.test(q)) {
    return { text: "SEO helps people find your website in unpaid search results. We look at what your customers search for, improve the pages that answer those searches, and fix technical problems that can keep those pages out of search. Is there a particular page or search you want to improve?" };
  }
  if (/\b(?:project|website|marketing|help)\b/.test(q)) {
    return { text: "What would you like help with: getting found in search, improving your website, or bringing in more enquiries?" };
  }
  return { text: "Could you tell me a little more? I can help with Orbilect SEO’s services, pricing, or a question about your website." };
}
