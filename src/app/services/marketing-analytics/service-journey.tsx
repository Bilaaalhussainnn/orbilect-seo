 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Find the opportunity",
    "screen": "A submitted form is missing from campaign reports",
    "detail": "Start with measurement plan and confirm the audience, access, and deliverables. Example: A submitted form is missing from campaign reports.",
    "measure": "Test scenarios"
  },
  {
    "label": "Deliver the work",
    "screen": "Event implementation",
    "detail": "Work through consent and tag review and event implementation. Verify the work against the agreed brief before release.",
    "measure": "Events verified"
  },
  {
    "label": "Verify the result",
    "screen": "Verify the event and its source",
    "detail": "Review conversions reconciled and the quality of the outcome. Document what changed and agree on the next priority.",
    "measure": "Conversions reconciled"
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
          <p className={styles.lead}>{"Follow a conversion tracking and analytics example from the initial opportunity through delivery and measurement."}</p>
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
