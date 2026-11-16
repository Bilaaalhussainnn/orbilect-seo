"use client";

import { useEffect } from "react";

export default function HideDuplicateAboutLabel() {
  useEffect(() => {
    let hidden: HTMLElement | undefined;
    let originalDisplay = "";
    let originalPriority = "";

    const label = (el: HTMLElement) =>
      (el.textContent ?? "").replace(/\s+/g, " ").trim().toLowerCase();
    const before = (a: HTMLElement, b: HTMLElement) =>
      Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

    function hideDuplicate() {
      if (hidden?.isConnected) return;
      const hero = Array.from(document.querySelectorAll<HTMLElement>("h1"))
        .find(el => label(el).startsWith("we help businesses earn"));
      if (!hero) return;

      const nodes = Array.from(document.querySelectorAll<HTMLElement>(
        "p, span, div, a, li, small, strong, h2, h3"
      )).filter(el => !el.closest("footer, [role=menu], header nav"));

      const eyebrow = nodes.filter(el =>
        label(el) === "about" && before(el, hero) && el.getClientRects().length
      ).pop();
      if (!eyebrow) return;

      const matches = nodes.filter(el =>
        label(el) === "about us" && before(el, eyebrow) && el.getClientRects().length
      );
      const duplicate = matches.pop();
      if (!duplicate) return;

      hidden = duplicate;
      while (hidden.parentElement && matches.includes(hidden.parentElement)) {
        hidden = hidden.parentElement;
      }
      originalDisplay = hidden.style.getPropertyValue("display");
      originalPriority = hidden.style.getPropertyPriority("display");
      hidden.style.setProperty("display", "none", "important");
    }

    hideDuplicate();
    const observer = new MutationObserver(hideDuplicate);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      if (originalDisplay) hidden?.style.setProperty("display", originalDisplay, originalPriority);
      else hidden?.style.removeProperty("display");
    };
  }, []);

  return null;
}
