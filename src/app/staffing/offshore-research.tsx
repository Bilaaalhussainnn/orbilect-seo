"use client";

import { useId, useState, type PointerEvent } from "react";
import { ArrowUpRight, BookOpen, ChevronRight, Code2, Headphones, Landmark, Megaphone, Network } from "lucide-react";
import styles from "./offshore-research.module.css";

const topics = [
  { label: "Technology", icon: Code2, driver: "Specialist engineering capacity" },
  { label: "Support and operations", icon: Headphones, driver: "Coverage across shifts" },
  { label: "Finance and tax", icon: Landmark, driver: "Repeatable work at scale" },
  { label: "Marketing and web", icon: Megaphone, driver: "More capacity for production" },
  { label: "Shared services", icon: Network, driver: "Long-term delivery capacity" },
];

export function OffshoreResearch({ entries }: { entries: string[][] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const [title, copy, source, url] = entries[active];
  const topic = topics[active];
  const Icon = topic?.icon ?? BookOpen;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const box = stage.getBoundingClientRect();
    stage.style.setProperty("--rx", ((.5 - (event.clientY - box.top) / box.height) * 8) + "deg");
    stage.style.setProperty("--ry", (((event.clientX - box.left) / box.width - .5) * 10) + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.rail} role="group" aria-label="Explore offshored work">
        {entries.map(([name], index) => {
          const TopicIcon = topics[index]?.icon ?? BookOpen;
          return (
            <button key={name} type="button" aria-pressed={index === active}
              aria-controls={id} onClick={() => setActive(index)}>
              <TopicIcon size={19} aria-hidden="true" />
              <span>{topics[index]?.label ?? name}</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
        <div className={styles.panel} id={id}>
          <div className={styles.story} key={title}>
            <div aria-live="polite" aria-atomic="true">
              <div className={styles.driver}><Icon size={20} aria-hidden="true" />{topic?.driver ?? "Why companies offshore"}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <a className={styles.source} href={url}>
              <BookOpen size={18} aria-hidden="true" />
              <span>{source}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
