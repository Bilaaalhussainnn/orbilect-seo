"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Collection page optimization","source":"Broad searches land on an unsuitable product","page":"Collection page optimization","action":"Diagnose","example":"Build useful collection destinations with clear product groupings and copy. A category plan tied to shopping intent."}), icon: FileText },
  { ...({"label":"Product page optimization","source":"Product pages omit fit or compatibility","page":"Product page optimization","action":"Prioritize","example":"Add useful descriptions, specifications, and relevant image text. Product page recommendations your team can apply."}), icon: Link2 },
  { ...({"label":"Filters and variant URLs","source":"Filters produce many near-identical pages","page":"Filters and variant URLs","action":"Implement","example":"Review which filtered views need a distinct destination and how variants are handled. A documented URL strategy for the catalogue."}), icon: Image },
  { ...({"label":"Product structured data","source":"Visible product details and markup disagree","page":"Product structured data","action":"Verify","example":"Review how price and availability are populated and validate supported markup. A list of markup and template fixes."}), icon: Braces },
  { ...({"label":"Organic revenue measurement","source":"Traffic reports don’t show what sold","page":"Organic revenue measurement","action":"Measure","example":"Connect organic landing pages with available product and purchase data. Reporting that relates visibility to purchases."}), icon: Route }
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
