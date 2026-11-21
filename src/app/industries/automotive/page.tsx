import IndustryDesignShowcase from "../industry-design-showcase";
import { pageSeo } from "@/lib/orbilect-search";
import { IndustryPricingBeforeFaq } from "../industry-pricing-before-faq";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { IndustryLinks } from "../industry-page";
import AutomotiveGrowth from "./automotive-growth";
import { HomeFaq } from "../../_home/editorial";
import FinalCta from "../../_home/final-cta";
import type { Metadata } from "next";
import LeadPanel from "@/components/lead-panel";
import SeoTimeline, { type SeoTimelineContent } from "../../about/seo-timeline";
import AutomotiveHero from "./automotive-hero";
import styles from "./automotive.module.css";

const seoBaseMetadata: Metadata = {
  title: "Automotive SEO for Dealerships, Repair Shops and Parts Retailers",
  description: "Grow automotive search visibility with SEO for dealer inventory, repair services, parts catalogs, and local markets.",
};

const timeline: SeoTimelineContent = {
  heading: { start: "How long does", accent: "automotive SEO take?" },
  intro: "We start with the pages closest to a test drive, service booking, or parts order. The pace depends on the condition of your site, local competition, and when improvements go live.",
  steps: [
    {
      timing: "At kickoff",
      title: "Benchmark inventory and service visibility",
      copy: "We review dealership locations, inventory categories, model pages, and repair or parts pages. Then we agree which searches, locations, and customer actions to track.",
    },
    {
      timing: "After changes go live",
      title: "Check discovery and indexing",
      copy: "We watch how Google and Bing discover updated model, location, and service URLs. We check that inventory filters and sold vehicles do not send visitors into dead ends.",
    },
    {
      timing: "Over the following months",
      title: "Measure calls, bookings, and sales",
      copy: "We compare search visibility, test-drive requests, service calls, and parts orders where tracking is available. We use those findings to prioritize the next round of pages.",
    },
  ],
  services: [
    { title: "Inventory feeds and technical SEO", items: [
      "Review how inventory feeds publish vehicle URLs and how sold listings are handled.",
      "Check internal links, canonical tags, indexable filters, sitemaps, and relevant structured data.",
    ] },
    { title: "Model, service, and location page structure", items: [
      "Make important models, repairs, and dealership locations easy to reach from navigation and internal links.",
      "Review mobile booking, click-to-call, test-drive, and enquiry paths.",
    ] },
    { title: "Vehicle comparisons, service guides, and fitment content", items: [
      "Build useful pages around trim differences, maintenance questions, and parts compatibility.",
      "Connect guides to relevant inventory, booking, or product pages.",
    ] },
    { title: "Automotive partnerships and digital PR", items: [
      "Identify relevant enthusiast publications, local partners, and directories.",
      "Pitch useful original resources, such as seasonal maintenance checklists or vehicle buying guides.",
    ] },
    { title: "Content distribution and targeted ads", items: [
      "Reuse buying guides and maintenance content across email and social channels.",
      "Use paid campaigns for inventory pushes, seasonal service demand, or offer tests when they fit the budget.",
    ] },
    { title: "Local visibility and conversion reporting", items: [
      "Review business profiles, location information, hours, and booking links for each eligible location.",
      "Track relevant calls, directions, enquiries, and orders where measurement is available.",
    ] },
  ],
};

