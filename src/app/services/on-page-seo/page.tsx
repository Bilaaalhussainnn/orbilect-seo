import { HowWeWork } from "../../_home/growth";
import { serviceSchema } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo } from "@/lib/orbilect-search";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { OnPageProgression } from "./on-page-progression";
import { OnPageFaq } from "./on-page-faq";
import FinalCta from "../../_home/final-cta";
import { Suspense as ReputationSuspense } from "react";
import { ServicesReputation as OnPageReputation } from "../_components/seo-support";
import { OnPageSubservices } from "./on-page-subservices";
import { InternalLinkingHelp, OnPageStructure } from "../_components/seo-support";
import supportStyles from "../_components/seo-support.module.css";
import type { Metadata } from "next";
import { FileText, Gauge, Globe, Link2, ListTree, Plus, Search } from "lucide-react";
import SeoTimelineEngines from "../../about/seo-timeline-engines";
import { OrganicJourney, ServiceHero, type ServiceScene } from "../_components/service-story";
import styles from "../_components/service-story.module.css";

const seoBaseMetadata: Metadata = {
  title: "On-page SEO Services | Orbilect SEO",
  description: "Match your most important pages to customer searches with on-page SEO for page content, search titles, internal links, and organic traffic.",
};

const scenes: ServiceScene[] = [
  {
    id: "search",
    label: "Search result",
    address: "emergency plumber austin",
    title: "Emergency Plumbing in Austin",
    copy: "Illustrative search result for a local service page.",
    items: ["Search intent", "Page title"],
  },
  {
    id: "page",
    label: "Page content",
    address: "example.com/emergency-plumbing",
    title: "Emergency plumbing when a pipe bursts",
    copy: "Confirm coverage, explain what to do next, and make it easy to call.",
    items: ["Areas served", "Call for help"],
  },
  {
    id: "links",
    label: "Internal links",
    address: "example.com/services",
    title: "Give related pages a clear path",
    copy: "Link to emergency plumbing from the services directory and relevant repair guides.",
    items: ["Plumbing services", "Burst pipe guide"],
  },
];

const phases = [
  {
    icon: Search,
    timing: "Before we edit",
    title: "Audit and prioritize",
    copy: "We review the pages already appearing in search, compare them with what customers are looking for, and prioritize the gaps that affect enquiries or sales.",
  },
  {
    icon: Globe,
    timing: "After publication",
    title: "Publish and check discovery",
    copy: "We update the priority pages and their internal links, then check crawl and index status as Google and Bing revisit them.",
  },
  {
    icon: Gauge,
    timing: "As search data comes in",
    title: "Measure and refine",
    copy: "We compare query and page impressions, clicks, and tracked enquiries. Those results guide the next set of edits. Timing varies by site and competition.",
  },
];

const features = [
  {
    icon: Search,
    title: "Search intent and page mapping",
    copy: "Give each priority search a clear destination. A pricing comparison belongs on a different page from an urgent service enquiry.",
  },
  {
    icon: FileText,
    title: "Page titles and search descriptions",
    copy: "Write a distinct title and description for each priority page. Search engines can generate the displayed title and snippet from other page content.",
  },
  {
    icon: ListTree,
    title: "Headings and content that answer real questions",
    copy: "Put the information customers need early. Organize details such as pricing factors, availability, coverage, and next steps under headings they can scan.",
  },
  {
    icon: Link2,
    title: "Internal links and related pages",
    copy: "Link from relevant service hubs and guides to the pages customers need next. Use link text that makes the destination clear.",
  },
  {
    icon: Gauge,
    title: "Mobile usability and measurement",
    copy: "Check how priority pages read on smaller screens, make calls and forms easy to reach, and track the actions that matter where measurement is available.",
  },
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/on-page-seo")} />
      <ServiceHero
        eyebrow="On-page SEO"
        title="Give customers a reason"
        accent="to choose your page"
        intro="Show up with a page that answers what customers searched for, explains what you offer, and makes it easy to take the next step."
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">What is <span>on-page SEO?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>On-page SEO improves individual pages so search engines can understand what they cover and visitors can find the information they came for. It includes page titles, headings, copy, images, and links between relevant pages.</p>
            <p>For a service business, that can mean turning a generic services page into focused pages for specific jobs. For an online store, it can mean giving a product category a clearer name, useful buying information, and a path to the right products.</p>
          </div>
        </div>
      </section>

      <OnPageStructure />
      <InternalLinkingHelp />

      <OrganicJourney />

      <section className={`${styles.dark} ${styles.process}`} aria-labelledby="service-process-title">
        <div className={styles.wrap}>
          <header className={styles.processHeader}>
            <div>
              <p className={styles.eyebrow} data-site-eyebrow="">The SEO timeline</p>
              <h2 id="service-process-title">How we improve <span className={styles.highlight}>your priority pages</span></h2>
              <p className={styles.lead}>We start with the pages your customers need most, publish targeted improvements, and use search data to see what changed.</p>
            </div>
            <SeoTimelineEngines className={styles.engines} size={22} />
          </header>

          <ol className={styles.phases} role="list">
            {phases.map(({ icon: Icon, timing, title, copy }) => (
              <li key={title}>
                <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                <p className={styles.timing}>{timing}</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>

          <div className={styles.scope}>
            <h2 data-site-heading="">What Orbilect SEO <span className={styles.highlight}>audits and improves</span></h2>
            <div>
              {features.map(({ icon: Icon, title, copy }) => (
                <details key={title}>
                  <summary>
                    <Icon size={20} aria-hidden="true" />
                    <span>{title}</span>
                    <Plus className={styles.toggle} size={19} aria-hidden="true" />
                  </summary>
                  <p>{copy}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <OnPageSubservices />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/on-page-seo"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/on-page-seo", seoBaseMetadata as import("next").Metadata);
