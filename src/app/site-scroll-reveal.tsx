"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const textSelector = "h1, h2, h3, p";
const excluded =
  "header, nav, footer, aside, form, button, details, dialog, " +
  "[role='dialog'], [aria-live], [aria-hidden='true'], [data-reveal='off']";

export default function SiteScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === "/admin" ||
      pathname?.startsWith("/admin/") ||
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    ) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(pointer: coarse)");
    const observed = new Map<Element, number>();
    const played = new Set<Element>();
    const running = new Map<Element, Animation>();

    let entryObserver: IntersectionObserver | undefined;
    let exitObserver: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    let frame = 0;

    function syncText() {
      frame = 0;
      const main = document.querySelector("main, [role='main']");
      const scope = main ?? document.body;
      const selector = main ? textSelector : "section :is(h1, h2, h3, p)";

      for (const [element] of observed) {
        if (scope.contains(element)) continue;
        entryObserver?.unobserve(element);
        exitObserver?.unobserve(element);
        running.get(element)?.cancel();
        running.delete(element);
        played.delete(element);
        observed.delete(element);
      }

      scope.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        if (observed.has(element) || element.closest(excluded)) return;
        // The homepage hero has its own typing animation.
        if (pathname === "/" && element.tagName === "H1") return;

        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Show text already on screen immediately on load or route change.
        if (rect.bottom > 0 && rect.top < window.innerHeight) played.add(element);
        observed.set(element, index % 4);
        entryObserver?.observe(element);
        exitObserver?.observe(element);
      });
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      mutations?.disconnect();
      entryObserver?.disconnect();
      exitObserver?.disconnect();
      for (const animation of running.values()) animation.cancel();
      running.clear();
      played.clear();
      observed.clear();
    }

    function start() {
      stop();
      if (motion.matches) return;

      // Rearm only after the text moves clear of the viewport and animation distance.
      exitObserver = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting } of entries) {
          if (isIntersecting) continue;
          played.delete(target);
          running.get(target)?.cancel();
          running.delete(target);
        }
      }, { rootMargin: "64px" });

      entryObserver = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting, boundingClientRect: rect } of entries) {
          const direction = observed.get(target);
          if (!isIntersecting || direction === undefined || played.has(target)) continue;
          played.add(target);

          const width = document.documentElement.clientWidth;
          const distance = width < 768 ? 22 : 44;
          const left = Math.max(0, Math.min(distance, rect.left - 2));
          const right = Math.max(0, Math.min(distance, width - rect.right - 2));

          const offset = touch.matches ? "0px 12px"
            : direction === 0 && left >= 8 ? `${-left}px 0px`
            : direction === 1 && right >= 8 ? `${right}px 0px`
            : direction === 2 ? "0px -24px"
            : "0px 24px";

          const animation = target.animate(
            [
              { opacity: 0, translate: offset },
              { opacity: 1, translate: "0px 0px" },
            ],
            { duration: 720, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );

          running.set(target, animation);
          animation.onfinish = () => {
            if (running.get(target) === animation) running.delete(target);
          };
        }
      });

      syncText();
      mutations = new MutationObserver(records => {
        // Ignore chat typing and character-by-character text changes. Only new
        // content elements in the main article can require another scan.
        const addedContent = records.some(record => Array.from(record.addedNodes).some(node =>
          node instanceof Element && (node.matches(textSelector) || node.querySelector(textSelector))));
        if (addedContent && !frame) frame = requestAnimationFrame(syncText);
      });
      mutations.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });
    }

    start();
    motion.addEventListener("change", start);

    return () => {
      motion.removeEventListener("change", start);
      stop();
    };
  }, [pathname]);

  return null;
}
