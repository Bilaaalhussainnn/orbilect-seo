import { readFileSync } from "node:fs";
import path from "node:path";
import type { Reply } from "./answers";

export const privacyPath = "/privacy-policy";
export const termsPath = "/terms-and-conditions";

type Section = { href: string; heading: string; passages: string[] };
type Page = { path: string; title: string; sections: Section[] };

const ignored = new Set("a about an and any are as at be by can could do does for from had has have how i in is it its me my of on or our that the them there these they this to us was we were what when where which who why will with would you your".split(" "));
const tokens = (text: string) => [...new Set(
  (text.toLowerCase().replace(/[’']/g, "").match(/[a-z0-9]+/g) ?? [])
    .filter(word => word.length > 1 && !ignored.has(word))
    .map(word => word.length > 4 ? word.replace(/ies$/, "y").replace(/s$/, "") : word),
)];

let pages: Page[] | undefined;
function publicContent() {
  if (pages) return pages;
  try {
    pages = JSON.parse(readFileSync(path.join(process.cwd(), "src/lib/naila/public-content.json"), "utf8")) as Page[];
    return pages;
  } catch {
    // Let the curated answers continue if the deployment has no generated index.
    return [];
  }
}

function sourceReply(text: string, href: string): Reply {
  const label = href.startsWith(privacyPath) ? "Read Privacy Policy"
    : href.startsWith(termsPath) ? "Read Terms and Conditions" : "Read the source page";
  return { text, actions: [{ text: label, href }] };
}

export function policyPassage(href: string, ...phrases: string[]): Reply {
  const page = publicContent().find(item => href === item.path || href.startsWith(item.path + "#"));
  const section = page?.sections.find(item => item.href === href);
  const passages = [...new Set(phrases.flatMap(phrase => {
    const passage = section?.passages.find(text => text.toLowerCase().includes(phrase));
    return passage ? [passage] : [];
  }))];
  return sourceReply(passages.join("\n\n") || "The published policy explains this. Please read the linked section or contact our team about your situation.", href);
}

export function findPolicyAnswer(question: string, previous: string): Reply | undefined {
  const followup = /\b(?:it|that|those|there|them|too|still)\b/.test(question) || tokens(question).length <= 4;
  const context = followup ? question + " " + previous : question;
  const ai = /\b(?:agentic ai|ai agents?|openai|chatgpt|third[- ]party api|api fees?|api usage)\b/;
  if (ai.test(context) && /\b(?:cost\w*|price|pricing|pay|fees?|charg\w*|bill\w*|quote|includ\w*|expensive|how much|separately|extra|markups?)\b/.test(question)) {
    return policyPassage(termsPath + "#agentic-ai-fees", "agentic ai development costs more", "provider’s usage, subscription and licensing charges");
  }
  if (/\b(?:card number|cvv|cvc|security code|last four digits|full card|card details|card pin)\b/.test(question)) {
    return policyPassage(termsPath + "#fees", "staff never ask");
  }
  if (/\b(?:refund|money back)\w*/.test(question) && /\b(?:staffing|offshor\w*|unused months|prepaid months)\b/.test(context)) {
    return policyPassage(termsPath + "#staffing-and-delivery", "we refund unused prepaid months");
  }
  if (/\b(?:when|how long|processing|how soon)\b/.test(question) && /\brefund\w*\b/.test(context) &&
    /\b(?:approv\w*|bank|statement|credit|process\w*|appear\w*)\b/.test(question)) {
    return policyPassage(termsPath + "#refunds", "we initiate approved refunds");
  }
  if (/\b(?:day 31|day 32|grace (?:day|period)|late fee|late fees)\b/.test(question)) {
    return policyPassage(termsPath + "#recurring-and-late-payments", "final grace day");
  }
  if (/\b(?:bug support|bug fix(?:es)?|12.month support|warranty)\b/.test(question)) {
    return policyPassage(termsPath + "#support", "we provide 12 months");
  }
  if (/\b(?:cookie|cookies)\b/.test(context)) {
    if (/\b(?:how long|180 days|expiry|expire|saved)\b/.test(question)) {
      const session = /\b(?:naila|chat|session)\b/.test(context);
      return session ? policyPassage(privacyPath + "#naila", "expires after up to 24 hours")
        : policyPassage(privacyPath + "#cookies", "for up to 180 days");
    }
    if (/\b(?:what is|what are|define)\b/.test(question)) {
      return policyPassage(privacyPath + "#cookies", "cookies are small text files");
    }
    if (/\b(?:how|change|turn off|disable|reject|analytics|marketing|optional|block)\b/.test(question)) {
      return policyPassage(privacyPath + "#cookies", "optional analytics and marketing start disabled", "use cookie settings");
    }
  }
  if (/\b(?:naila|chat|transcript)\b/.test(context)) {
    if (/\b(?:who|can|share\w*|consent|human)\b/.test(question) &&
      /\b(?:read|see|access|share\w*|view)\b/.test(question)) {
      return policyPassage(privacyPath + "#naila", "if you request live help");
    }
    if (/\btranscripts?\b/.test(question) && /\b(?:email|emails|download|copy)\b/.test(question)) {
      return policyPassage(privacyPath + "#naila", "if you ask us to email one");
    }
  }
  if (/\b(?:my|personal|your records|privacy)\b/.test(question) && /\b(?:data|information|privacy|records)\b/.test(question)) {
    if (/\b(?:delete|erasure|remove|request a copy|correct|rights)\b/.test(question)) {
      return policyPassage(privacyPath + "#rights", "depending on where you live", "with the request and the email address");
    }
    if (/\b(?:how long|retain\w*|kept|retention)\b/.test(question)) {
      return policyPassage(privacyPath + "#retention", "as long as reasonably needed");
    }
    if (/\b(?:collect\w*|gather\w*)\b/.test(question)) {
      return policyPassage(privacyPath + "#information", "when you request an audit or proposal", "hosting and security services");
    }
  }
  if (/\b(?:nda|confidentiality agreement|non.disclosure agreement)\b/.test(question) &&
    /\b(?:what|how|both|before|sign)\b/.test(question)) {
    return policyPassage(termsPath + "#agreement", "the nda covers confidentiality");
  }
}

type IndexedSection = Section & {
  title: Set<string>;
  headings: Set<string>;
  evidence: Array<{ text: string; words: Set<string> }>;
};

let index: IndexedSection[] | undefined;
function searchableSections() {
  if (index) return index;
  const content = publicContent();
  if (!content.length) return [];
  index = content.flatMap(page => {
    const title = new Set(tokens(page.title));
    return page.sections.map(section => ({
      ...section,
      title,
      headings: new Set(tokens(section.heading)),
      evidence: section.passages.filter(text => text.length >= 40 && text.length < 1600)
        .map(text => ({ text, words: new Set(tokens(text)) })),
    }));
  });
  return index;
}

export function findPublicPassage(question: string, policyPath?: typeof privacyPath | typeof termsPath): Reply | undefined {
  const query = tokens(question);
  if (query.length < 2) return;
  const overlap = (set: Set<string>) => query.filter(word => set.has(word)).length;

  let best: { section: IndexedSection; text: string; score: number } | undefined;
  let second: typeof best;
  for (const section of searchableSections()) {
    if (policyPath && section.href !== policyPath && !section.href.startsWith(policyPath + "#")) continue;
    const headingHits = overlap(section.headings);
    const titleHits = overlap(section.title);
    for (const { text, words } of section.evidence) {
      const hits = overlap(words);
      const matched = query.filter(word => words.has(word) || section.headings.has(word) || section.title.has(word)).length;
      if (hits < 2 || matched < Math.max(2, Math.ceil(query.length * .7))) continue;
      const score = (hits * 3 + headingHits * 2 + titleHits) / query.length + hits / Math.max(words.size, 8);
      if (!best || score > best.score) {
        if (best && best.section.href !== section.href) second = best;
        best = { section, text, score };
      } else if (best.section.href !== section.href && (!second || score > second.score)) {
        second = { section, text, score };
      }
    }
  }
  if (!best || (second && best.score - second.score < .13 && best.text !== second.text)) return;
  return sourceReply(best.text, best.section.href);
}
