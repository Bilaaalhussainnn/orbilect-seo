import { pageSeo } from "@/lib/orbilect-search";
import { IndustryPage, industryMetadata } from "../industry-page";
export const metadata = pageSeo("/industries/food-beverages", industryMetadata("food-beverages"));
export default function Page() { return <IndustryPage slug="food-beverages" />; }
