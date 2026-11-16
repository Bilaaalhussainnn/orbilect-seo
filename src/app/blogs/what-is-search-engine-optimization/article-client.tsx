"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./article.module.css";

export function TypeTitle({ words }: { words: string }) {
  let index = 0;
  return (
    <span className={styles.highlight}>
      {words.split(" ").map((word, wordIndex) => (
        <span className={styles.word} key={wordIndex}>
          {Array.from(word).map((letter, letterIndex) => (
            <span key={letterIndex} style={{ animationDelay: 170 + index++ * 39 + "ms" }}>{letter}</span>
          ))}
          {wordIndex < words.split(" ").length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

export function ArticleSidebar({
  sections,
  linkedin = process.env.NEXT_PUBLIC_ORBILECT_LINKEDIN ?? "https://www.linkedin.com/company/orbilect-seo/",
  x = process.env.NEXT_PUBLIC_ORBILECT_X ?? "https://x.com/orbilectseo",
  contentsLabel = "In this article",
}: {
  sections: { id: string; title: string }[];
  linkedin?: string;
  x?: string;
  contentsLabel?: string;
}) {
  const [active, setActive] = useState("");
  const tocList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = tocList.current;
    const link = list?.querySelector('[aria-current="location"]');
    if (!list || !link || list.scrollHeight <= list.clientHeight) return;

    const viewport = list.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    const inset = 6;

    if (item.bottom > viewport.bottom - inset) {
      list.scrollTop += item.bottom - viewport.bottom + inset;
    } else if (item.top < viewport.top + inset) {
      list.scrollTop += item.top - viewport.top - inset;
    }
  }, [active]);

  useEffect(() => {
    const headings = sections.map(section => document.getElementById(section.id));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let next = "";
        for (const heading of headings) {
          if (heading && heading.getBoundingClientRect().top <= 155) next = heading.id;
        }
        setActive(next);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  return (
    <aside className={styles.sidebar} aria-label="Article navigation and social links">
      <div className={styles.social}>
        <h2>Follow us for more</h2>
        <p className={styles.socialDescription}>SEO tips and updates from Orbilect SEO.</p>
        <div className={styles.socialButtons}>
        <a href={linkedin} aria-label="Follow Orbilect SEO on LinkedIn" title="LinkedIn">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.57h.05a3.75 3.75 0 0 1 3.38-1.86c3.62 0 4.26 2.38 4.26 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
          </svg>
        </a>
        <a href={x} aria-label="Follow Orbilect SEO on X" title="X">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M18.9 2h3.31l-7.23 8.26L23.5 22h-6.67l-5.22-7.12L5.38 22H2.06l7.73-8.84L1.62 2h6.84l4.72 6.46L18.9 2Zm-1.16 18h1.83L7.46 3.89H5.5L17.74 20Z" />
          </svg>
        </a>
        </div>
      </div>
      <nav aria-label="Table of contents" className={styles.toc}>
        <p>{contentsLabel}</p>
        <ul ref={tocList} tabIndex={0} aria-label="Article sections">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a href={"#" + id} aria-current={active === id ? "location" : undefined}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
