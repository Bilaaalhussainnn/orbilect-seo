 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Arrive on the right page",
    "screen": "book a brake inspection near me",
    "detail": "A driver opens the brake inspection page from search or a listing.",
    "measure": "Discovery from relevant searches or referrals"
  },
  {
    "label": "Find the information they need",
    "screen": "Mobile brake inspection page",
    "detail": "They can confirm location, what the inspection covers, and how to schedule it on mobile.",
    "measure": "Visits to the intended destination"
  },
  {
    "label": "Book with confidence",
    "screen": "Complete the form and receive confirmation",
    "detail": "The form works, the confirmation explains what happens next, and the enquiry reaches the shop.",
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
