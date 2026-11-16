"use client";

import { useState } from "react";
import { Search as InspectIcon, Wrench as FixIcon, CircleCheck as VerifyIcon } from "lucide-react";

import {
  Copy, FileText, Gauge, Globe, Link2,
  MapPin, Network, Search, Smartphone, Tag,
} from "lucide-react";
import styles from "./ranking-challenges.module.css";

const challenges = [
  {
    icon: Globe,
    title: "Important pages aren’t indexed",
    issue: "A page can be live on your website and still be missing from search results.",
    solution: "We inspect priority URLs for indexing directives, canonical tags, redirects, and sitemap issues, then address what’s keeping eligible pages out of search.",
  },
  {
    icon: Search,
    title: "Pages target the wrong search intent",
    issue: "A sales page may miss the mark when people are looking for a comparison, a guide, or a nearby provider.",
    solution: "We review what people expect from each target search and match it to the right page type, from service pages to buying guides.",
  },
  {
    icon: FileText,
    title: "Content leaves key questions unanswered",
    issue: "Generic copy gives customers little reason to choose your page or trust your offer.",
    solution: "We add useful specifics such as product details, service scope, examples, and answers drawn from real customer questions.",
  },
  {
    icon: Tag,
    title: "Page titles are vague or repetitive",
    issue: "When titles and headings look the same across the site, visitors have a harder time telling pages apart.",
    solution: "We write distinct page titles, headings, and descriptions around the purpose of each priority page.",
  },
  {
    icon: Network,
    title: "Priority pages are buried",
    issue: "Key services and products can be hard to discover when few relevant pages link to them.",
    solution: "We improve navigation and add contextual internal links from related pages, categories, and guides.",
  },
  {
    icon: Gauge,
    title: "Pages are slow or unstable",
    issue: "Heavy images, scripts, and shifting layouts can make a page frustrating to use.",
    solution: "We identify the biggest performance bottlenecks and prioritize fixes such as image optimization, script reduction, and stable layouts.",
  },
  {
    icon: Smartphone,
    title: "The mobile experience is weak",
    issue: "Cramped layouts, missing content, and hard-to-use controls can get in the way on smaller screens.",
    solution: "We test priority pages on mobile and fix responsive layouts, navigation, and calls to action.",
  },
  {
    icon: Copy,
    title: "Similar URLs compete for the same search",
    issue: "Filters, product variants, or overlapping service pages can create several URLs with nearly the same purpose.",
    solution: "We map overlapping pages and decide where to differentiate them, consolidate content, or correct canonical and redirect signals.",
  },
  {
    icon: MapPin,
    title: "Local business information is inconsistent",
    issue: "Conflicting addresses, hours, or service areas make it harder for customers to know which location to contact.",
    solution: "We align your location pages, Google Business Profile, and key listings around accurate business details.",
  },
  {
    icon: Link2,
    title: "Few relevant sites reference your business",
    issue: "A business with little coverage outside its own website may have fewer ways to get discovered.",
    solution: "We identify relevant directories, publishers, and partners, then develop useful resources and outreach that can earn genuine references.",
  },
];

const images = [
  "indexing", "search-intent", "thin-content", "duplicate-titles",
  "buried-pages", "slow-pages", "mobile-layout", "competing-urls",
  "local-listings", "external-references",
] as const;

