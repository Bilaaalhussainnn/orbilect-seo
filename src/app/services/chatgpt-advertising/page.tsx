import { HowWeWork } from "../../_home/growth";
import { ChatGptAdsShowcase } from "../_showcase/service-details";
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
  "title": "ChatGPT Advertising | Orbilect SEO",
  "description": "ChatGPT Advertising for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "Project management tools for agencies",
    "title": "Project management tools for agencies",
    "copy": "Start with advertiser eligibility and confirm the audience, access, and deliverables. Example: Project management tools for agencies.",
    "items": [
      "Ad impressions"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/chatgpt-advertising",
    "title": "Creative and copy preparation",
    "copy": "Work through offer and landing-page review and creative and copy preparation. Verify the work against the agreed brief before release.",
    "items": [
      "Landing-page visits"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/chatgpt-advertising",
    "title": "Review the offer on its landing page",
    "copy": "Review tracked actions and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Tracked actions"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Confirm access, market, and offer fit","copy":"Start with advertiser eligibility and confirm the audience, access, and deliverables. Example: Project management tools for agencies."}), icon: Search },
  { ...({"timing":"During implementation","title":"Prepare approved creative and a focused test","copy":"Work through offer and landing-page review and creative and copy preparation. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Review available delivery and response data","copy":"Review tracked actions and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Advertiser eligibility","copy":"Project management tools for agencies. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Offer and landing-page review","copy":"OpenAI Ads Manager · advertiser access required. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Creative and copy preparation","copy":"Review the offer on its landing page. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Campaign setup when access is available","copy":"Project management tools for agencies. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"Measurement planning","copy":"Review the offer on its landing page. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/chatgpt-advertising")} />
      <ServiceHero
        eyebrow={"ChatGPT Advertising"}
        title={"Prepare a campaign for eligible ad placements"}
        accent={"with a plan you can measure"}
        intro={"ChatGPT Advertising for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"ChatGPT Advertising"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"ChatGPT Advertising for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with project management tools for agencies. We plan the work around a concrete next step: Review the offer on its landing page."}</p>
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
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"ChatGPT Advertising"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Platforms and tools"><li>{"OpenAI Ads Manager · advertiser access required"}</li></ul>
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
      <ChatGptAdsShowcase />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/chatgpt-advertising"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/chatgpt-advertising", seoBaseMetadata as import("next").Metadata);
