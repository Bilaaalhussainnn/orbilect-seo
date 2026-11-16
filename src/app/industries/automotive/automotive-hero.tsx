"use client";

import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { useEffect, useRef, useState } from "react";
import { CarFront, Search } from "lucide-react";
import { OrbilectHeroBrand } from "../../contact/contact-hero";
import dynamic from "next/dynamic";
import styles from "./automotive.module.css";

const AutomotiveVisual = dynamic(() => import("./automotive-visual"), {
  ssr: false,
  loading: () => <div className={styles.stage} aria-hidden="true" />,
});

const modes = [
  { label: "Dealerships", query: "used hybrid SUV near me", page: "Local hybrid SUV inventory", action: "Request a test drive" },
  { label: "Repair shops", query: "brake repair near me", page: "Brake repair service page", action: "Book an inspection" },
  { label: "Parts retailers", query: "Front brake pads for BMW M5 CS", page: "Vehicle fitment and parts listing", action: "Check fitment and buy" },
];
const title = ["Get found before", "the test drive"];

export default function AutomotiveHero() {
  const [selected, setSelected] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const mode = modes[selected];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !heading.current) return;
    const animations = Array.from(heading.current.querySelectorAll("[data-letter]"), (letter, index) =>
      typeof letter.animate === "function"
        ? letter.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 90 + index * 46, fill: "none" })
        : null
    );
    const stop = () => animations.forEach(animation => animation?.cancel());
    motion.addEventListener("change", stop);
    return () => { stop(); motion.removeEventListener("change", stop); };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="automotive-title">
      <div className={[styles.wrap, styles.heroGrid].join(" ")}>
        <div>
          <OrbilectHeroBrand />
          <p className={styles.eyebrow} data-site-eyebrow="">Automotive SEO</p>
          <h1 ref={heading} id="automotive-title" aria-label={title.join(" ")} data-orbilect-title="" data-reveal="off">
            {title.map((line, index) => (
              <span key={line} className={index ? styles.accent : undefined} aria-hidden="true">
                {line.split(" ").map((word, wordIndex) => (
                  <span key={word}>
                    {wordIndex > 0 && " "}
                    <span className={styles.word}>
                      {Array.from(word, (letter, i) => <span key={i} data-letter="">{letter}</span>)}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className={styles.lead}>Help shoppers find the right vehicle, drivers book the right repair, and parts buyers confirm compatibility.</p>
          <HeroActions>
            <a className={styles.heroLink} href="#automotive-help">Explore automotive SEO</a>
            <HeroAudit source="industry-detail-audit" />
          </HeroActions>
        </div>

        <div className={styles.showroom}>
          <AutomotiveVisual mode={selected} />
          <div className={styles.controls} role="group" aria-label="Automotive business examples">
            {modes.map(({ label }, index) => (
              <button key={label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>
            ))}
          </div>
          <div className={styles.readout} aria-live="polite">
            <div><Search size={18} aria-hidden="true" /><span><small>Customer search</small>{mode.query}</span></div>
            <div><CarFront size={18} aria-hidden="true" /><span><small>{mode.action}</small>{mode.page}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
