"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Crawl and index review","source":"Important pages are missing from reports","page":"Crawl and index review","action":"Diagnose","example":"Inspect representative URLs and trace internal paths and crawl controls. Verified status and a fix list by template."}), icon: FileText },
  { ...({"label":"Sitemaps and Search Console","source":"A sitemap contains retired or duplicate URLs","page":"Sitemaps and Search Console","action":"Prioritize","example":"Review the listed URLs, prepare a clean sitemap, and inspect priorities. A cleaner sitemap and documented checks."}), icon: Link2 },
  { ...({"label":"Redirect and canonical cleanup","source":"Multiple routes reach the same destination","page":"Redirect and canonical cleanup","action":"Implement","example":"Map old URLs to the right destinations and review preferred URL signals. A tested redirect map and canonical recommendations."}), icon: Image },
  { ...({"label":"Performance and mobile checks","source":"A template is slow or jumps on mobile","page":"Performance and mobile checks","action":"Verify","example":"Trace heavy resources, unstable layout, and slow interactions. Prioritized performance fixes by template."}), icon: Braces },
  { ...({"label":"Migration QA","source":"A new build changes important URLs","page":"Migration QA","action":"Measure","example":"Compare staging and live URL inventories and test critical flows. A launch checklist and post-launch validation."}), icon: Route }
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
