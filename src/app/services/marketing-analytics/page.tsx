import { HowWeWork } from "../../_home/growth";
import { AnalyticsShowcases } from "../_showcase/service-details";
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
import { ServiceHero, type ServiceScene } from "../_components/service-story";
import { OrganicJourney } from "./service-journey";
import styles from "../_components/service-story.module.css";

const seoBaseMetadata: Metadata = {
  "title": "Conversion Tracking and Analytics | Orbilect SEO",
  "description": "Conversion Tracking and Analytics for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "A submitted form is missing from campaign reports",
    "title": "A submitted form is missing from campaign reports",
    "copy": "Start with measurement plan and confirm the audience, access, and deliverables. Example: A submitted form is missing from campaign reports.",
    "items": [
      "Test scenarios"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/marketing-analytics",
    "title": "Event implementation",
    "copy": "Work through consent and tag review and event implementation. Verify the work against the agreed brief before release.",
    "items": [
      "Events verified"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/marketing-analytics",
    "title": "Verify the event and its source",
    "copy": "Review conversions reconciled and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Conversions reconciled"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Define conversions and audit data gaps","copy":"Start with measurement plan and confirm the audience, access, and deliverables. Example: A submitted form is missing from campaign reports."}), icon: Search },
  { ...({"timing":"During implementation","title":"Implement and test the agreed events","copy":"Work through consent and tag review and event implementation. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Reconcile reports with business outcomes","copy":"Review conversions reconciled and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Measurement plan","copy":"A submitted form is missing from campaign reports. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Consent and tag review","copy":"Analytics · ad platforms · CRM events. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Event implementation","copy":"Verify the event and its source. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Cross-channel attribution checks","copy":"A submitted form is missing from campaign reports. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"CRM reconciliation","copy":"Verify the event and its source. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/marketing-analytics")} />
      <ServiceHero
        eyebrow={"Conversion Tracking and Analytics"}
        title={"Know which campaigns produce real enquiries"}
        accent={"with a plan you can measure"}
        intro={"Conversion Tracking and Analytics for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"Conversion Tracking and Analytics"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Conversion Tracking and Analytics for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with a submitted form is missing from campaign reports. We plan the work around a concrete next step: Verify the event and its source."}</p>
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
              <p className={styles.eyebrow} data-site-eyebrow="">The delivery timeline</p>
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"Conversion Tracking and Analytics"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Platforms and tools"><li>{"Analytics · ad platforms · CRM events"}</li></ul>
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
      <AnalyticsShowcases />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/marketing-analytics"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/marketing-analytics", seoBaseMetadata as import("next").Metadata);
