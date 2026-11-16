"use client";

import type { PointerEvent, ReactNode } from "react";
import styles from "./workbench.module.css";

export function Depth({ children }: { children: ReactNode }) {
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;
    stage.style.setProperty("--stage-x", ((.5 - (event.clientY - box.top) / box.height) * 12) + "deg");
    stage.style.setProperty("--stage-y", (((event.clientX - box.left) / box.width - .5) * 16) + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--stage-x");
    event.currentTarget.style.removeProperty("--stage-y");
  }

  return (
    <div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
      <div className={styles.depth}>{children}</div>
    </div>
  );
}
