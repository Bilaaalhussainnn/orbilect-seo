"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "./seo-support.module.css";

const views = [
  { label: "Page content", icon: FileText, source: "Services hub", page: "Brake repair", action: "Check symptoms", example: "Explain when squealing, grinding, or a longer stopping distance calls for a brake inspection." },
  { label: "Internal links", icon: Link2, source: "Brake noise guide", page: "Brake repair", action: "Book an inspection", example: "Link from the noise guide to the brake repair page with descriptive text. Give drivers a relevant next step." },
  { label: "Image alt text", icon: Image, source: "Brake repair page", page: "Inspection photo", action: "Describe the finding", example: "Describe what matters in the image, such as “Brake pad worn down to its metal backing.” Decorative images use empty alt text." },
  { label: "Schema markup", icon: Braces, source: "Home", page: "Services", action: "Brake repair", example: "Add BreadcrumbList markup that matches the visible path, then validate it before publishing." },
  { label: "URL cleanup", icon: Route, source: "/brake-service", page: "/brake-repair", action: "Book an inspection", example: "Redirect the retired URL to its replacement and point internal links straight to the current page." },
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
