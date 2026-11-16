import { WriterStaffingShowcase } from "../_showcase/content-services";
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
  "title": "Hire an SEO Content Writer | Orbilect SEO",
  "description": "Hire an SEO Content Writer for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "A brief for a product comparison guide",
    "title": "A brief for a product comparison guide",
    "copy": "Start with writer onboarding and confirm the audience, access, and deliverables. Example: A brief for a product comparison guide.",
    "items": [
      "Briefs approved"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/hire-seo-content-writer",
    "title": "Subject-matter research",
    "copy": "Work through editorial briefs and subject-matter research. Verify the work against the agreed brief before release.",
    "items": [
      "Drafts delivered"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/hire-seo-content-writer",
    "title": "Approve and publish the finished draft",
    "copy": "Review pieces published and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Pieces published"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Agree on voice, scope, and review ownership","copy":"Start with writer onboarding and confirm the audience, access, and deliverables. Example: A brief for a product comparison guide."}), icon: Search },
  { ...({"timing":"During implementation","title":"Deliver a pilot draft and incorporate feedback","copy":"Work through editorial briefs and subject-matter research. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Build a consistent writing and handoff cadence","copy":"Review pieces published and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Writer onboarding","copy":"A brief for a product comparison guide. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Editorial briefs","copy":"Editorial briefs · CMS · stakeholder reviews. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Subject-matter research","copy":"Approve and publish the finished draft. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Drafting","copy":"A brief for a product comparison guide. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"Revision rounds","copy":"Approve and publish the finished draft. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/hire-seo-content-writer")} />
      <ServiceHero
        eyebrow={"Hire an SEO Content Writer"}
        title={"Add a writer who can work inside your process"}
        accent={"with a plan you can measure"}
        intro={"Hire an SEO Content Writer for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"Hire an SEO Content Writer"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Hire an SEO Content Writer for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with a brief for a product comparison guide. We plan the work around a concrete next step: Approve and publish the finished draft."}</p>
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
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"Hire an SEO Content Writer"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Platforms and tools"><li>{"Editorial briefs · CMS · stakeholder reviews"}</li></ul>
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
      <WriterStaffingShowcase />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/hire-seo-content-writer"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/hire-seo-content-writer", seoBaseMetadata as import("next").Metadata);
