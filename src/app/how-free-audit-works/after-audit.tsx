"use client";

import { useId, useState, type PointerEvent } from "react";
import { ArrowRight, CalendarDays, FileText, Lock, Users } from "lucide-react";
import guide from "./audit-guide.module.css";
import styles from "./after-audit.module.css";

const steps = [
  {
    icon: FileText,
    title: "Receive your report and quotation",
    copy: "Once the audit is complete, we send you the report alongside our proposed changes, recommended services, and a quotation. You can see which findings each recommendation addresses and what the work would cost.",
  },
  {
    icon: CalendarDays,
    title: "Talk through the findings",
    copy: "We set up a call to walk you through the areas for improvement, explain what we’d tackle first, and answer your questions about the work and timing.",
  },
  {
    icon: Users,
    title: "Agree on the work together",
    copy: "We decide together which services to move forward with. We confirm the scope, deliverables, timing, and price before sending the invoice and non-disclosure agreement (NDA).",
  },
  {
    icon: Lock,
    title: "Share what we need to get started",
    copy: "Once the NDA is signed, we agree on how to share sensitive information and give our team the access needed for the work. Where a platform supports it, invite us through your account settings and grant permissions for the tasks we’ve agreed on.",
  },
];

const labels = ["Report and quote", "Review call", "Scope and NDA", "Secure access"];

export default function AfterAudit() {
  const [active, setActive] = useState(0);
  const detailId = useId();
  const step = steps[active];

  function moveStack(event: PointerEvent<HTMLDivElement>) {
    if (
      !["mouse", "pen"].includes(event.pointerType) ||
      !window.matchMedia("(any-hover: hover) and (prefers-reduced-motion: no-preference)").matches
    ) return;

    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    stage.style.setProperty("--x", `${x * 24}px`);
    stage.style.setProperty("--y", `${y * 18}px`);
    stage.style.setProperty("--rx", `${-y * 26}deg`);
    stage.style.setProperty("--ry", `${x * 34}deg`);
  }

  function resetStack(event: PointerEvent<HTMLDivElement>) {
    for (const property of ["--x", "--y", "--rx", "--ry"]) {
      event.currentTarget.style.removeProperty(property);
    }
  }

  return (
    <section className={styles.section} aria-labelledby="after-audit-title">
      <div className={guide.wrap}>
        <header className={guide.heading}>
          <p className={guide.eyebrow} data-site-eyebrow="" data-reveal="off">What happens after the audit</p>
          <h2 id="after-audit-title">From your audit report <span>to project kickoff</span></h2>
          <p>See what you receive, what we decide together, and when we ask for access to begin.</p>
        </header>

        <div className={styles.walkthrough}>
          <div className={styles.sequence} role="group" aria-label="Steps after the audit">
            {steps.map(({ icon: Icon, title }, index) => (
              <button
                key={title}
                type="button"
                aria-pressed={active === index}
                aria-controls={detailId}
                onClick={() => setActive(index)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{labels[index] ?? title}</span>
                <ArrowRight className={styles.arrow} size={15} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div
            className={styles.stage}
            aria-hidden="true"
            onPointerMove={moveStack}
            onPointerLeave={resetStack}
            onPointerCancel={resetStack}
          >
            <div className={styles.orbit} />
            <div className={styles.model}>
              {steps.map(({ icon: Icon, title }, index) => (
                <div
                  className={styles.card}
                  key={title}
                  data-depth={(index - active + steps.length) % steps.length}
                >
                  <span className={styles.cardIcon}><Icon size={27} /></span>
                  <strong>{labels[index] ?? title}</strong>
                  <span className={styles.cardMark} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.detail} id={detailId} aria-live="polite" aria-atomic="true">
            <div key={step.title} className={styles.readout}>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
