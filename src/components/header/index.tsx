"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import TechnologyScene from "./technology-scene";
import { SocialLinks } from "./social-links";
import styles from "./header.module.css";
import appearance from "./menu-appearance.module.css";

const links = [
  ["Home", "/"], ["About us", "/about"], ["Services", "/services"],
  ["Industries", "/industries"], ["Pricing", "/pricing"], ["Blog", "/blogs"],
  ["Careers", "/careers"], ["Contact us", "/contact"],
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const overlay = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header className={styles.heroControl}>
      <a className={styles.skip} href="#site-content">Skip to content</a>
      <button
        ref={trigger}
        className={styles.trigger}
        type="button"
        aria-label="Open site navigation"
        aria-haspopup="dialog"
        aria-controls="orbilect-site-navigation"
        onClick={() => overlay.current?.showModal()}
      >
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      <dialog
        id="orbilect-site-navigation"
        ref={overlay}
        className={`${styles.overlay} ${appearance.menu}`}
        aria-label="Site navigation"
        data-lenis-prevent=""
        onClose={() => trigger.current?.focus({ preventScroll: true })}
      >
        <div className={styles.frame}>
          <button type="button" className={styles.close} aria-label="Close site navigation" autoFocus onClick={() => overlay.current?.close()}>
            <span aria-hidden="true" /><span aria-hidden="true" />
          </button>
          <TechnologyScene />
          <nav className={`${styles.nav} ${appearance.links}`} aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} aria-current={href === pathname || (href !== "/" && pathname.startsWith(href + "/")) ? "page" : undefined} onClick={() => overlay.current?.close()}>
                {label}
              </Link>
            ))}
          </nav>
          <SocialLinks className={styles.social} header />
        </div>
      </dialog>
    </header>
  );
}
