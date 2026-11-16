"use client";

import { useId, useState, type PointerEvent } from "react";
import { CalendarDays, ClipboardCheck, Code2, Users } from "lucide-react";
import styles from "./employee-spotlight.module.css";

const contributions = [
  {
    label: "Plan the work",
    icon: CalendarDays,
    title: "Keep each milestone on track",
    copy: "Project coordinators and workforce planners connect deadlines to the people, approvals, and resources each task needs. They spot scheduling conflicts early and help teams keep work moving.",
    result: "Every milestone has an owner and a clear next step.",
  },
  {
    label: "Build and deliver",
    icon: Code2,
    title: "Turn the brief into work clients can use",
    copy: "Our search specialists, writers, designers, and developers bring the brief to life. They compare notes as they work so a change to a page, campaign, or release makes sense across the project.",
    result: "The work reflects the client’s priorities and is ready for review.",
  },
  {
    label: "Check the details",
    icon: ClipboardCheck,
    title: "Give every handoff a quality check",
    copy: "QA specialists and peer reviewers check deliverables against the brief. They test what matters for the project, flag issues while there’s still time to fix them, and verify the corrections.",
    result: "Clients get work that has been reviewed and tested before handoff.",
  },
  {
    label: "Support the team",
    icon: Users,
    title: "Make good work possible behind the scenes",
    copy: "Training, IT, and operations colleagues help people learn new workflows, get the access they need, and resolve interruptions. Their work gives delivery teams more time to focus on the client.",
    result: "Teams have the tools, guidance, and support to deliver consistently.",
  },
];

export default function EmployeeSpotlight() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = contributions[active];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const stage = event.currentTarget;
    const { left, top, width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;

    stage.style.setProperty("--rx", `${(.5 - (event.clientY - top) / height) * 20}deg`);
    stage.style.setProperty("--ry", `${((event.clientX - left) / width - .5) * 28}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section className={styles.section} aria-labelledby="employee-spotlight-title">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">
            The driving force behind Orbilect SEO
          </p>
          <h2 id="employee-spotlight-title">The people who <span>make it possible</span></h2>
          <p>Every delivery depends on colleagues who plan the work, build it, check it, and help each other when something gets in the way. We’re grateful for the care they put into meeting deadlines and getting the details right for our clients.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.controls} role="group" aria-label="Explore employee contributions">
            {contributions.map(({ label, icon: Icon }, index) => (
              <button key={label} type="button" aria-pressed={active === index}
                aria-controls={panelId} onClick={() => setActive(index)}>
                <Icon size={18} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <div className={styles.stage} aria-hidden="true" onPointerMove={tilt}
            onPointerLeave={reset} onPointerCancel={reset}>
            <div className={styles.model}>
              {contributions.map(({ label, icon: Icon }, index) => (
                <div key={label} className={styles.card}
                  data-depth={(index - active + contributions.length) % contributions.length}>
                  <Icon size={28} />
                  <strong>{label}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.reader} id={panelId} aria-live="polite" aria-atomic="true">
            <div key={current.label} className={styles.readout}>
              <h3>{current.title}</h3>
              <p>{current.copy}</p>
              <p className={styles.result}>{current.result}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
