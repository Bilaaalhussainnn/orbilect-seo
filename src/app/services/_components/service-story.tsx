"use client";

import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { useState, type PointerEvent } from "react";
import { ArrowRight, ArrowUpRight, Link2, PanelTop, Search } from "lucide-react";
import { OrbilectHeroBrand } from "../../contact/contact-hero";
import styles from "./service-story.module.css";

const sceneIcons = { search: Search, page: PanelTop, links: Link2 };

export type ServiceScene = {
  id: keyof typeof sceneIcons;
  label: string;
  address: string;
  title: string;
  copy: string;
  items: string[];
};

function ServiceTitleWords({ text, start }: { text: string; start: number }) {
  let delay = start;
  return text.split(" ").map((word, index) => {
    const letters = Array.from(word).map((character, position) => (
      <span key={position} className={styles.titleLetter}
        style={{ animationDelay: (delay++ * 38) + "ms" }}>
        {character}
      </span>
    ));
    delay++;
    return (
      <span key={index}>
        {index > 0 ? " " : ""}
        <span className={styles.titleWord}>{letters}</span>
      </span>
    );
  });
}

export function ServiceHero({
  eyebrow,
  title,
  accent,
  intro,
  ctaLabel = "See what we optimize",
  showCtaArrow = true,
  scenes,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  ctaLabel?: string;
  showCtaArrow?: boolean;
  scenes: ServiceScene[];
}) {
  const [active, setActive] = useState(0);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const stage = event.currentTarget;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty("--tilt-x", `${y * -10}deg`);
    stage.style.setProperty("--tilt-y", `${x * 14}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return (
    <section className={`${styles.dark} ${styles.hero}`} aria-labelledby="service-title">
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.serviceHeroCopy}>
          <div className={styles.serviceHeroBrand}><OrbilectHeroBrand /></div>
          <p className={styles.heroEyebrow} data-reveal="off" data-site-eyebrow="">{eyebrow}</p>
          <h1 id="service-title" aria-label={title + " " + accent} data-reveal="off">
            <span aria-hidden="true">
              <ServiceTitleWords text={title} start={0} />
              {" "}
              <span className={styles.titleAccent}>
                <ServiceTitleWords text={accent} start={title.length + 1} />
              </span>
            </span>
          </h1>
          <p className={styles.lead}>{intro}</p>
          <HeroActions>
            <a className={styles.cta} href="#service-intro" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" data-explicit-arrow={showCtaArrow ? "" : undefined} aria-hidden="true">{showCtaArrow && <ArrowUpRight className={styles.ctaArrow} size={16} />}</span>
              {ctaLabel}
            </a>
            <HeroAudit />
          </HeroActions>
        </div>

        <div className={styles.preview}>
          <div className={styles.stage} onPointerMove={tilt} onPointerLeave={resetTilt}>
            <div className={styles.rig}>
              {scenes.map((scene, index) => {
                const Icon = sceneIcons[scene.id];
                const depth = (index - active + scenes.length) % scenes.length;
                return (
                  <div className={styles.browser} data-depth={depth} key={scene.id} aria-hidden={depth !== 0}>
                    <div className={styles.chrome}>
                      <span className={styles.dots} aria-hidden="true">● ● ●</span>
                      <span className={styles.address}><Icon size={13} aria-hidden="true" />{scene.address}</span>
                    </div>
                    <div className={styles.screen}>
                      <span className={styles.screenLabel}>{scene.label}</span>
                      <strong>{scene.title}</strong>
                      <p>{scene.copy}</p>
                      <div className={styles.screenItems}>
                        {scene.items.map((item) => <span key={item}>{item}</span>)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.controls} role="group" aria-label="Browser preview">
            {scenes.map((scene, index) => (
              <button key={scene.id} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
                {scene.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const journey = [
  {
    label: "Show up",
    screen: "Emergency plumber Austin",
    detail: "A homeowner searches after a pipe bursts. A dedicated emergency plumbing page can answer that specific search.",
    measure: "Search impressions for relevant queries",
  },
  {
    label: "Earn the click",
    screen: "Emergency Plumbing in Austin | Example Plumbing",
    detail: "A clear page title tells the homeowner what the business does and where it works before they open the result.",
    measure: "Organic clicks and click-through rate",
  },
  {
    label: "Make it easy to act",
    screen: "Check service coverage → Call for help",
    detail: "The page confirms which neighborhoods the team serves and makes the phone number easy to find on mobile.",
    measure: "Calls or booking requests, where tracking is available",
  },
];

export function OrganicJourney() {
  const [active, setActive] = useState(0);
  const step = journey[active];

  return (
    <section className={styles.light} aria-labelledby="organic-journey-title">
      <div className={`${styles.wrap} ${styles.split}`}>
        <div>
          <p className={styles.eyebrow} data-site-eyebrow="">The organic traffic journey</p>
          <h2 id="organic-journey-title">From a search <span>to a service call</span></h2>
          <p className={styles.lead}>Follow a homeowner with a burst pipe. Each step shows what the page needs to do and what we measure.</p>
        </div>
        <div>
          <div className={styles.journeyControls} role="group" aria-label="Organic traffic journey">
            {journey.map((item, index) => (
              <button type="button" key={item.label} aria-pressed={index === active} onClick={() => setActive(index)}>
                {item.label} <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.journeyOutput} aria-live="polite" aria-atomic="true">
            <div className={styles.journeyCard} key={step.label}>
              <div className={styles.journeyScreen}><Search size={20} aria-hidden="true" /><strong>{step.screen}</strong></div>
              <p>{step.detail}</p>
              <p className={styles.measure}><strong>What we track</strong>{step.measure}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
