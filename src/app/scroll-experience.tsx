"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

export default function ScrollExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wheel = window.matchMedia("(hover: hover) and (pointer: fine)");
    let smoothScroll: Lenis | undefined;

    const sync = () => {
      smoothScroll?.destroy();
      smoothScroll = undefined;

      if (!preference.matches && wheel.matches) {
        smoothScroll = new Lenis({
          autoRaf: true,
          smoothWheel: true,
          anchors: true,
          lerp: 0.1,
        });
      }
    };

    sync();
    preference.addEventListener("change", sync);
    wheel.addEventListener("change", sync);
    return () => {
      preference.removeEventListener("change", sync);
      wheel.removeEventListener("change", sync);
      smoothScroll?.destroy();
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        observer.unobserve(entry.target);
        if (preference.matches) continue;

        const heading = entry.target;
        const next = heading.nextElementSibling;
        const targets = next?.tagName === "P" ? [heading, next] : [heading];

        targets.forEach((target, index) => {
          const animation = target.animate(
            [
              { opacity: 0.45, transform: "perspective(900px) translateY(18px) rotateX(-9deg)" },
              { opacity: 1, transform: "perspective(900px) translateY(0) rotateX(0)" },
            ],
            {
              duration: 680,
              delay: index * 70,
              easing: "cubic-bezier(.2,.75,.25,1)",
              fill: "backwards",
            }
          );

          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }
    }, { threshold: 0.15 });

    document.querySelectorAll("main section h2, #about h2, #seo-services h2").forEach((heading) => {

      // Leave headings that are already visible alone on first paint.
      if (heading.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(heading);
      }
    });

    const stopMotion = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };

    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  return null;
}
