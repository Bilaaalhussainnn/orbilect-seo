"use client";
import { AssetImage } from "@/components/optimized-image";

import { useEffect, useState } from "react";
export default function SiteReadiness() {
  // Server-rendered indicator can appear while JS downloads, then disappears
  // immediately after hydration. It never waits for lazy images or analytics.
  const [pending, setPending] = useState(true);
  useEffect(() => { setPending(false); }, []);
  return pending ? <div className="orbilect-loading" role="status" aria-live="polite"><AssetImage src="/brand/orbilect-seo-mark.svg" width="100" height="100" alt="Orbilect SEO"/><p className="orbilect-loading-tagline">The Intelligence Behind How Customers Find Your Brand.</p><button onClick={() => setPending(false)}>Continue to website</button></div> : null;
}
