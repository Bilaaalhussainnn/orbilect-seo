import versions from "./image-versions.json";
import release from "./image-release.json";
import generatedDelivery from "./image-delivery.json";
export const imageDelivery: Record<string, {src:string;srcSet:string}> = generatedDelivery;
const hashes: Record<string, string> = versions;
// Content versions refresh changed assets without disabling useful CDN caching.
export function mediaUrl(src: string | undefined) {
  if (!src || !src.startsWith("/") || src.startsWith("//")) return src;
  const [base, fragment] = src.split("#", 2);
  const path = base.split("?", 1)[0];
  if (imageDelivery[path]) return imageDelivery[path].src;
  const hash = hashes[path];
  if (!hash || /[?&]v=/.test(base)) return src;
  return base + (base.includes("?") ? "&" : "?") + "v=" + release.version + (fragment ? "#" + fragment : "");
}
