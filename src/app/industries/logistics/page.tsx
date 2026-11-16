import { pageSeo } from "@/lib/orbilect-search";
import { IndustryPage, industryMetadata } from "../industry-page";

const slug = "logistics";
const seoBaseMetadata = industryMetadata(slug);

export default function Page() {
  return <IndustryPage slug={slug} />;
}


// Orbilect search metadata
export const metadata = pageSeo("/industries/logistics", seoBaseMetadata as import("next").Metadata);
