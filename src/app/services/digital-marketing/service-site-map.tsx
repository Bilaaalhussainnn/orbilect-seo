"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Channel and offer strategy","source":"Too many channels share one budget","page":"Channel and offer strategy","action":"Diagnose","example":"Choose channels and messages around one clear business objective. A channel plan and success criteria."}), icon: FileText },
  { ...({"label":"Paid search management","source":"Clicks arrive for the wrong services","page":"Paid search management","action":"Prioritize","example":"Review targeting, search terms, bids, and exclusions. A campaign structured around the enquiries you want."}), icon: Link2 },
  { ...({"label":"Landing page optimization","source":"Clicks rarely turn into enquiries","page":"Landing page optimization","action":"Implement","example":"Align the page with the ad and test the call to action. A more direct path to the tracked action."}), icon: Image },
  { ...({"label":"Conversion tracking","source":"Forms and calls are hard to attribute","page":"Conversion tracking","action":"Verify","example":"Set up or verify the events agreed for reporting. A record of tested conversions and known gaps."}), icon: Braces },
  { ...({"label":"Lead quality reporting","source":"Cheap leads take time to qualify","page":"Lead quality reporting","action":"Measure","example":"Use sales feedback to separate qualified enquiries from form volume. Reporting you can use to decide what to scale."}), icon: Route }
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
