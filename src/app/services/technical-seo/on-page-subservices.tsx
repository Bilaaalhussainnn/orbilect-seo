"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Braces, FileText, Image, Link2, PanelTop, Search } from "lucide-react";
import styles from "./on-page-subservices.module.css";

const services = [
  { ...({"name":"Crawl and index review","location":"Crawl and index review","example":"Important pages are missing from reports","copy":"Inspect representative URLs and trace internal paths and crawl controls.","deliverable":"Verified status and a fix list by template."}), icon: Search },
  { ...({"name":"Sitemaps and Search Console","location":"Sitemaps and Search Console","example":"A sitemap contains retired or duplicate URLs","copy":"Review the listed URLs, prepare a clean sitemap, and inspect priorities.","deliverable":"A cleaner sitemap and documented checks."}), icon: PanelTop },
  { ...({"name":"Redirect and canonical cleanup","location":"Redirect and canonical cleanup","example":"Multiple routes reach the same destination","copy":"Map old URLs to the right destinations and review preferred URL signals.","deliverable":"A tested redirect map and canonical recommendations."}), icon: FileText },
  { ...({"name":"Performance and mobile checks","location":"Performance and mobile checks","example":"A template is slow or jumps on mobile","copy":"Trace heavy resources, unstable layout, and slow interactions.","deliverable":"Prioritized performance fixes by template."}), icon: Link2 },
  { ...({"name":"Migration QA","location":"Migration QA","example":"A new build changes important URLs","copy":"Compare staging and live URL inventories and test critical flows.","deliverable":"A launch checklist and post-launch validation."}), icon: Image },
  { ...({"name":"Post-release monitoring","location":"Post-release monitoring","example":"Search engines are missing pages customers need","copy":"Recheck important templates and confirm the fixes remain live after future releases.","deliverable":"A follow-up check and next-step recommendations."}), icon: Braces }
];

export function OnPageSubservices() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const Icon = service.icon;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const area = event.currentTarget;
    const rect = area.getBoundingClientRect();
    area.style.setProperty("--tilt-x", ((0.5 - (event.clientY - rect.top) / rect.height) * 8) + "deg");
    area.style.setProperty("--tilt-y", (((event.clientX - rect.left) / rect.width - 0.5) * 10) + "deg");
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return (
    <section id="on-page-subservices" className={styles.section} aria-labelledby="on-page-subservices-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Technical SEO sub-services</p>
          <h2 id="on-page-subservices-title">{"What we improve "}<span>{"for your business"}</span></h2>
          <p>{"Choose a service to see what we check, what we change, and what you’ll receive."}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an Technical SEO sub-service">
            {services.map(({ name, icon: ControlIcon }, index) => (
              <button key={name} type="button" aria-pressed={index === active}
                aria-controls="on-page-subservice-preview" onClick={() => setActive(index)}>
                <ControlIcon size={19} aria-hidden="true" />
                <span>{name}</span>
                <ArrowRight className={styles.arrow} size={17} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div id="on-page-subservice-preview" aria-live="polite" aria-atomic="true">
            <div className={styles.stage} onPointerMove={tilt} onPointerLeave={resetTilt}>
              <div className={styles.device}>
                <div className={styles.chrome}>
                  <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
                  <span>example.com/technical-seo</span>
                </div>
                <div className={styles.screen} key={service.name}>
                  <div className={styles.target}>
                    <Icon size={21} aria-hidden="true" />
                    <div><span>{service.location}</span><strong>{service.example}</strong></div>
                  </div>
                  <div className={styles.lines} aria-hidden="true"><i /><i /><i /></div>
                </div>
              </div>
            </div>
            <div className={styles.explanation} key={service.name}>
              <h3>{service.name}</h3>
              <p>{service.copy}</p>
              <p className={styles.deliverable}><strong>What you get</strong>{service.deliverable}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
