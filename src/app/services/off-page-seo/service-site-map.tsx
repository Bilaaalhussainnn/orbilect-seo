"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Backlink audit","source":"Unclear which sites refer traffic","page":"Backlink audit","action":"Diagnose","example":"Review referring pages and how they relate to your business. Prioritized list of useful links and issues."}), icon: FileText },
  { ...({"label":"Citation cleanup","source":"Old contact details on directories","page":"Citation cleanup","action":"Prioritize","example":"Correct priority listings using the current business details. Consistent phone, address, and destination URLs."}), icon: Link2 },
  { ...({"label":"Link reclamation","source":"A publication links to a retired URL","page":"Link reclamation","action":"Implement","example":"Find the correct replacement and request a link update where appropriate. Verified destination or a working redirect."}), icon: Image },
  { ...({"label":"Digital PR outreach","source":"Useful expertise goes uncited","page":"Digital PR outreach","action":"Verify","example":"Turn original insight or a project into a pitch for relevant editors. Outreach log and earned placements where secured."}), icon: Braces },
  { ...({"label":"Review and reputation support","source":"The same complaint keeps appearing","page":"Review and reputation support","action":"Measure","example":"Identify the operational issue and help the team respond and resolve it. A response process and a list of recurring fixes."}), icon: Route }
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
