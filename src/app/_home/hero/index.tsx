"use client";
import { AssetImage } from "@/components/optimized-image";


import { ArrowUpRight } from "lucide-react";
import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import styles from "@/styles/orbilect-cta.module.css";
import StorefrontScene from "./storefront-scene";
import HeroPlatforms from "./hero-platforms";

export default function Hero() {


  return (
    <section className={styles.hero} aria-labelledby="seo-hero-title">
      <div className={styles.heroInner}>
        <div className={styles.discoveryBackground} aria-hidden="true">
          <div className={styles.codeAtmosphere}>
            <span>&lt;title&gt;Your next customer&lt;/title&gt;</span>
            <span>&lt;meta name="discovery" /&gt;</span>
            <span>search → discover → visit</span>
          </div>

          <div className={styles.searchAtmosphere}>
            <span className={styles.searchPrompt}>Your customers are looking for you</span>
            <span className={styles.searchGraphic}>
              <svg viewBox="0 0 24 24">
                <circle cx="10" cy="10" r="6"/>
                <path d="m15 15 5 5"/>
              </svg>
              <span>Make your brand the next discovery</span>
            </span>
            <span className={styles.resultLines}>
              <i/><i/><i/>
            </span>
          </div>

          <span className={styles.discoveryWord}>DISCOVER</span>
        </div>
        <div className={styles.copy}>
          <a href="/" aria-label="Orbilect SEO home" style={{color:"inherit",textDecoration:"none",width:"fit-content"}} className={styles.brand}>
            <AssetImage
              src="/brand/orbilect-seo-mark.svg"
              alt=""
              width={32}
              height={32}
            />
            <span>Orbilect <span className={styles.accent}>SEO</span></span>
          </a>

          <p data-site-eyebrow="" data-reveal="off">{"Orbilect SEO"}</p>
          <h1 data-site-heading="" id="seo-hero-title" aria-label="The Intelligence Behind How Customers Find Your Brand" data-orbilect-title="">
            <span aria-hidden="true"><span className={styles.taglineCharacter} style={{ animationDelay: "160ms" }}>T</span><span className={styles.taglineCharacter} style={{ animationDelay: "212ms" }}>h</span><span className={styles.taglineCharacter} style={{ animationDelay: "264ms" }}>e</span>{" "}<span className={styles.taglineCharacter} style={{ animationDelay: "368ms" }}>I</span><span className={styles.taglineCharacter} style={{ animationDelay: "420ms" }}>n</span><span className={styles.taglineCharacter} style={{ animationDelay: "472ms" }}>t</span><span className={styles.taglineCharacter} style={{ animationDelay: "524ms" }}>e</span><span className={styles.taglineCharacter} style={{ animationDelay: "576ms" }}>l</span><span className={styles.taglineCharacter} style={{ animationDelay: "628ms" }}>l</span><span className={styles.taglineCharacter} style={{ animationDelay: "680ms" }}>i</span><span className={styles.taglineCharacter} style={{ animationDelay: "732ms" }}>g</span><span className={styles.taglineCharacter} style={{ animationDelay: "784ms" }}>e</span><span className={styles.taglineCharacter} style={{ animationDelay: "836ms" }}>n</span><span className={styles.taglineCharacter} style={{ animationDelay: "888ms" }}>c</span><span className={styles.taglineCharacter} style={{ animationDelay: "940ms" }}>e</span>{" "}<span className={styles.taglineCharacter} style={{ animationDelay: "1044ms" }}>B</span><span className={styles.taglineCharacter} style={{ animationDelay: "1096ms" }}>e</span><span className={styles.taglineCharacter} style={{ animationDelay: "1148ms" }}>h</span><span className={styles.taglineCharacter} style={{ animationDelay: "1200ms" }}>i</span><span className={styles.taglineCharacter} style={{ animationDelay: "1252ms" }}>n</span><span className={styles.taglineCharacter} style={{ animationDelay: "1304ms" }}>d</span>{" "}<span className={styles.taglineCharacter} style={{ animationDelay: "1408ms" }}>H</span><span className={styles.taglineCharacter} style={{ animationDelay: "1460ms" }}>o</span><span className={styles.taglineCharacter} style={{ animationDelay: "1512ms" }}>w</span>{" "}<span className={styles.accent}><span className={styles.taglineCharacter} style={{ animationDelay: "1616ms" }}>C</span><span className={styles.taglineCharacter} style={{ animationDelay: "1668ms" }}>u</span><span className={styles.taglineCharacter} style={{ animationDelay: "1720ms" }}>s</span><span className={styles.taglineCharacter} style={{ animationDelay: "1772ms" }}>t</span><span className={styles.taglineCharacter} style={{ animationDelay: "1824ms" }}>o</span><span className={styles.taglineCharacter} style={{ animationDelay: "1876ms" }}>m</span><span className={styles.taglineCharacter} style={{ animationDelay: "1928ms" }}>e</span><span className={styles.taglineCharacter} style={{ animationDelay: "1980ms" }}>r</span><span className={styles.taglineCharacter} style={{ animationDelay: "2032ms" }}>s</span>{" "}<span className={styles.taglineCharacter} style={{ animationDelay: "2136ms" }}>F</span><span className={styles.taglineCharacter} style={{ animationDelay: "2188ms" }}>i</span><span className={styles.taglineCharacter} style={{ animationDelay: "2240ms" }}>n</span><span className={styles.taglineCharacter} style={{ animationDelay: "2292ms" }}>d</span>{" "}<span className={styles.taglineCharacter} style={{ animationDelay: "2396ms" }}>Y</span><span className={styles.taglineCharacter} style={{ animationDelay: "2448ms" }}>o</span><span className={styles.taglineCharacter} style={{ animationDelay: "2500ms" }}>u</span><span className={styles.taglineCharacter} style={{ animationDelay: "2552ms" }}>r</span>{" "}<span className={styles.taglineCharacter} style={{ animationDelay: "2656ms" }}>B</span><span className={styles.taglineCharacter} style={{ animationDelay: "2708ms" }}>r</span><span className={styles.taglineCharacter} style={{ animationDelay: "2760ms" }}>a</span><span className={styles.taglineCharacter} style={{ animationDelay: "2812ms" }}>n</span><span className={styles.taglineCharacter} style={{ animationDelay: "2864ms" }}>d</span></span></span>
          </h1>

          <p className={styles.intro}>
            Help more customers find, choose, and buy from you. Orbilect SEO brings
            together organic SEO, paid advertising, website and store development,
            ecommerce management, and dedicated customer support.
          </p>

          <HeroActions className={styles.actions}>
            <HeroAudit source="home-hero-audit" />
            <a className={`${styles.cta} ${styles.ctaBlue}`} href="#seo-services" data-orbilect-cta="blue"><span data-orbilect-cta-icon="" aria-hidden="true" />
              
              Explore SEO services
            </a>
          </HeroActions>
          <HeroPlatforms />

          <div className={styles.searchRow}>
            <p className={styles.rankingLine}>
              <span>Rank #1 on</span>

              <span className={styles.searchBrand}>
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z"/>
                  <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.7l-6.6-5a12.3 12.3 0 0 1-18.4-6.5H5.7V33A20 20 0 0 0 24 44Z"/>
                  <path fill="#FBBC05" d="M12.5 27.8a12 12 0 0 1 0-7.6V15H5.7a20 20 0 0 0 0 18l6.8-5.2Z"/>
                  <path fill="#EA4335" d="M24 12c3 0 5.6 1 7.7 3l5.8-5.7A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.7 15l6.8 5.2A12.1 12.1 0 0 1 24 12Z"/>
                </svg>
                Google
              </span>

              <span className={styles.searchAnd}>and</span>

              <span className={styles.searchBrand}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#008373" d="M5 1 10 3v14l5.5-3.2-2.5-1.2L11 8l8 3.2v5.1L10 22l-5-2.8V1Z"/>
                </svg>
                Bing
              </span>
            </p>
            </div>
        </div>

        <StorefrontScene />
      </div>
    </section>
  );
}