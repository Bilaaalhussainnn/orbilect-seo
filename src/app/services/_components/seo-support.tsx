import { ServicesReputationWalkthrough } from "./services-reputation";
import { SiteStructureMap } from "./site-structure-map";
import Link from "next/link";
import styles from "./seo-support.module.css";

const structure = [
  {
    title: "Give each important page a job",
    copy: "We organize pages around the questions customers ask. Clear headings and original, useful content help visitors tell whether they’ve found the right service, product, or location.",
  },
  {
    title: "Connect pages with useful internal links",
    copy: "We link from service hubs, category pages, and relevant guides using descriptive link text. That gives visitors a clear route to the next page and helps search engines discover pages they might otherwise miss.",
  },
  {
    title: "Describe meaningful images",
    copy: "We write concise alt text for images that convey information, such as a product detail, diagram, or completed job. Screen readers can use it to describe the image, and it helps search engines understand the image in context. Decorative images use empty alt text.",
  },
  {
    title: "Add and validate structured data",
    copy: "We use applicable schema markup, such as BreadcrumbList for eligible navigation and Product for relevant product pages. The markup must match what visitors can see. We validate it and check supported reports after publication.",
  },
  {
    title: "Clean up duplicate URLs and broken paths",
    copy: "We review canonical tags, redirects, and broken links alongside the page hierarchy. Where the issue affects crawling or indexing, we handle it with our Technical SEO work.",
  },
];

const offerings = [
  {
    id: "search-setup",
    title: "Search Console and sitemap setup",
    copy: "We help verify your property, check and submit your XML sitemap, inspect priority URLs, and show you how to read search performance.",
    guides: ["How to submit an XML sitemap to Google", "How to set up and use Google Search Console"],
    href: "/services/technical-seo",
    link: "Explore Technical SEO",
  },
  {
    id: "keywords-and-site-health",
    title: "Keyword research, rankings, and site health",
    copy: "We use Semrush or Ahrefs to research keywords, monitor positions, and review site health. We map findings to the pages that need content changes or technical fixes.",
    guides: ["Semrush guide to keywords, rankings, and site audits", "Ahrefs guide to keywords, rankings, and site audits"],
    href: "/services/on-page-seo",
    link: "Explore On-page SEO",
  },
  {
    id: "local-visibility",
    title: "Google Business Profile setup",
    copy: "We help eligible businesses create or claim a profile, work through Google’s available verification steps, and correct their hours, services, and booking details.",
    guides: ["How to set up and verify a Google Business Profile"],
    href: "/services/digital-marketing",
    link: "Explore Digital Marketing",
  },
  {
    id: "reputation-management",
    title: "Online reputation and booking recovery",
    copy: "Sitting at 2.5 or 3 stars on Yelp? We read the reviews for recurring problems and test your booking process ourselves. If customers can’t find the right information, get a confirmation, or reach your team, we help fix that and set up a process for responding to complaints.",
    guides: ["How to respond to negative reviews and fix recurring complaints"],
    href: "/services/off-page-seo",
    link: "Explore Off-page SEO",
  },
];

export function OnPageStructure() {
  return (
    <section id="site-structure" className={styles.light} aria-labelledby="site-structure-title">
      <div className={styles.wrap}>
        <header className={styles.intro}>
          <p className={styles.eyebrow} data-site-eyebrow="">Website structure</p>
          <h2 id="site-structure-title">Build a website <span>people can find their way around</span></h2>
          <p>Thin content, isolated pages, and missing image descriptions can make your site harder to use and your priority pages harder to discover. We audit those gaps, fix them on the pages that matter most, and check how the changes perform.</p>
        </header>
        <SiteStructureMap topics={structure} />
      </div>
    </section>
  );
}

export function SeoSupport() {
  return (
    <section id="seo-support" className={styles.dark} aria-labelledby="seo-support-title">
      <div className={styles.wrap}>
        <header className={styles.intro}>
          <p className={styles.eyebrow} data-site-eyebrow="">Search and reputation</p>
          <h2 id="seo-support-title">Get found and <span>make it easier to book</span></h2>
          <p>We help with the setup, the diagnosis, and the fixes, from getting your sitemap into Search Console to finding out why customers drop off before booking.</p>
        </header>
        <div className={styles.cards}>
          {offerings.map(({ id, title, copy, guides, href, link }) => (
            <article key={id} id={id} className={styles.card}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <p className={styles.guideLabel}>Guide topics</p>
              <ul>{guides.map((guide) => <li key={guide}>{guide}</li>)}</ul>
              <Link href={href}>{link} ↗</Link>
              {id === "reputation-management" && (
                <Link href="/services/website-redesign">Explore website and booking redesign ↗</Link>
              )}
            </article>
          ))}
        </div>
        <Link className={styles.cta} href="/contact#request-proposal" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />Talk to us about your website or reviews ↗</Link>
      </div>
    </section>
  );
}

const linkingCases = [
  {
    title: "You have a one-page website",
    copy: "Menu links may jump to sections on the same page. If your services need their own search landing pages, we plan those pages and connect them from your menu and existing content.",
  },
  {
    title: "Your builder only gives you popups",
    copy: "A service might open in a modal or live inside a booking widget with no permanent page of its own. We check what the builder supports and create a dedicated URL and standard links where we can.",
  },
  {
    title: "Your pages exist but nothing points to them",
    copy: "We find pages missing from the navigation or related content, then link them from relevant pages. We also check whether old URLs and templates are sending people to the wrong place.",
  },
];

export function InternalLinkingHelp() {
  return (
    <section className={styles.dark} aria-labelledby="internal-linking-title">
      <div className={styles.wrap}>
        <div className={styles.linkHelp}>
          <header className={styles.intro}>
            <p className={styles.eyebrow} data-site-eyebrow="">Internal linking</p>
            <h2 id="internal-linking-title">What if your site <span>has nowhere to link?</span></h2>
            <p>Some sites have no dedicated service pages. Others have them buried in a builder, a widget, or an old template. Send us your URL. We’ll check what your site can support, what we can fix in place, and whether a rebuild would give you the pages and booking paths you need.</p>
            <Link className={styles.cta} href="/contact#request-proposal" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />Ask us to check your website ↗</Link>
          </header>
          <div className={styles.linkCases}>
            {linkingCases.map(({ title, copy }) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesReputation({ placement = "services" }: {
  placement?: "services" | "contact" | "detail";
} = {}) {
  return <ServicesReputationWalkthrough offerings={offerings} placement={placement} />;
}
