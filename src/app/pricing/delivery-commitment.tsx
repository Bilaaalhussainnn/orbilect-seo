"use client";

import { useId, useState } from "react";
import { ArrowRight, CalendarCheck, ClipboardCheck, FileText, TrendingUp } from "lucide-react";
import styles from "./delivery-commitment.module.css";

const stages = [
  {
    label: "Scope", icon: FileText, document: "Project brief",
    title: "Agree on what success looks like",
    copy: "Before work starts, we agree on what’s included, what we need from your team, and how you’ll review the work.",
    example: [["Goal", "More qualified quote enquiries"], ["First deliverable", "Review of priority service pages"], ["Approval", "Agree the brief before work starts"]],
  },
  {
    label: "Schedule", icon: CalendarCheck, document: "Delivery schedule",
    title: "Know what’s due and when",
    copy: "You get milestones and review dates up front. If a deadline is at risk, we’ll tell you what’s affected and when to expect the next update.",
    example: [["First milestone", "Review the priority fixes"], ["Client review", "Approve page copy and layout"], ["Publish", "Confirm the release window"]],
  },
  {
    label: "Quality", icon: ClipboardCheck, document: "Pre-launch checks",
    title: "Test the work before handoff",
    copy: "We check deliverables against the brief. For website changes, that can include reviewing mobile layouts, testing forms, and verifying tracking where it’s in scope.",
    example: [["Content", "Check copy against the approved brief"], ["Mobile", "Test the page and enquiry form"], ["Handoff", "Record what passed and what needs review"]],
  },
  {
    label: "Reporting", icon: TrendingUp, document: "Progress report",
    title: "See what changed and what comes next",
    copy: "We report what shipped and what the available data shows. On recurring plans, we use that review to agree on the next round of work.",
    example: [["Delivered", "Updated priority pages"], ["Measure", "Organic clicks and tracked enquiries"], ["Next review", "Check which pages generate enquiries"]],
  },
];

export function DeliveryCommitment() {
  const id = useId();
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const Icon = stage.icon;

  return (
    <section id="delivery-commitment" className={styles.section} aria-labelledby={id + "-title"}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Our commitment</p>
          <h2 id={id + "-title"}>Know what to expect <span>at every handoff</span></h2>
          <p>From the first brief to the progress report, you’ll know what we’re working on, when it’s due, and how we check the quality.</p>
        </header>

        <div className={styles.layout}>
          <div>
            <div className={styles.controls} role="group" aria-label="Explore the project stages">
              {stages.map(({ label, icon: StageIcon }, index) => (
                <button key={label} type="button" aria-pressed={index === active}
                  aria-controls={id + "-preview"} onClick={() => setActive(index)}>
                  <StageIcon size={20} aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className={styles.explanation} aria-live="polite" aria-atomic="true">
              <h3>{stage.title}</h3>
              <p>{stage.copy}</p>
            </div>
          </div>

          <div id={id + "-preview"} className={styles.stage}>
            <div className={styles.stack}>
              <article className={styles.document} key={stage.label} aria-label={"Example " + stage.document.toLowerCase()}>
                <header>
                  <span className={styles.icon}><Icon size={22} aria-hidden="true" /></span>
                  <div><p>Example deliverable</p><h3>{stage.document}</h3></div>
                </header>
                <dl>
                  {stage.example.map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
