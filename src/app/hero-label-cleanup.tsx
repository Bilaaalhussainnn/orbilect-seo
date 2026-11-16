"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const exempt = "a, button, nav, footer, aside, [role='dialog'], [role='menu'], [aria-hidden='true']";
const aliases: Record<string, string[]> = {
  "a product of orbilect labs": ["about"],
  "organic search": ["orbilect seo"],
  "our services": ["services", "orbilect seo services"],
  "about us": ["about"],
  "contact us": ["contact", "contact orbilect seo"],
};

function label(el: HTMLElement) {
  return (el.textContent ?? "").replace(/\s+/g, " ").trim();
}

export default function HeroLabelCleanup() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const hidden = new Map<HTMLElement, [string, string]>();
    let frame = 0;

    function scan() {
      frame = 0;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(
        "p, span, div, small, strong, h2, h3"
      ));
      const candidates = elements.filter(el => {
        if (el.closest(exempt) || el.children.length > 4 ||
          el.querySelector("h1, h2, h3, section, a, button") ||
          !el.getClientRects().length) return false;
        const text = label(el);
        return text.length > 1 && text.length <= 75;
      });
      const uppercase = (el: HTMLElement, text: string) =>
        getComputedStyle(el).textTransform === "uppercase" ||
        (/[A-Z]/.test(text) && text === text.toUpperCase());

      for (const styled of candidates) {
        const styledText = label(styled);
        if (!uppercase(styled, styledText) || !styled.getClientRects().length) continue;

        const styledBox = styled.getBoundingClientRect();
        const scope = styled.closest("section, article, header, main");
        const key = styledText.toLowerCase();
        const duplicate = candidates.find(el => {
          if (hidden.has(el) || el === styled || el.contains(styled) || styled.contains(el) ||
            el.closest("section, article, header, main") !== scope ||
            !el.getClientRects().length ||
            !(el.compareDocumentPosition(styled) & Node.DOCUMENT_POSITION_FOLLOWING)) return false;

          const plain = label(el);
          if (uppercase(el, plain)) return false;
          const plainKey = plain.toLowerCase();
          if (plainKey !== key && !aliases[plainKey]?.includes(key)) return false;

          const box = el.getBoundingClientRect();
          const gap = styledBox.top - box.bottom;
          return gap >= -4 && gap <= 32 && Math.abs(box.left - styledBox.left) <= 12;
        });

        if (duplicate) {
          hidden.set(duplicate, [
            duplicate.style.getPropertyValue("display"), duplicate.style.getPropertyPriority("display")
          ]);
          duplicate.style.setProperty("display", "none", "important");
        }
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(scan);
    }

    scan();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      for (const [el, [value, priority]] of hidden) {
        if (value) el.style.setProperty("display", value, priority);
        else el.style.removeProperty("display");
      }
    };
  }, [pathname]);

  return null;
}
