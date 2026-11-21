import { readdirSync } from "node:fs";
import path from "node:path";
import { briefs, type IndustrySlug } from "./industry-briefs";
import DesignShowcaseMotion from "./industry-design-showcase-motion";

type ShowcaseSlug = IndustrySlug | "automotive";

// Read at render/build time. Original filenames are preserved in image URLs.
export default function IndustryDesignShowcase({ slug }: { slug: ShowcaseSlug }) {
  const name = slug === "automotive" ? "Automotive" : briefs[slug].name;
  const folder = path.join(process.cwd(), "public", "industry-showcases", slug);
  let files: string[] = [];
  try {
    files = readdirSync(folder, { withFileTypes: true })
      .filter(entry => entry.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(entry.name))
      .map(entry => entry.name)
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
      .slice(0, 16);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  const images = Array.from({ length: 16 }, (_, index) => files[index] ? {
    src: "/industry-showcases/" + slug + "/" + encodeURIComponent(files[index]),
    name: files[index].replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
  } : null);
  return <DesignShowcaseMotion name={name} images={images} />;
}
