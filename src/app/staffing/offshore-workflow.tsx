"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./offshore-workflow.module.css";

type Step = { title: string; copy: string; icon: ReactNode };

const stageNames = ["Brief", "Sourcing", "Assessment", "Shortlist", "Contract", "Start"];

const previews = [
  { name: "Role brief", items: ["Skills and responsibilities", "Working hours and overlap", "Scope and hiring plan"] },
  { name: "Recruitment plan", items: ["Talent market research", "Job description", "Candidate sourcing"] },
  { name: "Candidate assessment", items: ["Experience and availability", "Practical test", "Interview findings"] },
  { name: "Client shortlist", items: ["Candidate profiles", "Assessment summaries", "Your final selection"] },
  { name: "Staffing agreement", items: ["Fees and coverage", "Confidentiality and notice", "Start date and onboarding"] },
  { name: "First working day", items: ["Approved office workstation", "Client-authorized access", "Direct communication with your team"] },
];

export function OffshoreWorkflow({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const cards = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let frame: number | null = null;

    function update() {
      frame = null;
      const readingLine = window.innerHeight * 0.48;
      let next = 0;

      cards.current.forEach((card, index) => {
        if (card && card.getBoundingClientRect().top <= readingLine) next = index;
      });

      setActive(next);
    }

    function schedule() {
      if (frame === null) frame = requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const preview = previews[active];

  return (
    <div className={styles.workflow}>
      <div className={styles.pinned}>
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.deck}>
            <div className={styles.document} key={active}>
              <div className={styles.documentTop}>
                <span className={styles.documentIcon}>{steps[active].icon}</span>
                <span>{stageNames[active]}</span>
              </div>
              <strong>{preview.name}</strong>
              <ul>
                {preview.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <ol className={styles.steps}>
        {steps.map(({ title, copy, icon }, index) => (
          <li key={title}
            id={"offshore-step-" + (index + 1)}
            ref={(node) => { cards.current[index] = node; }}
            data-active={index === active}>
            <div className={styles.stepMeta}>
              <span>{icon}</span>
              <small>{stageNames[index]}</small>
            </div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
