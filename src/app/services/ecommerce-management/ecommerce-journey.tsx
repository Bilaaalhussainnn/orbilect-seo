"use client";

import { useState } from "react";
import { ArrowRight, Headset, PackageCheck, ShoppingCart } from "lucide-react";
import styles from "../_components/service-story.module.css";

const journey = [
  {
    label: "Shop",
    icon: ShoppingCart,
    screen: "Find the right product and check out",
    detail: "A shopper arrives from Google Shopping or an organic collection page. The product page shows stock, delivery options, and returns information before checkout.",
    measure: "Product views, checkout starts, and completed purchases",
  },
  {
    label: "Fulfill",
    icon: PackageCheck,
    screen: "Confirm, route, and track the order",
    detail: "Route the paid order to the agreed fulfillment partner or warehouse. Send the shopper a confirmation and tracking update. Flag exceptions to the team.",
    measure: "Order-to-dispatch time and delivery exceptions",
  },
  {
    label: "Support",
    icon: Headset,
    screen: "Answer a question or start a return",
    detail: "A chatbot can answer from approved product and policy information. A human takes over when someone needs to verify an account, approve a refund, or resolve a complaint.",
    measure: "Response time, escalations, and reasons for return",
  },
];

export function EcommerceJourney() {
  const [step, setStep] = useState(journey[0]);
  const Icon = step.icon;

  return (
    <section className={styles.light} aria-labelledby="ecommerce-journey-title">
      <div className={`${styles.wrap} ${styles.split}`}>
        <div>
          <p className={styles.eyebrow} data-site-eyebrow="">The shopper journey</p>
          <h2 id="ecommerce-journey-title">From the first click <span>to after-sales support</span></h2>
          <p className={styles.lead}>Follow an example order through checkout, fulfillment, and support. See where we step in and what we track.</p>
        </div>
        <div>
          <div className={styles.journeyControls} role="group" aria-label="Choose a shopper journey stage">
            {journey.map((item) => (
              <button type="button" key={item.label} aria-pressed={item === step} onClick={() => setStep(item)}>
                {item.label} <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.journeyOutput} aria-live="polite" aria-atomic="true">
            <div className={styles.journeyCard} key={step.label}>
              <div className={styles.journeyScreen}><Icon size={20} aria-hidden="true" /><strong>{step.screen}</strong></div>
              <p>{step.detail}</p>
              <p className={styles.measure}><strong>What we track</strong>{step.measure}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
