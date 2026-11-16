"use client";

import { useState, type PointerEvent } from "react";
import { FileText, Gauge, ScanLine } from "lucide-react";
import styles from "./audit-scanner.module.css";

const checks = [
  { label: "Crawl", icon: ScanLine, description: "Check whether search engines can reach your key pages." },
  { label: "Performance", icon: Gauge, description: "Find what slows down the pages customers use most." },
  { label: "Content", icon: FileText, description: "See where your pages miss what customers are searching for." },
];

export default function AuditScanner() {
  const [active, setActive] = useState(0);
  const check = checks[active];
  const Icon = check.icon;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--pitch", String(y * -22) + "deg");
    stage.style.setProperty("--yaw", String(x * 28) + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--pitch");
    event.currentTarget.style.removeProperty("--yaw");
  }

  return (
    <div className={styles.scanner} data-reveal="off">
      <div
        className={styles.stage}
        onPointerMove={tilt}
        onPointerLeave={reset}
        onPointerCancel={reset}
        aria-hidden="true"
      >
        <div className={styles.model}>
          <div className={styles.back} />
          <div className={styles.middle} />
          <div className={styles.screen}>
            <div className={styles.chrome}><i /><i /><i /></div>
            <div className={styles.rows}><i /><i /><i /></div>
            <div key={check.label} className={styles.beam} />
          </div>
          <div className={styles.lens}>
            <Icon key={check.label} size={29} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className={styles.controls} role="group" aria-label="Explore website audit checks">
        {checks.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className={styles.caption} aria-live="polite">{check.description}</p>
    </div>
  );
}
