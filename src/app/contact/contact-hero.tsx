"use client";

import { useEffect, useState, type PointerEvent } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import styles from "./contact.module.css";

const title = "Get found by the customers already searching for you";

export function ContactTitle() {
  return <TypedPageTitle text={title} id="contact-heading" accentFrom={4}  siteSectionLabel={"Contact Orbilect SEO"} />;
}

export function TypedPageTitle({
  text: title,
  id,
  accentFrom,
  siteSectionLabel,
}: {
  text: string;
  id: string;
  accentFrom: number;
  siteSectionLabel?: string | false;
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(title.length);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let startedAt: number | undefined;

    function type(now: number) {
      startedAt ??= now;
      const count = Math.min(title.length, Math.floor((now - startedAt) / 46));
      setVisibleCharacters(count);
      if (count < title.length) frame = requestAnimationFrame(type);
    }

    function stopForReducedMotion() {
      if (!motion.matches) return;
      cancelAnimationFrame(frame);
      setVisibleCharacters(title.length);
    }

    if (!motion.matches) frame = requestAnimationFrame(type);
    motion.addEventListener("change", stopForReducedMotion);

    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", stopForReducedMotion);
    };
  }, [title]);

  let characterIndex = 0;

  return (
    <>
      <OrbilectHeroBrand />
      {!siteSectionLabel && <div className="orbilect-section-label">{id.startsWith("about") ? "About Us" : id.startsWith("service") ? "Our Services" : "Contact Us"}</div>}
      {siteSectionLabel && <p data-site-eyebrow="" data-reveal="off">{siteSectionLabel}</p>}
      <h1 id={id} aria-label={title} data-reveal="off" data-orbilect-title="">
      <span aria-hidden="true">
        {title.split(" ").map((word, index) => (
          <span key={index}>
            {index > 0 ? " " : ""}
            <span className={`${styles.word} ${index >= accentFrom ? styles.blue : ""}`}>
              {Array.from(word, (character, position) => (
                <span
                  key={position}
                  className={styles.typedCharacter}
                  data-pending={characterIndex++ >= visibleCharacters}
                >
                  {character}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </h1>
    </>
  );
}

const icons = [MessageSquare, Send, Mail];

export function ContactSignal() {
  const [active, setActive] = useState(0);
  const Icon = icons[active];

  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch") return;

    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    button.style.setProperty("--tilt-x", String(-y * 30) + "deg");
    button.style.setProperty("--tilt-y", String(x * 34) + "deg");
  }

  function reset(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return (
    <button
      className={styles.contactObject}
      type="button"
      aria-label="Change the contact illustration"
      onPointerMove={tilt}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onClick={() => setActive((current) => (current + 1) % icons.length)}
    >
      <svg className={styles.signalPaths} viewBox="0 0 420 260" fill="none" aria-hidden="true">
        <ellipse cx="210" cy="130" rx="154" ry="86" />
        <ellipse cx="210" cy="130" rx="185" ry="108" />
        <path d="M23 75h75l44 44h68m0 22h68l44 44h75" />
        <circle cx="23" cy="75" r="4" />
        <circle cx="397" cy="185" r="4" />
      </svg>
      <span className={styles.objectFloat} aria-hidden="true">
        <span className={styles.objectStack}>
          <span className={styles.objectBack} />
          <span className={styles.objectMiddle} />
          <span className={styles.objectFace}>
            <span className={styles.faceFrame} />
            <span className={styles.faceStatus} />
            <Icon key={active} className={styles.objectIcon} strokeWidth={1.4} />
            <span className={styles.faceMeter}><i /><i /><i /><i /><i /></span>
          </span>
        </span>
      </span>
      <span className={styles.signalCaption} aria-hidden="true">
        <span /> {["Compose", "Send", "Receive"][active]}
      </span>
    </button>
  );
}


export function OrbilectHeroBrand() {
  return (
    <a href="/" aria-label="Orbilect SEO home" style={{color:"inherit",textDecoration:"none",width:"fit-content"}} className={styles.heroBrand} data-reveal="off">
      <svg viewBox="0 0 64 64" width="38" height="38" aria-hidden="true" focusable="false">
        <path fill="#004AAD" d="M54 15A28 28 0 1 0 58 36H49A19 19 0 1 1 47 21Z" />
        <path fill="#004AAD" d="M14 42A21 21 0 0 1 46 17L43 21A17 17 0 0 0 14 42Z" />
        <path fill="#FFFFFF" fillRule="evenodd" d="M24 25h32a5 5 0 0 1 0 10H24a5 5 0 0 1 0-10Zm0 2.5v5h5v-5Z" />
        <rect x="20" y="38" width="25" height="4" rx="2" fill="#C4CAD3" />
      </svg>
      <span>Orbilect <span className={styles.heroBrandSeo}>SEO</span></span>
    </a>
  );
}
