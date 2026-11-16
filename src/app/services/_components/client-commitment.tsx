"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Handshake, RefreshCw, ShieldCheck } from "lucide-react";
import styles from "./client-commitment.module.css";

const remedies = [
  {
    label: "Refund",
    icon: RefreshCw,
    heading: "Review the affected work for a refund",
    copy: "When a refund applies to the missed commitment, we’ll explain what it covers and how we’ll process it under the agreed project terms.",
  },
  {
    label: "Free or reduced-cost work",
    icon: CalendarCheck,
    heading: "Put useful work back into the project",
    copy: "We may include an extra fix or deliverable at no charge, or reduce the cost of follow-up work that helps you get the result you needed.",
  },
  {
    label: "Other compensation",
    icon: Handshake,
    heading: "Agree on a remedy that fits the impact",
    copy: "Sometimes an additional feature, extra support, or a service credit is more useful. We’ll discuss what would help and confirm what we’ve agreed.",
  },
];

export function ClientCommitment() {
  const [active, setActive] = useState(0);
  const remedy = remedies[active];
  const Icon = remedy.icon;

  return (
    <section className={styles.section} aria-labelledby="client-commitment-title">
      <div className={styles.wrap}>
        <header className={styles.intro}>
          <p className={styles.eyebrow} data-site-eyebrow="">Our commitment to clients</p>
          <h2 id="client-commitment-title">Your satisfaction <span>comes first</span></h2>
          <p>We agree on what we’ll deliver and when. At review milestones, you can see the work, tell us what needs to change, and review the revisions before sign-off.</p>
          <ol className={styles.steps} aria-label="How we stay accountable">
            <li><CalendarCheck aria-hidden="true" size={18} /><span>Agree on the scope and date</span></li>
            <li><ShieldCheck aria-hidden="true" size={18} /><span>Review the work together</span></li>
            <li><Handshake aria-hidden="true" size={18} /><span>Resolve issues directly</span></li>
          </ol>
        </header>

        <div className={styles.promise}>
          <h3>If we miss a promised deadline</h3>
          <p>We’ll tell you what happened, give you a revised plan, and discuss a remedy based on the work affected and what we agreed for your project.</p>
          <div className={styles.options} role="group" aria-label="Explore ways we can make it right">
            {remedies.map(({ label }, index) => (
              <button key={label} type="button" aria-pressed={active === index}
                aria-controls="commitment-remedy" onClick={() => setActive(index)}>
                {label}
              </button>
            ))}
          </div>
          <div id="commitment-remedy" className={styles.output} aria-live="polite" aria-atomic="true">
            <div key={remedy.label} className={styles.remedy}>
              <Icon size={24} aria-hidden="true" />
              <div><h4>{remedy.heading}</h4><p>{remedy.copy}</p></div>
            </div>
          </div>
          <Link className={styles.cta} href="/contact#request-proposal" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
            Talk to us about your project 
          </Link>
        </div>
      </div>
    </section>
  );
}
