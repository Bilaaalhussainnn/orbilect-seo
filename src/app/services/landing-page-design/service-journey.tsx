 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Find the opportunity",
    "screen": "A visitor can’t confirm whether you serve their area",
    "detail": "Start with message match and confirm the audience, access, and deliverables. Example: A visitor can’t confirm whether you serve their area.",
    "measure": "Landing-page visits"
  },
  {
    "label": "Deliver the work",
    "screen": "Offer and page copy",
    "detail": "Work through mobile layout and offer and page copy. Verify the work against the agreed brief before release.",
    "measure": "Form starts"
  },
  {
    "label": "Verify the result",
    "screen": "Complete a relevant enquiry form",
    "detail": "Review completed enquiries and the quality of the outcome. Document what changed and agree on the next priority.",
    "measure": "Completed enquiries"
  }
];

export function OrganicJourney() {
  const [active, setActive] = useState(0);
  const step = journey[active];

  return (
    <section className={styles.light} aria-labelledby="organic-journey-title">
      <div className={`${styles.wrap} ${styles.split}`}>
        <div>
          <p className={styles.eyebrow} data-site-eyebrow="">The delivery journey</p>
          <h2 id="organic-journey-title">{"From the first step "}<span>{"to a useful outcome"}</span></h2>
          <p className={styles.lead}>{"Follow a landing page optimization example from the initial opportunity through delivery and measurement."}</p>
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
