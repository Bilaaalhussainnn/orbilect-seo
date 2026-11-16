"use client";

import WorkBehindTheScenes from "./work-behind-the-scenes";
import { useState } from "react";
import {
  CalendarDays, ChartNoAxesColumnIncreasing,
  ClipboardCheck, Target,
} from "lucide-react";
import FinalCta from "../_home/final-cta";
import faq from "../_home/editorial/editorial.module.css";
import styles from "./how-we-work-closing.module.css";

const commitments = [
  {
    label: "Goals",
    icon: Target,
    title: "Agree on what success looks like",
    copy: "Before kickoff, we ask what you need the project to achieve. We agree on the work, the timeline, and how we’ll measure progress, whether that means more qualified enquiries, more bookings, or a smoother checkout.",
  },
  {
    label: "Delivery",
    icon: CalendarDays,
    title: "Keep you informed before a deadline slips",
    copy: "You’ll know what’s due, who owns it, and when we need your input. If something puts delivery at risk, we explain what changed, what we can still complete, and what the revised plan looks like.",
  },
  {
    label: "Quality",
    icon: ClipboardCheck,
    title: "Review the work before handoff",
    copy: "We check the deliverables against the brief. Depending on the project, that can include testing forms and tracking, reviewing mobile layouts, or checking revised pages before they go live. We address feedback within the agreed scope.",
  },
  {
    label: "Follow-through",
    icon: ChartNoAxesColumnIncreasing,
    title: "Take responsibility when something falls short",
    copy: "We review the work with you, explain where it fell short, and agree on what we’ll correct and by when. If we miss an agreed commitment, we discuss the remedy that applies under your agreement.",
  },
];

const questions = [
  ["What happens in the first conversation?", "We ask about your business, who you want to reach, what you’ve already tried, and what you need to improve. That helps us focus the initial review on the work that matters to you."],
  ["What do you review before sending a proposal?", "We review the website and the information you share. Depending on the project, that can include search visibility, priority pages, campaign performance, or the path from a visit to an enquiry."],
  ["What will my proposal include?", "Your proposal sets out the work, deliverables, estimated schedule, fees, and what we need from your team. We review the scope with you before kickoff."],
  ["What access will you need from us?", "We ask for the access required for the agreed work. That may include your CMS, analytics, Search Console, or advertising account. We agree who grants access and who approves changes."],
  ["Can you work with our current developers or marketing team?", "Yes. We agree who implements each change, who reviews it, and who handles publishing so your team can coordinate the work alongside existing projects."],
  ["Who approves changes before they go live?", "We agree on approval responsibilities at kickoff. Where your approval is required, we share the change and what to check before it’s published."],
  ["How often will I receive updates?", "We set the reporting and check-in schedule during kickoff. Updates cover completed work, what’s coming next, and any decisions or blockers that need your attention."],
  ["How do you measure whether the work is meeting our goals?", "We establish a baseline and agree on the metrics before work begins. These can include search clicks, qualified enquiries, bookings, or sales where tracking is in place."],
  ["What if the scope or timeline needs to change?", "We explain why the change is needed and what it means for timing, deliverables, or fees. We agree on the revised plan with you before proceeding with the additional work."],
  ["What happens if a deliverable falls short of what we agreed?", "We review it against the brief, confirm what needs correcting, and agree on a follow-up date. Any other remedy is handled under your agreement."],
];

export default function HowWeWorkClosing() {
  const [active, setActive] = useState(0);
  const commitment = commitments[active];
  const Icon = commitment.icon;

  return (
    <>
      <section className={styles.satisfaction} aria-labelledby="work-satisfaction">
        <div className={`${styles.wrap} ${styles.layout}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">Client satisfaction</p>
            <h2 id="work-satisfaction">Your goals shape <span>the work we do</span></h2>
            <p>We ask what would make this project worthwhile for your business, then use that answer to guide the scope, our quality checks, and the conversations we have when something needs to change.</p>
          </div>

          <div className={styles.workspace}>
            <div className={styles.options} role="group" aria-label="Our commitments">
              {commitments.map(({ label, icon: OptionIcon }, index) => (
                <button key={label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
                  <OptionIcon size={17} aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
            <div className={styles.panel} aria-live="polite" aria-atomic="true">
              <div key={commitment.label} className={styles.panelContent}>
                <div className={styles.symbol} aria-hidden="true"><Icon size={26} /></div>
                <div>
                  <h3>{commitment.title}</h3>
                  <p>{commitment.copy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <WorkBehindTheScenes />

      <section id="faqs" className={faq.faqs} aria-labelledby="work-faq-heading">
        <div className={`${faq.container} ${faq.faqLayout}`}>
          <div className={faq.faqIntro}>
            <p data-site-eyebrow="" data-reveal="off">{"Before we start"}</p>
            <h2 data-site-heading="" id="work-faq-heading"><span>How we work</span><br />FAQs</h2>
            <div className={faq.introCard}>
              <h3>Before we start your project</h3>
              <p>Find out how we agree on the scope, publish changes, and measure the result.</p>
            </div>
          </div>
          <div className={faq.questions}>
            {questions.map(([question, answer], index) => (
              <details key={question} name="how-we-work-faq" open={index === 0}>
                <summary>{question}<span className={faq.toggle} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
