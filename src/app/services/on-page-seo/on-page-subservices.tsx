"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Braces, FileText, Image, Link2, PanelTop, Search } from "lucide-react";
import styles from "./on-page-subservices.module.css";

const services = [
  {
    name: "Keyword and intent mapping", icon: Search,
    location: "Search query",
    example: "Emergency plumber in Austin",
    copy: "We match the searches customers make to the page best equipped to answer them. A burst-pipe enquiry belongs on an emergency service page. A question about preventing frozen pipes belongs in a guide.",
    deliverable: "A keyword and intent map for your priority pages.",
  },
  {
    name: "Page titles and descriptions", icon: PanelTop,
    location: "Search result preview",
    example: "Emergency Plumbing in Austin | Example Plumbing",
    copy: "We write distinct titles and descriptions that tell customers what the page covers and where you serve. The preview shows our proposed copy. Search engines may display a different title or snippet.",
    deliverable: "Recommended page titles and meta descriptions.",
  },
  {
    name: "Service page content", icon: FileText,
    location: "Opening content",
    example: "Burst pipe? Check our Austin service area and call for help.",
    copy: "We put the answers customers need early on the page. That might mean explaining what you can fix, where you work, and how someone should contact you when the job is urgent.",
    deliverable: "Revised page copy and a clearer heading structure.",
  },
  {
    name: "Internal linking", icon: Link2,
    location: "Link from a related guide",
    example: "Get emergency plumbing help in Austin",
    copy: "We find relevant places to link to priority pages and write link text that makes the destination clear. A guide on shutting off the water can lead a homeowner straight to emergency plumbing help.",
    deliverable: "An internal link plan with source pages, destinations, and link text.",
  },
  {
    name: "Image and alt text optimization", icon: Image,
    location: "Image description",
    example: "Water leaking from a split copper pipe beneath a kitchen sink",
    copy: "We write concise alt text for images that convey useful information. We leave decorative images with empty alt text and flag oversized images that need a lighter file.",
    deliverable: "An image audit with alt text and file recommendations.",
  },
  {
    name: "Schema markup", icon: Braces,
    location: "Visible breadcrumb path",
    example: "Home → Plumbing services → Emergency plumbing",
    copy: "We identify structured data that fits the page, such as breadcrumb markup for this navigation path. We check that the markup matches the page and validate it before handoff.",
    deliverable: "Relevant schema recommendations and validation findings.",
  },
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
          <p className={styles.eyebrow} data-site-eyebrow="">On-page SEO sub-services</p>
          <h2 id="on-page-subservices-title">What we improve <span>on each page</span></h2>
          <p>Explore how we’d improve an emergency plumbing page, from the search it serves to the links and details that help customers use it.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an On-page SEO sub-service">
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
                  <span>example.com/emergency-plumbing</span>
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
