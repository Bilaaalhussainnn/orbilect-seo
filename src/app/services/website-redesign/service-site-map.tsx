"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Navigation and page architecture","source":"Visitors cannot find the right service","page":"Navigation and page architecture","action":"Diagnose","example":"Group pages by customer need and design clear paths between them. A page map and navigation plan."}), icon: FileText },
  { ...({"label":"Responsive page design","source":"The desktop layout breaks on mobile","page":"Responsive page design","action":"Prioritize","example":"Design and test key layouts across screen sizes. Responsive templates for the agreed pages."}), icon: Link2 },
  { ...({"label":"Forms and booking flows","source":"Customers submit a form without confirmation","page":"Forms and booking flows","action":"Implement","example":"Test validation, delivery, confirmation, and the next step. Verified enquiry and booking flows."}), icon: Image },
  { ...({"label":"Content and page migration","source":"Old pages contain useful copy or search traffic","page":"Content and page migration","action":"Verify","example":"Carry forward valuable content and map changed URLs. An inventory and redirect plan for launch."}), icon: Braces },
  { ...({"label":"Launch and handoff","source":"Nobody knows what to check after going live","page":"Launch and handoff","action":"Measure","example":"Verify the live build and document edits, monitoring, and agreed support. Launch checks and a practical handoff."}), icon: Route }
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