const faqs = [
  ["What does automotive SEO include?", "It covers the pages customers use to choose a vehicle, book a repair, or buy a part. We review technical SEO, local visibility, content, and how easily visitors can take the next step."],
  ["Can you optimize a dealer site that uses a third-party inventory feed?", "Yes. We start by checking which feed and template settings you control. We separate changes your team can make from changes that require your website provider."],
  ["What should happen when a vehicle is sold?", "We review the listing’s search value and available alternatives. Depending on the page, we may keep it accessible with clear sold status, direct visitors to a close alternative, or retire it cleanly."],
  ["Can you help a dealership with multiple locations?", "Yes. We plan pages around each location’s actual inventory, services, and hours, then check that business profiles and enquiry links point to the right branch."],
  ["What should an independent repair shop prioritize?", "Start with the repairs you want to book and the areas you serve. We make those pages clear about the work you do, the vehicles you handle, and how to get an appointment."],
  ["How do you approach SEO for parts and accessories?", "We review categories, part numbers, fitment content, and filters so buyers can confirm compatibility and reach the right product. We also check how the site handles unavailable items."],
  ["Can you track test drives, phone calls, and service bookings?", "We can set up or review measurement for those actions, subject to access and the tools your site and booking provider support."],
  ["Do we still need paid ads?", "Ads can help with time-sensitive inventory, seasonal repairs, and testing offers. We use them alongside improvements to the pages customers can keep finding in organic search."],
  ["When should we expect to see results?", "Timing varies by site, market, and when changes go live. We look for early changes in discovery, indexing, and impressions, then compare enquiries, bookings, or orders over a longer period."],
  ["What will the free automotive SEO audit cover?", "We start with your website, target locations, and business goals. We identify priority issues on relevant inventory, service, location, or parts pages and explain what to fix first."],
];

export default function AutomotivePage() {
  return (
    <main>
      <AutomotiveHero />

      <section className={styles.light} aria-labelledby="automotive-intro">
        <div className={styles.wrap}>
          <p className={styles.eyebrow} data-site-eyebrow="">Automotive search</p>
          <h2 id="automotive-intro" data-orbilect-title="">The decision starts <span>before the visit</span></h2>
          <p className={styles.lead}>
            A driver looking for brake repairs, a shopper comparing trims, and a buyer checking part compatibility
            all need different answers. Organic search lets each of them find the page that helps them decide.
            A useful inventory, service, or parts page can keep attracting relevant visits between paid campaigns.
          </p>
          <div className={styles.columns}>
            <article><h3>Dealerships</h3><p>Help shoppers compare models, find local inventory, and request a test drive.</p></article>
            <article><h3>Repair shops</h3><p>Make it easy for drivers to find a specific repair, check availability, and book.</p></article>
            <article><h3>Parts retailers</h3><p>Help buyers confirm fitment, compare options, and get to the right product.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.dark} aria-labelledby="automotive-help">
        <div className={styles.wrap}>
          <p className={styles.eyebrow} data-site-eyebrow="">How Orbilect helps</p>
          <h2 id="automotive-help" data-orbilect-title="">Build a brand drivers <span>come back to</span></h2>
          <p className={styles.lead}>
            We build a collection of branded pages and tools around your business. Each one helps customers
            answer a question or take an action, from comparing two trims to checking whether a part fits.
          </p>
          <div className={styles.columns}>
            <article><h3>Build assets you own</h3><p>Create model hubs, location and service pages, comparison guides, and fitment resources that strengthen your brand in search.</p></article>
            <article><h3>Turn visits into enquiries</h3><p>Improve mobile inventory browsing, test-drive requests, call links, parts checkout, and service booking.</p></article>
            <article><h3>Use ads where timing matters</h3><p>Support a new model launch, inventory promotion, or seasonal service offer while organic work builds broader search coverage.</p></article>
          </div>
          <div className={styles.actions}><LeadPanel source="industry-detail-audit" /></div>
        </div>
      </section>

      <SeoTimeline content={timeline} />

      <AutomotiveGrowth />
      <IndustryLinks current="automotive" />
      <IndustryPricingBeforeFaq routes={["/industries/automotive"]} />
      <InvestmentBeforeFaq routes={["/industries/automotive"]} />
      <IndustryDesignShowcase slug="automotive" />
      <HomeFaq hideSectionLabel
        items={faqs.map(([question, answer]) => ({ question, answer }))}
        introTitle="What automotive teams ask us"
        introCopy="Get answers about inventory feeds, local search, service bookings, and parts catalogs. Start with a free audit to see where your website can improve."
      />
      <FinalCta />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/industries/automotive", seoBaseMetadata as import("next").Metadata);
