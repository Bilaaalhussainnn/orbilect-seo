import {
  ArrowUpRight, Code2, FileText, Gauge, Globe, LayoutGrid, Link2, Plus, Search,
} from "lucide-react";
import SeoTimelineEngines from "./seo-timeline-engines";
import styles from "./seo-timeline.module.css";

const timeline = [
  {
    icon: Search,
    timing: "At the start",
    title: "Audit and prioritize",
    copy: "We benchmark search visibility and identify the fixes that matter most to your service, product, and location pages.",
  },
  {
    icon: Globe,
    timing: "Days to weeks after changes",
    title: "Monitor recrawling",
    copy: "Google may take days to weeks to revisit updated URLs. We check crawl and index status and use Bing’s submission tools where appropriate.",
  },
  {
    icon: Gauge,
    timing: "Weeks to several months",
    title: "Measure search impact",
    copy: "We compare impressions, clicks, and tracked leads or sales over time. The pace depends on your site, competition, and when changes go live.",
  },
];

const services = [
  {
    icon: Code2,
    title: "Technical SEO and indexing",
    items: [
      "Fix broken internal links, 404 errors, and redirect chains. Map moved URLs to relevant destinations.",
      "Review robots.txt for crawl access, noindex directives for index eligibility, and canonical tags for duplicate URLs.",
      "Clean up XML sitemaps and validate relevant Schema.org markup for products, businesses, and breadcrumbs.",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Website design and page structure",
    items: [
      "Improve navigation, page hierarchy, URLs, headings, and internal links so key pages are easier to find.",
      "Review mobile layouts, page speed, and Core Web Vitals. Optimize images and address heavy scripts or layout shifts.",
      "Make service, product, and location pages easier to read and give visitors a clear next step.",
    ],
  },
  {
    icon: FileText,
    title: "On-page content and blogs",
    items: [
      "Match pages to search intent and refine titles, descriptions, headings, and image alt text.",
      "Publish blogs that answer questions customers ask before buying, such as cost, comparisons, and how to choose a provider.",
      "Link useful articles to relevant service or product pages and refresh outdated content.",
    ],
  },
  {
    icon: Link2,
    title: "Guest posts and digital PR",
    items: [
      "Review existing backlinks and identify relevant publications, industry directories, and partners.",
      "Pitch original guest articles, expert commentary, or useful resources to publications your customers read.",
      "Measure referral visits and relevant coverage. Disclose sponsored placements and qualify paid links.",
    ],
  },
  {
    icon: ArrowUpRight,
    title: "Social media and content distribution",
    items: [
      "Turn guides and reports into posts that help people discover the original content.",
      "Share useful posts where your customers already spend time and track visits from each campaign.",
      "Use audience questions and feedback to identify topics for future pages, guides, and updates.",
    ],
  },
  {
    icon: Gauge,
    title: "Local SEO and reporting",
    items: [
      "Review Google Business Profile, Bing Places, location pages, and business details across relevant listings.",
      "Monitor indexing, impressions, and clicks in Google Search Console and Bing Webmaster Tools.",
      "Track calls, enquiries, or sales where measurement is available and use the findings to prioritize the next round of work.",
    ],
  },
];

export type SeoTimelineContent = {
  heading: { start: string; accent: string };
  intro: string;
  steps: Array<{ timing: string; title: string; copy: string }>;
  services: Array<{ title: string; items: string[] }>;
};

export default function SeoTimeline({ content }: { content?: SeoTimelineContent } = {}) {
  const steps = content
    ? content.steps.map((step, index) => ({ ...step, icon: timeline[index]?.icon ?? Search }))
    : timeline;
  const scope = content
    ? content.services.map((service, index) => ({ ...service, icon: services[index]?.icon ?? Search }))
    : services;
  return (
    <section className={styles.section} aria-labelledby="seo-timeline-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p data-site-eyebrow="" data-reveal="off">{"The SEO timeline"}</p>
            <h2 data-site-heading="" id="seo-timeline-title" data-orbilect-title="">{content?.heading.start ?? "How long does"} <span>{content?.heading.accent ?? "SEO take?"}</span></h2>
            <p>
              {content?.intro ?? "We optimize your website. Google and Bing then discover, crawl, and evaluate the pages you publish or update."}
            </p>
          </div>

          <SeoTimelineEngines className={styles.engines} />
        </header>

        <ol className={styles.timeline} role="list">
          {steps.map(({ icon: Icon, timing, title, copy }) => (
            <li key={title}>
              <Icon size={25} strokeWidth={1.65} aria-hidden="true" />
              <p className={styles.timing}>{timing}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>

        <div className={styles.scope}>
          <h3>What Orbilect SEO <span>audits and improves</span></h3>
          <div className={styles.services}>
            {scope.map(({ icon: Icon, title, items }) => (
              <details key={title}>
                <summary>
                  <Icon className={styles.serviceIcon} size={22} aria-hidden="true" />
                  <span>{title}</span>
                  <Plus className={styles.toggle} size={19} aria-hidden="true" />
                </summary>
                <ul>
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
