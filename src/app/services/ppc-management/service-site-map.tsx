"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Braces, FileText, Image, Link2, Route } from "lucide-react";
import styles from "../_components/seo-support.module.css";

const views = [
  { ...({"label":"Account audit","source":"Spend is spread across campaigns with unclear goals.","page":"Account audit","action":"Verify the fix","example":"Check campaign settings, historical spend, search terms, and conversion actions. A prioritized account cleanup plan."}), icon: FileText },
  { ...({"label":"Keywords and exclusions","source":"Ads are appearing for jobs you don’t offer.","page":"Keywords and exclusions","action":"Verify the fix","example":"Group keywords by service and intent. Review actual searches and add relevant exclusions. A keyword plan and a list of excluded searches."}), icon: Link2 },
  { ...({"label":"Ad copy and assets","source":"The ad doesn’t explain why someone should call.","page":"Ad copy and assets","action":"Verify the fix","example":"Write copy for the service, location, and customer need. Test meaningful changes across the campaign. Ad variants and assets tied to the offer."}), icon: Image },
  { ...({"label":"Landing pages","source":"Visitors click but can’t confirm service coverage.","page":"Landing pages","action":"Verify the fix","example":"Match the page to the ad. Improve mobile calls to action, service-area copy, and enquiry forms. A clearer path from the ad to a call or form."}), icon: Braces },
  { ...({"label":"Conversion tracking","source":"Every call is counted even when it isn’t a lead.","page":"Conversion tracking","action":"Verify the fix","example":"Test agreed conversion events and use sales feedback to distinguish qualified enquiries where tracking allows. Verified events and clear reporting definitions."}), icon: Route }
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
