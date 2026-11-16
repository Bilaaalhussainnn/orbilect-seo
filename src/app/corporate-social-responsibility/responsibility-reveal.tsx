"use client";

import { useEffect, useRef } from "react";

export default function ResponsibilityReveal() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const section = marker.current?.closest("section");
    if (!section) return;

    const targets = section.querySelectorAll("header, li");
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        target.toggleAttribute("data-csr-visible", isIntersecting);
      }
    }, { threshold: 0.12 });

    targets.forEach(target => observer.observe(target));

    return () => {
      observer.disconnect();
      targets.forEach(target => target.removeAttribute("data-csr-visible"));
    };
  }, []);

  return <span ref={marker} hidden aria-hidden="true" />;
}
