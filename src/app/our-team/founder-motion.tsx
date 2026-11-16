"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./founder-motion.module.css";

const name = "Bilal Hussain";
const surnameAt = name.indexOf("Hussain");

export function PortraitReveal({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frame.current;
    if (!node || !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} className={styles.stage} data-reveal-portrait={visible}>
      <div className={styles.imagePlane}>{children}</div>
    </div>
  );
}

export function TypedFounderName() {
  const signature = useRef<HTMLElement>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const node = signature.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || !("IntersectionObserver" in window) || preference.matches) return;

    let timer: number | undefined;
    let position = 0;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (preference.matches) return;

      setCount(0);
      timer = window.setInterval(() => {
        position += 1;
        setCount(position);
        if (position === name.length) window.clearInterval(timer);
      }, 110);
    }, { threshold: 0.4 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const typing = count !== null && count < name.length;
  const shown = name.slice(0, count ?? name.length);

  return (
    <strong ref={signature} className={styles.name} data-typing={typing} data-reveal="off">
      <span className={styles.srOnly}>{name}</span>
      <span className={styles.fullName} aria-hidden="true">
        Bilal <span className={styles.surname}>Hussain</span>
      </span>
      {typing && (
        <span className={styles.typed} aria-hidden="true">
          {shown.slice(0, surnameAt)}
          <span className={styles.surname}>{shown.slice(surnameAt)}</span>
          <span className={styles.caret}>|</span>
        </span>
      )}
    </strong>
  );
}
