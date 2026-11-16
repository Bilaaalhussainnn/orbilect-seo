"use client";

import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { BlogDirectory } from "./blog-directory";
import { OrbilectHeroBrand } from "../contact/contact-hero";
import OrbilectHeroType from "../_components/orbilect-hero-type";
import { useState, type PointerEvent } from "react";
import { ArrowUpRight, BarChart3, Code2, Search } from "lucide-react";
import styles from "./blog-landing.module.css";

const topics = [
  { name: "Search strategy", Icon: Search },
  { name: "Digital marketing", Icon: BarChart3 },
  { name: "Website performance", Icon: Code2 },
];

function tilt(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse") return;
  const stage = event.currentTarget;
  const bounds = stage.getBoundingClientRect();
  stage.style.setProperty("--pitch", ((event.clientY - bounds.top) / bounds.height - .5) * -20 + "deg");
  stage.style.setProperty("--yaw", ((event.clientX - bounds.left) / bounds.width - .5) * 26 + "deg");
}

export default function BlogLanding({ showBrowse = true }: { showBrowse?: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <section className={styles.hero} aria-labelledby="blog-landing-title" data-orbilect-contact-grid="">
        <div className={styles.inner + " " + styles.split}>
          <div className={styles.copy}>
            <OrbilectHeroBrand />
            <p className={styles.eyebrow}>Orbilect SEO Blog</p>
            <h1 id="blog-landing-title"><OrbilectHeroType lead={"Get found"} accent={"and get chosen"} /></h1>
            <p>Practical guides to search, digital marketing, and building websites that turn visits into enquiries.</p>
            <HeroActions>
              {showBrowse && (
                <a className={styles.cta} href="#blog-library">
                  <span aria-hidden="true"><ArrowUpRight size={17} /></span>
                  Browse articles
                </a>
              )}
              <HeroAudit />
            </HeroActions>
          </div>

          <div className={styles.feature}>
            <div className={styles.stage} aria-hidden="true" onPointerMove={tilt} onPointerLeave={event => {
              event.currentTarget.style.removeProperty("--pitch");
              event.currentTarget.style.removeProperty("--yaw");
            }}>
              <div className={styles.orbit} />
              <div className={styles.rig}>
                {topics.map(({ name, Icon }, index) => (
                  <div className={styles.tile} key={name} data-layer={(index - active + topics.length) % topics.length}>
                    <Icon size={33} strokeWidth={1.6} />
                    <strong>{name}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.controls} role="group" aria-label="Featured blog topics">
              {topics.map(({ name }, index) => (
                <button type="button" key={name} aria-pressed={index === active} onClick={() => setActive(index)}>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <BlogDirectory />
    </>
  );
}
