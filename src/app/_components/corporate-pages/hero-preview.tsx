"use client";

import { useState, type CSSProperties } from "react";
import { Compass, Layers, Users } from "lucide-react";
import styles from "./corporate.module.css";

const icons = [Compass, Layers, Users];

export default function HeroPreview({ topics }: { topics: string[] }) {
  const [active, setActive] = useState(0);
  const Icon = icons[active % icons.length];

  return (
    <div className={styles.preview}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.tilt}>
          <div className={styles.model} style={{ "--angle": `${(active - 1) * 17}deg` } as CSSProperties}>
            <span className={styles.back} />
            <span className={styles.middle} />
            <span className={styles.face}>
              <span key={active} className={styles.faceContent}><Icon size={28} />{topics[active]}</span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.controls} role="group" aria-label="Explore page topics">
        {topics.map((topic, index) => (
          <button key={topic} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
