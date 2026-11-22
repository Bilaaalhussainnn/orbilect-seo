import { pageSeo } from "@/lib/orbilect-search";
import { IndustryPage, industryMetadata } from "../industry-page";
export const metadata = pageSeo("/industries/saas", industryMetadata("saas"));
export default function Page() { return <IndustryPage slug="saas" />; }
