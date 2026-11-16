"use client";

import { useEffect, useState } from "react";
import styles from "./orbilect-hero-type.module.css";

export default function OrbilectHeroType({ lead, accent }: { lead: string; accent: string }) {
  const full = lead + " " + accent;
  const [count, setCount] = useState(full.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let position = 0;
    let timer: number;
    setCount(0);
    function next() {
      position++;
      setCount(position);
      if (position < full.length) timer = window.setTimeout(next, 55);
    }
    timer = window.setTimeout(next, 160);
    return () => window.clearTimeout(timer);
  }, [full]);

  const typing = count < full.length;
  const cursor = <span className={styles.cursor} />;
  return (
    <span className={styles.title}>
      <span className={styles.reserve}>{full}</span>
      <span className={styles.visible} aria-hidden="true">
        {lead.slice(0, count)}
        {typing && count <= lead.length ? cursor : null}
        {count > lead.length ? " " : ""}
        <span className={styles.accent} data-typewriter-accent={count > lead.length + 1 ? "" : undefined}>{accent.slice(0, Math.max(0, count - lead.length - 1))}</span>
        {typing && count > lead.length ? cursor : null}
      </span>
    </span>
  );
}
