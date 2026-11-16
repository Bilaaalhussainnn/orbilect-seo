"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./leadership-message.module.css";

const label = "A message from our founder";

export default function FounderEyebrow() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setTyping(true);
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={styles.founderEyebrow} data-typing={typing} data-reveal="off">
      <span className={styles.founderEyebrowSr}>{label}</span>
      <span aria-hidden="true">
        {Array.from(label, (letter, index) => (
          <span key={index} style={{ animationDelay: `${index * 65}ms` }}>{letter}</span>
        ))}
      </span>
    </p>
  );
}
