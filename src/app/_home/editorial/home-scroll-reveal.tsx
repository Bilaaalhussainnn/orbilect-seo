"use client";

import { useEffect, useRef } from "react";

export default function HomeScrollReveal() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const page = marker.current?.closest("main") ?? document.body;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) {
      return;
    }

    const animations = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;

    function stop() {
      observer?.disconnect();
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
    }

    function start() {
      stop();
      if (motion.matches) return;

      const text = Array.from(
        page.querySelectorAll<HTMLElement>("section h2, section h3, section p"),
      ).filter((element) => !element.closest("form, details, dialog, [aria-live], [aria-hidden='true']"));

      let initialCheck = true;

      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target;

          if (!entry.isIntersecting) {
            animations.get(element)?.cancel();
            animations.delete(element);
            continue;
          }

          if (initialCheck) continue;

          const animation = element.animate(
            [
              { opacity: 0, filter: "blur(3px)" },
              { opacity: 1, filter: "blur(0px)" },
            ],
            { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );

          animations.set(element, animation);
          animation.onfinish = () => {
            if (animations.get(element) === animation) animations.delete(element);
          };
        }

        initialCheck = false;
      }, { rootMargin: "0px", threshold: 0 });

      for (const element of text) observer.observe(element);
    }

    start();
    motion.addEventListener("change", start);

    return () => {
      motion.removeEventListener("change", start);
      stop();
    };
  }, []);

  return <span ref={marker} hidden />;
}
