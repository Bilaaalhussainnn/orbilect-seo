 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Match the message",
    "screen": "managed IT support for small business",
    "detail": "A business owner searches for IT support. The ad or organic result speaks to the service they need.",
    "measure": "Discovery from relevant searches or referrals"
  },
  {
    "label": "Answer the buying questions",
    "screen": "Managed IT campaign landing page",
    "detail": "The landing page explains coverage, service options, and what the first call involves.",
    "measure": "Visits to the intended destination"
  },
  {
    "label": "Measure the enquiry",
    "screen": "Submit a qualified consultation request",
    "detail": "A form or tracked call reaches the team. We review whether it matches the customer the campaign was built for.",
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
