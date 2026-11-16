"use client";

import { useId, useState, type PointerEvent } from "react";
import { Compass, Layers, LifeBuoy, Users } from "lucide-react";
import styles from "./org-chart.module.css";

type Team = { title: string; copy: string };

const icons = [Compass, Layers, Users, LifeBuoy] as const;
const angles = [-15, -5, 10, 17];

export default function OrgChart({ teams }: { teams: readonly Team[] }) {
  const [active, setActive] = useState(0);
  const detailId = useId();
  const team = teams[active];
  const ActiveIcon = icons[active];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    stage.style.setProperty("--tilt-x", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 16}deg`);
    stage.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 20}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return (
    <div className={styles.chart}>
      <div className={styles.stage} onPointerMove={tilt} onPointerLeave={resetTilt}>
        <div className={styles.diagram} role="group" aria-label="Explore the team structure">
          {teams.map(({ title }, index) => {
            const Icon = icons[index];
            return (
              <button key={title} type="button" className={styles.node}
                aria-pressed={active === index} aria-controls={detailId}
                onClick={() => setActive(index)}>
                <Icon size={20} aria-hidden="true" />
                <span>{title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.detail}>
        <div className={styles.preview} aria-hidden="true">
          <div className={styles.badge} style={{ transform: `rotateX(14deg) rotateY(${angles[active]}deg)` }}>
            <span className={styles.back} />
            <span className={styles.middle} />
            <span className={styles.front}><ActiveIcon key={team.title} size={25} /></span>
          </div>
        </div>
        <div id={detailId} aria-live="polite" aria-atomic="true">
          <div className={styles.reveal} key={team.title}>
            <h3>{team.title}</h3>
            <p>{team.copy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
