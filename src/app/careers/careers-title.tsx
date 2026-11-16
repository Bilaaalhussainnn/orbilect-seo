import type { CSSProperties } from "react";
import { OrbilectHeroBrand } from "../contact/contact-hero";
import styles from "./careers.module.css";

const title = "Careers at Orbilect SEO";

export default function CareersTitle() {
  let character = 0;

  return (
    <>
      <OrbilectHeroBrand />
      <p className={styles.careersHeroLabel} data-site-eyebrow="" data-reveal="off">Careers</p>
      <h1 id="careers-title" aria-label={title} data-reveal="off">
        <span aria-hidden="true">
          {title.split(" ").map((word, index) => (
            <span key={word}>
              {index > 0 ? " " : ""}
              <span className={index >= 2 ? styles.careersAccent : styles.careersWord}>
                {Array.from(word, (letter, position) => (
                  <span key={position} className={styles.careersCharacter}
                    style={{ "--delay": `${character++ * 38}ms` } as CSSProperties}>
                    {letter}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
      </h1>
    </>
  );
}
