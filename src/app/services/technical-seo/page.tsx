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
import { InternalLinkingHelp, OnPageStructure } from "./service-structure";
import supportStyles from "../_components/seo-support.module.css";
import type { Metadata } from "next";
import { FileText, Gauge, Globe, Link2, ListTree, Plus, Search } from "lucide-react";
import SeoTimelineEngines from "../../about/seo-timeline-engines";
import { ServiceHero, type ServiceScene } from "../_components/service-story";
import { OrganicJourney } from "./service-journey";
import styles from "../_components/service-story.module.css";

const seoBaseMetadata: Metadata = {
  "title": "Technical SEO Services | Orbilect SEO",
  "description": "Find and fix crawl, indexing, redirect, and performance issues on the pages your business depends on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Customer search",
    "address": "replacement filter for model X",
    "title": "replacement filter for model X",
    "copy": "A shopper searches for a specific part. The product URL needs a clear path from the catalogue.",
    "items": [
      "Search intent",
      "Discovery"
    ]
  },
  {
    "id": "page",
    "label": "Destination",
    "address": "example.com/technical-seo",
    "title": "Product page with one preferred URL",
    "copy": "The destination loads, shows the right product, and works on mobile.",
    "items": [
      "Customer information",
      "Page experience"
    ]
  },
  {
    "id": "links",
    "label": "Next action",
    "address": "example.com/technical-seo",
    "title": "Reach the product page and check stock",
    "copy": "The shopper can check availability or add the product to their cart.",
    "items": [
      "Customer action",
      "Measurement"
    ]
  }
];

const phases = [
  { ...({"timing":"At the start","title":"Reproduce the issue","copy":"Sample important templates, review Search Console, and record broken paths and crawl or index anomalies."}), icon: Search },
  { ...({"timing":"During implementation","title":"Fix and verify","copy":"Work through the prioritized tickets. Check changes in staging where available, then verify the live URLs."}), icon: Globe },
  { ...({"timing":"After release","title":"Monitor after release","copy":"Check priority URLs and watch for recurring issues in indexing, performance, and critical site flows."}), icon: Gauge }
];

const features = [
  { ...({"title":"Crawl and index review","copy":"Important pages are missing from reports. Inspect representative URLs and trace internal paths and crawl controls. Verified status and a fix list by template."}), icon: Search },
  { ...({"title":"Sitemaps and Search Console","copy":"A sitemap contains retired or duplicate URLs. Review the listed URLs, prepare a clean sitemap, and inspect priorities. A cleaner sitemap and documented checks."}), icon: FileText },
  { ...({"title":"Redirect and canonical cleanup","copy":"Multiple routes reach the same destination. Map old URLs to the right destinations and review preferred URL signals. A tested redirect map and canonical recommendations."}), icon: ListTree },
  { ...({"title":"Performance and mobile checks","copy":"A template is slow or jumps on mobile. Trace heavy resources, unstable layout, and slow interactions. Prioritized performance fixes by template."}), icon: Link2 },
  { ...({"title":"Migration QA","copy":"A new build changes important URLs. Compare staging and live URL inventories and test critical flows. A launch checklist and post-launch validation."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/technical-seo")} />
      <ServiceHero
        eyebrow={"Technical SEO"}
        title={"Clear the roadblocks"}
        accent={"between search and your site"}
        intro={"Find and fix crawl, indexing, redirect, and performance issues on the pages your business depends on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">What is <span>Technical SEO?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Technical SEO examines how your site serves pages to visitors and search engines. We trace issues to their cause, such as a template generating duplicate URLs or a migration sending visitors to broken destinations. You get a fix list tied to the pages and customer journeys that matter."}</p>
            <p>{"A shopper searches for a specific part. The product URL needs a clear path from the catalogue."}</p>
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
              <p className={styles.lead}>{"Sample important templates, review Search Console, and record broken paths and crawl or index anomalies."}</p>
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
      <InvestmentBeforeFaq routes={["/services/technical-seo"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/technical-seo", seoBaseMetadata as import("next").Metadata);
