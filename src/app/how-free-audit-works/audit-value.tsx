"use client";

import { useId, useState } from "react";
import { ArrowRight, Clock, ListChecks, ScanSearch } from "lucide-react";
import guide from "./audit-guide.module.css";
import styles from "./audit-value.module.css";

const steps = [
  {
    label: "Pinpoint the issue",
    icon: ScanSearch,
    angle: -16,
    title: "Find the cause before starting the fix",
    copy: "An audit connects each issue to the pages it affects. We look at the evidence to understand whether a page is hard to find because of indexing, weak internal links, or content that misses what customers searched for.",
    example: "If an important service page is blocked from indexing, we check why before spending time rewriting it.",
  },
  {
    label: "Prioritize the fixes",
    icon: ListChecks,
    angle: 12,
    title: "Fix what affects your priority pages first",
    copy: "We consider the pages affected, the likely impact, and the effort involved. When one template causes the same problem across several pages, we look for a fix your team can apply once and verify across those pages.",
    example: "If the same title appears across dozens of product pages, we review the template that generates it.",
  },
  {
    label: "Save time and resources",
    icon: Clock,
    angle: -7,
    title: "Give each team a clear place to start",
    copy: "The report gives developers, writers, and marketers a shared list of priorities. Each team can see what to change, why it matters, and how to check the fix, which can reduce duplicated work and unnecessary revisions.",
    example: "If a form works but its conversion event is missing, the tracking team can fix the measurement before anyone redesigns the form.",
  },
];

export default function AuditValue() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const step = steps[active];
  const Icon = step.icon;

  return (
    <section className={styles.section} aria-labelledby="audit-value-title">
      <div className={guide.wrap}>
        <header className={guide.heading}>
          <p className={guide.eyebrow} data-site-eyebrow="" data-reveal="off">Why an audit matters</p>
          <h2 id="audit-value-title">Find the issue <span>before you spend time fixing it</span></h2>
          <p>An audit helps us pinpoint what’s holding your site back and focus your team’s time and budget on the work that matters most.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.controls} role="group" aria-label="Benefits of an SEO audit">
            {steps.map(({ label, icon: StepIcon }, index) => (
              <button key={label} type="button" aria-pressed={index === active}
                aria-controls={panelId} onClick={() => setActive(index)}>
                <StepIcon size={19} aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className={styles.panel} id={panelId}>
            <div className={styles.stage} aria-hidden="true">
              <div className={styles.model} style={{ transform: `rotateX(12deg) rotateY(${step.angle}deg)` }}>
                <span className={styles.back} />
                <span className={styles.middle} />
                <span className={styles.face}><Icon key={step.label} size={32} /></span>
              </div>
            </div>
            <div aria-live="polite" aria-atomic="true">
              <div key={step.label} className={styles.readout}>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <div className={styles.example}>
                  <strong>Example</strong>
                  <p>{step.example}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
