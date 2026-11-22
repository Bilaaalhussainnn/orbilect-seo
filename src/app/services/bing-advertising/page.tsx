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
import Image from "@/components/optimized-image";
import { FileText, Gauge, Globe, Link2, ListTree, Plus, Search } from "lucide-react";
import logos from "../../about/seo-engine-logos.json";
import { ServiceHero, type ServiceScene } from "../_components/service-story";
import { OrganicJourney } from "./service-journey";
import styles from "../_components/service-story.module.css";

const seoBaseMetadata: Metadata = {
  "title": "Bing Advertising | Orbilect SEO",
  "description": "Bing Advertising for teams that want a clear scope, a tested setup, and reporting they can act on."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Find the opportunity",
    "address": "Managed IT support for small businesses",
    "title": "Managed IT support for small businesses",
    "copy": "Start with account and import audit and confirm the audience, access, and deliverables. Example: Managed IT support for small businesses.",
    "items": [
      "Ad impressions"
    ]
  },
  {
    "id": "page",
    "label": "Deliver the work",
    "address": "example.com/bing-advertising",
    "title": "Network and location settings",
    "copy": "Work through microsoft keyword research and network and location settings. Verify the work against the agreed brief before release.",
    "items": [
      "Ad clicks"
    ]
  },
  {
    "id": "links",
    "label": "Verify the result",
    "address": "example.com/bing-advertising",
    "title": "Book an IT consultation",
    "copy": "Review qualified enquiries and the quality of the outcome. Document what changed and agree on the next priority.",
    "items": [
      "Qualified enquiries"
    ]
  }
];

const phases = [
  { ...({"timing":"Before work starts","title":"Review the account and audience","copy":"Start with account and import audit and confirm the audience, access, and deliverables. Example: Managed IT support for small businesses."}), icon: Search },
  { ...({"timing":"During implementation","title":"Build or adapt campaigns for Microsoft Advertising","copy":"Work through microsoft keyword research and network and location settings. Verify the work against the agreed brief before release."}), icon: Globe },
  { ...({"timing":"At the first review","title":"Refine search terms and cost per qualified lead","copy":"Review qualified enquiries and the quality of the outcome. Document what changed and agree on the next priority."}), icon: Gauge }
];

const features = [
  { ...({"title":"Account and import audit","copy":"Managed IT support for small businesses. Review what is already in place and identify gaps that could affect this project. A prioritized audit."}), icon: Search },
  { ...({"title":"Microsoft keyword research","copy":"Microsoft Advertising · Bing. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."}), icon: FileText },
  { ...({"title":"Network and location settings","copy":"Book an IT consultation. Build the first version around this specific customer or operational need. A first delivery for review."}), icon: ListTree },
  { ...({"title":"Ad and landing-page alignment","copy":"Managed IT support for small businesses. Check that the experience or handoff works in the environment people actually use. A checked customer flow."}), icon: Link2 },
  { ...({"title":"Conversion setup","copy":"Book an IT consultation. Test the setup and document what is verified before judging performance. Verified reporting definitions."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/bing-advertising")} />
      <ServiceHero
        eyebrow={"Bing Advertising"}
        title={"Reach buyers searching on Bing"}
        accent={"with a plan you can measure"}
        intro={"Bing Advertising for teams that want a clear scope, a tested setup, and reporting they can act on."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">{"What to expect from "}<span>{"Bing Advertising"}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Bing Advertising for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
            <p>{"Start with managed it support for small businesses. We plan the work around a concrete next step: Book an IT consultation."}</p>
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
              <h2 id="service-process-title">{"How we deliver "}<span className={styles.highlight}>{"Bing Advertising"}</span></h2>
              <p className={styles.lead}>{"We confirm the scope, deliver a focused first round of work, and review the result with your team."}</p>
            </div>
            <ul className={styles.engines} aria-label="Search engines">
              {(["google", "bing"] as const).map((engine) => (
                <li key={engine}>
                  <Image src={logos[engine]} alt="" width={22} height={22} unoptimized />
                  {engine === "google" ? "Google" : "Bing"}
                </li>
              ))}
            </ul>
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
      <InvestmentBeforeFaq routes={["/services/bing-advertising"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/bing-advertising", seoBaseMetadata as import("next").Metadata);
