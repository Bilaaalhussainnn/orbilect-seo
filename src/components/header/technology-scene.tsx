"use client";

import { useEffect, useRef } from "react";
import styles from "./technology-scene.module.css";

export default function TechnologyScene({ showGrowthOrbs = true }: { showGrowthOrbs?: boolean }) {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = scene.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    function tilt(event: PointerEvent) {
      if (motion.matches || event.pointerType !== "mouse") return;
      const rect = host!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      layer!.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - .5) * -12}deg`);
      layer!.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - .5) * 16}deg`);
    }
    function reset() {
      layer!.style.removeProperty("--tilt-x");
      layer!.style.removeProperty("--tilt-y");
    }
    host.addEventListener("pointermove", tilt, { passive: true });
    host.addEventListener("pointerleave", reset);
    return () => {
      host.removeEventListener("pointermove", tilt);
      host.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={scene} className={styles.scene} data-marketing-bubbles="" aria-hidden="true">
      {showGrowthOrbs && <div className={styles.growthOrbs} data-growth-orbs="">
        {[
          { label: "Sales growth", value: "+25%", line: "M3 31v-6h9v6m5 0V21h9v10m5 0V17h9v14m5 0V12h9v19m5 0V5h9v26" },
          { label: "Organic visitors", value: "+40%", line: "m3 29 10-5 10 1 12-8 10 2 11-8 10 2 10-7" },
          { label: "Search visibility", value: "SEO", line: "m3 28 13-5 10 1 10-10 12 1 13-6 15-5" },
          { label: "Conversion rate", value: "CRO", line: "M3 7h73M14 16h51M27 25h25" },
        ].map(({ label, value, line }, i) => (
          <div key={label}>
            <b>{label}</b><strong>{value}</strong>
            <svg viewBox="0 0 80 34" fill={i === 0 ? "currentColor" : "none"} aria-hidden="true">
              <path d={line} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>}
      
      <div className={styles.tilt} data-marketing-art="">
        <div className={styles.board}>
          <div className={styles.edge} />
          <svg className={styles.marketingChart} viewBox="0 0 256 190" fill="none">
            <path d="M23 52h210M23 82h210M23 112h210M23 142h210M23 162h210" stroke="#004aad" strokeOpacity=".55" />
            <path className={styles.bars} d="M33 160v-22h21v22m12 0v-39h21v39m12 0v-31h21v31m12 0v-57h21v57m12 0v-69h21v69m12 0v-95h21v95" fill="#004aad" fillOpacity=".62" />
            <path className={styles.trend} d="m24 130 28-25 24 9 33-31 26 11 29-35 25 8 39-41" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
            <circle cx="228" cy="26" r="5" fill="#fff" />
          </svg>
          <div className={styles.searchTile}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" />
            </svg>
            <i /><i />
          </div>
        </div>
      </div>
    </div>
  );
}
