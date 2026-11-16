"use client";

import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { useState, type PointerEvent } from "react";
import Link from "next/link";
import { BedDouble, Factory, ShoppingBag } from "lucide-react";
import OrbilectHeroType from "../_components/orbilect-hero-type";
import hero from "../blogs/blog-landing.module.css";
import styles from "./industries-hero.module.css";

const examples = [
  {
    name: "Ecommerce",
    Icon: ShoppingBag,
    query: "waterproof hiking boots for women",
    page: "Women’s waterproof hiking boots collection",
    outcome: "Product purchases",
  },
  {
    name: "Hospitality",
    Icon: BedDouble,
    query: "family hotel near the convention center",
    page: "Family rooms and location guide",
    outcome: "Direct bookings",
  },
  {
    name: "Manufacturing",
    Icon: Factory,
    query: "custom aluminum parts manufacturer",
    page: "Aluminum machining capabilities",
    outcome: "Qualified quote requests",
  },
];

function tilt({ pointerType, currentTarget, clientX, clientY }: PointerEvent<HTMLDivElement>) {
  if (pointerType !== "mouse") return;
  const { left, top, width, height } = currentTarget.getBoundingClientRect();
  currentTarget.style.setProperty("--pitch", ((clientY - top) / height - .5) * -20 + "deg");
  currentTarget.style.setProperty("--yaw", ((clientX - left) / width - .5) * 26 + "deg");
}

export default function IndustriesHero() {
  const [active, setActive] = useState(0);
  const { query, page, outcome } = examples[active];

  return (
    <section className={hero.hero + " " + styles.hero} aria-labelledby="industries-heading" data-orbilect-contact-grid="">
      <div className={hero.inner + " " + hero.split}>
        <div className={hero.copy}>
          <p className={hero.eyebrow}>Industries we serve</p>
          <h1 id="industries-heading">
            <OrbilectHeroType lead="Turn industry searches" accent="into customers" />
          </h1>
          <p>We build SEO around the searches and buying decisions that matter in your industry.</p>
          <HeroActions>
            <Link className={styles.action} href="#industries" data-orbilect-cta="outline">
              <span data-orbilect-cta-icon="" aria-hidden="true" />
              Explore industries
            </Link>
            <HeroAudit source="industries-audit" />
          </HeroActions>
        </div>

        <div>
          <div className={hero.stage} aria-hidden="true" onPointerMove={tilt} onPointerLeave={event => {
            event.currentTarget.style.removeProperty("--pitch");
            event.currentTarget.style.removeProperty("--yaw");
          }}>
            <div className={hero.orbit} />
            <div className={hero.rig}>
              {examples.map(({ name, Icon }, index) => (
                <div className={hero.tile} key={name} data-layer={(index - active + examples.length) % examples.length}>
                  <Icon size={33} strokeWidth={1.6} />
                  <strong>{name}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={hero.controls} role="group" aria-label="Choose an industry example">
            {examples.map(({ name }, index) => (
              <button key={name} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
                {name}
              </button>
            ))}
          </div>

          <p className={styles.example} aria-live="polite">
            <span>Search: {query}</span>
            <span>Page: {page}</span>
            <span>Goal: {outcome}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
