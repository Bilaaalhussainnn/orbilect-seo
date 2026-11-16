"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Braces, FileText, Image, Link2, PanelTop, Search } from "lucide-react";
import styles from "./on-page-subservices.module.css";

const services = [
  { ...({"name":"Navigation and page architecture","location":"Navigation and page architecture","example":"Visitors cannot find the right service","copy":"Group pages by customer need and design clear paths between them.","deliverable":"A page map and navigation plan."}), icon: Search },
  { ...({"name":"Responsive page design","location":"Responsive page design","example":"The desktop layout breaks on mobile","copy":"Design and test key layouts across screen sizes.","deliverable":"Responsive templates for the agreed pages."}), icon: PanelTop },
  { ...({"name":"Forms and booking flows","location":"Forms and booking flows","example":"Customers submit a form without confirmation","copy":"Test validation, delivery, confirmation, and the next step.","deliverable":"Verified enquiry and booking flows."}), icon: FileText },
  { ...({"name":"Content and page migration","location":"Content and page migration","example":"Old pages contain useful copy or search traffic","copy":"Carry forward valuable content and map changed URLs.","deliverable":"An inventory and redirect plan for launch."}), icon: Link2 },
  { ...({"name":"Launch and handoff","location":"Launch and handoff","example":"Nobody knows what to check after going live","copy":"Verify the live build and document edits, monitoring, and agreed support.","deliverable":"Launch checks and a practical handoff."}), icon: Image },
  { ...({"name":"Enquiry flow testing","location":"Enquiry flow testing","example":"People reach your website but struggle to enquire","copy":"Verify form delivery, booking confirmations, and mobile usability after launch.","deliverable":"A follow-up check and next-step recommendations."}), icon: Braces }
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
          <p className={styles.eyebrow} data-site-eyebrow="">Website Redesign sub-services</p>
          <h2 id="on-page-subservices-title">{"What we improve "}<span>{"for your business"}</span></h2>
          <p>{"Choose a service to see what we check, what we change, and what you’ll receive."}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an Website Redesign sub-service">
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
                  <span>example.com/website-redesign</span>
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
