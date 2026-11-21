import listedIndustries from "../_home/industry-growth/industries.json";
import IndustryDesignShowcase from "./industry-design-showcase";
import { IndustryPricingBeforeFaq } from "./industry-pricing-before-faq";
import { InvestmentBeforeFaq } from "../_components/investment-before-faq";
import type { Metadata } from "next";
import Link from "next/link";
import LeadPanel from "@/components/lead-panel";
import SeoTimeline, { type SeoTimelineContent } from "../about/seo-timeline";
import { HomeFaq } from "../_home/editorial";
import FinalCta from "../_home/final-cta";
import AutomotiveGrowth, { type IndustryGrowthCopy } from "./automotive/automotive-growth";
import IndustryTemplateHero from "./industry-template-hero";
import { briefs, type IndustrySlug } from "./industry-briefs";
import styles from "./automotive/automotive.module.css";
import template from "./industry-template.module.css";

type Brief = (typeof briefs)[IndustrySlug];

export function industryMetadata(slug: IndustrySlug): Metadata {
  const info = briefs[slug];
  return {
    title: info.name + " SEO Services",
    description: "Improve search visibility for " + info.businesses + " with technical SEO, useful content, and clearer conversion paths.",
  };
}

function growthCopy(info: Brief): IndustryGrowthCopy {
  const [first, second, third] = info.offers;
  const [q1, q2, q3] = info.searches;
  return {
    industry: info.name,
    businesses: info.businesses,
    overview: "Explore eight ways to help " + info.audience + " find the right page, compare options, and " + info.action + ".",
    reviewIntro: "Before choosing a provider, " + info.audience + " want to know what the experience is like. Keep your business details accurate and look for feedback you can act on.",
    redesign: "Build a fast mobile website that explains " + first.toLowerCase() + ", makes it easy to check " + info.friction + ", and gives visitors a clear way to " + info.action + " after hours.",
    services: [
      { name: "Local and regional SEO", search: q1, work: "Review " + info.local + " and align each page with the actual locations or markets you serve.", outcome: "Help customers reach the right location or team." },
      { name: "Dedicated offer pages", search: q2, work: "Build a page for " + second.toLowerCase() + " with a clear scope, useful answers, and a relevant next step.", outcome: "Give prospects a clear path to evaluate this offer." },
      { name: "Technical SEO", search: q3, work: "Review indexing, redirects, broken links, and mobile usability for " + third.toLowerCase() + " and related priority pages.", outcome: "Help visitors and search engines reach the pages that matter." },
      { name: "Reputation and profiles", search: q1, work: "Review how your business appears across relevant profiles and make " + info.proof + " easy to find on your site.", outcome: "Give prospects evidence to consider before getting in touch." },
      { name: "Guides and comparisons", search: q2, work: "Publish guides that explain " + info.friction + " and link them to the most useful offer page.", outcome: "Answer practical questions before someone reaches out." },
      { name: "Conversion improvements", search: q3, work: "Review navigation, mobile calls to action, and form friction for people ready to " + info.action + ".", outcome: "Make the next step clear on mobile and desktop." },
      { name: "Targeted paid search", search: q1, work: "Test a limited campaign around " + first.toLowerCase() + " when there’s a clear objective and an appropriate landing page.", outcome: "Support a priority offer while organic coverage develops." },
      { name: "Lead and conversion reporting", search: q2, work: "Compare priority-page visibility with tracked actions from visitors who " + info.action + ", where measurement is available.", outcome: "See which pages are producing useful demand." },
    ],
    platforms: [
      { name: "Google reviews", copy: "Review your Google presence for " + info.local + ". Accurate hours, links, and service details help customers reach the correct team.", action: "Check each eligible location and respond to feedback without sharing private customer details." },
      { name: "Yelp", copy: "Where customers use Yelp to compare local options, accurate profiles give them context about your services and coverage.", action: "Review categories, location details, and contact information for relevant listings." },
      { name: "Better Business Bureau", copy: "A BBB profile can give prospective U.S. customers another place to check business information and available complaint history.", action: "Check your listing details and address feedback through the appropriate channels." },
      { name: "Trustpilot", copy: "Company feedback can help your team spot repeated questions or friction around " + first.toLowerCase() + ".", action: "Use recurring feedback to improve the pages and processes customers rely on." },
      { name: "REVIEWS.io", copy: "Company and product feedback can help businesses understand how customers describe their experience.", action: "Choose a review workflow that suits your business and the information customers can share publicly." },
    ],
    chat: [
      { tab: "Answer questions", driver: "Can you tell me about " + first.toLowerCase() + "?", reply: "I can share the information on our website. What would you like to know before you get in touch?" },
      { tab: "Capture notes", driver: "I’m comparing options for " + second.toLowerCase() + ".", reply: "I can pass your question along. What would you like the team to know, and how should they contact you?" },
      { tab: "Book a meeting", driver: "Can I speak to someone this week?", reply: "I can check the connected calendar for an available time." },
    ],
  };
}

