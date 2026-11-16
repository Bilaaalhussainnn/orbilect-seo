 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Get discovered",
    "screen": "commercial roofing contractor reviews",
    "detail": "A facilities manager finds a roofing company through a trade association directory.",
    "measure": "Discovery from relevant searches or referrals"
  },
  {
    "label": "Verify the details",
    "screen": "Industry association member profile",
    "detail": "They check service coverage, qualifications, and the experiences customers describe.",
    "measure": "Visits to the intended destination"
  },
  {
    "label": "Reach the right page",
    "screen": "Compare credentials and request a quote",
    "detail": "The association profile takes them to the commercial roofing page, where they can request a quote.",
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
