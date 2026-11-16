import { HowWeWork } from "../../_home/growth";
import { EmailShowcases } from "../_showcase/sections";
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
  "title": "Email Marketing | Orbilect SEO",
  "description": "Email Marketing for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "A welcome email for a new store subscriber",
    "title": "A welcome email for a new store subscriber",
    "copy": "Start with subscriber and consent review and confirm the audience, access, and deliverables. Example: A welcome email for a new store subscriber.",
    "items": [
      "Emails delivered"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/email-marketing",
    "title": "Campaign copy",
    "copy": "Work through segmentation and campaign copy. Verify the work against the agreed brief before release.",
    "items": [
      "Tracked clicks"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/email-marketing",
    "title": "Click through to the relevant collection",
    "copy": "Review tracked orders and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Tracked orders"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Audit consent, segments, and current sends","copy":"Start with subscriber and consent review and confirm the audience, access, and deliverables. Example: A welcome email for a new store subscriber."}), icon: Search },
  { ...({"timing":"During implementation","title":"Build and test the first sequence","copy":"Work through segmentation and campaign copy. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Review clicks, replies, and orders","copy":"Review tracked orders and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Subscriber and consent review","copy":"A welcome email for a new store subscriber. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Segmentation","copy":"Email campaigns · CRM · lifecycle automation. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Campaign copy","copy":"Click through to the relevant collection. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Lifecycle flows","copy":"A welcome email for a new store subscriber. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"Template and delivery testing","copy":"Click through to the relevant collection. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/email-marketing")} />
      <ServiceHero
        eyebrow={"Email Marketing"}
        title={"Send useful follow-ups people signed up for"}
        accent={"with a plan you can measure"}
        intro={"Email Marketing for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"Email Marketing"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Email Marketing for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with a welcome email for a new store subscriber. We plan the work around a concrete next step: Click through to the relevant collection."}</p>
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
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"Email Marketing"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Platforms and tools"><li>{"Email campaigns · CRM · lifecycle automation"}</li></ul>
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
      <EmailShowcases />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/email-marketing"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/email-marketing", seoBaseMetadata as import("next").Metadata);
