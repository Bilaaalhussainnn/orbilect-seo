import versions from "./image-versions.json";
import { imageDelivery, mediaUrl } from "./media-url";
import designs from "./design-media.json";

const files = new Set(Object.keys(versions));
for (const entry of [...Object.values(imageDelivery), ...Object.values(designs)]) {
  files.add(entry.src);
  for (const variant of entry.srcSet.split(", ")) files.add(variant.split(" ")[0]);
}

/** Stale HTML can request the old optimizer URL; redirect only known local assets. */
export function legacyImageTarget(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\r\n]/.test(value)) return;
  const pathname = value.split("?", 1)[0];
  if (!files.has(pathname)) return;
  return mediaUrl(pathname);
}
