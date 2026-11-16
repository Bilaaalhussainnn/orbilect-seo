"use client";

import { businessDescription } from "@/lib/site-identity";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, Copy, FileText } from "lucide-react";
import styles from "./press-kit.module.css";

const description = businessDescription;

export default function PressKit() {
  const id = useId();
  const copy = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");

  async function copyDescription() {
    try {
      await navigator.clipboard.writeText(description);
      setStatus("Company description copied.");
    } catch {
      copy.current?.focus();
      copy.current?.select();
      setStatus("Text selected. Use your device’s Copy command.");
    }
  }

  return (
    <section className={styles.kit} aria-labelledby={id}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.label}>Media resources</p>
          <h2 id={id}>The Orbilect SEO <span>press kit</span></h2>
          <p>Use our company description in your coverage or request brand assets for publication.</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.deck}>
              <div className={styles.back} />
              <div className={styles.middle} />
              <div className={styles.front}><FileText size={42} strokeWidth={1.4} /></div>
            </div>
          </div>

          <div className={styles.content}>
            <h3>Company description</h3>
            <textarea ref={copy} aria-label="Orbilect SEO company description"
              readOnly value={description} rows={5} />
            <div className={styles.actions}>
              <button type="button" onClick={copyDescription}>
                <Copy size={15} aria-hidden="true" /> Copy description
              </button>
              <a href="mailto:mediapr@orbilectseo.com?subject=Orbilect%20SEO%20brand%20assets">
                Request brand assets <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <p className={styles.status} role="status">{status}</p>

            <h3>Commentary topics</h3>
            <ul className={styles.topics}>
              <li>Technical SEO</li>
              <li>AI in search</li>
              <li>Content strategy</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
