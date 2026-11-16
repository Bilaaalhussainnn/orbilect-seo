"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Braces, FileText, Image, Link2, PanelTop, Search } from "lucide-react";
import styles from "./on-page-subservices.module.css";

const services = [
  { ...({"name":"Channel and offer strategy","location":"Channel and offer strategy","example":"Too many channels share one budget","copy":"Choose channels and messages around one clear business objective.","deliverable":"A channel plan and success criteria."}), icon: Search },
  { ...({"name":"Paid search management","location":"Paid search management","example":"Clicks arrive for the wrong services","copy":"Review targeting, search terms, bids, and exclusions.","deliverable":"A campaign structured around the enquiries you want."}), icon: PanelTop },
  { ...({"name":"Landing page optimization","location":"Landing page optimization","example":"Clicks rarely turn into enquiries","copy":"Align the page with the ad and test the call to action.","deliverable":"A more direct path to the tracked action."}), icon: FileText },
  { ...({"name":"Conversion tracking","location":"Conversion tracking","example":"Forms and calls are hard to attribute","copy":"Set up or verify the events agreed for reporting.","deliverable":"A record of tested conversions and known gaps."}), icon: Link2 },
  { ...({"name":"Lead quality reporting","location":"Lead quality reporting","example":"Cheap leads take time to qualify","copy":"Use sales feedback to separate qualified enquiries from form volume.","deliverable":"Reporting you can use to decide what to scale."}), icon: Image },
  { ...({"name":"Campaign testing","location":"Campaign testing","example":"You get clicks but can’t tell which ones turn into business","copy":"Test a message or offer and use qualified lead feedback to decide whether to expand it.","deliverable":"A follow-up check and next-step recommendations."}), icon: Braces }
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
          <p className={styles.eyebrow} data-site-eyebrow="">Digital Marketing sub-services</p>
          <h2 id="on-page-subservices-title">{"What we improve "}<span>{"for your business"}</span></h2>
          <p>{"Choose a service to see what we check, what we change, and what you’ll receive."}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an Digital Marketing sub-service">
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
                  <span>example.com/digital-marketing</span>
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
