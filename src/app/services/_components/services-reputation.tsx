"use client";

import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { ArrowUpRight, ChartNoAxesCombined, MapPin, MessagesSquare, Wrench } from "lucide-react";
import { ReviewPlatformDisplay, reviewDirectoryPath } from "../../reviews/review-platform-display";
import styles from "./reviews-matter.module.css";

const scenarios = [
  { label: "Search visibility", icon: ChartNoAxesCombined, title: "Make the right business easy to find", description: "Check what appears when people search for your brand. Correct outdated links and conflicting business details so customers find the right destination." },
  { label: "Credible reviews", icon: MessagesSquare, title: "Give customers evidence they can use", description: "Honest reviews give buyers a clearer picture of working with you. Ask for genuine feedback and make room for criticism as well as praise." },
  { label: "Local listings", icon: MapPin, title: "Make the next step clear", description: "Keep your hours, location, contact details, and booking links accurate across the places people use to find you." },
  { label: "Service improvements", icon: Wrench, title: "Act on the patterns in feedback", description: "When customers mention the same problem, identify who can fix it. Follow up where appropriate and check whether the change helped." },
];

export function ServicesReputationWalkthrough(_props: {
  offerings?: unknown;
  placement?: "services" | "contact" | "detail";
}) {
  const [active, setActive] = useState(0);
  const scenario = scenarios[active];
  const Icon = scenario.icon;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    event.currentTarget.style.setProperty("--spin-x", ((.5 - (event.clientY - bounds.top) / bounds.height) * 18) + "deg");
    event.currentTarget.style.setProperty("--spin-y", (((event.clientX - bounds.left) / bounds.width - .5) * 24) + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--spin-x");
    event.currentTarget.style.removeProperty("--spin-y");
  }

  return (
    <section id="seo-support" className={styles.section} aria-labelledby="seo-support-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p data-site-eyebrow="">Online reputation management</p>
          <h2 id="seo-support-title" data-site-heading="">Reviews <span>matter</span></h2>
          <p>What people find about your business can shape whether they contact you. Accurate listings and honest reviews build confidence and show where the customer experience can improve.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset} aria-hidden="true">
            <div className={styles.rig}>
              <div className={styles.ring} />
              <div className={styles.innerRing} />
              <div className={styles.orbitA} /><div className={styles.orbitB} />
              <div className={styles.depth}>
                <div className={styles.core} key={scenario.label}><Icon size={54} strokeWidth={1.4} /></div>
              </div>
              {scenarios.map(({ icon: Signal, label }, index) => (
                <div className={styles.signal} data-active={active === index} key={label}>
                  <Signal size={22} strokeWidth={1.6} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.controls} role="group" aria-label="What shapes your reputation">
              {scenarios.map(({ label }, index) => (
                <button key={label} type="button" aria-pressed={active === index} aria-controls="reputation-detail"
                  onClick={() => setActive(index)}>{label}</button>
              ))}
            </div>
            <div id="reputation-detail" aria-live="polite" aria-atomic="true">
              <div className={styles.detail} key={scenario.title}><h3>{scenario.title}</h3><p>{scenario.description}</p></div>
            </div>
            <Link className={styles.cta} href={reviewDirectoryPath} data-orbilect-cta="black">
              <span data-orbilect-cta-icon="" data-explicit-arrow="" aria-hidden="true"><ArrowUpRight size={17} /></span>
              Explore reviews and leave feedback
            </Link>
          </div>
        </div>
        <ReviewPlatformDisplay />
      </div>
    </section>
  );
}
