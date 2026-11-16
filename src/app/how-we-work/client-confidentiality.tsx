"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Lock, ShieldCheck, Users } from "lucide-react";
import styles from "./client-confidentiality.module.css";

const stages = [
  {
    label: "Project access",
    icon: Lock,
    title: "Access follows the scope",
    copy: "We identify the accounts and permissions we need before kickoff. If the work changes, we discuss any additional access with your team.",
    control: "Your team approves who gets access and what they can do.",
  },
  {
    label: "Information handling",
    icon: ShieldCheck,
    title: "Agree on how sensitive information is shared",
    copy: "We agree where project files should be shared and who needs them. If your business has an NDA or specific handling rules, we discuss those requirements before work begins.",
    control: "You tell us which materials need extra care and how your team wants them handled.",
  },
  {
    label: "Handoff",
    icon: Users,
    title: "Close the loop on access",
    copy: "At handoff, we confirm which files and accounts your team owns, what access is still needed, and which project permissions can be removed.",
    control: "Your team decides which permissions stay in place after handoff.",
  },
];

export default function ClientConfidentiality() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const Icon = stage.icon;

  return (
    <section className={styles.section} aria-labelledby="work-confidentiality">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Client confidentiality</p>
          <h2 id="work-confidentiality">How we protect <span>your information</span></h2>
          <p>From your first account invite to final handoff, you know what we need, who needs it, and when access can end.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.options} role="group" aria-label="Confidentiality stages">
            {stages.map(({ label, icon: StageIcon }, index) => (
              <button key={label} type="button" aria-pressed={index === active}
                aria-controls="confidentiality-detail" onClick={() => setActive(index)}>
                <StageIcon size={19} aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div id="confidentiality-detail" className={styles.panel} aria-live="polite" aria-atomic="true">
            <div key={stage.label} className={styles.content}>
              <div className={styles.emblem} aria-hidden="true"><Icon size={26} /></div>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
                <div className={styles.control}>
                  <Check size={17} aria-hidden="true" />
                  <div><strong>What you control</strong><p>{stage.control}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link href="/privacy-policy" className={styles.link}>
          Read our privacy policy <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
