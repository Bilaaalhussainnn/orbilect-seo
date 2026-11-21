"use client";
import { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import type { IndustryDesigns } from "@/lib/design-gallery";
import GalleryRows from "./gallery-rows";
import styles from "./gallery.module.css";

export default function GalleryBrowser({ galleries }: { galleries: IndustryDesigns[] }) {
  const [active, setActive] = useState(galleries[0].slug);
  return <section id="design-collections" className={styles.collection} aria-labelledby="collections-heading">
    <header className={styles.wrap}><p className={styles.eyebrow}>Find your direction</p><h2 id="collections-heading">Nine industries.<br /><span>Different ways to stand out.</span></h2><p>Choose your industry to explore layouts, visual styles, and customer journeys. These are starting points for a custom design, rather than fixed templates.</p></header>
    <div className={`${styles.wrap} ${styles.browser}`}>
      <div className={styles.selectors} aria-label="Choose an industry design collection">
        {galleries.map(gallery => <h3 key={gallery.slug}><button id={"choose-" + gallery.slug} type="button" aria-expanded={active === gallery.slug} aria-controls={"collection-" + gallery.slug} onClick={() => setActive(gallery.slug)}><Layers size={18} aria-hidden="true" />{gallery.name}<ChevronDown size={18} aria-hidden="true" /></button></h3>)}
      </div>
      <div className={styles.panels}>{galleries.map(gallery => <div key={gallery.slug} id={"collection-" + gallery.slug} role="region" aria-labelledby={"choose-" + gallery.slug} hidden={active !== gallery.slug} className={styles.panel}>
        <h3>{gallery.name} design inspiration</h3><p>{gallery.summary} Pair clear content with a responsive layout that makes the next step easy.</p>
        {active === gallery.slug && <GalleryRows key={gallery.slug} images={gallery.images} label={gallery.name} />}
        <p className={styles.note}>*Sample designs for inspiration. Your website can be tailored to your brand, preferences, and requirements.</p>
      </div>)}</div>
    </div>
  </section>;
}
