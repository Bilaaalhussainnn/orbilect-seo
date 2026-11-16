import { HowWeWork } from "../../_home/growth";
import { serviceSchema } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo } from "@/lib/orbilect-search";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { EcommerceManagementSection } from "../ecommerce-management/ecommerce-management-section";
import { EcommercePlatformSections } from "./platform-sections";
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
  "title": "Ecommerce SEO Services | Orbilect SEO",
  "description": "Improve category pages, product information, catalogue structure, and the path from organic search to purchase."
};

const scenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Customer search",
    "address": "waterproof hiking boots for women",
    "title": "waterproof hiking boots for women",
    "copy": "A shopper searching broadly lands on a collection built around the product type they want.",
    "items": [
      "Search intent",
      "Discovery"
    ]
  },
  {
    "id": "page",
    "label": "Destination",
    "address": "example.com/ecommerce-seo",
    "title": "Women’s waterproof hiking boots collection",
    "copy": "They can check fit, stock, delivery, and returns on the relevant product page.",
    "items": [
      "Customer information",
      "Page experience"
    ]
  },
  {
    "id": "links",
    "label": "Next action",
    "address": "example.com/ecommerce-seo",
    "title": "Compare sizes and choose an in-stock product",
    "copy": "The correct variant can be added to the cart, and the journey can be measured where tracking is available.",
    "items": [
      "Customer action",
      "Measurement"
    ]
  }
];

const phases = [
  { ...({"timing":"At the start","title":"Audit the catalogue","copy":"Review collections, products, variants, filters, and existing organic sales data where available."}), icon: Search },
  { ...({"timing":"During implementation","title":"Improve key templates","copy":"Publish targeted collection and product updates, then test links, preferred URLs, and mobile purchase paths."}), icon: Globe },
  { ...({"timing":"After release","title":"Review discovery and sales","copy":"Monitor category and product traffic alongside tracked sales, taking stock changes and promotions into account."}), icon: Gauge }
];

const features = [
  { ...({"title":"Collection page optimization","copy":"Broad searches land on an unsuitable product. Build useful collection destinations with clear product groupings and copy. A category plan tied to shopping intent."}), icon: Search },
  { ...({"title":"Product page optimization","copy":"Product pages omit fit or compatibility. Add useful descriptions, specifications, and relevant image text. Product page recommendations your team can apply."}), icon: FileText },
  { ...({"title":"Filters and variant URLs","copy":"Filters produce many near-identical pages. Review which filtered views need a distinct destination and how variants are handled. A documented URL strategy for the catalogue."}), icon: ListTree },
  { ...({"title":"Product structured data","copy":"Visible product details and markup disagree. Review how price and availability are populated and validate supported markup. A list of markup and template fixes."}), icon: Link2 },
  { ...({"title":"Organic revenue measurement","copy":"Traffic reports don’t show what sold. Connect organic landing pages with available product and purchase data. Reporting that relates visibility to purchases."}), icon: Gauge }
];

export default function OnPageSeoPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema("/services/ecommerce-seo")} />
      <ServiceHero
        eyebrow={"Ecommerce SEO"}
        title={"Help shoppers find"}
        accent={"the products they came for"}
        intro={"Improve category pages, product information, catalogue structure, and the path from organic search to purchase."}
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we optimize</p>
            <h2 id="service-intro-title">What is <span>Ecommerce SEO?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{"Ecommerce SEO connects product demand to the right collection or product page. We review how shoppers browse, how the store handles variants and filters, and which details help someone decide to buy. We prioritize work around product availability and the categories that matter to your business."}</p>
            <p>{"A shopper searching broadly lands on a collection built around the product type they want."}</p>
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
              <p className={styles.lead}>{"Review collections, products, variants, filters, and existing organic sales data where available."}</p>
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
      <EcommercePlatformSections />
      <EcommerceManagementSection />

      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/ecommerce-seo"]} />
      <OnPageFaq />
      
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services/ecommerce-seo", seoBaseMetadata as import("next").Metadata);
