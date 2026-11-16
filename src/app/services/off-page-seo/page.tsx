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
  "title": "Off-page SEO Services | Orbilect SEO",
  "description": "Earn relevant mentions, correct inconsistent listings, and give prospects trustworthy sources to check before they contact you."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Customer search",
    "address": "commercial roofing contractor reviews",
    "title": "commercial roofing contractor reviews",
    "copy": "A facilities manager finds a roofing company through a trade association directory.",
    "items": [
      "Search intent",
      "Discovery"
    ]
  },
  {
    "id": "page",
    "label": "Destination",
    "address": "example.com/off-page-seo",
    "title": "Industry association member profile",
    "copy": "They check service coverage, qualifications, and the experiences customers describe.",
    "items": [
      "Customer information",
      "Page experience"
    ]
  },
  {
    "id": "links",
    "label": "Next action",
    "address": "example.com/off-page-seo",
    "title": "Compare credentials and request a quote",
    "copy": "The association profile takes them to the commercial roofing page, where they can request a quote.",
    "items": [
      "Customer action",
      "Measurement"
    ]
  }
];

const phases = [
  { ...({"timing":"At the start","title":"Audit your footprint","copy":"Review links, business citations, coverage, and review themes. Verify which listings and pages need corrections first."}), icon: Search },
  { ...({"timing":"During implementation","title":"Correct and pitch","copy":"Update priority listings, reclaim links where possible, and pitch material that an industry publication has a reason to cite."}), icon: Globe },
  { ...({"timing":"After release","title":"Check what was earned","copy":"Verify live placements and look at referral traffic, enquiries, and relevant brand searches over time."}), icon: Gauge }
];

const features = [
  { ...({"title":"Backlink audit","copy":"Unclear which sites refer traffic. Review referring pages and how they relate to your business. Prioritized list of useful links and issues."}), icon: Search },
  { ...({"title":"Citation cleanup","copy":"Old contact details on directories. Correct priority listings using the current business details. Consistent phone, address, and destination URLs."}), icon: FileText },
  { ...({"title":"Link reclamation","copy":"A publication links to a retired URL. Find the correct replacement and request a link update where appropriate. Verified destination or a working redirect."}), icon: ListTree },
  { ...({"title":"Digital PR outreach","copy":"Useful expertise goes uncited. Turn original insight or a project into a pitch for relevant editors. Outreach log and earned placements where secured."}), icon: Link2 },
  { ...({"title":"Review and reputation support","copy":"The same complaint keeps appearing. Identify the operational issue and help the team respond and resolve it. A response process and a list of recurring fixes."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/off-page-seo")} />
      <ServiceHero
        eyebrow={"Off-page SEO"}
        title={"Build credibility"}
        accent={"beyond your website"}
        intro={"Earn relevant mentions, correct inconsistent listings, and give prospects trustworthy sources to check before they contact you."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">What is <span>Off-page SEO?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Off-page SEO improves what people can learn about your business beyond your own pages. We review where you’re listed, who mentions or links to you, and what customers repeatedly bring up in reviews. Then we prioritize the opportunities that make sense for your industry and audience."}</p>
            <p>{"A facilities manager finds a roofing company through a trade association directory."}</p>
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
              <p className={styles.lead}>{"Review links, business citations, coverage, and review themes. Verify which listings and pages need corrections first."}</p>
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
      <InvestmentBeforeFaq routes={["/services/off-page-seo"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/off-page-seo", seoBaseMetadata as import("next").Metadata);
