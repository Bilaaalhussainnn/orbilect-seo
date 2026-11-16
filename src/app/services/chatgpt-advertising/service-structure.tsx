import { ServicesReputationWalkthrough } from "../_components/services-reputation";
import { SiteStructureMap } from "./service-site-map";
import Link from "next/link";
import styles from "../_components/seo-support.module.css";

const structure = [
  {
    "title": "Advertiser eligibility",
    "copy": "Project management tools for agencies. Review what is already in place and identify gaps that could affect this project. A prioritized audit."
  },
  {
    "title": "Offer and landing-page review",
    "copy": "OpenAI Ads Manager · advertiser access required. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."
  },
  {
    "title": "Creative and copy preparation",
    "copy": "Review the offer on its landing page. Build the first version around this specific customer or operational need. A first delivery for review."
  },
  {
    "title": "Campaign setup when access is available",
    "copy": "Project management tools for agencies. Check that the experience or handoff works in the environment people actually use. A checked customer flow."
  },
  {
    "title": "Measurement planning",
    "copy": "Review the offer on its landing page. Test the setup and document what is verified before judging performance. Verified reporting definitions."
  }
];

const offerings = [
  {
    id: "search-setup",
    title: "Search Console and sitemap setup",
    copy: "We help verify your property, check and submit your XML sitemap, inspect priority URLs, and show you how to read search performance.",
    guides: ["How to submit an XML sitemap to Google", "How to set up and use Google Search Console"],
    href: "/services/technical-seo",
    link: "Explore ChatGPT Advertising",
  },
  {
    id: "keywords-and-site-health",
    title: "Keyword research, rankings, and site health",
    copy: "We use Semrush or Ahrefs to research keywords, monitor positions, and review site health. We map findings to the pages that need content changes or technical fixes.",
    guides: ["Semrush guide to keywords, rankings, and site audits", "Ahrefs guide to keywords, rankings, and site audits"],
    href: "/services/on-page-seo",
    link: "Explore ChatGPT Advertising",
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
          <p className={styles.eyebrow} data-site-eyebrow="">How the work fits together</p>
          <h2 id="site-structure-title">{"What goes into "}<span>{"ChatGPT Advertising"}</span></h2>
          <p>{"ChatGPT Advertising for teams that want a clear scope, a tested setup, and reporting they can act on."}</p>
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
    "title": "Advertiser eligibility",
    "copy": "Project management tools for agencies. Review what is already in place and identify gaps that could affect this project. A prioritized audit."
  },
  {
    "title": "Offer and landing-page review",
    "copy": "OpenAI Ads Manager · advertiser access required. Document the requirements and agree on what belongs in the first delivery. A confirmed brief."
  },
  {
    "title": "Creative and copy preparation",
    "copy": "Review the offer on its landing page. Build the first version around this specific customer or operational need. A first delivery for review."
  }
];

export function InternalLinkingHelp() {
  return (
    <section className={styles.dark} aria-labelledby="internal-linking-title">
      <div className={styles.wrap}>
        <div className={styles.linkHelp}>
          <header className={styles.intro}>
            <p className={styles.eyebrow} data-site-eyebrow="">{"ChatGPT Advertising problems"}</p>
            <h2 id="internal-linking-title">{"Where we "}<span>{"usually start"}</span></h2>
            <p>{"Tell us what you’re trying to achieve. We’ll review your current setup and explain which issue is worth tackling first."}</p>
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
