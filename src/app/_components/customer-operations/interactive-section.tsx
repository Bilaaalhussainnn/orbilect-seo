"use client";

import Link from "next/link";
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { useState, type PointerEvent, type ReactNode } from "react";
import base from "../../services/on-page-seo/on-page-subservices.module.css";
import styles from "./interactive-section.module.css";

export type Scene = {
  label: string;
  icon: LucideIcon;
  title: string;
  copy: string;
  checks: string[];
};

export function InteractiveSection({
  id, eyebrow, title, accent, intro, scenes, children, link, light = false, selection,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  scenes: readonly Scene[];
  children?: ReactNode;
  link?: { label: string; href: string };
  light?: boolean;
  selection?: { index: number; onChange: (index: number) => void };
}) {
  const [active, setActive] = useState(0);
  const scene = scenes[selection?.index ?? active];
  const Icon = scene.icon;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
    if (!width || !height) return;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - (event.clientY - top) / height) * 12}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - left) / width - 0.5) * 16}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return (
    <section id={id} className={`${base.section} ${styles.section}`} data-operations="" data-light={light || undefined} aria-labelledby={id + "-title"}>
      <div className={base.wrap}>
        <header className={`${base.header} ${styles.header}`}>
          <p className={base.eyebrow} data-site-eyebrow="">{eyebrow}</p>
          <h2 id={id + "-title"} data-site-heading="">{title} <span>{accent}</span></h2>
          <p>{intro}</p>
        </header>
        <div className={base.layout}>
          <div className={`${base.controls} ${styles.controls}`} role="group" aria-label={eyebrow}>
            {scenes.map((option, index) => (
              <button key={option.label} type="button" aria-controls={id + "-preview"} aria-pressed={scene === option} onClick={() => (selection?.onChange ?? setActive)(index)}>
                <option.icon size={19} aria-hidden="true" />
                {option.label}
                <ArrowUpRight className={base.arrow} size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={`${base.stage} ${styles.stage}`} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
            <div className={`${base.device} ${styles.card}`} id={id + "-preview"} aria-live="polite" aria-atomic="true">
              <div key={scene.label} className={styles.scene}>
                <div className={styles.art} aria-hidden="true">
                  <div className={styles.track} />
                  <span className={styles.artTile}><Icon size={34} strokeWidth={1.5} /></span>
                  <span className={styles.artTile}><Check size={23} strokeWidth={1.7} /></span>
                </div>
                <div className={styles.badge}>{scene.label}</div>
                <h3>{scene.title}</h3>
                <p>{scene.copy}</p>
                <ul className={styles.checks} role="list">
                  {scene.checks.map((check) => <li key={check}>{check}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {children}
        {link && <Link className={styles.cta} href={link.href} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />{link.label}</Link>}
      </div>
    </section>
  );
}
