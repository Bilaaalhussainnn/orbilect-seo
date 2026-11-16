import type { CSSProperties } from "react";
import styles from "./google-device-screen.module.css";

export default function GoogleDeviceScreen({ query, title, ready = true, animate = false }: {
  query: string;
  title: string;
  ready?: boolean;
  animate?: boolean;
}) {
  return (
    <span className={styles.screen} data-animate={animate ? "" : undefined}
      style={{ "--result-delay": (240 + query.length * 36) + "ms" } as CSSProperties}>
      <span className={styles.toolbar}><i /><i /><i /><span>google.com</span></span>
      <span className={styles.body}>
        <span className={styles.google} aria-label="Google">
          {Array.from("Google", (letter, index) => <i key={index}>{letter}</i>)}
        </span>
        <span className={styles.query}>
          <span className={styles.magnifier} />
          <span className={styles.queryText}>
            {animate ? Array.from(query, (letter, index) => (
              <span key={index} className={styles.letter}
                style={{ animationDuration: (140 + index * 36) + "ms" }}>{letter}</span>
            )) : query}
          </span>
        </span>
        {ready && (
          <span className={styles.result}>
            <small>example.com</small>
            <strong>{title}</strong>
            <i /><i />
          </span>
        )}
      </span>
    </span>
  );
}
