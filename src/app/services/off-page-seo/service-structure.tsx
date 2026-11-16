import { ServicesReputationWalkthrough } from "../_components/services-reputation";
import { SiteStructureMap } from "./service-site-map";
import Link from "next/link";
import styles from "../_components/seo-support.module.css";

const structure = [
  {
    "title": "Backlink audit",
    "copy": "Unclear which sites refer traffic. Review referring pages and how they relate to your business. Prioritized list of useful links and issues."
  },
  {
    "title": "Citation cleanup",
    "copy": "Old contact details on directories. Correct priority listings using the current business details. Consistent phone, address, and destination URLs."
  },
  {
    "title": "Link reclamation",
    "copy": "A publication links to a retired URL. Find the correct replacement and request a link update where appropriate. Verified destination or a working redirect."
  },
  {
    "title": "Digital PR outreach",
    "copy": "Useful expertise goes uncited. Turn original insight or a project into a pitch for relevant editors. Outreach log and earned placements where secured."
  },
  {
    "title": "Review and reputation support",
    "copy": "The same complaint keeps appearing. Identify the operational issue and help the team respond and resolve it. A response process and a list of recurring fixes."
  }
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
    link: "Explore Off-page SEO",
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
          <h2 id="site-structure-title">Build a website <span>{"customers can use"}</span></h2>
          <p>{"Off-page SEO improves what people can learn about your business beyond your own pages. We review where you’re listed, who mentions or links to you, and what customers repeatedly bring up in reviews. Then we prioritize the opportunities that make sense for your industry and audience."}</p>
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
    "title": "Backlink audit",
    "copy": "Unclear which sites refer traffic. Review referring pages and how they relate to your business."
  },
  {
    "title": "Citation cleanup",
    "copy": "Old contact details on directories. Correct priority listings using the current business details."
  },
  {
    "title": "Link reclamation",
    "copy": "A publication links to a retired URL. Find the correct replacement and request a link update where appropriate."
  }
];

export function InternalLinkingHelp() {
  return (
    <section className={styles.dark} aria-labelledby="internal-linking-title">
      <div className={styles.wrap}>
        <div className={styles.linkHelp}>
          <header className={styles.intro}>
            <p className={styles.eyebrow} data-site-eyebrow="">{"Off-page SEO problems"}</p>
            <h2 id="internal-linking-title">What if your site <span>{"is losing customers?"}</span></h2>
            <p>{"Your business is missing from the places customers check. Earn credible references and fix inconsistent listings. Send us your URL and we’ll identify where to start."}</p>
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
