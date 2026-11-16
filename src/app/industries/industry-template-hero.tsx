"use client";

import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { useState, type CSSProperties } from "react";
import GoogleDeviceScreen from "@/components/google-device-screen";
import { OrbilectHeroBrand } from "../contact/contact-hero";
import type { briefs, IndustrySlug } from "./industry-briefs";
import styles from "./automotive/automotive.module.css";
import devices from "./industry-search-devices.module.css";
import template from "./industry-template.module.css";

export default function IndustryTemplateHero({ info }: { info: (typeof briefs)[IndustrySlug] }) {
  const [selected, setSelected] = useState(0);
  const [replay, setReplay] = useState(0);
  const query = info.searches[selected];
  const offer = info.offers[selected];

  return (
    <section className={styles.hero} aria-labelledby="industry-page-title">
      <div className={[styles.wrap, styles.heroGrid].join(" ")}>
        <div>
          <OrbilectHeroBrand />
          <p className={styles.eyebrow} data-site-eyebrow="">{info.name} SEO</p>
          <h1 id="industry-page-title" data-orbilect-title="" data-reveal="off" aria-label={info.headline.join(" ")}>
            {info.headline.map((line, row) => (
              <span key={line} className={row ? styles.accent : undefined} aria-hidden="true">
                {line.split(" ").map((word, index, words) => {
                  const offset = (row ? info.headline[0].length + 1 : 0) +
                    words.slice(0, index).join(" ").length + (index ? 1 : 0);
                  return <span key={index}>{index > 0 && " "}<span className={styles.word}>
                    {Array.from(word, (letter, i) => (
                      <span key={i} className={template.letter}
                        style={{ "--letter-duration": (80 + (offset + i) * 43) + "ms" } as CSSProperties}>{letter}</span>
                    ))}
                  </span></span>;
                })}
              </span>
            ))}
          </h1>
          <p className={styles.lead}>Help {info.audience} discover your {info.offers[0].toLowerCase()} offering, see {info.proof}, and {info.action}.</p>
          <HeroActions>
            <a className={styles.heroLink} href="#industry-help">Explore {info.name} SEO</a>
            <HeroAudit source="industry-detail-audit" />
          </HeroActions>
        </div>

        <div className={styles.showroom}>
          <div key={selected + ":" + replay} className={devices.stage} aria-hidden="true">
            <div className={devices.rig}>
              <div className={devices.laptop}>
                <div className={devices.screen}><GoogleDeviceScreen query={query} title={offer} animate /></div>
                <div className={devices.keyboard} />
              </div>
              <div className={devices.phone}>
                <div className={devices.screen}><GoogleDeviceScreen query={query} title={offer} animate /></div>
              </div>
            </div>
          </div>
          <button type="button" className={devices.replay} onClick={() => setReplay(value => value + 1)}>Replay search preview</button>
          <div className={styles.controls} role="group" aria-label={info.name + " search examples"}>
            {info.offers.map((item, index) => (
              <button key={item} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item}</button>
            ))}
          </div>
          <div className={styles.readout} aria-live="polite">
            <div><span><small>Customer search</small>{query}</span></div>
            <div><span><small>Next step</small>{info.action}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
