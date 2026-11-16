"use client";

import { useId, useState, type PointerEvent } from "react";
import { ArrowUpRight, BarChart3, MousePointer2, ShoppingBag } from "lucide-react";
import styles from "./pricing-closing.module.css";

const scenarios = [
  { name: "Starting point", visitors: 1000, rate: 2, bars: [26, 32, 39, 44, 50, 55] },
  { name: "More relevant visits", visitors: 1300, rate: 2, bars: [31, 41, 50, 56, 65, 72] },
  { name: "More visits and orders", visitors: 1500, rate: 2.4, bars: [35, 46, 55, 64, 77, 88] },
];

const orderValue = 120;
const number = new Intl.NumberFormat("en-US");
const usd = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});

export function InvestmentGrowth() {
  const [active, setActive] = useState(0);
  const id = useId();
  const scenario = scenarios[active];
  const orders = Math.round(scenario.visitors * scenario.rate / 100);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width || !box.height) return;
    event.currentTarget.style.setProperty("--rx", ((0.5 - (event.clientY - box.top) / box.height) * 12) + "deg");
    event.currentTarget.style.setProperty("--ry", (((event.clientX - box.left) / box.width - 0.5) * 16) + "deg");
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section id="investment-growth" className={styles.dark} aria-labelledby={id + "-title"}>
      <div className={styles.wrap + " " + styles.split}>
        <header>
          <p className={styles.eyebrow} data-site-eyebrow="">The return on your investment</p>
          <h2 id={id + "-title"}>Invest in growth <span>you can measure</span></h2>
          <p>We treat SEO as an investment in bringing the right visitors to your site and giving them a clear reason to buy or get in touch. Our goal is for that work to contribute to profitable growth.</p>
          <p>It’s a recurring process. Each month, we review visibility, visits, and tracked sales or enquiries, then use what we learn to improve the next round of work.</p>
          <a className={styles.cta} href="#request-proposal" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />Discuss your growth goals </a>
        </header>

        <div className={styles.preview}>
          <div className={styles.scenarios} role="group" aria-label="Choose a growth scenario">
            {scenarios.map(({ name }, index) => (
              <button key={name} type="button" aria-pressed={active === index}
                aria-controls={id + "-figures"} onClick={() => setActive(index)}>{name}</button>
            ))}
          </div>
          <div className={styles.stage} onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
            <div className={styles.chart3d}>
              <p className={styles.chartTitle}><BarChart3 size={18} aria-hidden="true" /> Illustrative growth scenario</p>
              <div className={styles.bars} aria-hidden="true" key={scenario.name}>
                {scenario.bars.map((height, index) => (
                  <span key={index} style={{ height: height + "%", animationDelay: index * 65 + "ms" }} />
                ))}
              </div>
              <dl id={id + "-figures"} className={styles.figures} aria-live="polite" aria-atomic="true">
                <div><dt><MousePointer2 size={14} aria-hidden="true" /> Monthly visits</dt><dd>{number.format(scenario.visitors)}</dd></div>
                <div><dt><ShoppingBag size={14} aria-hidden="true" /> Orders</dt><dd>{orders}</dd></div>
                <div><dt><ArrowUpRight size={14} aria-hidden="true" /> Revenue</dt><dd>{usd.format(orders * orderValue)}</dd></div>
              </dl>
            </div>
          </div>
          <p className={styles.note}>Example only. Orders use a {scenario.rate}% conversion rate at $120 per order. To assess profit, compare sales contribution after fulfilment with the cost of the work.</p>
        </div>
      </div>
    </section>
  );
}
