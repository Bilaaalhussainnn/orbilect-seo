"use client";
import { useEffect, useState } from "react";
import LoadingVisual from "./loading-visual";
export default function SiteReadiness() {
  // Appear only if hydration is slow; never wait for below-fold media.
  const [pending, setPending] = useState(true);
  useEffect(() => { setPending(false); }, []);
  return pending ? <LoadingVisual /> : null;
}
