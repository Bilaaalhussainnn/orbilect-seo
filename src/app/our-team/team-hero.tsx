"use client";

import { useState } from "react";
import { Code2, Globe, Smartphone } from "lucide-react";
import styles from "./organization.module.css";

const views = [
  { name: "SEO & websites", icon: Globe },
  { name: "Mobile apps", icon: Smartphone },
  { name: "Custom software", icon: Code2 },
];

export default function TeamHero() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroStage} aria-hidden="true">
        <div className={styles.heroFloat}>
          <div className={styles.carousel}>
            {views.map(({ name, icon: Icon }, index) => (
              <div key={name} className={styles.device}
                data-device={index} data-position={(index - active + views.length) % views.length}>
                <Icon size={27} />
                <strong>{name}</strong>
                <div className={styles.deviceLines}><i /><i /><i /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.heroControls} role="group" aria-label="Explore Orbilect teams">
        {views.map(({ name, icon: Icon }, index) => (
          <button type="button" key={name} aria-pressed={index === active}
            onClick={() => setActive(index)}>
            <Icon size={17} aria-hidden="true" />{name}
          </button>
        ))}
      </div>
    </div>
  );
}
