"use client";

import ClientConfidentiality from "./client-confidentiality";
import { useId, useState, type CSSProperties, type PointerEvent } from "react";
import { CalendarDays, GraduationCap, Monitor, ShieldCheck } from "lucide-react";
import styles from "./work-behind-the-scenes.module.css";

const departments = [
  { label: "Workforce Management", icon: CalendarDays, angle: -18, title: "Coverage planned around your project", copy: "Workforce Management coordinates schedules around the clock, plans shift handoffs, and aligns team availability with your agreed hours and deadlines." },
  { label: "Training & Development", icon: GraduationCap, angle: 14, title: "A team prepared for your brief", copy: "Training & Development helps specialists learn your workflows, tools, and quality standards. When a recurring issue shows up, the team turns it into practical coaching and updated guidance." },
  { label: "Compliance", icon: ShieldCheck, angle: -9, title: "Cybersecurity guidance that stays current", copy: "Compliance regularly briefs our teams on secure information handling, access permissions, and how to report suspicious activity or a possible incident." },
  { label: "IT Support", icon: Monitor, angle: 19, title: "Connectivity the team can rely on", copy: "IT supports workstations, connectivity, and access to approved tools. When an outage or access issue interrupts work, IT troubleshoots and coordinates recovery to minimize downtime." },
];

export default function WorkBehindTheScenes() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const department = departments[active];
  const ActiveIcon = department.icon;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    stage.style.setProperty("--tilt-x", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 22}deg`);
    stage.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 28}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return (
    <>
      <ClientConfidentiality />

      <section className={styles.support} aria-labelledby="work-support">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Support departments</p>
            <h2 id="work-support">The teams behind <span>your project</span></h2>
            <p>Your project team has help with scheduling, training, compliance, and IT. Choose a department to see what it handles and how that supports your work.</p>
          </header>

          <div className={styles.layout}>
            <div className={styles.options} role="group" aria-label="Support departments">
              {departments.map(({ label, icon: Icon }, index) => (
                <button key={label} type="button" aria-pressed={index === active}
                  aria-controls={panelId} onClick={() => setActive(index)}>
                  <Icon size={19} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>

            <div id={panelId} className={styles.panel}>
              <div className={styles.stage} aria-hidden="true"
                onPointerMove={tilt} onPointerLeave={resetTilt}
                style={{ "--angle": `${department.angle}deg` } as CSSProperties}>
                <div className={styles.model}>
                  <span className={styles.rear} />
                  <span className={styles.middle} />
                  <span className={styles.face}>
                    <ActiveIcon key={department.label} size={34} />
                  </span>
                </div>
              </div>
              <div className={styles.detail} aria-live="polite" aria-atomic="true">
                <div key={department.label} className={styles.enter}>
                  <p className={styles.department}>{department.label}</p>
                  <h3>{department.title}</h3>
                  <p>{department.copy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
