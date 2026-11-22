import { getPublishedGuides } from "../../app/blogs/published-guides";
import { businessDescription, internationalWhatsApp, pakistanAddress, pakistanWhatsApp, staffingLocations } from "../site-identity";
import { ecommerceOperationsFaqs, staffingSupportFaqs } from "../customer-operations-faqs";
import serviceFaqs from "./service-faqs.json";
import publicPages from "./public-pages.json";
import launchFaqs from "./launch-faqs.json";
import { policyPassage } from "./site-content";
import type { Reply } from "./answers";

type Entry = { question: string; href: string } & ({ answer: string } | { match: string });

const companyAnswers: Record<string, string> = {
  "What does Orbilect SEO do for businesses?": businessDescription,
  "Where are your offshore specialists based?": staffingLocations,
  "What is the international WhatsApp number for Orbilect SEO?": "Message " + internationalWhatsApp.display + " on WhatsApp.",
  "What is the Pakistan WhatsApp number for Orbilect SEO?": "The Karachi office’s WhatsApp number is " + pakistanWhatsApp.display + ".",
  "What is the full Karachi office address?": pakistanAddress,
};

const entries: Entry[] = [
  { question: "Which industries do you serve?", answer: "Our twelve industry collections are Automotive, Ecommerce, Education, Finance, Healthcare, Hospitality, Logistics, Manufacturing, and Real Estate. Choose an industry to explore relevant SEO services and sample website designs.", href: "/industries" },
  { question: "How do I start a website redesign?", answer: "Choose your preferred examples in the Website Design Gallery, then share your current URL, goals, and requirements through Contact. We review your website, agree the scope and investment, issue an invoice, and plan design, testing, and launch.", href: "/website-design-gallery#how-we-work" },

  { question: "Where can I see your website designs?", answer: "Explore our Website Design Gallery. Switch between twelve industry collections to compare website and landing page styles. These are sample designs; we tailor your website to your brand, preferred style, and requirements.", href: "/website-design-gallery" },
  { question: "Can I choose a website template?", answer: "Yes, you can use our Website Design Gallery to choose a starting direction. These are inspiration samples rather than fixed templates. Share the examples you like and we will scope a custom design.", href: "/website-design-gallery" },
  { question: "Can I see automotive website designs?", answer: "Yes. Choose Automotive in our Website Design Gallery, or explore the carousel on our Automotive industry page. We can tailor inventory, service booking, and enquiry journeys to your business.", href: "/website-design-gallery#design-collections" },

  ...launchFaqs,
  { question: "Where can I review Orbilect SEO services?", answer: "Visit our Reviews page for available public review links or to send honest feedback privately. That page is for feedback about our work.", href: "/reviews#review-platforms" },
  { question: "What is online reputation management?", answer: "Online reputation management means keeping public business details accurate, responding to genuine reviews, and using recurring feedback to improve the customer experience.", href: "/reviews" },
  { question: "How do I rate a human agent in this chat?", answer: "After a human agent closes your support conversation, you can leave a private star rating and a short review in this chat. To review the company’s services, use the Reviews page.", href: "/reviews" },
  ...staffingSupportFaqs,
  ...ecommerceOperationsFaqs,
  ...serviceFaqs.map(entry => ({ ...entry, answer: companyAnswers[entry.question] ?? entry.answer })),
  ...getPublishedGuides().flatMap(({ post, expansion }) =>
    expansion.questions.map(([question, answer]) => ({ question, answer, href: "/blogs/" + post.slug + "#common-questions" }))),
];

const ignored = new Set("a an am are and at be but by can could do does for from get how i in is it just me my of on or our please seo's should tell that the them this to use was we what when where which who will with would you your".split(" "));
const normalized = (text: string) => text.toLowerCase().normalize("NFKC").replace(/[’']/g, "").match(/[a-z0-9]+/g)?.join(" ") ?? "";
const tokens = (value: string) => [...new Set(normalized(value).split(" ").filter(token => token && !ignored.has(token)))];

const indexed = entries.map(entry => ({ ...entry, phrase: normalized(entry.question), keys: tokens(entry.question) }));
const exact = new Map(indexed.slice().reverse().map(entry => [entry.phrase, entry]));

function asReply(entry: Entry): Reply {
  if ("match" in entry && typeof entry.match === "string") return policyPassage(entry.href, entry.match);
  if (!("answer" in entry)) return policyPassage(entry.href);
  const whatsApp = entry.question.includes("WhatsApp")
    ? [pakistanWhatsApp, internationalWhatsApp].find(number => entry.answer.includes(number.display))
    : undefined;
  const actions = whatsApp
    ? [{ text: "Open WhatsApp", href: whatsApp.href }]
    : [{ text: "Read more", href: entry.href }];
  return { text: entry.answer, actions };
}

export function findPublicAnswer(question: string, exactOnly = false): Reply | undefined {
  const match = exact.get(normalized(question));
  if (match) return asReply(match);
  if (exactOnly) return;
  const words = tokens(question);
  if (words.length < 3) return;
  const ranked = indexed.flatMap(entry => {
    const overlap = entry.keys.filter(key => words.includes(key)).length;
    const score = 2 * overlap / (words.length + entry.keys.length);
    return overlap >= 3 && score >= .72 ? [{ entry, score }] : [];
  }).sort((a, b) => b.score - a.score);
  const [first, second] = ranked;
  if (first && (!second || first.score - second.score > .06 || first.entry.href === second.entry.href)) {
    return asReply(first.entry);
  }
}

const pages = publicPages.map(page => ({
  ...page,
  titleTokens: tokens(page.title),
}));

export function suggestPublicPage(question: string): Reply | undefined {
  const words = tokens(question);
  if (words.length < 2) return;
  const matches = pages.flatMap(page => {
    const matched = page.titleTokens.filter(word => words.includes(word)).length;
    const coverage = matched / page.titleTokens.length;
    const score = 2 * matched / (words.length + page.titleTokens.length);
    return matched >= 2 && coverage >= .66 && score >= .52 ? [{ page, score }] : [];
  }).sort((a, b) => b.score - a.score);
  const [best, next] = matches;
  if (!best || (next && best.score - next.score < .09)) return;
  return { text: best.page.description, actions: [{ text: best.page.title, href: best.page.path }] };
}
