"use client";
import { AssetImage } from "@/components/optimized-image";


import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { useId, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight, ClipboardCheck, MessageSquare, Search } from "lucide-react";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "./contact-page-hero.module.css";

const title = "Let’s talk about growing your business";
const steps = [
  { label: "Tell us your goal", note: "Share your website and what you want to improve.", icon: MessageSquare },
  { label: "Review the opportunities", note: "We look at the pages, products, or markets that matter to you.", icon: Search },
  { label: "Plan the next step", note: "We discuss what to prioritize and what the work could involve.", icon: ClipboardCheck },
];

export default function ContactPageHero() {
  const [active, setActive] = useState(0);
  const detailId = useId();
  let character = 0;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const { left, top, width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    stage.style.setProperty("--rx", `${(.5 - (event.clientY - top) / height) * 17}deg`);
    stage.style.setProperty("--ry", `${((event.clientX - left) / width - .5) * 23}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section className={styles.hero} aria-labelledby="contact-heading">
      <div className={styles.layout}>
        <div>
          <a href="/" aria-label="Orbilect SEO home" style={{color:"inherit",textDecoration:"none",width:"fit-content"}} className={styles.brand} data-reveal="off">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <AssetImage src="/brand/orbilect-seo-mark.svg" alt="" width={36} height={36} />
            <span>Orbilect <strong>SEO</strong></span>
          </a>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Contact us</p>
          <h1 id="contact-heading" aria-label={title} data-reveal="off">
            <span aria-hidden="true">
              {title.split(" ").map((word, index) => (
                <span key={word}>
                  {index > 0 ? " " : ""}
                  <span className={index >= 3 ? styles.accent : styles.word}>
                    {Array.from(word, (letter, position) => (
                      <span key={position} className={styles.letter}
                        style={{ "--delay": `${character++ * 38}ms` } as CSSProperties}>{letter}</span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p className={styles.intro}>Tell us who you want to reach and what you want to improve. We’ll help you identify where to start, from getting found in search to making it easier for customers to enquire.</p>
          <HeroActions>
            <a href="#request-proposal" className={`${cta.cta} ${cta.ctaBlack} ${styles.action}`} data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />

              Request a proposal
            </a>
            <HeroAudit />
          </HeroActions>
        </div>

        <div className={styles.preview}>
          <div className={styles.stage} aria-hidden="true" onPointerMove={tilt}
            onPointerLeave={reset} onPointerCancel={reset}>
            <div className={styles.model}>
              {steps.map(({ label, icon: Icon }, index) => (
                <div key={label} className={styles.card}
                  data-depth={(index - active + steps.length) % steps.length}>
                  <span className={styles.cardIcon}><Icon size={27} /></span>
                  <strong>{label}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.controls} role="group" aria-label="What happens when you contact us">
            {steps.map(({ label }, index) => (
              <button key={label} type="button" aria-pressed={index === active}
                aria-controls={detailId} onClick={() => setActive(index)}>{label}</button>
            ))}
          </div>
          <p id={detailId} className={styles.note} aria-live="polite" aria-atomic="true">
            <span key={active}>{steps[active].note}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
