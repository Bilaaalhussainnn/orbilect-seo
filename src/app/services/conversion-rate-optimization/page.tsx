import { HowWeWork } from "../../_home/growth";
import { CroShowcase } from "../_showcase/service-details";
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
  "title": "Conversion Rate Optimization | Orbilect SEO",
  "description": "Conversion Rate Optimization for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "Mobile visitors start checkout but leave",
    "title": "Mobile visitors start checkout but leave",
    "copy": "Start with funnel review and confirm the audience, access, and deliverables. Example: Mobile visitors start checkout but leave.",
    "items": [
      "Eligible visits"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/conversion-rate-optimization",
    "title": "Mobile usability",
    "copy": "Work through hypothesis and prioritization and mobile usability. Verify the work against the agreed brief before release.",
    "items": [
      "Actions started"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/conversion-rate-optimization",
    "title": "Complete checkout without friction",
    "copy": "Review actions completed and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Actions completed"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Identify the highest-value bottleneck","copy":"Start with funnel review and confirm the audience, access, and deliverables. Example: Mobile visitors start checkout but leave."}), icon: Search },
  { ...({"timing":"During implementation","title":"Design and verify a focused change","copy":"Work through hypothesis and prioritization and mobile usability. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Evaluate completed actions and lead quality","copy":"Review actions completed and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Funnel review","copy":"Mobile visitors start checkout but leave. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Hypothesis and prioritization","copy":"Landing pages · checkout · forms. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Mobile usability","copy":"Complete checkout without friction. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Form or checkout improvements","copy":"Mobile visitors start checkout but leave. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"Experiment setup","copy":"Complete checkout without friction. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/conversion-rate-optimization")} />
      <ServiceHero
        eyebrow={"Conversion Rate Optimization"}
        title={"Turn more existing visits into completed actions"}
        accent={"with a plan you can measure"}
        intro={"Conversion Rate Optimization for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"Conversion Rate Optimization"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Conversion Rate Optimization for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with mobile visitors start checkout but leave. We plan the work around a concrete next step: Complete checkout without friction."}</p>
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
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"Conversion Rate Optimization"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Platforms and tools"><li>{"Landing pages · checkout · forms"}</li></ul>
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
      <CroShowcase />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/conversion-rate-optimization"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/conversion-rate-optimization", seoBaseMetadata as import("next").Metadata);
