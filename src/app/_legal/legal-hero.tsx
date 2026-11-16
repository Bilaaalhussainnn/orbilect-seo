"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardCheck, Clock3, Cookie, Database, FileText, PenLine, ShieldCheck } from "lucide-react";
import { OrbilectHeroBrand } from "../contact/contact-hero";
import styles from "./legal.module.css";

const privacyTopics = [
  { name: "Data we collect", Icon: Database, text: "Information you share when you enquire or work with us." },
  { name: "Cookie choices", Icon: Cookie, text: "Choose which optional categories to allow." },
  { name: "Your privacy rights", Icon: ShieldCheck, text: "Contact us to make a request about your information." },
];

const termsTopics = [
  { name: "Project scope", Icon: ClipboardCheck, text: "The deliverables, milestones, and fees we agree with you." },
  { name: "Revisions and support", Icon: PenLine, text: "How we review concerns, correct work, and redeliver." },
  { name: "Refunds and delivery", Icon: Clock3, text: "What to expect if you request a refund or a deadline slips." },
];

export default function LegalHero({ isPrivacy }: { isPrivacy: boolean }) {
  const [selected, setSelected] = useState(0);
  const topics = isPrivacy ? privacyTopics : termsTopics;
  const { Icon, text } = topics[selected];
  const Symbol = isPrivacy ? ShieldCheck : FileText;

  return (
    <header className={styles.hero}>
      <div className={[styles.wrap, styles.heroGrid].join(" ")}>
        <div>
          <OrbilectHeroBrand />
          <p data-site-eyebrow="" data-reveal="off">{isPrivacy ? "Your information" : "Working with us"}</p>
          <h1 data-site-heading="" data-orbilect-title="">{isPrivacy ? <>Privacy <span>Policy</span></> : <>Terms and <span>Conditions</span></>}</h1>
          <p>{isPrivacy
            ? "See what information we collect, why we use it, and the choices you have."
            : "See how we agree scope, deliver work, and handle support, revisions, and refunds."}</p>
          <div className={styles.links}>
            <Link href={isPrivacy ? "/terms-and-conditions" : "/privacy-policy"}>{isPrivacy ? "Terms and Conditions" : "Privacy Policy"}</Link>
            <Link href="/contact" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />Contact us</Link>
          </div>
        </div>
        <div className={styles.legalVisual}>
          <div className={styles.legalStage} data-kind={isPrivacy ? "privacy" : "terms"} data-view={selected} aria-hidden="true">
            <div className={styles.legalObject}>
              <div className={styles.legalDepth} />
              <div className={styles.legalFace}><Symbol /></div>
              <div className={styles.legalTile} key={selected}><Icon /></div>
            </div>
          </div>
          <div className={styles.legalControls} role="group" aria-label={isPrivacy ? "Explore privacy topics" : "Explore project terms"}>
            {topics.map(({ name }, index) => (
              <button key={name} type="button" aria-pressed={selected === index}
                onClick={() => setSelected(index)}>{name}</button>
            ))}
          </div>
          <p className={styles.legalCaption} aria-live="polite">{text}</p>
        </div>
      </div>
    </header>
  );
}
