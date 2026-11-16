"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Clock3, FileText, Layers, Search, Wrench } from "lucide-react";
import styles from "./pricing-factors.module.css";

const factors = [
  {
    icon: Search,
    name: "Your starting point",
    cost: "We look at the condition of your site, accounts, and tracking. Diagnosing an indexing problem or untangling an existing ad account takes different work from improving a healthy setup.",
    value: "A prioritized plan that shows what to fix first, what can wait, and why.",
  },
  {
    icon: Layers,
    name: "Pages, products, locations, and campaigns",
    cost: "We estimate the work for the pages, products, markets, or campaigns in scope. A single-location site, a multi-market catalogue, and several ad accounts require different levels of review and implementation.",
    value: "A defined scope that tells you exactly which parts of your business the proposal covers.",
  },
  {
    icon: Clock3,
    name: "Specialists and hours",
    cost: "We estimate the hours each specialist needs for research, production, implementation, reviews, and testing. The number of people involved depends on the work we agree to deliver.",
    value: "Clear responsibilities and a delivery plan your team can review before work begins.",
  },
  {
    icon: FileText,
    name: "Content and creative",
    cost: "We factor in research, writing, design, and approvals. Updating an existing service page takes a different effort from building a landing page or producing several ad variants.",
    value: "Pages or creative that answer the questions customers ask before they enquire, book, or buy.",
  },
  {
    icon: Wrench,
    name: "Implementation and technical complexity",
    cost: "The platform, integrations, and access determine how changes can be made. A theme edit, a checkout integration, and a website migration require different testing and launch plans.",
    value: "Tested changes, documented handoff, and clear ownership of any remaining work.",
  },
  {
    icon: BarChart3,
    name: "Ongoing management and reporting",
    cost: "Monthly work reflects how often we review campaigns, publish updates, and report. When paid advertising is in scope, we show media spend separately from our management fee.",
    value: "A regular review of the measures we agreed on, with specific decisions on what to improve next.",
  },
];

export function PricingFactors() {
  const [active, setActive] = useState(0);
  const id = useId();
  const factor = factors[active];
  const Icon = factor.icon;

  return (
    <section id="service-intro" className={styles.section} aria-labelledby="pricing-factors-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">How we calculate pricing</p>
          <h2 id="pricing-factors-title">What shapes your quote <span>and what you get for it</span></h2>
          <p>We price the agreed scope, specialist hours, and level of support. Your proposal explains the work behind the figure, including what we’ll deliver and what we’ll measure.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.accordion}>
            {factors.map(({ icon: RowIcon, name, cost }, index) => (
              <div key={name} className={styles.row} data-open={active === index}>
                <h3>
                  <button id={id + "-button-" + index} type="button"
                    aria-expanded={active === index} aria-controls={id + "-panel-" + index}
                    onClick={() => setActive(index)}>
                    <RowIcon size={19} aria-hidden="true" />
                    <span>{name}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div id={id + "-panel-" + index} className={styles.answer}
                  aria-labelledby={id + "-button-" + index} aria-hidden={active !== index}>
                  <div><p>{cost}</p></div>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.preview} aria-label="What this part of your investment delivers">
            <div className={styles.value} key={factor.name}>
              <div className={styles.icon}><Icon size={24} aria-hidden="true" /></div>
              <p className={styles.valueLabel}>What you get</p>
              <h3>{factor.name}</h3>
              <p>{factor.value}</p>
            </div>
          </aside>
        </div>

        <div className={styles.footer}>
          <div>
            <h3>Get a quote for your scope</h3>
            <p>Share your website, goals, and timeline. We’ll use them to recommend where to start.</p>
          </div>
          <Link className={styles.cta} href="/contact?request=Service%20investment%20quote#request-proposal" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
            Request a tailored proposal 
          </Link>
        </div>
      </div>
    </section>
  );
}
