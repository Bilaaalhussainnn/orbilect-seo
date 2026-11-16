 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Find a useful collection",
    "screen": "waterproof hiking boots for women",
    "detail": "A shopper searching broadly lands on a collection built around the product type they want.",
    "measure": "Discovery from relevant searches or referrals"
  },
  {
    "label": "Compare the right details",
    "screen": "Women’s waterproof hiking boots collection",
    "detail": "They can check fit, stock, delivery, and returns on the relevant product page.",
    "measure": "Visits to the intended destination"
  },
  {
    "label": "Continue to purchase",
    "screen": "Compare sizes and choose an in-stock product",
    "detail": "The correct variant can be added to the cart, and the journey can be measured where tracking is available.",
    "measure": "Tracked orders or other agreed actions"
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
          <h2 id="organic-journey-title">From a search <span>{"to a purchase"}</span></h2>
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
