"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracking() {
  const page = usePathname();
  useEffect(() => {
    if (!page) return;
    const path = page;
    function track() {
      try {
        if (document.visibilityState !== "visible" ||
            !document.cookie.split("; ").some(cookie => /^orbilect_cookie_choices_v1=1[01]$/.test(cookie))) return;
        const now = Date.now();
        const previous = JSON.parse(sessionStorage.getItem("naila-visitor") ?? "null");
        const visit = previous?.id && now - previous.at < 30 * 60_000 ?
          { ...previous, at: now } : { id: crypto.randomUUID(), at: now };
        sessionStorage.setItem("naila-visitor", JSON.stringify(visit));
        fetch("/api/naila/visits", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: visit.id, page: path, referrer: document.referrer }),
          keepalive: true,
        }).catch(() => {});
      } catch {}
    }
    track();
    const timer = window.setInterval(track, 30_000);
    window.addEventListener("orbilect:cookie-consent", track);
    document.addEventListener("visibilitychange", track);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("orbilect:cookie-consent", track);
      document.removeEventListener("visibilitychange", track);
    };
  }, [page]);
  return null;
}
