import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import styles from "./pricing-plans.module.css";

const plans = [
  {
    name: "Starter",
    amount: "$650",
    prefix: "From",
    cadence: "Every 30 days",
    summary: "For businesses that need a clear SEO starting point and a focused set of improvements.",
    items: [
      "Baseline SEO review and prioritized action plan",
      "On-page improvements for agreed priority pages",
      "Search visibility and progress reporting",
    ],
    action: "Enquire about Starter",
  },
  {
    name: "Essential",
    amount: "$1,500",
    prefix: "",
    cadence: "Every 30 days",
    summary: "For businesses that need ongoing SEO, a better website, and a steady publishing schedule.",
    items: [
      "Website redesign included in the agreed plan scope",
      "12 months of complimentary website bug support",
      "Hosting migration",
      "Eight blog posts per month",
      "Setup or cleanup of relevant business directory profiles",
      "Ongoing SEO improvements and performance reporting",
    ],
    action: "Enquire about Essential",
  },
  {
    name: "Custom",
    amount: "Request a quotation",
    prefix: "",
    cadence: "One-time or recurring",
    summary: "For a specific project, a larger site, or a mix of services that needs its own scope.",
    items: [
      "Deliverables agreed around your priorities",
      "Quote based on scope, specialist hours, and complexity",
      "Clear billing schedule and review points",
    ],
    action: "Request a custom quote",
  },
];

export function PricingPlans() {
  return (
    <section id="seo-plans" className={styles.section} aria-labelledby="seo-plans-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">SEO investment plans</p>
          <h2 id="seo-plans-title">Choose the scope <span>your business needs</span></h2>
          <p>Start with the essentials, combine SEO with a website redesign, or request a quote for a specific project. Prices are in USD.</p>
        </header>

        <div className={styles.plans}>
          {plans.map((plan) => (
            <article className={styles.plan} data-featured={plan.name === "Essential"} key={plan.name}>
              <span className={styles.cadence}>{plan.cadence}</span>
              <h3>{plan.name}</h3>
              <p className={styles.price}>
                {plan.prefix && <span>{plan.prefix} </span>}
                <strong>{plan.amount}</strong>
                {plan.cadence === "Every 30 days" && <span> / 30 days</span>}
              </p>
              <p>{plan.summary}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <Link className={styles.cta}
                href={"/contact?request=" + encodeURIComponent(plan.name + " SEO plan quotation") + "#request-proposal"} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
                {plan.action}
              </Link>
            </article>
          ))}
        </div>

        <aside className={styles.billing} aria-labelledby="seo-billing-title">
          <h3 id="seo-billing-title">How billing works</h3>
          <p><strong>Recurring.</strong> Starter and Essential are billed every 30 calendar days. Ongoing PPC or social media management is quoted separately when requested.</p>
          <p><strong>One-time.</strong> Standalone redesigns, migrations, and other defined projects can be quoted once. The redesign promotion below is a one-time offer.</p>
          <p>Costs vary by service, scope, and the team required. Your quotation and invoice identify the agreed deliverables and how each item is billed.</p>
        </aside>
      </div>
    </section>
  );
}
