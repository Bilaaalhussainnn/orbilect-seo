import { HowWeWork } from "../../_home/growth";
import { DesignCarousel } from "../_showcase/design-carousel";
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
  "title": "Landing Page Optimization | Orbilect SEO",
  "description": "Landing Page Optimization for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "A visitor can’t confirm whether you serve their area",
    "title": "A visitor can’t confirm whether you serve their area",
    "copy": "Start with message match and confirm the audience, access, and deliverables. Example: A visitor can’t confirm whether you serve their area.",
    "items": [
      "Landing-page visits"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/landing-page-design",
    "title": "Offer and page copy",
    "copy": "Work through mobile layout and offer and page copy. Verify the work against the agreed brief before release.",
    "items": [
      "Form starts"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/landing-page-design",
    "title": "Complete a relevant enquiry form",
    "copy": "Review completed enquiries and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Completed enquiries"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Find where visitors get stuck","copy":"Start with message match and confirm the audience, access, and deliverables. Example: A visitor can’t confirm whether you serve their area."}), icon: Search },
  { ...({"timing":"During implementation","title":"Ship a clearer page and test the form","copy":"Work through mobile layout and offer and page copy. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Compare completion and enquiry quality","copy":"Review completed enquiries and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Message match","copy":"A visitor can’t confirm whether you serve their area. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Mobile layout","copy":"Paid landing pages · forms · analytics. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Offer and page copy","copy":"Complete a relevant enquiry form. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Form usability","copy":"A visitor can’t confirm whether you serve their area. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"Tracking checks","copy":"Complete a relevant enquiry form. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/landing-page-design")} />
      <ServiceHero
        eyebrow={"Landing Page Optimization"}
        title={"Make the page deliver on the campaign promise"}
        accent={"with a plan you can measure"}
        intro={"Landing Page Optimization for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"Landing Page Optimization"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Landing Page Optimization for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with a visitor can’t confirm whether you serve their area. We plan the work around a concrete next step: Complete a relevant enquiry form."}</p>
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
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"Landing Page Optimization"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Platforms and tools"><li>{"Paid landing pages · forms · analytics"}</li></ul>
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
      <DesignCarousel />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/landing-page-design"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/landing-page-design", seoBaseMetadata as import("next").Metadata);
