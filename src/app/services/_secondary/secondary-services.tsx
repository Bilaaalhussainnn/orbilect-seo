"use client";

import Link from "next/link";
import { useId, useState, type PointerEvent } from "react";
import * as Icons from "lucide-react";
import { secondaryServices, type SecondarySlug } from "./catalog";
import detailStyles from "./secondary.module.css";
import styles from "./growth-mix.module.css";

const groups = [
  { label: "Paid reach", items: ["ppc-management", "bing-advertising", "chatgpt-advertising", "paid-social-advertising"] },
  { label: "Content and visibility", items: ["social-media-marketing", "seo-content-writing", "hire-seo-content-writer", "digital-pr"] },
  { label: "Conversion and tracking", items: ["email-marketing", "conversion-rate-optimization", "landing-page-design", "marketing-analytics"] },
] as const satisfies ReadonlyArray<{ label: string; items: readonly SecondarySlug[] }>;

export function ServiceObject({ slug }: { slug: SecondarySlug }) {
  const Icon = Icons[secondaryServices[slug].icon];
  return (
    <span className={detailStyles.perspective} aria-hidden="true">
      <span className={detailStyles.object}>
        <span className={detailStyles.depth} />
        <span className={detailStyles.face}><Icon size={26} strokeWidth={1.6} /></span>
      </span>
    </span>
  );
}

function tilt(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse") return;
  const surface = event.currentTarget;
  const box = surface.getBoundingClientRect();
  surface.style.setProperty("--tilt-x", ((0.5 - (event.clientY - box.top) / box.height) * 18) + "deg");
  surface.style.setProperty("--tilt-y", (((event.clientX - box.left) / box.width - 0.5) * 22) + "deg");
}

function reset(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty("--tilt-x");
  event.currentTarget.style.removeProperty("--tilt-y");
}

export default function SecondaryServices() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [active, setActive] = useState<SecondarySlug>("ppc-management");
  const id = useId();
  const service = secondaryServices[active];
  const Icon = Icons[service.icon];

  function chooseGroup(index: number) {
    setGroupIndex(index);
    setActive(groups[index].items[0]);
  }

  return (
    <section id="secondary-services" className={styles.section} aria-labelledby={id + "-title"}>
      <div className={styles.wrap}>
        <header>
          <p className={styles.eyebrow} data-site-eyebrow="">The Growth Mix</p>
          <h2 id={id + "-title"} data-orbilect-title="">Invest in reach <span>that leads somewhere</span></h2>
          <p className={styles.intro}>
            A focused marketing investment can bring more of the right people to your site.
            Paid campaigns help you reach them, and stronger content and landing pages
            give those visitors a clear reason to enquire, book, or buy.
          </p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.groups} role="group" aria-label="Choose a marketing objective">
            {groups.map(({ label }, index) => (
              <button key={label} type="button" aria-pressed={groupIndex === index}
                aria-controls={id + "-group-" + index} onClick={() => chooseGroup(index)}>
                {label}
              </button>
            ))}
          </div>

          <div className={styles.directory}>
            {groups.map(({ label, items }, index) => (
              <ul key={label} id={id + "-group-" + index} hidden={groupIndex !== index} aria-label={label}>
                {items.map(slug => {
                  const item = secondaryServices[slug];
                  const RowIcon = Icons[item.icon];
                  return (
                    <li key={slug}>
                      <Link href={"/services/" + slug} data-previewed={active === slug ? "" : undefined}
                        onFocus={() => setActive(slug)} onPointerEnter={() => setActive(slug)}>
                        <RowIcon size={20} aria-hidden="true" />
                        <span>{item.name}</span>
                        <Icons.ArrowUpRight size={17} aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>

          <div className={styles.preview}>
            <div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} aria-hidden="true">
              <div key={active} className={styles.rig}>
                <span className={styles.orbit}><i /></span>
                <span className={styles.orbit}><i /></span>
                <span className={styles.orbit}><i /></span>
                <span className={styles.core}><Icon size={49} strokeWidth={1.5} /></span>
              </div>
            </div>
            <div className={styles.previewCopy} key={active}>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <dl><dt>What we measure</dt><dd>{service.measure}</dd></dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
