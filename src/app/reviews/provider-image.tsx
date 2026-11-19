"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProviderImage({ src, fallback, alt, width, height }: {
  src: string; fallback: string; alt: string; width: number; height: number;
}) {
  const [failed, setFailed] = useState(false);
  return <Image src={failed ? fallback : src} alt={failed ? alt + " — badge unavailable" : alt}
    width={width} height={height} unoptimized onError={() => setFailed(true)} />;
}
