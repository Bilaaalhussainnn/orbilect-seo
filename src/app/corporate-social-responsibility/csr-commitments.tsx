"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { BarChart3, ChevronRight, Database, FileCheck, FileText, KeyRound,
  Leaf, Lock, Share2, ShieldAlert, ShieldCheck, Trash2, Users } from "lucide-react";
import styles from "./csr-commitments.module.css";

const safeguards = [
  ["Collect only what we need", "Limit collection to information relevant to the agreed work. Avoid requesting sensitive information when it serves no project purpose."],
  ["Limit access by role", "Give team members access only to the systems and information they need for their responsibilities."],
  ["Protect account credentials", "Use individual accounts where available, enable multifactor authentication where supported, and keep passwords out of ordinary email and chat."],
  ["Share files securely", "Use approved transfer tools and restricted links for client documents, and verify who should receive them."],
  ["Protect information in our tools", "Choose tools that support appropriate safeguards for client information, including encryption where supported."],
  ["Review third-party access", "Consider what a vendor needs to access before sharing client information, and remove access when the work ends."],
  ["Manage retention and deletion", "Keep information for the agreed purpose and handle return or deletion requests in line with applicable obligations."],
  ["Respond to suspected incidents", "Review suspected exposure promptly, limit further access, and communicate with affected clients as appropriate."],
];
const workflows = [
  ["Digital approvals", "We use digital documents, shared reviews, and electronic approvals to reduce routine printing.", FileCheck],
  ["Online reporting", "We share project updates and reports digitally so clients and teams can review the same information.", BarChart3],
] as const;
const symbols = [Database, Users, KeyRound, Share2, Lock, ShieldCheck, Trash2, ShieldAlert];

function Scene({ Icon, step, type }: {
  Icon: typeof ShieldCheck;
  step: number;
  type: "document" | "shield";
}) {
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const stage = event.currentTarget;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--pitch", (-22 * ((event.clientY - rect.top) / rect.height - .5)) + "deg");
    stage.style.setProperty("--yaw", (28 * ((event.clientX - rect.left) / rect.width - .5)) + "deg");
  }

  return (
    <div className={styles.scene} data-type={type} aria-hidden="true"
      onPointerMove={tilt} onPointerLeave={event => {
        event.currentTarget.style.removeProperty("--pitch");
        event.currentTarget.style.removeProperty("--yaw");
      }}>
      <div className={styles.orbit} />
      <div className={styles.orbit} />
      <div className={styles.rig}>
        <div className={styles.back} />
        <div className={styles.middle} />
        <div className={styles.face} key={step}>
          {type === "shield" ? <ShieldCheck className={styles.outline} size={98} strokeWidth={.8} /> : null}
          <Icon size={type === "shield" ? 30 : 45} strokeWidth={1.55} />
        </div>
      </div>
    </div>
  );
}

export default function CsrCommitments() {
  const [workflow, setWorkflow] = useState(0);
  const [safeguard, setSafeguard] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const [workflowTitle, workflowText, WorkflowIcon] = workflows[workflow];
  const [safeguardTitle, safeguardText] = safeguards[safeguard];

  useEffect(() => {
    const targets = root.current?.querySelectorAll("[data-reveal]");
    if (!targets || typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) =>
        target.toggleAttribute("data-in-view", isIntersecting));
    }, { threshold: .1 });

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.root} ref={root}>
      <section className={styles.environment} aria-labelledby={id + "-environment"}>
        <div className={styles.split}>
          <div data-reveal>
            <p className={styles.label}><Leaf size={17} aria-hidden="true" /> Environmental responsibility</p>
            <h2 id={id + "-environment"}>Paper-free <span>by design</span></h2>
            <p>At Orbilect SEO, we review documents, approve work, and share updates digitally.</p>
            <div className={styles.switches} role="group" aria-label="Paper-free workflows">
              {workflows.map(([title], index) => (
                <button key={title} type="button" aria-pressed={workflow === index}
                  onClick={() => setWorkflow(index)}>{title}</button>
              ))}
            </div>
            <div className={styles.workflowDetail} aria-live="polite" aria-atomic="true">
              <div className={styles.swap} key={workflow}><h3>{workflowTitle}</h3><p>{workflowText}</p></div>
            </div>
          </div>
          <div data-reveal><Scene Icon={WorkflowIcon} step={workflow} type="document" /></div>
        </div>
      </section>

      <section className={styles.security} aria-labelledby={id + "-security"}>
        <div className={styles.inner}>
          <header className={styles.heading} data-reveal>
            <p className={styles.label}><ShieldCheck size={17} aria-hidden="true" /> Client responsibility</p>
            <h2 id={id + "-security"}>Protecting <span>client information</span></h2>
            <p>Explore the eight commitments that guide how we handle client data.</p>
          </header>
          <div className={styles.explorer}>
            <div className={styles.options} role="group" aria-label="Client data safeguards" data-reveal>
              {safeguards.map(([title], index) => {
                const Icon = symbols[index] ?? FileText;
                return (
                  <button key={title} type="button" aria-pressed={safeguard === index}
                    onClick={() => setSafeguard(index)}>
                    <Icon size={18} aria-hidden="true" />
                    <span>{title}</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <div className={styles.feature} data-reveal>
              <Scene Icon={symbols[safeguard] ?? FileText} step={safeguard} type="shield" />
              <div className={styles.detail} aria-live="polite" aria-atomic="true">
                <div className={styles.swap} key={safeguard}><h3>{safeguardTitle}</h3><p>{safeguardText}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
