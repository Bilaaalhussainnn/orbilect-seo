import { PanelsTopLeft } from "lucide-react";
import { getIndustryDesigns, mixedDesigns } from "@/lib/design-gallery";
import BrandCta from "@/components/brand-cta";
import { Depth } from "../_home/workbench/depth";
import GalleryRows from "./gallery-rows";
import VerticalDesigns from "./vertical-designs";
import styles from "./gallery.module.css";

export default function GalleryPromotion({ home = false }: { home?: boolean }) {
  const designs = mixedDesigns(getIndustryDesigns(), home ? 48 : 16);
  return <section className={styles.promotion} aria-labelledby="gallery-promotion-heading">
    <div className={`${styles.wrap} ${styles.promotionHeader}`}><div>
      <p className={styles.eyebrow}>{home ? "Designed for your next chapter" : "A new look. A clearer journey."}</p>
      <h2 id="gallery-promotion-heading">{home ? "Your next website starts" : "Your next website,"}<br/><span>{home ? "with a stronger first impression." : "waiting to take shape."}</span></h2>
      <p>Explore responsive website and landing page design inspiration across twelve industries. Clear navigation, fast-loading layouts, useful content, and mobile-friendly enquiry journeys work together to help the right visitors understand your business and take the next step. Choose a direction, then let’s tailor it to your brand.</p>
      <BrandCta href="/website-design-gallery">Explore the design gallery</BrandCta>
    </div><Depth><div className={styles.floatingScene} aria-hidden="true"><i/><i/><span><PanelsTopLeft/></span></div></Depth></div>
    {home ? <GalleryRows images={designs} rows={4} label="Mixed industry" compact /> : <div className={`${styles.wrap} ${styles.promotionWall}`}><VerticalDesigns images={designs} label="Mixed industry" /></div>}
    <p className={styles.note}>*Sample designs for inspiration. Your website can be tailored to your brand, preferences, and requirements.</p>
  </section>;
}
