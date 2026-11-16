"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useId, type PointerEvent } from "react";
import styles from "./final-editorial-cta.module.css";

type Props = {
  heading: string;
  accent: string;
  description: string;
  href: string;
  action: string;
  icon?: "MessageCircle" | "Newspaper";
};

export default function FinalEditorialCta({ heading, accent, description, href, action }: Props) {
  const id = useId();

  function tilt(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const section = event.currentTarget;
    const bounds = section.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    section.style.setProperty("--pitch", y * -22 + "deg");
    section.style.setProperty("--yaw", x * 32 + "deg");
  }

  function reset(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.removeProperty("--pitch");
    event.currentTarget.style.removeProperty("--yaw");
  }

  return (
    <section className={styles.cta} aria-labelledby={id}
      onPointerMove={tilt} onPointerLeave={reset}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id={id}>{heading} <span>{accent}</span></h2>
          <p>{description}</p>
        </div>

        <div className={styles.scene} aria-hidden="true">
          <div className={styles.orbit} />
          <div className={styles.rig}>
            <div className={styles.back} />
            <div className={styles.middle} />
            <div className={styles.face}><MessageCircle size={28} strokeWidth={1.6} /></div>
          </div>
        </div>

        <Link className={styles.button} href={href} data-orbilect-cta="white"><span data-orbilect-cta-icon="" aria-hidden="true" />
          {action} 
        </Link>
      </div>
    </section>
  );
}
