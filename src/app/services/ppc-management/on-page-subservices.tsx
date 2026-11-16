"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Braces, FileText, Image, Link2, PanelTop, Search } from "lucide-react";
import styles from "./on-page-subservices.module.css";

const services = [
  { ...({"name":"Account audit","location":"Account audit","example":"Spend is spread across campaigns with unclear goals.","copy":"Check campaign settings, historical spend, search terms, and conversion actions.","deliverable":"A prioritized account cleanup plan."}), icon: Search },
  { ...({"name":"Keywords and exclusions","location":"Keywords and exclusions","example":"Ads are appearing for jobs you don’t offer.","copy":"Group keywords by service and intent. Review actual searches and add relevant exclusions.","deliverable":"A keyword plan and a list of excluded searches."}), icon: PanelTop },
  { ...({"name":"Ad copy and assets","location":"Ad copy and assets","example":"The ad doesn’t explain why someone should call.","copy":"Write copy for the service, location, and customer need. Test meaningful changes across the campaign.","deliverable":"Ad variants and assets tied to the offer."}), icon: FileText },
  { ...({"name":"Landing pages","location":"Landing pages","example":"Visitors click but can’t confirm service coverage.","copy":"Match the page to the ad. Improve mobile calls to action, service-area copy, and enquiry forms.","deliverable":"A clearer path from the ad to a call or form."}), icon: Link2 },
  { ...({"name":"Conversion tracking","location":"Conversion tracking","example":"Every call is counted even when it isn’t a lead.","copy":"Test agreed conversion events and use sales feedback to distinguish qualified enquiries where tracking allows.","deliverable":"Verified events and clear reporting definitions."}), icon: Image },
  { ...({"name":"Budget and bid management","location":"Budget and bid management","example":"More budget is going to campaigns with weak leads.","copy":"Review spend and qualified leads by campaign. Adjust budgets and bids based on evidence and your capacity.","deliverable":"A budget plan with documented decisions."}), icon: Braces }
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
          <p className={styles.eyebrow} data-site-eyebrow="">PPC Management sub-services</p>
          <h2 id="on-page-subservices-title">{"What we improve "}<span>{"for your business"}</span></h2>
          <p>{"Choose a service to see what we check, what we change, and what you’ll receive."}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an PPC Management sub-service">
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
                  <span>example.com/commercial-hvac</span>
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
