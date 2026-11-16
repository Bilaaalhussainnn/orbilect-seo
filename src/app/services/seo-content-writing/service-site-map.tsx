"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Topic research","source":"What is included in monthly IT support?","page":"Topic research","action":"Verify the work","example":"Review what is already in place and identify gaps that could affect this project. A prioritized audit"}), icon: FileText },
  { ...({"label":"Content briefs","source":"Service pages · product copy · guides","page":"Content briefs","action":"Verify the work","example":"Document the requirements and agree on what belongs in the first delivery. A confirmed brief"}), icon: Link2 },
  { ...({"label":"Service-page writing","source":"Read the comparison and request a quote","page":"Service-page writing","action":"Verify the work","example":"Build the first version around this specific customer or operational need. A first delivery for review"}), icon: Image },
  { ...({"label":"Product and category copy","source":"What is included in monthly IT support?","page":"Product and category copy","action":"Verify the work","example":"Check that the experience or handoff works in the environment people actually use. A checked customer flow"}), icon: Braces },
  { ...({"label":"Editing and fact checks","source":"Read the comparison and request a quote","page":"Editing and fact checks","action":"Verify the work","example":"Test the setup and document what is verified before judging performance. Verified reporting definitions"}), icon: Route }
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
