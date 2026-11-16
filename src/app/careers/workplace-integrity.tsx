"use client";

import { useId, useState, type PointerEvent } from "react";
import { ArrowRight, Lock, Monitor, ShieldCheck, Trophy, Users } from "lucide-react";
import styles from "./workplace-integrity.module.css";

const standards = [
  {
    label: "Respect at work",
    title: "Everyone deserves to work with dignity",
    icon: ShieldCheck,
    copy: "We have zero tolerance for harassment, bullying, discrimination, and retaliation. That standard applies in the office, in team chats, and during client work. We take concerns seriously and handle them with discretion.",
    angle: -18,
  },
  {
    label: "Equal opportunity",
    title: "Opportunity is based on ability",
    icon: Users,
    copy: "Orbilect SEO is an equal opportunity employer. We assess applicants on role-related skills, experience, and qualifications, and make decisions about development and advancement on work-related criteria.",
    angle: 13,
  },
  {
    label: "Data vigilance",
    title: "Protect the information entrusted to us",
    icon: Lock,
    copy: "We stay alert to data theft and unauthorized access. Teams use approved tools and access only the files they need for their work. We expect staff to report suspicious requests, lost devices, or possible data exposure promptly.",
    angle: -9,
  },
  {
    label: "Our offices",
    title: "A workplace equipped for focused work",
    icon: Monitor,
    copy: "Our state-of-the-art offices provide modern workstations, reliable connectivity, and dedicated spaces for training, collaboration, and focused work.",
    angle: 18,
  },
  {
    label: "Performance rewards",
    title: "Recognize people who consistently deliver",
    icon: Trophy,
    copy: "We recognize and reward top performers for the quality of their work, their reliability, and how they contribute to their team. Incentives reflect the role and the contribution.",
    angle: -13,
  },
];

export default function WorkplaceIntegrity() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const { icon: Icon, title, copy, angle } = standards[active];

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    stage.style.setProperty("--rx", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 22}deg`);
    stage.style.setProperty("--ry", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 28}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section className={styles.section} aria-labelledby="careers-integrity">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Workplace integrity</p>
          <h2 id="careers-integrity">How we <span>treat our people</span></h2>
          <p>Respect, fair opportunity, and care with sensitive information are part of everyone’s job at Orbilect SEO.</p>
        </header>
        <div className={styles.workspace}>
          <div className={styles.options} role="group" aria-label="Workplace standards">
            {standards.map(({ label, icon: OptionIcon }, index) => (
              <button key={label} type="button" aria-pressed={active === index}
                aria-controls={panelId} onClick={() => setActive(index)}>
                <OptionIcon size={19} aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.panel} id={panelId}>
            <div className={styles.stage} aria-hidden="true"
              onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
              <div className={styles.tilt}>
                <div className={styles.model} style={{ transform: `rotateX(12deg) rotateY(${angle}deg)` }}>
                  <span className={styles.back} />
                  <span className={styles.middle} />
                  <span className={styles.face}><Icon key={title} size={36} /></span>
                </div>
              </div>
            </div>
            <div aria-live="polite" aria-atomic="true">
              <div key={title} className={styles.enter}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
