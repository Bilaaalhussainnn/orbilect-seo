import PageStructuredData from "@/components/seo/page-data";
import { pageSeo } from "@/lib/orbilect-search";
import { PricingClosing } from "./pricing-closing";
import PricingFinalCta from "../_home/final-cta";
import { PricingPlans } from "./pricing-plans";
import { StaffingOverview } from "./pricing-extras";
import { WebsiteRedesignPromotion } from "../services/website-redesign/website-redesign-promotion";
import { PricingChecklist } from "./pricing-checklist";
import type { Metadata } from "next";
import { ServiceHero, type ServiceScene } from "../services/_components/service-story";
import { PricingFactors } from "./pricing-factors";
import { PaymentStructure } from "./payment-structure";

const seoBaseMetadata: Metadata = {
  title: "SEO and Digital Marketing Pricing | Orbilect SEO",
  description: "See how Orbilect SEO quotes for SEO, PPC, content, and website work. Explore what shapes your investment, what you receive, and how to request a tailored proposal.",
};

const scenes: ServiceScene[] = [
  {
    id: "search",
    label: "Your brief",
    address: "Project brief",
    title: "What would make the work worthwhile?",
    copy: "Tell us what you sell, who you want to reach, and where customers get stuck today.",
    items: ["Business goal", "Starting point"],
  },
  {
    id: "page",
    label: "Your proposal",
    address: "Scope and deliverables",
    title: "See what the quote covers",
    copy: "We set out the priorities, the specialists and hours required, and who will implement the work.",
    items: ["Agreed scope", "Delivery plan"],
  },
  {
    id: "links",
    label: "Your review",
    address: "Measurement and reporting",
    title: "Agree on what we’ll measure",
    copy: "Choose the outcomes that matter, from verified site fixes to qualified enquiries and tracked sales.",
    items: ["Baseline", "Review points"],
  },
];

export default function PricingPage() {
  return (
    <main>
      <PageStructuredData route="/pricing" />
      <ServiceHero
        eyebrow="Orbilect SEO investment"
        title="Know what you’re investing in"
        accent="before we start"
        intro="Get a quote built around the work your business needs. We explain what’s included, who’ll do it, and how we’ll check whether it made a difference."
        scenes={scenes}
        ctaLabel="See how we calculate pricing"
        showCtaArrow
      />
      <PricingFactors />
      <PaymentStructure />
      <PricingChecklist />
      <PricingPlans />
      <WebsiteRedesignPromotion />
      <StaffingOverview />
      <PricingClosing />
      <PricingFinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/pricing", seoBaseMetadata as import("next").Metadata);
