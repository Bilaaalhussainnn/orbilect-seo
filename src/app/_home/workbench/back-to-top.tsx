"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./workbench.module.css";

export default function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      setVisible(window.scrollY > 540);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  if (!visible) return null;

  return (
    <button className={styles.backTop} type="button" aria-label="Back to top" title="Back to top"
      onClick={() => {
        document.getElementById("site-content")?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }}>
      <span className={styles.mouse} aria-hidden="true"><i /></span>
      <ArrowUp size={15} aria-hidden="true" />
    </button>
  );
}
