import GalleryPromotion from "../website-design-gallery/gallery-promotion";
import { businessDescription } from "@/lib/site-identity";
import Teams from "../_home/workbench/teams";

import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { pageSeo } from "@/lib/orbilect-search";
import { InvestmentBeforeFaq } from "../_components/investment-before-faq";
import GlobalLocations from "@/components/global-locations";
import SeoTimeline from "./seo-timeline";
import SearchStrategySections from "./search-strategy-sections";
import AuditScanner from "./audit-scanner";
import RankingChallenges from "./ranking-challenges";
// Orbilect SEO about page
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, Search, Wrench } from "lucide-react";
import { TypedPageTitle } from "../contact/contact-hero";
import SearchLayers from "./search-layers";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "./about.module.css";

const seoBaseMetadata: Metadata = {
  title: "About Orbilect SEO",
  description: businessDescription,
};

const principles = [
  {
    icon: Search,
    title: "Start with how customers search",
    text: "We research how customers describe what you sell and identify which pages should answer those searches.",
  },
  {
    icon: Wrench,
    title: "Fix the issues that matter first",
    text: "We prioritize the technical, content, and internal linking changes that make your site easier to find and use.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track what the work delivers",
    text: "We measure visibility, qualified visits, and leads or sales where tracking is available, then use that data to guide the next round of work.",
  },
];

export default function AboutPage() {
  return (<><style id="orbilect-about-hero-grid">{"\nbody:has(#orbilect-about-hero-grid)\n  :is(section, header, [role=\"banner\"]):has(h1):not(:has(:is(section, header, [role=\"banner\"]) h1)) {\n  background:\n    linear-gradient(rgba(145, 175, 230, .09) 1px, transparent 1px) 39px 41px / 68px 68px,\n    linear-gradient(90deg, rgba(145, 175, 230, .09) 1px, transparent 1px) 39px 41px / 68px 68px,\n    radial-gradient(ellipse at top right, #142d50 0%, #101b2e 42%, #0b1019 78%)\n    !important;\n}\n"}</style>{(<>{(
    <main>
      <section className={styles.hero} aria-labelledby="about-heading">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <TypedPageTitle
              id="about-heading"
              text="We help businesses earn their place in search"
              accentFrom={4}
             siteSectionLabel={"About"} />
            <p className={styles.heroCopy}>
              {businessDescription}
            </p>
            <HeroActions>
              <Link href="/contact#request-proposal" className={`${cta.cta} ${cta.ctaBlack} ${styles.action}`} data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />

                Request a proposal
              </Link>
              <HeroAudit />
            </HeroActions>
          </div>
          <SearchLayers />
        </div>
      </section>

      <section className={styles.story} aria-labelledby="story-heading">
        <div className={`${styles.container} ${styles.storyGrid}`}>
          <div className={styles.storyIntro}>
            <p data-site-eyebrow="" data-reveal="off">{"Our story"}</p>
            <h2 data-site-heading="" id="story-heading" data-orbilect-scroll-heading="" data-orbilect-title="">About <span>Orbilect SEO</span></h2>
            <p>We start with your audience and the results you need to measure, then agree what to change across search, paid campaigns, and the website.</p>
          </div>

          <div className={styles.principles}>
            <p data-site-eyebrow="" data-reveal="off">Our approach</p>
            <h2 data-site-heading="" data-orbilect-title="">Why choose <span>Orbilect SEO</span></h2>
            {principles.map(({ icon: Icon, title, text }) => (
              <div key={title} className={styles.principle}>
                <Icon size={23} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.purpose} aria-labelledby="purpose-heading">
        <div className={styles.container}>
          <p data-site-eyebrow="" data-reveal="off">{"Our purpose"}</p>
          <h2 data-site-heading="" id="purpose-heading" data-orbilect-title="">Our mission <span>and vision</span></h2>
          <div className={styles.purposeGrid}>
            <div className={styles.purposeItem}>
              <h3>Our mission</h3>
              <p>
                We help businesses get found when people search for what they
                offer. We improve how websites are built, write content that
                answers real customer questions, and show clients what changed
                and what it meant for their business.
              </p>
            </div>
            <div className={styles.purposeItem}>
              <h3>Our vision</h3>
              <p>
                We want businesses of every size to have a fair chance of being
                discovered online, and for customers to find accurate, useful
                information wherever they search.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.responsibility} aria-labelledby="responsibility-heading">
        <div className={styles.container}>
          <p data-site-eyebrow="" data-reveal="off">{"Community and responsibility"}</p>
          <h2 data-site-heading="" id="responsibility-heading" data-orbilect-title="">Corporate <span>social responsibility</span></h2>
          <p className={styles.responsibilityIntro}>
            The way we improve search visibility affects the people who rely on
            search to make decisions. These commitments guide the work we
            recommend and how we handle client information.
          </p>
          <ul className={styles.responsibilityList}>
            <li>
              <h3>Honest search practices</h3>
              <p>We recommend accurate content, transparent reporting, and improvements that make a website more useful to its visitors.</p>
            </li>
            <li>
              <h3>Accessible websites</h3>
              <p>We encourage readable content, clear navigation, and mobile-friendly pages so more people can find and use the information they need.</p>
            </li>
            <li>
              <h3>Respect for client privacy</h3>
              <p>We request access relevant to the work and seek permission before sharing a client’s name, results, or project details publicly.</p>
            </li>
          </ul>
          <p className={styles.responsibilityIntro}>
            <Link href="/corporate-social-responsibility">Read about our corporate social responsibility commitments</Link>.
          </p>
        </div>
      </section>

      <RankingChallenges />
      <SearchStrategySections />
      <SeoTimeline />


      <GalleryPromotion />
      <Teams />
      <GlobalLocations />

      <section className={styles.aboutClosing} aria-labelledby="about-closing-title">
        <div className={[styles.container, styles.closingLayout].join(" ")}>
          <div>
          <p data-site-eyebrow="" data-reveal="off">{"Free SEO audit"}</p>
          <h2 data-site-heading="" id="about-closing-title" data-orbilect-title="">Find out what’s <span>holding your site back</span></h2>
          <p>Share your website and your goals. We’ll help you identify which changes to prioritize.</p>
          <Link href="/contact#request-proposal" className={[cta.cta, cta.ctaBlack, styles.action].join(" ")} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />

            Request a proposal
          </Link>
          </div>
          <AuditScanner />
        </div>
      </section>
    <InvestmentBeforeFaq routes={["/about"]} />
      </main>
  )}</>)}</>);
}


// Orbilect search metadata
export const metadata = pageSeo("/about", seoBaseMetadata as import("next").Metadata);
