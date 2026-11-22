import { AssetImage } from "@/components/optimized-image";
export default function Loading() {
  return <div className="orbilect-loading" role="status" aria-live="polite"><AssetImage src="/brand/orbilect-seo-mark.svg" alt="Orbilect SEO" width="100" height="100"/><p className="orbilect-loading-tagline">The Intelligence Behind How Customers Find Your Brand.</p><a href="/contact">Need help? Contact us</a></div>;
}
