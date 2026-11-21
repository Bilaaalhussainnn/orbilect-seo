import Link from "next/link";
import { ArrowUpRight, PanelsTopLeft } from "lucide-react";
import { getIndustryDesigns, mixedDesigns } from "@/lib/design-gallery";
import GalleryRows from "./gallery-rows";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "./gallery.module.css";

export default function GalleryPromotion() {
  return <section className={styles.promotion} aria-labelledby="gallery-promotion-heading">
    <div className={`${styles.wrap} ${styles.promotionHeader}`}><div><p className={styles.eyebrow}>A new look. A clearer journey.</p><h2 id="gallery-promotion-heading">Your next website,<br /><span>waiting to take shape.</span></h2><p>Explore website and landing page designs across nine industries. From automotive inventory and product collections to professional service enquiries, a thoughtful redesign brings your offer, brand, and mobile experience together. Browse the gallery, pick a direction, and let’s tailor it to your customers.</p><Link href="/website-design-gallery" className={`${cta.cta} ${cta.ctaBlue}`}><span className={cta.ctaIcon} aria-hidden="true"><ArrowUpRight /></span>Explore the design gallery</Link></div><div className={styles.floatingScene} aria-hidden="true"><i /><i /><span><PanelsTopLeft /></span></div></div>
    <GalleryRows images={mixedDesigns(getIndustryDesigns())} rows={3} label="Mixed industry" />
    <p className={styles.note}>*Sample designs for inspiration. Your website can be tailored to your brand, preferences, and requirements.</p>
  </section>;
}
