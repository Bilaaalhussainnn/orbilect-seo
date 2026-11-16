import { HowWeWork } from "../../_home/growth";
import { PpcShowcase } from "../_showcase/sections";
import { serviceSchema } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo } from "@/lib/orbilect-search";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { PpcCampaignSections } from "./ppc-campaign-sections";
import { OnPageProgression } from "./on-page-progression";
import { OnPageFaq } from "./on-page-faq";
import FinalCta from "../../_home/final-cta";
import { Suspense as ReputationSuspense } from "react";
import { ServicesReputation as OnPageReputation } from "../_components/seo-support";
import { OnPageSubservices } from "./on-page-subservices";
import { InternalLinkingHelp, OnPageStructure } from "./service-structure";
import supportStyles from "../_components/seo-support.module.css";
import type { Metadata } from "next";

import { Search } from "lucide-react";

import { ServiceHero, type ServiceScene } from "../_components/service-story";
import { OrganicJourney } from "./service-journey";
import styles from "../_components/service-story.module.css";

const seoBaseMetadata: Metadata = {
  "title": "PPC Management Services | Orbilect SEO",
  "description": "PPC management for Google Ads and Microsoft Advertising. Get a campaign built around relevant searches, useful landing pages, and qualified leads you can measure."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Paid search",
    "address": "emergency commercial HVAC repair",
    "title": "emergency commercial HVAC repair",
    "copy": "A facilities manager needs an urgent repair. We use the search terms report to check whether campaigns are reaching that kind of customer.",
    "items": [
      "Search terms",
      "Service area"
    ]
  },
  {
    "id": "page",
    "label": "Landing page",
    "address": "example.com/commercial-hvac",
    "title": "Commercial HVAC emergency service",
    "copy": "The ad leads to a page that explains commercial coverage, availability, and what to do next.",
    "items": [
      "Ad-to-page match",
      "Mobile experience"
    ]
  },
  {
    "id": "links",
    "label": "Qualified lead",
    "address": "example.com/commercial-hvac",
    "title": "Call for a commercial repair quote",
    "copy": "The customer calls or submits a form. Where tracking allows, we check whether the enquiry matches the agreed lead criteria.",
    "items": [
      "Call tracking",
      "Lead quality"
    ]
  }
];





export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/ppc-management")} />
      <ServiceHero
        eyebrow={"PPC Management"}
        title={"Make every paid click"}
        accent={"count toward a real enquiry"}
        intro={"PPC management for Google Ads and Microsoft Advertising. Get a campaign built around relevant searches, useful landing pages, and qualified leads you can measure."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">What is <span>PPC Management?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Pay-per-click advertising puts your offer in front of people who are already looking for it. We build Google Ads and Microsoft Advertising campaigns around the jobs you want to win, the areas you can serve, and the actions you can track."}</p>
            <p>{"Already running ads? We can start with your existing account. We review where spend goes, which searches trigger ads, and whether calls and forms turn into qualified enquiries before recommending what to change."}</p>
          </div>
        </div>
      </section>

      <OnPageStructure />
      <InternalLinkingHelp />

      <OrganicJourney />

      <PpcCampaignSections />

      <OnPageSubservices />
      <PpcShowcase />
      <OnPageProgression />
    
      <ReputationSuspense fallback={null}>
        <OnPageReputation placement="detail" />
      </ReputationSuspense>
      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/ppc-management"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/ppc-management", seoBaseMetadata as import("next").Metadata);
