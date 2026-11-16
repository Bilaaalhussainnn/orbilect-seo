import { ContentGrowthShowcase } from "../_showcase/content-services";
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
import { ServiceHero, type ServiceScene } from "../_components/service-story";
import { OrganicJourney } from "./service-journey";
import styles from "../_components/service-story.module.css";

const seoBaseMetadata: Metadata = {
  "title": "SEO Content Writing | Orbilect SEO",
  "description": "SEO Content Writing for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "What is included in monthly IT support?",
    "title": "What is included in monthly IT support?",
    "copy": "Start with topic research and confirm the audience, access, and deliverables. Example: What is included in monthly IT support?.",
    "items": [
      "Topics scoped"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/seo-content-writing",
    "title": "Service-page writing",
    "copy": "Work through content briefs and service-page writing. Verify the work against the agreed brief before release.",
    "items": [
      "Drafts delivered"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/seo-content-writing",
    "title": "Read the comparison and request a quote",
    "copy": "Review pages published and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Pages published"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Research the audience and agree on the brief","copy":"Start with topic research and confirm the audience, access, and deliverables. Example: What is included in monthly IT support?."}), icon: Search },
  { ...({"timing":"During implementation","title":"Draft and review the priority pages","copy":"Work through content briefs and service-page writing. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Publish approved copy and assess reader actions","copy":"Review pages published and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Topic research","copy":"What is included in monthly IT support?. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Content briefs","copy":"Service pages · product copy · guides. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Service-page writing","copy":"Read the comparison and request a quote. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Product and category copy","copy":"What is included in monthly IT support?. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"Editing and fact checks","copy":"Read the comparison and request a quote. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/seo-content-writing")} />
      <ServiceHero
        eyebrow={"SEO Content Writing"}
        title={"Publish pages that answer buying questions"}
        accent={"with a plan you can measure"}
        intro={"SEO Content Writing for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"SEO Content Writing"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"SEO Content Writing for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with what is included in monthly it support?. We plan the work around a concrete next step: Read the comparison and request a quote."}</p>
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
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"SEO Content Writing"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Platforms and tools"><li>{"Service pages · product copy · guides"}</li></ul>
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
      <ContentGrowthShowcase />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/seo-content-writing"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/seo-content-writing", seoBaseMetadata as import("next").Metadata);
