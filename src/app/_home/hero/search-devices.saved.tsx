"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowUpRight, Search, MapPin, MousePointer2 } from "lucide-react";
import styles from "./search-devices.saved.module.css";

const BoutiqueCanvas = dynamic(() => import("./boutique-canvas"), {
  ssr: false,
  loading: () => <div className={styles.loading} />,
});

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z"/>
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.7l-6.6-5a12.3 12.3 0 0 1-18.4-6.5H5.7V33A20 20 0 0 0 24 44Z"/>
      <path fill="#FBBC05" d="M12.5 27.8a12 12 0 0 1 0-7.6V15H5.7a20 20 0 0 0 0 18l6.8-5.2Z"/>
      <path fill="#EA4335" d="M24 12c3 0 5.6 1 7.7 3l5.8-5.7A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.7 15l6.8 5.2A12.1 12.1 0 0 1 24 12Z"/>
    </svg>
  );
}

function Website() {
  return (
    <div className={styles.website}>
      <div className={styles.siteNav}>
        <span>mystore</span><span>Discover ↗</span>
      </div>
      <div className={styles.siteContent}>
        <span>THE NEW COLLECTION</span>
        <strong>Worth finding.<br/>Made for you.</strong>
        <span className={styles.siteButton}>Explore the collection <ArrowUpRight size={11}/></span>
      </div>
      <div className={styles.products}>
        <i/><i/><i/>
      </div>
    </div>
  );
}

export default function StorefrontScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      clearInterval(timer);
      if (preference.matches) {
        setStep(12);
        return;
      }
      setStep(0);
      timer = setInterval(() => setStep((current) => (current + 1) % 30), 320);
    };

    start();
    preference.addEventListener("change", start);
    return () => {
      clearInterval(timer);
      preference.removeEventListener("change", start);
    };
  }, []);

  const query = "mystore".slice(0, Math.min(step, 7));
  const results = step >= 9;
  const opened = step >= 18;

  return (
    <div className={styles.scene}>
      <div className={styles.devices} aria-hidden="true">
        <div className={styles.laptop}>
          <div className={styles.screen}>
            <div className={styles.browserBar}>
              <span className={styles.dots}>● ● ●</span>
              <span>{opened ? "mystore.example" : "google.com"}</span>
              <span>↗</span>
            </div>

            {opened ? <Website /> : (
              <div className={styles.searchPage}>
                <div className={styles.searchBar}>
                  <GoogleMark />
                  <span>{query}<i className={styles.caret}/></span>
                  <Search size={13}/>
                </div>

                <div className={styles.results} data-visible={results}>
                  <div className={styles.resultColumn}>
                    <div className={styles.result}>
                      <span className={styles.domain}>mystore.example</span>
                      <strong>MyStore — Find your next favourite</strong>
                      <p>Explore thoughtfully selected essentials. Discover the collection online or visit our store.</p>
                      <span className={styles.stars}>★★★★★ <span>4.9 · Sample rating</span></span>
                      <div className={styles.sitelinks}>
                        <span>New arrivals</span><span>Our collection</span>
                        <span>Visit our store</span><span>Contact us</span>
                      </div>
                      {step >= 15 && <MousePointer2 className={styles.cursor} size={22}/>}
                    </div>
                    <div className={styles.skeleton}><i/><i/><i/></div>
                  </div>
                  <div className={styles.profile}>
                    <div className={styles.profileVisual}><MapPin size={25}/></div>
                    <strong>MyStore</strong>
                    <span>Shopping & retail</span>
                    <div className={styles.profileActions}><span>Website</span><span>Directions</span></div>
                    <span className={styles.open}>Open · Visit today</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.laptopBase}/>
        </div>

        <div className={styles.phone}>
          <div className={styles.phoneNotch}/>
          {opened ? <Website /> : (
            <div className={styles.mobileSearch}>
              <GoogleMark />
              <div className={styles.mobileQuery}>{query}<Search size={11}/></div>
              <div className={styles.mobileResult} data-visible={results}>
                <span>mystore.example</span>
                <strong>MyStore</strong>
                <p>Discover your next favourite.</p>
                <span className={styles.stars}>★★★★★</span>
                <div className={styles.mobileMap}><MapPin size={22}/></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.boutique}>
        <BoutiqueCanvas />
      </div>
    </div>
  );
}
