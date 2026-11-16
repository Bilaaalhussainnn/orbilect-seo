 "use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    "label": "Search",
    "screen": "emergency commercial HVAC repair",
    "detail": "A facilities manager needs an urgent repair. We use the search terms report to check whether campaigns are reaching that kind of customer.",
    "measure": "Relevant searches and ad clicks"
  },
  {
    "label": "Click",
    "screen": "Commercial HVAC emergency service",
    "detail": "The ad leads to a page that explains commercial coverage, availability, and what to do next.",
    "measure": "Landing-page visits and conversion rate"
  },
  {
    "label": "Enquire",
    "screen": "Call for a commercial repair quote",
    "detail": "The customer calls or submits a form. Where tracking allows, we check whether the enquiry matches the agreed lead criteria.",
    "measure": "Qualified enquiries and cost per qualified lead"
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
          <p className={styles.lead}>Follow one commercial HVAC enquiry from paid search to a tracked call.</p>
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
