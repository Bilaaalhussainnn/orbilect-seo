import GalleryPromotion from "../../website-design-gallery/gallery-promotion";
import { HowWeWork } from "../../_home/growth";
import { serviceSchema } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo } from "@/lib/orbilect-search";
import { WebsiteRedesignPromotion } from "./website-redesign-promotion";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { RedesignPlatforms } from "./redesign-platforms";
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
  "title": "Website Redesign Services | Orbilect SEO",
  "description": "Redesign your website around clear navigation, mobile usability, and a direct path to booking or enquiry while protecting important URLs."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Customer search",
    "address": "book a brake inspection near me",
    "title": "book a brake inspection near me",
    "copy": "A driver opens the brake inspection page from search or a listing.",
    "items": [
      "Search intent",
      "Discovery"
    ]
  },
  {
    "id": "page",
    "label": "Destination",
    "address": "example.com/website-redesign",
    "title": "Mobile brake inspection page",
    "copy": "They can confirm location, what the inspection covers, and how to schedule it on mobile.",
    "items": [
      "Customer information",
      "Page experience"
    ]
  },
  {
    "id": "links",
    "label": "Next action",
    "address": "example.com/website-redesign",
    "title": "Complete the form and receive confirmation",
    "copy": "The form works, the confirmation explains what happens next, and the enquiry reaches the shop.",
    "items": [
      "Customer action",
      "Measurement"
    ]
  }
];

const phases = [
  { ...({"timing":"At the start","title":"Map the current site","copy":"Audit priority pages, URLs, content, and booking friction. Agree on the scope and what launch success means."}), icon: Search },
  { ...({"timing":"During implementation","title":"Design and build","copy":"Review layouts and copy, implement the approved pages, and test redirects, forms, mobile views, and tracking."}), icon: Globe },
  { ...({"timing":"After release","title":"Launch and verify","copy":"Check the live site and priority journeys. Review post-launch issues and track enquiries as data comes in."}), icon: Gauge }
];

const features = [
  { ...({"title":"Navigation and page architecture","copy":"Visitors cannot find the right service. Group pages by customer need and design clear paths between them. A page map and navigation plan."}), icon: Search },
  { ...({"title":"Responsive page design","copy":"The desktop layout breaks on mobile. Design and test key layouts across screen sizes. Responsive templates for the agreed pages."}), icon: FileText },
  { ...({"title":"Forms and booking flows","copy":"Customers submit a form without confirmation. Test validation, delivery, confirmation, and the next step. Verified enquiry and booking flows."}), icon: ListTree },
  { ...({"title":"Content and page migration","copy":"Old pages contain useful copy or search traffic. Carry forward valuable content and map changed URLs. An inventory and redirect plan for launch."}), icon: Link2 },
  { ...({"title":"Launch and handoff","copy":"Nobody knows what to check after going live. Verify the live build and document edits, monitoring, and agreed support. Launch checks and a practical handoff."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/website-redesign")} />
      <ServiceHero
        eyebrow={"Website Redesign"}
        title={"Build a website customers"}
        accent={"can actually use"}
        intro={"Redesign your website around clear navigation, mobile usability, and a direct path to booking or enquiry while protecting important URLs."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">What is <span>Website Redesign?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"A redesign is an opportunity to fix how people find information and reach your team. We map your existing pages, identify where customers get stuck, and rebuild the layouts and booking paths that need work. If the site already earns organic traffic, we plan the migration before changing URLs."}</p>
            <p>{"A driver opens the brake inspection page from search or a listing."}</p>
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
              <p className={styles.lead}>{"Audit priority pages, URLs, content, and booking friction. Agree on the scope and what launch success means."}</p>
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
      <RedesignPlatforms />

      <WebsiteRedesignPromotion />

      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/website-redesign"]} />
      <GalleryPromotion />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/website-redesign", seoBaseMetadata as import("next").Metadata);
