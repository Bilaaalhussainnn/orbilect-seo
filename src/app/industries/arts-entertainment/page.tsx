import { pageSeo } from "@/lib/orbilect-search";
import { IndustryPage, industryMetadata } from "../industry-page";
export const metadata = pageSeo("/industries/arts-entertainment", industryMetadata("arts-entertainment"));
export default function Page() { return <IndustryPage slug="arts-entertainment" />; }
