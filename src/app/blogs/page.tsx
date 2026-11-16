import { pageSeo } from "@/lib/orbilect-search";
import editorialType from "../editorial-index.module.css";
import BlogsPricing from "../_components/seo-investment";
import BlogsFinalCta from "../_home/final-cta";
import BlogLanding from "./blog-landing";

const seoBaseMetadata = {
  title: "SEO and Digital Marketing Blog | Orbilect SEO",
  description: "Practical guides to SEO, digital marketing, and website performance from Orbilect SEO.",
};

export default function BlogsPage() {
  return <main className={editorialType.index}><BlogLanding showBrowse={false} />
      <BlogsPricing />
      <BlogsFinalCta />
    </main>;
}


// Orbilect search metadata
export const metadata = pageSeo("/blogs", seoBaseMetadata as import("next").Metadata);
