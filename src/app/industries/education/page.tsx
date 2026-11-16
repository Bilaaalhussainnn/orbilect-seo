import { pageSeo } from "@/lib/orbilect-search";
import { IndustryPage, industryMetadata } from "../industry-page";

const slug = "education";
const seoBaseMetadata = industryMetadata(slug);

export default function Page() {
  return <IndustryPage slug={slug} />;
}


// Orbilect search metadata
export const metadata = pageSeo("/industries/education", seoBaseMetadata as import("next").Metadata);
