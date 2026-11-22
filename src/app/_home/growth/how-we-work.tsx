"use client";

import Image from "@/components/optimized-image";
import { useEffect, useRef, useState } from "react";
import { ClipboardList, FileCheck, Lock, Receipt, Rocket, Search } from "lucide-react";
import content from "./content.json";
import styles from "./process-walkthrough.module.css";

const previews = [
  { label: "Discovery", title: "Discovery brief", icon: ClipboardList, items: ["Business goals", "Priority customers", "What the website needs to achieve"] },
  { label: "Confidentiality", title: "Confidentiality and access", icon: Lock, items: ["Confidentiality terms", "Approved accounts and tools", "Who can access what"] },
  { label: "Assessment", title: "Initial SEO assessment", icon: Search, items: ["Current search visibility", "Technical and content gaps", "Priority opportunities"] },
  { label: "Proposal", title: "Proposal and scope", icon: FileCheck, items: ["Recommended work", "Deliverables and timeline", "Investment and scope approval"] },
  { label: "Invoice", title: "Invoice and payment", icon: Receipt, items: ["Agreed scope and fees", "Payment terms", "Kickoff scheduling"] },
  { label: "Kickoff", title: "Kickoff plan", icon: Rocket, items: ["First priorities", "Project responsibilities", "Milestones and progress reviews"] },
];

function ProcessPhoto({ slug }: { slug: string }) {
  const [fallback, setFallback] = useState(false);

  return (
    <div className={styles.photo}>
      <Image
        src={"/process/" + slug + (fallback ? ".svg" : ".png")}
        alt=""
        width={1536}
        height={1024}
        sizes="(max-width: 520px) calc(100vw - 72px), (max-width: 1020px) calc(100vw - 120px), 220px"
        unoptimized={fallback}
        onError={() => setFallback(true)}
      />
    </div>
  );
}

export default function HowWeWork({
  standalone = false,
  heading = "How",
  accent = "we work",
  intro = "From the first conversation to kickoff, you’ll know what we recommend, what it costs, and how we’ll measure progress.",
  steps = content.process,
}: { standalone?: boolean; heading?: string; accent?: string; intro?: string; steps?: string[][] }) {
  const Heading = standalone ? "h1" : "h2";
  const [active, setActive] = useState(0);
  const cards = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let frame: number | null = null;

    function update() {
      frame = null;
      const readingLine = window.innerHeight * 0.48;
      let next = 0;

      cards.current.forEach((card, index) => {
        if (card && card.getBoundingClientRect().top <= readingLine) next = index;
      });

      setActive(next);
    }

    function schedule() {
      if (frame === null) frame = requestAnimationFrame(update);
    }

    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    cards.current.forEach((card) => { if (card) resize?.observe(card); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="how-we-work" className={styles.section} aria-labelledby="process-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Our process</p>
          <Heading id="process-title">{heading} <span>{accent}</span></Heading>
          <p>{intro}</p>
        </header>

        <div className={styles.layout} data-reveal="off">
          <div className={styles.pinned}>
            <div className={styles.stage} aria-hidden="true">
              <div className={styles.deck}>
                <div className={`${styles.sheet} ${styles.back}`} />
                <div className={`${styles.sheet} ${styles.middle}`} />
                <div className={styles.document}>
                  <div className={styles.documentPages}>
                    {previews.map(({ label, title, icon: Icon, items }, index) => (
                      <div key={label} className={styles.documentPage} data-visible={active === index}>
                        <div className={styles.documentTop}>
                          <span className={styles.icon}><Icon size={22} /></span>
                          <span>{label}</span>
                        </div>
                        <strong>{title}</strong>
                        <ul>
                          {items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ol className={styles.steps} role="list">
            {steps.map(([slug, title, description], index) => {
              const stage = previews[index];
              const Icon = stage?.icon ?? ClipboardList;
              return (
                <li key={slug} ref={(node) => { cards.current[index] = node; }}
                  data-active={active === index}>
                  <ProcessPhoto slug={slug} />
                  <div className={styles.stepCopy}>
                    <div className={styles.stepMeta}>
                    <span className={styles.icon}><Icon size={21} aria-hidden="true" /></span>
                    {stage?.label}
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
}
