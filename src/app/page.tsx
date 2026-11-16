import { homeSchema } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo } from "@/lib/orbilect-search";
import SeoTimeline from "./about/seo-timeline";
import HomeEditorial from "./_home/editorial";
import { Industries, SearchComparison } from "./_home/industry-growth";
import { AuditCallout, HowWeWork } from "./_home/growth";
import About from "./_home/about";
import Hero from "./_home/hero";
import Services from "./_home/services";
import Teams from "./_home/workbench/teams";
import Technology from "./_home/workbench/technology";

export default function Home() {
  return (
    <main data-home-page="">
      <SeoJsonLd data={homeSchema} />
      <Hero />
      <About />
      <Services />
      <Technology />
      <AuditCallout />
      <HowWeWork />
      <SeoTimeline />
      <SearchComparison />
      <Industries />
      <Teams />
      <HomeEditorial />
    </main>
  );
}

// Orbilect search metadata
export const metadata = pageSeo("/");
