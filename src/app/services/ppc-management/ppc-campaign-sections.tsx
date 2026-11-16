"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./ppc-campaign-sections.module.css";

const formats = [
  {
    name: "Search ads",
    fit: "Local services, B2B providers, and businesses with clear buying intent",
    example: "Emergency commercial HVAC repair",
    work: "Build Google Ads or Microsoft Advertising campaigns around the searches, locations, and services you want. Review actual search terms and exclude irrelevant traffic.",
    metric: "Qualified calls, quote requests, and cost per qualified lead",
  },
  {
    name: "Shopping ads",
    fit: "Ecommerce stores with reliable stock, pricing, and product data",
    example: "A shopper comparing waterproof work boots",
    work: "Review the product feed, group products around margins and availability, and verify that ads lead to the right product pages.",
    metric: "Orders, ad spend, and contribution after advertising",
  },
  {
    name: "Paid social",
    fit: "Brands with a clear audience and an offer worth demonstrating",
    example: "A short product demo for warehouse managers",
    work: "Test creative and audiences on platforms such as Meta, LinkedIn, or TikTok. Match the ad to the landing page and review what happens after the click.",
    metric: "Qualified enquiries, orders, and cost by audience or creative",
  },
  {
    name: "Video and display",
    fit: "Businesses introducing a product or reaching people earlier in the buying process",
    example: "A video showing how a scheduling tool works",
    work: "Choose placements and creative around an awareness or response goal. Separate reach and engagement reporting from direct enquiries.",
    metric: "Reach, relevant visits, and tracked actions",
  },
  {
    name: "Remarketing",
    fit: "Stores and service businesses with eligible past visitors",
    example: "A shopper viewed a product but didn’t buy",
    work: "Where consent and platform rules allow, build audiences around past interactions, exclude people who already converted where appropriate, and give visitors a useful reason to return.",
    metric: "Return visits, conversions, and cost per tracked action",
  },
];

const monthlySteps = [
  ["Build and launch", "Agree on the goal, budget, locations, and what counts as a qualified lead. Build the ads, check landing pages, and test tracking before launch."],
  ["Manage throughout the month", "Review search terms, creative, bids, budget pacing, and the quality of calls or forms. Fix issues as they appear and document meaningful changes."],
  ["Report and plan the next month", "Review spend, qualified leads or sales, and what the business actually earned where data is available. Agree on what to keep, cut, or test next."],
];

const prerequisites = [
  ["Know what a sale is worth", "Estimate what you keep after fulfilment and other variable costs, before ad spend. Use that contribution and your close rate to set a lead cost ceiling."],
  ["Have an offer people can act on", "Give visitors a clear reason to choose you, a landing page that answers buying questions, and an obvious way to call, book, or buy."],
  ["Track outcomes you can trust", "Test calls, forms, or purchase events. Decide how your team will mark qualified enquiries and reconcile them with sales."],
  ["Budget for a useful test", "Allow enough room to test a focused market and collect data. Account for media, management, and any landing-page work separately."],
  ["Be ready to fulfil and follow up", "Confirm stock, appointment capacity, and who responds to leads. Review missed calls and slow follow-up before adding spend."],
];

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export function PpcCampaignSections() {
  const [active, setActive] = useState(0);
  const [contribution, setContribution] = useState("600");
  const [closeRate, setCloseRate] = useState("20");
  const format = formats[active];
  const value = Number(contribution);
  const rate = Number(closeRate);
  const valid = contribution.trim() !== "" && closeRate.trim() !== "" &&
    Number.isFinite(value) && value >= 0 && Number.isFinite(rate) && rate >= 0 && rate <= 100;

  return (
    <>
      <section id="ppc-campaigns" className={styles.dark} aria-labelledby="service-process-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">PPC campaign management</p>
            <h2 id="service-process-title">Choose the right campaign. <span>Improve it every month.</span></h2>
            <p>Paid search can bring people to your site while they’re actively looking for what you sell. Service businesses can use it to attract calls and quotes. Ecommerce stores can reach shoppers comparing products. B2B teams can use it to test demand for a specific offer.</p>
          </header>
          <div className={styles.layout}>
            <div className={styles.controls} role="group" aria-label="Explore campaign types">
              {formats.map(({ name }, index) => (
                <button key={name} type="button" aria-pressed={active === index}
                  aria-controls="ppc-format-panel" onClick={() => setActive(index)}>
                  {name}<ArrowRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div id="ppc-format-panel" className={styles.panel} aria-live="polite" aria-atomic="true">
              <div key={format.name} className={styles.reveal}>
                <p className={styles.example}>{format.example}</p>
                <h3>{format.name}</h3>
                <dl>
                  <div><dt>Who it suits</dt><dd>{format.fit}</dd></div>
                  <div><dt>What we do</dt><dd>{format.work}</dd></div>
                  <div><dt>What we measure</dt><dd>{format.metric}</dd></div>
                </dl>
              </div>
            </div>
          </div>
          <h3 className={styles.subheading}>What monthly management includes</h3>
          <ol className={styles.steps} role="list">
            {monthlySteps.map(([title, copy]) => (
              <li key={title}><h4>{title}</h4><p>{copy}</p></li>
            ))}
          </ol>
          <p className={styles.spend}>We agree on the monthly management scope and report media spend separately from our fee.</p>
        </div>
      </section>

      <section id="ppc-prerequisites" className={styles.light} aria-labelledby="ppc-prerequisites-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Before you pay for traffic</p>
            <h2 id="ppc-prerequisites-title">What a profitable <span>PPC campaign needs</span></h2>
            <p>Check the numbers and the customer journey before you set a budget. These are the questions we work through with you before launch.</p>
          </header>
          <div className={styles.layout + " " + styles.readiness}>
            <div className={styles.checklist}>
              {prerequisites.map(([title, copy], index) => (
                <details key={title} name="ppc-readiness" open={index === 0}>
                  <summary>{title}<span aria-hidden="true">+</span></summary>
                  <p>{copy}</p>
                </details>
              ))}
            </div>
            <div className={styles.calculator}>
              <h3>Estimate your break-even cost per lead</h3>
              <label>Contribution per sale before ad spend (USD)
                <input type="number" min="0" step="any" value={contribution}
                  onChange={(event) => setContribution(event.target.value)} />
              </label>
              <label>Lead-to-sale rate (%)
                <input type="number" min="0" max="100" step="any" value={closeRate}
                  onChange={(event) => setCloseRate(event.target.value)} />
              </label>
              <div className={styles.result} aria-live="polite">
                <strong>{valid ? usd.format(value * rate / 100) : "—"}</strong>
                <span>{valid ? "Break-even ad spend per lead" : "Enter a nonnegative amount and a close rate from 0% to 100%."}</span>
              </div>
              <p>This estimate multiplies contribution per sale by your close rate. It excludes management fees and other overhead. Set a lower target if you need room for those costs and profit.</p>
              <a className={styles.cta} href="#request-proposal" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />Discuss your PPC campaign </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
