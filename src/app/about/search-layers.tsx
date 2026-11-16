"use client";

import { useState, type PointerEvent } from "react";
import { ArrowUpRight, Check, Code2, MousePointer2, Search } from "lucide-react";
import styles from "./about.module.css";

const layers = [
  { label: "Discovery", description: "Find the searches that match what your business offers." },
  { label: "Structure", description: "Make your priority pages easier for search engines to understand." },
  { label: "Action", description: "Give visitors a clear next step once they land on your site." },
];

export default function SearchLayers() {
  const [active, setActive] = useState(0);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    stage.style.setProperty("--pitch", String(y * -20) + "deg");
    stage.style.setProperty("--yaw", String(x * 26) + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--pitch");
    event.currentTarget.style.removeProperty("--yaw");
  }

  return (
    <div className={styles.visual} data-reveal="off">
      <div
        className={styles.stage}
        onPointerMove={tilt}
        onPointerLeave={reset}
        onPointerCancel={reset}
        aria-hidden="true"
      >
        <div className={styles.platform}>
          <div className={styles.model}>
            <div className={`${styles.panel} ${styles.discovery}`} data-active={active === 0}>
              <span className={styles.panelLabel}><Search size={15} /> Search results</span>
              <span className={styles.searchBar}><Search size={13} /> What customers search for</span>
              <span className={styles.result}><span /> <ArrowUpRight size={13} /></span>
              <span className={styles.line} />
              <span className={styles.line} />
            </div>
            <div className={`${styles.panel} ${styles.structure}`} data-active={active === 1}>
              <span className={styles.panelLabel}><Code2 size={15} /> Site structure</span>
              <span className={styles.checkRow}><Check size={13} /> Clear page hierarchy</span>
              <span className={styles.checkRow}><Check size={13} /> Connected priority pages</span>
            </div>
            <div className={`${styles.panel} ${styles.intent}`} data-active={active === 2}>
              <span className={styles.panelLabel}><MousePointer2 size={15} /> Next step</span>
              <span className={styles.intentAction}>Explore the service <ArrowUpRight size={13} /></span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.controls} role="group" aria-label="Explore how we improve search visibility">
        {layers.map(({ label }, index) => (
          <button key={label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
            {label}
          </button>
        ))}
      </div>
      <p className={styles.caption} aria-live="polite">{layers[active].description}</p>
    </div>
  );
}
