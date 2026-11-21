import { Code2 } from "lucide-react";
import type { GalleryDesign } from "@/lib/design-gallery";
import styles from "./gallery.module.css";

export default function GalleryRows({ images, rows = 2, label }: { images: GalleryDesign[]; rows?: number; label: string }) {
  if (!images.length) return <div className={styles.empty}><Code2 aria-hidden="true" /><p>{label} design collection</p><small>Share your preferred look with our team to plan a design around your business.</small></div>;
  const perRow = Math.max(1, Math.ceil(images.length / rows));
  return <div className={styles.rows} aria-label={label + " sample website designs"}>
    {Array.from({ length: rows }, (_, row) => {
      const part = images.slice(row * perRow, (row + 1) * perRow);
      const designs = part.length ? part : images.slice(0, perRow);
      // Fill each loop segment beyond the viewport even for a partial image collection.
      const filled = Array.from({ length: Math.max(16, designs.length) }, (_, index) => designs[index % designs.length]);
      return <div className={styles.lane} key={row}><div className={`${styles.track} ${row % 2 === 0 ? styles.reverse : ""}`}>
        {[0, 1].map(group => <div className={styles.loop} key={group} aria-hidden={group ? true : undefined}>
          {filled.map((image, index) => <figure className={styles.design} key={index} aria-hidden={index >= designs.length ? true : undefined}>
            <img src={image.src} alt={image.name + " — sample website design"} width={800} height={1000} loading="lazy" decoding="async" />
          </figure>)}
        </div>)}
      </div></div>;
    })}
  </div>;
}
