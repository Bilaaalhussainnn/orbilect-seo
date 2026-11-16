"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Braces, FileText, Image, Link2, PanelTop, Search } from "lucide-react";
import styles from "./on-page-subservices.module.css";

const services = [
  { ...({"name":"Collection page optimization","location":"Collection page optimization","example":"Broad searches land on an unsuitable product","copy":"Build useful collection destinations with clear product groupings and copy.","deliverable":"A category plan tied to shopping intent."}), icon: Search },
  { ...({"name":"Product page optimization","location":"Product page optimization","example":"Product pages omit fit or compatibility","copy":"Add useful descriptions, specifications, and relevant image text.","deliverable":"Product page recommendations your team can apply."}), icon: PanelTop },
  { ...({"name":"Filters and variant URLs","location":"Filters and variant URLs","example":"Filters produce many near-identical pages","copy":"Review which filtered views need a distinct destination and how variants are handled.","deliverable":"A documented URL strategy for the catalogue."}), icon: FileText },
  { ...({"name":"Product structured data","location":"Product structured data","example":"Visible product details and markup disagree","copy":"Review how price and availability are populated and validate supported markup.","deliverable":"A list of markup and template fixes."}), icon: Link2 },
  { ...({"name":"Organic revenue measurement","location":"Organic revenue measurement","example":"Traffic reports don’t show what sold","copy":"Connect organic landing pages with available product and purchase data.","deliverable":"Reporting that relates visibility to purchases."}), icon: Image },
  { ...({"name":"Stock and search visibility","location":"Stock and search visibility","example":"Shoppers can’t find the right products in your catalogue","copy":"Check how stock changes and promotions affect organic traffic and tracked orders.","deliverable":"A follow-up check and next-step recommendations."}), icon: Braces }
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
          <p className={styles.eyebrow} data-site-eyebrow="">Ecommerce SEO sub-services</p>
          <h2 id="on-page-subservices-title">{"What we improve "}<span>{"for your business"}</span></h2>
          <p>{"Choose a service to see what we check, what we change, and what you’ll receive."}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an Ecommerce SEO sub-service">
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
                  <span>example.com/ecommerce-seo</span>
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
