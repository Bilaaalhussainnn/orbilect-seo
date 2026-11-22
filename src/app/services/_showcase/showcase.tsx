"use client";

import Image from "@/components/optimized-image";
import Link from "next/link";
import { ArrowUpRight, GalleryHorizontal, Gauge, Layers3, MousePointer2, Star, Store } from "lucide-react";
import { useState, type PointerEvent } from "react";
import styles from "./showcase.module.css";
import investment from "../../_components/service-investment.module.css";
import { ShowcaseHeading } from "./section-heading";

const visuals = {
  ad: { icon: GalleryHorizontal, label: "Example ad placement", lines: ["ChatGPT response", "Sponsored placement below the response", "Advertiser landing page"] },
  speed: { icon: Gauge, label: "Page performance", lines: ["Mobile loading", "Layout stability", "Interaction response"] },
  behavior: { icon: MousePointer2, label: "Visitor behaviour", lines: ["Scroll depth", "Click patterns", "Form friction"] },
  profile: { icon: Store, label: "Business Profile", lines: ["Hours and services", "Accurate contact details", "Website link"] },
  reviews: { icon: Star, label: "Review themes", lines: ["Service feedback", "Common questions", "Response priorities"] },
};

export type ShowcaseItem = {
  label: string;
  logo?: string;
  title: string;
  detail: string;
  points: string[];
  href?: string;
  linkLabel?: string;
  visual?: keyof typeof visuals;
};

export function PartnerLogo({ logo, size = 24 }: { logo: string; size?: number }) {
  return <Image src={logo} alt="" width={size} height={size} unoptimized className={styles.logo} />;
}

export function Showcase({
  id, eyebrow, title, accent, intro, items, channels, enquiry, ctaHref, ctaLabel,
}: {
  id: string;
  title: string;
  accent: string;
  intro: string;
  items: ShowcaseItem[];
  channels?: { label: string; logo: string }[];
  eyebrow: string;
  enquiry: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const selected = items[active];
  const visual = selected.visual && visuals[selected.visual];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--tilt-x", ((event.clientY - rect.top) / rect.height - .5) * -13 + "deg");
    stage.style.setProperty("--tilt-y", ((event.clientX - rect.left) / rect.width - .5) * 16 + "deg");
  }

  return (
    <section className={`${investment.section} ${styles.section}`} aria-labelledby={id + "-title"} id={id}>
      <div className={investment.wrap}>
        <ShowcaseHeading id={id + "-title"} {...{eyebrow, title, accent, intro, enquiry, ctaHref, ctaLabel}} />
        {channels && (
          <ul className={styles.channels} aria-label="Campaign channels">
            {channels.map(({ label, logo }) => <li key={label}><PartnerLogo logo={logo} />{label}</li>)}
          </ul>
        )}
        <div className={styles.grid}>
          <div className={styles.options} role="group" aria-label={title + " " + accent}>
            {items.map((item, index) => (
              <button type="button" aria-pressed={index === active} aria-controls={id + "-panel"}
                key={item.label} onClick={() => setActive(index)}>
                {item.logo && <PartnerLogo logo={item.logo} />}
                <span>{item.label}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.stage} onPointerMove={tilt} onPointerLeave={event => {
            event.currentTarget.style.removeProperty("--tilt-x");
            event.currentTarget.style.removeProperty("--tilt-y");
          }}>
            <div className={styles.rig}>
              <div className={styles.panel} id={id + "-panel"} aria-live="polite" aria-atomic="true">
                <div key={selected.label} className={styles.panelContent}>
                  <div className={styles.panelTop}>
                    {selected.logo ? <PartnerLogo logo={selected.logo} size={29} /> : <Layers3 size={23} aria-hidden="true" />}
                    <span>{selected.label}</span>
                  </div>
                  <h3>{selected.title}</h3>
                  <p>{selected.detail}</p>
                  <ul>{selected.points.map(point => <li key={point}>{point}</li>)}</ul>
                  {visual && (
                    <figure className={styles.toolVisual} aria-label={visual.label}>
                      <div className={styles.toolLabel}><visual.icon size={21} aria-hidden="true" />{visual.label}</div>
                      <div className={styles.toolBody}>
                        <svg className={styles.toolDiagram} viewBox="0 0 144 78" aria-hidden="true">
                          <rect x="1" y="1" width="142" height="76" rx="7" fill="#0c1626" stroke="#354764" />
                          <path d="M1 14h142" stroke="#354764" /><circle cx="9" cy="8" r="1.7" fill="#7092bf" />
                          <circle cx="15" cy="8" r="1.7" fill="#7092bf" /><circle cx="21" cy="8" r="1.7" fill="#7092bf" />
                          {selected.visual === "speed" && <>
                            <path d="M16 56a19 19 0 0 1 38 0" fill="none" stroke="#004aad" strokeWidth="5" />
                            <path d="m35 56 9-12M69 34h59M69 45h47M69 56h54" stroke="#a2c7ff" strokeWidth="3" strokeLinecap="round" />
                          </>}
                          {selected.visual === "behavior" && <>
                            <path d="M17 26h110v40H17z" fill="#13294a" /><path d="M27 35h42m-42 19h82" stroke="#6a8dbb" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="94" cy="39" r="10" fill="#004aad" /><circle cx="94" cy="39" r="4" fill="#a2c7ff" /><circle cx="45" cy="56" r="5" fill="#74a9fa" />
                          </>}
                          {selected.visual === "profile" && <>
                            <path d="M15 34h33v29H15zM13 33l6-8h26l6 8" fill="#004aad" /><path d="M28 46h8v17h-8z" fill="#a2c7ff" />
                            <path d="M60 31h66m-66 11h48m-48 11h57" stroke="#7c9fcf" strokeWidth="3" strokeLinecap="round" />
                          </>}
                          {selected.visual === "reviews" && <>
                            <path d="m28 24 4 10 11 1-8 7 3 11-10-6-10 6 3-11-8-7 11-1z" fill="#79afff" />
                            <path d="M54 31h72m-72 11h57m-57 11h64" stroke="#7694bc" strokeWidth="3" strokeLinecap="round" />
                          </>}
                          {selected.visual === "ad" && <>
                            <path d="M15 25h109m-109 10h78" stroke="#7c9fcf" strokeWidth="3" strokeLinecap="round" />
                            <rect x="14" y="47" width="116" height="18" rx="3" fill="#004aad" /><path d="M22 56h55m40 0h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                          </>}
                        </svg>
                        <ul>{visual.lines.map(line => <li key={line}>{line}</li>)}</ul>
                      </div>
                    </figure>
                  )}
                  {selected.href && <Link href={selected.href}>{selected.linkLabel} <ArrowUpRight size={15} aria-hidden="true" /></Link>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
