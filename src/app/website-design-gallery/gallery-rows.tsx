import DesignMarquee from "@/components/design-marquee";
import { Code2 } from "lucide-react";
import type { GalleryDesign } from "@/lib/design-gallery";
import styles from "./gallery.module.css";

export default function GalleryRows({ images, rows = 2, label }: { images: GalleryDesign[]; rows?: number; label: string }) {
  if (!images.length) return <div className={styles.empty}><Code2 aria-hidden="true" /><p>{label} design collection</p><small>Share your preferred look with our team to plan a design around your business.</small></div>;
  return <DesignMarquee images={images} rows={rows} label={label} />;
}
