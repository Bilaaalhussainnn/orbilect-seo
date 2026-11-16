import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { pageSeo } from "@/lib/orbilect-search";
import servicesHero from "./services-hero.module.css";
import { InvestmentBeforeFaq } from "../_components/investment-before-faq";
import { ClientCommitment } from "./_components/client-commitment";

import SecondaryServices from "./_secondary/secondary-services";
import RankingProgress from "./ranking-progress";
import OrganicGrowthComparison from "./organic-growth-comparison";
import SeoTimeline from "../about/seo-timeline";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TypedPageTitle } from "../contact/contact-hero";
import SearchLayers from "../about/search-layers";
import Services from "../_home/services";
import { HowWeWork } from "../_home/growth";
import FinalCta from "../_home/final-cta";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "../about/about.module.css";

const seoBaseMetadata: Metadata = {
  title: "SEO Services",
  description:
    "Explore on-page SEO, off-page SEO, technical SEO, ecommerce SEO, digital marketing, and website redesign from Orbilect SEO.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className={[styles.hero, servicesHero.grid].join(" ")} aria-labelledby="services-page-title">
        <div className={[styles.container, styles.heroGrid, servicesHero.heroLayout].join(" ")}>
          <div>
            <TypedPageTitle
              id="services-page-title"
              text="SEO services that help customers find you"
              accentFrom={3}
             siteSectionLabel={"Services"} />
            <p className={styles.heroCopy}>
              From fixing crawl and indexing issues to improving product pages
              and landing pages, we help you reach the people already searching
              for what you offer.
            </p>
            <HeroActions>
              <Link
                href="/contact#request-proposal"
                className={[cta.cta, cta.ctaBlack, styles.action].join(" ")}
               data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />

                Request a proposal
              </Link>
              <HeroAudit />
            </HeroActions>
          </div>
          <div className={servicesHero.heroPreview}><SearchLayers /></div>
        </div>
      </section>

      <Services />
      <SeoTimeline />
      <OrganicGrowthComparison />
      <RankingProgress />
      <HowWeWork />
      <ClientCommitment />
      <SecondaryServices />
      <InvestmentBeforeFaq routes={["/services"]} />
      <FinalCta formSource="services-proposal" />
    
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/services", seoBaseMetadata as import("next").Metadata);
