import { AssetImage } from "@/components/optimized-image";
import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroPreview from "./hero-preview";
import styles from "./corporate.module.css";

type Content = {
  label: string;
  title: readonly [string, string];
  description: string;
  sectionLabel: string;
  sectionTitle: readonly [string, string];
  topics: readonly { title: string; copy: string }[];
  action: { label: string; href: string };
};

export default function CorporatePage({ content, children, heroVisual }: { content: Content; children?: ReactNode; heroVisual?: ReactNode }) {
  const title = content.title.join(" ");
  const accentFrom = content.title[0].split(" ").length;
  let character = 0;

  return (
    <main>
      <section className={styles.hero} aria-labelledby="corporate-title">
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <a href="/" aria-label="Orbilect SEO home" style={{color:"inherit",textDecoration:"none",width:"fit-content"}} className={styles.brand}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <AssetImage src="/brand/orbilect-seo-mark.svg" width={36} height={36} alt="" />
              <span>Orbilect <strong>SEO</strong></span>
            </a>
            <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">{content.label}</p>
            <h1 id="corporate-title" aria-label={title} data-reveal="off">
              <span aria-hidden="true">
                {title.split(" ").map((word, index) => (
                  <span key={index}>
                    {index > 0 ? " " : ""}
                    <span className={index >= accentFrom ? styles.accentWord : styles.word}>
                      {Array.from(word, (letter, position) => (
                        <span key={position} className={styles.character}
                          style={{ "--delay": `${character++ * 32}ms` } as CSSProperties}>
                          {letter}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
            <p className={styles.intro}>{content.description}</p>
            <HeroActions>
              <Link className={styles.action} href={content.action.href}>
                {content.action.label}<ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <HeroAudit />
            </HeroActions>
          </div>
          {heroVisual ?? <HeroPreview topics={content.topics.map(({ title }) => title)} />}
        </div>
      </section>

      {children ?? (
        <section className={styles.section} aria-labelledby="corporate-section-title">
        <div className={styles.wrap}>
          <header className={styles.heading}>
            <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">{content.sectionLabel}</p>
            <h2 id="corporate-section-title">{content.sectionTitle[0]} <span>{content.sectionTitle[1]}</span></h2>
          </header>
          <div className={styles.topics}>
            {content.topics.map(({ title: topic, copy }) => (
              <article key={topic}><h3>{topic}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>
      )}
    </main>
  );
}
