"use client";

import { useId, useState, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Clock3, Tag, Users } from "lucide-react";
import styles from "./service-investment.module.css";

export function ServiceInvestment({ service, eyebrow, heading, headingAccent = "Pricing", pricingPage = false }: {
  service?: string;
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  pricingPage?: boolean;
}) {
  const [active, setActive] = useState<number | null>(0);
  const id = useId();
  const Title = pricingPage ? "h1" : "h2";
  const quote = "/contact?request=" + encodeURIComponent(service ? service + " quote" : "Service investment quote") + "#request-proposal";
  const ppc = Boolean(service && /ppc/i.test(service));

  const options = [
    {
      icon: Clock3, label: "Hours and scope",
      question: service ? "How much does " + service + " cost?" : "How is my investment calculated?",
      answer: "We estimate the hours required for the agreed work. Your proposal sets out the deliverables, review rounds, and what’s included. A fixed amount only applies when we publish a promotional offer with a defined scope.",
    },
    {
      icon: Users, label: "People and skills",
      question: "How does the team affect my quote?",
      answer: "The quote reflects the number of specialists assigned, their roles, and the time each needs. We explain who will do the work and whether you need a one-time project or ongoing management.",
    },
    {
      icon: BarChart3, label: "Results to measure",
      question: ppc ? "Is ad spend part of the management fee?" : "What should this investment deliver?",
      answer: ppc
        ? "We quote management separately from media spend. Before launch, we agree on what counts as a qualified enquiry and how we’ll assess spend, lead quality, and sales where tracking is available."
        : "We agree on what success looks like before work starts. That might mean more qualified enquiries, better completion rates, or verified delivery milestones. We report what the data shows and use it to decide what to improve.",
    },
    {
      icon: Tag, label: "Promotional offers",
      question: "How do promotional offers work?",
      answer: "A promotion lists its amount, included work, and eligibility. Promotional purchases are non-refundable except where applicable law requires otherwise.",
    },
  ];

  const current = active ?? 0;

  function rotate(offset: number) {
    setActive((current + offset + options.length) % options.length);
  }

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const stage = event.currentTarget;
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    stage.style.setProperty("--pointer-x", ((0.5 - (event.clientY - rect.top) / rect.height) * 18) + "deg");
    stage.style.setProperty("--pointer-y", (((event.clientX - rect.left) / rect.width - 0.5) * 24) + "deg");
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--pointer-x");
    event.currentTarget.style.removeProperty("--pointer-y");
  }

  return (
    <section id="service-investment" className={styles.section} aria-labelledby={id}>
      <div className={styles.wrap}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow ?? (service ? service + " Investment" : "Orbilect SEO Investment")}</p>
          <Title id={id}>{heading ?? service ?? "Orbilect SEO"} <span>{headingAccent}</span></Title>
          <p>Tell us what you want to achieve. We’ll quote for the work and team it takes, then agree on how we’ll measure the result.</p>
          <div className={styles.links}>
            <Link className={styles.cta} href={pricingPage ? quote : "/pricing"} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
              {pricingPage ? "Request a tailored quote" : "Explore your investment options"}
              
            </Link>
            {!pricingPage && <Link className={styles.secondary} href={quote}>Contact us for a quote</Link>}
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.accordion}>
            {options.map(({ question, answer }, index) => (
              <div key={question}>
                <button type="button" aria-expanded={active === index} aria-controls={id + "-" + index}
                  onClick={() => setActive(active === index ? null : index)}>
                  {question}<span aria-hidden="true">{active === index ? "−" : "+"}</span>
                </button>
                <div id={id + "-" + index} hidden={active !== index}><p>{answer}</p></div>
              </div>
            ))}
          </div>
          <div className={styles.preview}>
            <div className={styles.stage} aria-hidden="true" onPointerMove={tilt} onPointerLeave={resetTilt}>
              <div className={styles.stack}>
                {options.map(({ icon: Icon, label }, index) => (
                  <div key={label} className={styles.card3d}
                    data-depth={(index - current + options.length) % options.length}>
                    <Icon size={32} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.previewControls} role="group" aria-label="Explore the investment cards">
              <button type="button" aria-label="Previous investment topic" onClick={() => rotate(-1)}>‹</button>
              <span aria-live="polite">{options[current].label}</span>
              <button type="button" aria-label="Next investment topic" onClick={() => rotate(1)}>›</button>
            </div>
          </div>
</div>
      </div>
    </section>
  );
}
