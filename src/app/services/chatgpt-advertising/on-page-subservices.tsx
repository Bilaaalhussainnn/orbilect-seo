"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Braces, FileText, Image, Link2, PanelTop, Search } from "lucide-react";
import styles from "./on-page-subservices.module.css";

const services = [
  { ...({"name":"Advertiser eligibility","location":"Advertiser eligibility","example":"Project management tools for agencies","copy":"Review what is already in place and identify gaps that could affect this project.","deliverable":"A prioritized audit."}), icon: Search },
  { ...({"name":"Offer and landing-page review","location":"Offer and landing-page review","example":"OpenAI Ads Manager · advertiser access required","copy":"Document the requirements and agree on what belongs in the first delivery.","deliverable":"A confirmed brief."}), icon: PanelTop },
  { ...({"name":"Creative and copy preparation","location":"Creative and copy preparation","example":"Review the offer on its landing page","copy":"Build the first version around this specific customer or operational need.","deliverable":"A first delivery for review."}), icon: FileText },
  { ...({"name":"Campaign setup when access is available","location":"Campaign setup when access is available","example":"Project management tools for agencies","copy":"Check that the experience or handoff works in the environment people actually use.","deliverable":"A checked customer flow."}), icon: Link2 },
  { ...({"name":"Measurement planning","location":"Measurement planning","example":"Review the offer on its landing page","copy":"Test the setup and document what is verified before judging performance.","deliverable":"Verified reporting definitions."}), icon: Image },
  { ...({"name":"Pilot review","location":"Pilot review","example":"Tracked actions","copy":"Review the results or completed work and agree on the next improvement.","deliverable":"A follow-up action list."}), icon: Braces }
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
          <p className={styles.eyebrow} data-site-eyebrow="">ChatGPT Advertising sub-services</p>
          <h2 id="on-page-subservices-title">{"What we improve "}<span>{"for your business"}</span></h2>
          <p>{"Choose a work item to see the example and what we hand over."}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an ChatGPT Advertising sub-service">
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
                  <span>example.com/chatgpt-advertising</span>
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
