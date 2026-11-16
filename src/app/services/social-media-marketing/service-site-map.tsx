"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Channel audit","source":"A post answering a common buying question","page":"Channel audit","action":"Verify the work","example":"Review what is already in place and identify gaps that could affect this project. A prioritized audit"}), icon: FileText },
  { ...({"label":"Audience and topic research","source":"Instagram · Facebook · LinkedIn · TikTok","page":"Audience and topic research","action":"Verify the work","example":"Document the requirements and agree on what belongs in the first delivery. A confirmed brief"}), icon: Link2 },
  { ...({"label":"Content calendar","source":"Visit the service page or start a conversation","page":"Content calendar","action":"Verify the work","example":"Build the first version around this specific customer or operational need. A first delivery for review"}), icon: Image },
  { ...({"label":"Platform-specific creative","source":"A post answering a common buying question","page":"Platform-specific creative","action":"Verify the work","example":"Check that the experience or handoff works in the environment people actually use. A checked customer flow"}), icon: Braces },
  { ...({"label":"Community workflow","source":"Visit the service page or start a conversation","page":"Community workflow","action":"Verify the work","example":"Test the setup and document what is verified before judging performance. Verified reporting definitions"}), icon: Route }
];

export function SiteStructureMap({ topics }: { topics: { title: string; copy: string }[] }) {
  const [active, setActive] = useState(0);
  const view = views[active];
  const topic = topics[active];
  const Icon = view.icon;

  return (
    <div className={styles.siteMap}>
      <div className={styles.mapControls} role="group" aria-label="Choose an on-page improvement">
        {views.map(({ label, icon: ButtonIcon }, index) => (
          <button key={label} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
            <ButtonIcon size={18} aria-hidden="true" />
            <span>{label}</span>
            <ArrowRight className={styles.mapButtonArrow} size={16} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={styles.mapDisplay} aria-live="polite" aria-atomic="true">
        <div key={view.label} className={styles.mapScene}>
          <div className={styles.mapRoute} aria-label="Example page relationship">
            <span className={styles.mapNode}>{view.source}</span>
            <ArrowRight className={styles.mapHorizontal} size={18} aria-hidden="true" />
            <ArrowDown className={styles.mapVertical} size={18} aria-hidden="true" />
            <span className={styles.mapPrimary}><Icon size={17} aria-hidden="true" />{view.page}</span>
            <ArrowRight className={styles.mapHorizontal} size={18} aria-hidden="true" />
            <ArrowDown className={styles.mapVertical} size={18} aria-hidden="true" />
            <span className={styles.mapNode}>{view.action}</span>
          </div>
          <div className={styles.mapDescription}>
            <h3>{topic.title}</h3>
            <p>{topic.copy}</p>
            <p className={styles.mapExample}><strong>Example</strong>{view.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
