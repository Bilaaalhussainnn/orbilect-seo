import { HowWeWork } from "../../_home/growth";
import { serviceSchema } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo } from "@/lib/orbilect-search";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { MarketingChannels } from "./marketing-channels";
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
  "title": "Digital Marketing Services | Orbilect SEO",
  "description": "Connect search, paid campaigns, landing pages, and reporting around the actions that grow your business."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Customer search",
    "address": "managed IT support for small business",
    "title": "managed IT support for small business",
    "copy": "A business owner searches for IT support. The ad or organic result speaks to the service they need.",
    "items": [
      "Search intent",
      "Discovery"
    ]
  },
  {
    "id": "page",
    "label": "Destination",
    "address": "example.com/digital-marketing",
    "title": "Managed IT campaign landing page",
    "copy": "The landing page explains coverage, service options, and what the first call involves.",
    "items": [
      "Customer information",
      "Page experience"
    ]
  },
  {
    "id": "links",
    "label": "Next action",
    "address": "example.com/digital-marketing",
    "title": "Submit a qualified consultation request",
    "copy": "A form or tracked call reaches the team. We review whether it matches the customer the campaign was built for.",
    "items": [
      "Customer action",
      "Measurement"
    ]
  }
];

const phases = [
  { ...({"timing":"At the start","title":"Set the objective","copy":"Agree on the offer, audience, lead criteria, budget, and the actions we’ll track."}), icon: Search },
  { ...({"timing":"During implementation","title":"Launch a focused test","copy":"Publish the first campaign and landing page, verify tracking, and review actual search terms and enquiries."}), icon: Globe },
  { ...({"timing":"After release","title":"Reallocate using evidence","copy":"Refine targeting and messaging based on costs and lead quality. Shift spend only when the data supports it."}), icon: Gauge }
];

const features = [
  { ...({"title":"Channel and offer strategy","copy":"Too many channels share one budget. Choose channels and messages around one clear business objective. A channel plan and success criteria."}), icon: Search },
  { ...({"title":"Paid search management","copy":"Clicks arrive for the wrong services. Review targeting, search terms, bids, and exclusions. A campaign structured around the enquiries you want."}), icon: FileText },
  { ...({"title":"Landing page optimization","copy":"Clicks rarely turn into enquiries. Align the page with the ad and test the call to action. A more direct path to the tracked action."}), icon: ListTree },
  { ...({"title":"Conversion tracking","copy":"Forms and calls are hard to attribute. Set up or verify the events agreed for reporting. A record of tested conversions and known gaps."}), icon: Link2 },
  { ...({"title":"Lead quality reporting","copy":"Cheap leads take time to qualify. Use sales feedback to separate qualified enquiries from form volume. Reporting you can use to decide what to scale."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/digital-marketing")} />
      <ServiceHero
        eyebrow={"Digital Marketing"}
        title={"Turn the right attention"}
        accent={"into measurable enquiries"}
        intro={"Connect search, paid campaigns, landing pages, and reporting around the actions that grow your business."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">What is <span>Digital Marketing?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Digital marketing works best when the offer, the channel, and the landing page agree. We start with the customer you want and the action you can measure. Then we choose channels, define the budget and tracking, and use the results to decide what to improve."}</p>
            <p>{"A business owner searches for IT support. The ad or organic result speaks to the service they need."}</p>
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
              <p className={styles.lead}>{"Agree on the offer, audience, lead criteria, budget, and the actions we’ll track."}</p>
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
      <MarketingChannels />

      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/digital-marketing"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/digital-marketing", seoBaseMetadata as import("next").Metadata);
