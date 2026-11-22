"use client";
import { AssetImage } from "@/components/optimized-image";

import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";
import type { GalleryDesign } from "@/lib/design-gallery";
import styles from "./vertical-designs.module.css";

export default function VerticalDesigns({ images, label, fast = false }: { images: GalleryDesign[]; label: string; fast?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "500px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!near || !images.length) return;
    let cancelled = false;
    Promise.allSettled(images.map(image => new Promise<void>(resolve => {
      const probe = new window.Image();
      probe.onload = () => { probe.decode().catch(() => {}).finally(resolve); };
      probe.onerror = () => resolve();
      probe.sizes = "(max-width: 600px) 22vw, 210px";
      if (image.srcSet) probe.srcset = image.srcSet;
      probe.src = image.src;
    }))).then(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, [near, images]);
  if (!images.length) return <div className={styles.empty}><Code2 aria-hidden="true" /><p>{label} design collection</p><p>We’re preparing this collection. Tell us the look and features you have in mind.</p></div>;
  const designs = Array.from({ length: 16 }, (_, i) => images[i % images.length]);
  return <div ref={root} className={styles.wall} data-ready={ready} data-fast={fast} aria-label={label + " website design inspiration"}>
    {Array.from({ length: 4 }, (_, col) => <div className={styles.column} key={col}>
      <div className={styles.track} style={{ animationDirection: col % 2 ? "reverse" : "normal" }}>
        {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {designs.slice(col * 4, col * 4 + 4).map((image, i) => <figure key={i} className={styles.card}>
            <AssetImage src={image.src} srcSet={image.srcSet} sizes="(max-width: 600px) 22vw, 210px" width={480} height={600} alt={copy ? "" : label + " website layout: " + image.name} decoding="async" loading={near ? "eager" : "lazy"} />
          </figure>)}
        </div>)}
      </div>
    </div>)}
  </div>;
}
