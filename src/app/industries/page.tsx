import PageStructuredData from "@/components/seo/page-data";
import { pageSeo } from "@/lib/orbilect-search";
import IndustryDirectory from "./industry-directory";
import GalleryPromotion from "../website-design-gallery/gallery-promotion";
import FinalCta from "../_home/final-cta";
import IndustryOrganicValue from "./industry-organic-value";
import IndustriesHero from "./industries-hero";
import type { Metadata } from "next";
import OrganicGrowthComparison from "../services/organic-growth-comparison";

const seoBaseMetadata: Metadata = {
  title: "Industries We Serve",
  description: "Explore SEO and website design for 12 industries, from arts and entertainment to ecommerce, healthcare, food and beverages, and SaaS.",
};

export default function IndustriesPage() {
  return (
    <main data-industries-index="">
      <PageStructuredData route="/industries" />
      <IndustriesHero />
      <IndustryDirectory />
      <GalleryPromotion />
      <OrganicGrowthComparison />
      <IndustryOrganicValue />
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/industries", seoBaseMetadata as import("next").Metadata);
