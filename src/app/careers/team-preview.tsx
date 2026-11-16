"use client";

import { useState } from "react";
import { Compass, Layers, Users } from "lucide-react";
import styles from "./careers.module.css";

const views = [
  { label: "Leadership", icon: Compass, angle: -18 },
  { label: "Project leads", icon: Layers, angle: 12 },
  { label: "Delivery teams", icon: Users, angle: -6 },
];

export default function TeamPreview() {
  const [active, setActive] = useState(0);
  const { icon: Icon, label, angle } = views[active];

  return (
    <div className={styles.preview}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.model} style={{ transform: `rotateX(12deg) rotateY(${angle}deg)` }}>
          <div className={styles.rear} />
          <div className={styles.middle} />
          <div className={styles.face}>
            <div key={label} className={styles.faceContent}><Icon size={32} /><strong>{label}</strong></div>
          </div>
        </div>
      </div>
      <div className={styles.controls} role="group" aria-label="Team preview">
        {views.map(({ label: name }, index) => (
          <button key={name} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
