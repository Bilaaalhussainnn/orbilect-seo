"use client";

import FinalEditorialCta from "../final-editorial-cta";
import CsrCommitments from "./csr-commitments";

import Link from "next/link";
import { ArrowUpRight, Briefcase, Users } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import styles from "./responsibility-next.module.css";

const paths = [
  {
    href: "/careers",
    title: "Careers",
    description: "Explore open roles across search, content, technology, and operations.",
    action: "Explore careers",
    Icon: Briefcase,
  },
  {
    href: "/staffing",
    title: "Staffing",
    description: "Find specialists who can join your team and support your delivery goals.",
    action: "Explore staffing",
    Icon: Users,
  },
];

function tilt(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== "mouse") return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - .5;
  const y = (event.clientY - bounds.top) / bounds.height - .5;
  card.style.setProperty("--pitch", y * -22 + "deg");
  card.style.setProperty("--yaw", x * 28 + "deg");
}

function reset(event: PointerEvent<HTMLAnchorElement>) {
  event.currentTarget.style.removeProperty("--pitch");
  event.currentTarget.style.removeProperty("--yaw");
}

export default function ResponsibilityNext() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = section.current?.querySelectorAll("[data-csr-enter]");
    if (!targets || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        target.toggleAttribute("data-in-view", isIntersecting);
      });
    }, { threshold: .15 });

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CsrCommitments />
      <section ref={section} className={styles.section} aria-labelledby="csr-opportunities">
        <div className={styles.inner}>
          <header className={styles.heading} data-csr-enter>
            <p className={styles.eyebrow}>Careers and staffing</p>
            <h2 id="csr-opportunities">Work with <span>Orbilect SEO</span></h2>
          </header>

          <ul className={styles.paths}>
            {paths.map(({ href, title, description, action, Icon }) => (
              <li key={href} data-csr-enter>
                <Link className={styles.card} href={href} onPointerMove={tilt} onPointerLeave={reset}>
                  <div className={styles.scene} aria-hidden="true">
                    <div className={styles.orbit} />
                    <div className={styles.rig}>
                      <div className={styles.rear} />
                      <div className={styles.middle} />
                      <div className={styles.face}><Icon size={37} strokeWidth={1.6} /></div>
                    </div>
                  </div>
                  <div className={styles.copy}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className={styles.action}>{action} <ArrowUpRight size={16} aria-hidden="true" /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalEditorialCta heading={"Let’s"} accent={"talk"} description={"Have a question about how we work?"} href={"/contact"} action={"Contact us"} />
    </>
  );
}
