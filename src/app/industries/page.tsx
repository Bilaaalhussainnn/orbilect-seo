import { pageSeo } from "@/lib/orbilect-search";
import { InvestmentBeforeFaq } from "../_components/investment-before-faq";
import FinalCta from "../_home/final-cta";
import IndustryOrganicValue from "./industry-organic-value";
import IndustriesHero from "./industries-hero";
import type { Metadata } from "next";
import { Industries } from "../_home/industry-growth";
import OrganicGrowthComparison from "../services/organic-growth-comparison";

const seoBaseMetadata: Metadata = {
  title: "Industries We Serve",
  description: "Explore SEO and website design for 12 industries, from arts and entertainment to ecommerce, healthcare, food and beverages, and SaaS.",
};

export default function IndustriesPage() {
  return (
    <main data-industries-index="">
      <IndustriesHero />
      <Industries directory />
      <OrganicGrowthComparison />
      <IndustryOrganicValue />
      <InvestmentBeforeFaq routes={["/industries"]} />
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/industries", seoBaseMetadata as import("next").Metadata);