const issueFixes = {
  indexing: {
    accent: "aren’t indexed",
    services: "Technical SEO and indexation audit",
    timeframe: "1–3 business days for a small set of URLs once access is available.",
    steps: [
      "Inspect priority URLs in Search Console to see whether Google discovered, crawled, or indexed them.",
      "Correct unintended noindex tags, conflicting canonicals, or redirects. Update the sitemap where needed.",
      "Retest the corrected URLs, request indexing where appropriate, and monitor their status.",
    ],
  },
  "search-intent": {
    accent: "wrong search intent",
    services: "Keyword research, on-page SEO, and content strategy",
    timeframe: "3–7 business days for research and updates to a small group of pages.",
    steps: [
      "Review the results for each priority query to see whether searchers want a guide, comparison, product, or local service.",
      "Assign each query to the right page and rewrite the content around the questions that brought visitors there.",
      "Monitor query impressions and clicks to see whether the revised pages are reaching the intended audience.",
    ],
  },
  "thin-content": {
    accent: "unanswered",
    services: "SEO content writing and on-page SEO",
    timeframe: "3–7 business days for a small batch after source material and feedback are available.",
    steps: [
      "Identify missing details by reviewing customer questions, support enquiries, and the current page.",
      "Add specifics people can use to make a decision, such as scope, product details, examples, and common objections.",
      "Check accuracy with your team and link the updated content to relevant service or product pages.",
    ],
  },
  "duplicate-titles": {
    accent: "vague or repetitive",
    services: "On-page SEO and metadata optimization",
    timeframe: "1–3 business days for a small batch of pages.",
    steps: [
      "Crawl the website and group missing, vague, and duplicate titles by page type.",
      "Write distinct titles and headings that reflect each page’s purpose and match how customers describe the offer.",
      "Recrawl the updated URLs to verify the changes are live and check whether templates are still creating duplicates.",
    ],
  },
  "buried-pages": {
    accent: "are buried",
    services: "Internal linking and website architecture",
    timeframe: "2–5 business days for targeted navigation and link updates.",
    steps: [
      "Map how visitors and crawlers reach priority service, category, and product pages.",
      "Add links from relevant hubs and supporting content. Simplify navigation where it takes too many steps to reach a key page.",
      "Recrawl the site and confirm that priority pages can be reached through the intended paths.",
    ],
  },
  "slow-pages": {
    accent: "slow or unstable",
    services: "Technical SEO and performance optimization",
    timeframe: "3–10 business days for common front-end fixes. Larger platform work needs a separate estimate.",
    steps: [
      "Profile key page templates to identify heavy images, blocking scripts, or elements that shift during loading.",
      "Optimize images, defer scripts where possible, and reserve space for content that loads later.",
      "Retest the affected templates on mobile and desktop, including slower connections.",
    ],
  },
  "mobile-layout": {
    accent: "is weak",
    services: "Mobile UX, technical SEO, and website redesign",
    timeframe: "3–7 business days for targeted fixes across a few templates.",
    steps: [
      "Test navigation, product pages, and forms on common screen sizes to locate clipped content and awkward controls.",
      "Fix layout breakpoints, improve tap targets, and bring essential content and calls to action into view.",
      "Retest the complete journey on phones and tablets, including the enquiry or checkout flow.",
    ],
  },
  "competing-urls": {
    accent: "the same search",
    services: "Technical SEO, canonicalization, and content consolidation",
    timeframe: "3–7 business days for a limited group of overlapping URLs.",
    steps: [
      "Compare similar URLs to determine which serve distinct customer needs and which repeat the same content.",
      "Differentiate useful pages and consolidate redundant ones. Apply redirects or canonical tags where appropriate.",
      "Align internal links and the sitemap with the preferred URLs, then verify the changes after deployment.",
    ],
  },
  "local-listings": {
    accent: "is inconsistent",
    services: "Local SEO, Google Business Profile, and listing updates",
    timeframe: "2–5 business days to audit and submit corrections. Directory approval times vary.",
    steps: [
      "Compare the name, address, phone number, hours, and service areas on your website and key listings.",
      "Correct discrepancies in Google Business Profile, location pages, and relevant directories.",
      "Track pending edits and verify the published information once each platform applies the update.",
    ],
  },
  "external-references": {
    accent: "reference your business",
    services: "Off-page SEO, digital PR, and outreach",
    timeframe: "1–2 weeks to research prospects and prepare outreach. Earned coverage has no fixed timeline.",
    steps: [
      "Audit existing mentions and identify relevant publishers, directories, and partners your customers already use.",
      "Create something worth referencing, such as an original resource, expert contribution, or useful industry guide.",
      "Run targeted outreach and track relevant mentions, referrals, and responses as they come in.",
    ],
  },
} satisfies Record<(typeof images)[number], {
  accent: string;
  services: string;
  timeframe: string;
  steps: [string, string, string];
}>;

const stepIcons = [InspectIcon, FixIcon, VerifyIcon];

export default function RankingChallenges() {
  const [selected, setSelected] = useState(0);
  const { icon: Icon, title, issue, solution } = challenges[selected];
  const image = images[selected];
  const fix = issueFixes[image];
  const accentStart = title.toLowerCase().lastIndexOf(fix.accent.toLowerCase());
  const splitAt = accentStart >= 0 ? accentStart : title.lastIndexOf(" ") + 1;

  return (
    <section className={styles.section} aria-labelledby="ranking-challenges-heading">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className="orbilect-section-label">{"SEO Challenges"}</div>
          <p data-site-eyebrow="" data-reveal="off">{"Search visibility"}</p>
          <h2 data-site-heading="" id="ranking-challenges-heading" data-orbilect-title="">Why websites struggle <span>to rank</span></h2>
          <p>Choose an issue to see what’s going wrong and how Orbilect SEO would fix it.</p>
        </div>

        <div className={styles.layout} data-reveal="off">
          <div>
            <div className={styles.menu} role="group" aria-label="Ranking issues">
              {challenges.map(({ icon: MenuIcon, title: label }, index) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={selected === index}
                  aria-controls="ranking-issue-preview"
                  onClick={() => setSelected(index)}
                >
                  <MenuIcon size={18} aria-hidden="true" />
                  <span>{label}</span>
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </button>
              ))}
            </div>

            <label className={styles.picker}>
              Choose a ranking issue
              <select value={selected} onChange={(event) => setSelected(Number(event.target.value))}>
                {challenges.map(({ title: label }, index) => (
                  <option key={label} value={index}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          <div id="ranking-issue-preview" className={styles.preview} aria-live="polite">
            <div key={image} className={styles.reveal}>
              <div className={styles.visual} aria-hidden="true">
                <Icon size={56} strokeWidth={1} />
                <div
                  className={styles.art}
                  style={{ backgroundImage: "url(/about/ranking-issues/" + image + ".png)" }}
                />
                <span className={styles.before}>Before</span>
              </div>
              <div className={styles.readout}>
                <h3 className={styles.issueTitle}>
                  {title.slice(0, splitAt)}
                  <span>{title.slice(splitAt)}</span>
                </h3>
                <p>{issue}</p>
                <div className={styles.solution}>
                  <h4>Orbilect SEO’s solution</h4>
                  <p>{solution}</p>

                  <ul className={styles.fixSteps} role="list">
                    {fix.steps.map((step, index) => {
                      const StepIcon = stepIcons[index];
                      return (
                        <li key={step}>
                          <StepIcon size={17} aria-hidden="true" />
                          <span>{step}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className={styles.fixDetails}>
                    <details>
                      <summary>Services required</summary>
                      <p>{fix.services}</p>
                    </details>
                    <details>
                      <summary>Estimated fix time</summary>
                      <p>{fix.timeframe}</p>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
