 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Find the destination",
    "screen": "replacement filter for model X",
    "detail": "A shopper searches for a specific part. The product URL needs a clear path from the catalogue.",
    "measure": "Discovery from relevant searches or referrals"
  },
  {
    "label": "Open a usable page",
    "screen": "Product page with one preferred URL",
    "detail": "The destination loads, shows the right product, and works on mobile.",
    "measure": "Visits to the intended destination"
  },
  {
    "label": "Complete the next step",
    "screen": "Reach the product page and check stock",
    "detail": "The shopper can check availability or add the product to their cart.",
    "measure": "Tracked enquiries or other agreed actions"
  }
];

export function OrganicJourney() {
  const [active, setActive] = useState(0);
  const step = journey[active];

  return (
    <section className={styles.light} aria-labelledby="organic-journey-title">
      <div className={`${styles.wrap} ${styles.split}`}>
        <div>
          <p className={styles.eyebrow} data-site-eyebrow="">The organic traffic journey</p>
          <h2 id="organic-journey-title">From a search <span>{"to the next action"}</span></h2>
          <p className={styles.lead}>{"Follow the example from discovery to the action we want to measure."}</p>
        </div>
        <div>
          <div className={styles.journeyControls} role="group" aria-label="Organic traffic journey">
            {journey.map((item, index) => (
              <button type="button" key={item.label} aria-pressed={index === active} onClick={() => setActive(index)}>
                {item.label} <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.journeyOutput} aria-live="polite" aria-atomic="true">
            <div className={styles.journeyCard} key={step.label}>
              <div className={styles.journeyScreen}><Search size={20} aria-hidden="true" /><strong>{step.screen}</strong></div>
              <p>{step.detail}</p>
              <p className={styles.measure}><strong>What we track</strong>{step.measure}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
