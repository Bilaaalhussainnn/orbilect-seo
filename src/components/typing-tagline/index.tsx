"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./typing.module.css";
const lead = "The Intelligence Behind How ";
const accent = "Customers Find Your Brand";
export default function TypingTagline({ onView = false, delay = 160 }: { onView?: boolean; delay?: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(!onView);
  useEffect(() => {
    if (!onView || !root.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); observer.disconnect(); }
    }, { threshold: .2 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [onView]);
  let index = 0;
  const words = (text: string) => text.split(/(\s+)/).map((word, w) => {
    if (/^\s+$/.test(word)) { index += word.length; return word; }
    return <span className={styles.word} key={w}>{[...word].map(letter => {
      const position = index++;
      return <span className={styles.character} style={{ animationDelay: `${delay + position * 52}ms` }} key={position}>{letter}</span>;
    })}</span>;
  });
  return <span ref={root} className={styles.tagline} data-typing-tagline="" data-typing-active={active}>
    <span className={styles.accessible}>{lead + accent}</span>
    <span aria-hidden="true"><span className={styles.lead}>{words(lead)}</span><span className={styles.accent}>{words(accent)}</span></span>
  </span>;
}