function timelineCopy(info: Brief): SeoTimelineContent {
  const [first, second, third] = info.offers.map(offer => offer.toLowerCase());
  return {
    heading: { start: "How long does", accent: info.name + " SEO take?" },
    intro: "We start with " + first + ", " + second + ", and " + third + ". Timing depends on the site, the market, and when updates go live.",
    steps: [
      { timing: "At kickoff", title: "Benchmark your priority pages", copy: "Review existing visibility for " + first + " and " + second + ", then agree which pages and customer actions matter most." },
      { timing: "After changes go live", title: "Check discovery and indexing", copy: "Monitor how Google and Bing discover updated pages, and check that internal links lead to the right " + third + " content." },
      { timing: "Over the following months", title: "Measure what the work delivers", copy: "Compare impressions, visits, and tracked actions from customers who " + info.action + ". Use those findings to prioritize the next improvements." },
    ],
    services: [
      { title: "Technical SEO and indexing", items: ["Check crawl access, redirects, and internal links for " + first + " pages."] },
      { title: "Page structure and mobile usability", items: ["Make " + second + " easy to find in navigation and review how visitors reach the next step."] },
      { title: "On-page content and guides", items: ["Create content that explains " + info.friction + " and links to the relevant offer."] },
      { title: "Industry publications and partnerships", items: ["Identify publications and partnerships that reach " + info.audience + "."] },
      { title: "Content distribution and selective ads", items: ["Share useful content around " + third + " and test paid promotion when timing and budget justify it."] },
      { title: "Visibility and conversion reporting", items: ["Track relevant searches and the actions visitors take where measurement is available."] },
    ],
  };
}

function faqItems(info: Brief) {
  const [first, second, third] = info.offers;
  return [
    { question: "What does " + info.name + " SEO cover?", answer: "We review technical SEO, your most important pages, and how " + info.audience + " move from search to a next step." },
    { question: "Can you help people find our " + first.toLowerCase() + " offering?", answer: "Yes. We map relevant searches to a dedicated page and make sure visitors can see " + info.proof + "." },
    { question: "Should " + second.toLowerCase() + " have its own page?", answer: "We start by reviewing whether customers search for it separately and whether you have enough useful information to justify a dedicated page." },
    { question: "How do you approach content for " + third.toLowerCase() + "?", answer: "We start with practical buyer questions, including " + info.friction + ", and link the answers to the most relevant page." },
    { question: "Can you improve visibility for " + info.local + "?", answer: "We review your existing pages, service coverage, and applicable profiles. We build location or market pages when they can provide distinct information." },
    { question: "What should visitors see before they " + info.action + "?", answer: "Make " + info.proof + " easy to find. We also check whether the next step works clearly on a phone." },
    { question: "Can paid search support our " + first.toLowerCase() + " campaign?", answer: "Yes, when you have a clear goal, a relevant page, and a budget you can measure. We use the results alongside organic search data." },
    { question: "How do you measure whether our " + info.name.toLowerCase() + " SEO is working?", answer: "We compare search visibility and visits with tracked actions such as enquiries, calls, orders, or bookings, depending on what your website can measure." },
    { question: "Can we keep our current website and marketing team?", answer: "Yes. We identify changes your team can make, changes that need developer access, and where a redesign could improve the experience." },
    { question: "What will the free " + info.name.toLowerCase() + " SEO audit review?", answer: "We start with " + first.toLowerCase() + ", " + second.toLowerCase() + ", and your target markets. We identify the issues and opportunities worth reviewing first." },
  ];
}

