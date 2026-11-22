import TypingTagline from "@/components/typing-tagline";
import { AssetImage } from "@/components/optimized-image";
export default function LoadingVisual() {
  return <div className="orbilect-loading" role="status" aria-live="polite">
    <AssetImage src="/brand/orbilect-seo-mark.svg" width="100" height="100" alt="Orbilect SEO"/>
    <p className="orbilect-loading-tagline"><TypingTagline delay={900} /></p>
  </div>;
}
