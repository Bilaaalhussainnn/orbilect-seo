import { designPreview } from "./design-media";
import "server-only";
import { readdirSync } from "node:fs";
import path from "node:path";
import industries from "../app/_home/industry-growth/industries.json";

export type GalleryDesign = { src: string; srcSet?: string; name: string };
export type IndustryDesigns = { slug: string; name: string; summary: string; images: GalleryDesign[] };

export function getIndustryDesigns(): IndustryDesigns[] {
  return industries.map(({ slug, name, summary }) => {
    const folder = path.join(process.cwd(), "public", "industry-showcases", slug);
    let files: string[] = [];
    try {
      files = readdirSync(folder, { withFileTypes: true }).filter(file => file.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(file.name))
        .map(file => file.name).sort((a, b) => a.localeCompare(b, "en", { numeric: true })).slice(0, 16);
    } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
    return { slug, name, summary, images: files.map(file => ({ ...designPreview("/industry-showcases/" + slug + "/" + encodeURIComponent(file)), name: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") })) };
  });
}

// Stable mixed selection: rotate categories, then alternate their image positions.
export function mixedDesigns(galleries: IndustryDesigns[], total = 24): GalleryDesign[] {
  const mixed: GalleryDesign[] = [];
  for (let image = 0; image < 16; image++) for (let index = 0; index < galleries.length; index++) {
    const gallery = galleries[(index * 5 + image) % galleries.length];
    if (gallery.images[image]) mixed.push(gallery.images[image]);
  }
  return mixed.slice(0, total);
}
