"use client";

import GoogleDeviceScreen from "@/components/google-device-screen";
import { useState, type CSSProperties } from "react";
import { RotateCcw } from "lucide-react";
import styles from "./industry-search-devices.module.css";

const queries: Record<string, string> = {
  automotive: "used hybrid SUVs near me",
  ecommerce: "waterproof hiking boots for women",
  education: "part-time accounting courses",
  finance: "small business bookkeeping services",
  healthcare: "physical therapy clinic near me",
  "home-services": "water heater repair near me",
  hospitality: "family hotel near the convention center",
  logistics: "regional freight delivery services",
  manufacturing: "custom aluminum parts manufacturer",
  "professional-services": "commercial architects near me",
  "real-estate": "two-bedroom apartments for sale",
  saas: "inventory software for small businesses",
};

function Screen({ slug, query, title }: { slug: string; query: string; title: string }) {
  if (slug === "automotive") {
    return (
      <div className={styles.screen} data-google-preview="">
        <GoogleDeviceScreen query={query} title={title} animate />
      </div>
    );
  }
  return (
    <div className={styles.screen}>
      <div className={styles.chrome}>
        <i />
        <span className={styles.address}>
          <span className={styles.googleAddress}>google.com</span>
          <span className={styles.siteAddress}>example.com/{slug}</span>
        </span>
      </div>
      <div className={styles.viewport}>
        <div className={styles.search}>
          <strong className={styles.google}>Google</strong>
          <div className={styles.query}>
            {Array.from(query, (letter, index) => (
              <span key={index} style={{ "--letter": index } as CSSProperties}>{letter}</span>
            ))}
          </div>
          <div className={styles.result}>
            <small>example.com/{slug}</small>
            <strong>{title}</strong>
            <i /><i />
          </div>
        </div>
        <div className={styles.site}>
          <div className={styles.nav}><b /><i /><i /></div>
          <div className={styles.siteHero}
            style={{ backgroundImage: "linear-gradient(90deg, #080b10e8, #080b1038), url(/industries/" + slug + ".png)" }}>
            <strong>{title}</strong>
            <i />
          </div>
          <div className={styles.siteCards}><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

export default function IndustrySearchDevices({ slug, query, title }: {
  slug: string;
  query?: string;
  title: string;
}) {
  const [replay, setReplay] = useState(0);
  const search = query ?? queries[slug] ?? title.toLowerCase() + " services";

  return (
    <div className={styles.preview}>
      <div className={styles.stage} key={[slug, search, title, replay].join(":")} aria-hidden="true">
        <div className={styles.rig}>
          <div className={styles.laptop}>
            <Screen slug={slug} query={search} title={title} />
            <div className={styles.keyboard} />
          </div>
          <div className={styles.phone}>
            <Screen slug={slug} query={search} title={title} />
          </div>
        </div>
      </div>
      <button className={styles.replay} type="button" onClick={() => setReplay(value => value + 1)}>
        <RotateCcw size={15} aria-hidden="true" /> Replay search preview
      </button>
    </div>
  );
}
