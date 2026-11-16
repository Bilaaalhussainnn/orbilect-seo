import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import AuditScene from "./audit-scene";
import styles from "./audit-hero.module.css";

const title = "See what your free SEO audit covers";

export default function AuditHero() {
  let character = 0;

  return (
    <section className={styles.hero} aria-labelledby="audit-guide-title">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <a href="/" aria-label="Orbilect SEO home" style={{color:"inherit",textDecoration:"none",width:"fit-content"}} className={styles.brand} data-reveal="off">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/orbilect-seo-mark.svg" alt="" width={38} height={38} />
            <span>Orbilect <strong>SEO</strong></span>
          </a>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Free SEO Audit</p>
          <h1 id="audit-guide-title" aria-label={title} data-reveal="off">
            <span aria-hidden="true">
              {title.split(" ").map((word, index) => (
                <span key={index}>
                  {index > 0 ? " " : ""}
                  <span className={index >= 4 ? styles.accentWord : styles.word}>
                    {Array.from(word, (letter, position) => (
                      <span
                        key={position}
                        className={styles.character}
                        style={{ "--delay": `${character++ * 38}ms` } as CSSProperties}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p className={styles.intro}>Find out what could be limiting your search visibility, which pages need attention, and what to fix first.</p>
          <HeroActions className={styles.actions}>
            <HeroAudit />
            <a href="#audit-report" className={styles.secondary}>
              Explore the report <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </HeroActions>
        </div>

        <div className={styles.visual}>
          <AuditScene />
        </div>
      </div>
    </section>
  );
}