export function IndustryLinks({ current }: { current: IndustrySlug | "automotive" }) {
  const links = listedIndustries.map(({ slug, name }) => [slug, name]);
  return (
    <nav className={template.related} aria-labelledby="related-industry-title">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Industries</p>
        <h2 id="related-industry-title" data-orbilect-title="">Explore other <span>industries</span></h2>
        <ul>
          <li><Link href="/industries">All industries</Link></li>
          {links.filter(([slug]) => slug !== current).map(([slug, name]) => (
            <li key={slug}><Link href={"/industries/" + slug}>{name}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function IndustryPage({ slug }: { slug: IndustrySlug }) {
  const info = briefs[slug];
  const hasShowcase = listedIndustries.some(industry => industry.slug === slug);
  return (
    <main>
      <IndustryTemplateHero info={info} compact={hasShowcase} />

      <section className={styles.light} aria-labelledby="industry-intro">
        <div className={styles.wrap}>
          <p className={styles.eyebrow} data-site-eyebrow="">{info.name} search</p>
          <h2 id="industry-intro" data-orbilect-title="">Be there when <span>customers compare</span></h2>
          <p className={styles.lead}>
            In {info.name.toLowerCase()}, people research {info.friction} before they reach out.
            Organic search gives {info.audience} a path to those answers on pages you own.
            Those pages can keep attracting relevant visits between paid campaigns.
          </p>
          <div className={styles.columns}>
            {info.offers.map((offer, index) => (
              <article key={offer}><h3>{offer}</h3><p>Give people searching for “{info.searches[index]}” a page that explains the offer and makes the next step clear.</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.dark} aria-labelledby="industry-help">
        <div className={styles.wrap}>
          <p className={styles.eyebrow} data-site-eyebrow="">How Orbilect helps</p>
          <h2 id="industry-help" data-orbilect-title="">Build pages people <span>can find and use</span></h2>
          <div className={styles.columns}>
            <article><h3>Build assets you own</h3><p>Publish dedicated pages, guides, and comparisons for {info.offers.join(", ").toLowerCase()}.</p></article>
            <article><h3>Make the next step clear</h3><p>Put {info.proof} where visitors can find it before they {info.action}.</p></article>
            <article><h3>Use ads where timing matters</h3><p>Support a priority offer with a targeted campaign while your organic pages build visibility.</p></article>
          </div>
          <div className={styles.actions}><LeadPanel source="industry-detail-audit" /></div>
        </div>
      </section>

      <SeoTimeline content={timelineCopy(info)} />
      <AutomotiveGrowth content={growthCopy(info)} />
      <IndustryLinks current={slug} />
      <IndustryPricingBeforeFaq routes={["/industries/ecommerce","/industries/education","/industries/finance","/industries/healthcare","/industries/home-services","/industries/hospitality","/industries/logistics","/industries/manufacturing","/industries/professional-services","/industries/real-estate","/industries/saas"]} />
      <InvestmentBeforeFaq routes={["/industries/ecommerce","/industries/education","/industries/finance","/industries/healthcare","/industries/home-services","/industries/hospitality","/industries/logistics","/industries/manufacturing","/industries/professional-services","/industries/real-estate","/industries/saas"]} />
      {hasShowcase && <IndustryDesignShowcase slug={slug} />}
      <HomeFaq hideSectionLabel={hasShowcase} items={faqItems(info)} introTitle={"What " + info.businesses + " ask us"}
        introCopy={"Get answers about " + info.offers.join(", ").toLowerCase() + " and what we review in a free audit."} />
      <FinalCta />
    </main>
  );
}
