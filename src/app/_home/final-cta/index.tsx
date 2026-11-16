"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Compass, Search, Target } from "lucide-react";
import { submitLead } from "../../../lib/leads/submit";
import { proposalServices, type LeadSource } from "../../../lib/leads/sources";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "./final-cta.module.css";

const stages = [
  {
    label: "Find the gap",
    icon: Search,
    description: "See which searches your competitors show up for and where your site has room to grow.",
  },
  {
    label: "Prioritize the fixes",
    icon: Compass,
    description: "Start with the technical and content changes most relevant to your goals.",
  },
  {
    label: "Measure progress",
    icon: Target,
    description: "Track search visibility, qualified visits, and enquiries or sales where tracking is available.",
  },
];

export default function FinalCta({
  contactDetails,
  formSource,
}: {
  contactDetails?: ReactNode;
  formSource?: LeadSource;
} = {}) {
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    setError("");
    setStatus("sending");

    try {
      const request = new URLSearchParams(window.location.search).get("request");
      let source: LeadSource = formSource ?? (contactDetails ? "contact-proposal" : "home-proposal");

      if (contactDetails) {
        if (request === "Starter SEO plan") source = "starter-plan-proposal";
        if (request === "Essential SEO plan") source = "essential-plan-proposal";
        if (request === "Custom SEO quotation") source = "custom-plan-proposal";
      }

      setReceipt(await submitLead(form, source, window.location.pathname));

      form.reset();
      setStatus("success");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Please try again.");
      setStatus("error");
    }
  }

  const ActiveIcon = stages[active].icon;

  return (
    <section id="request-proposal" className={`${styles.section}${contactDetails ? ` ${styles.contactSection}` : ""}`} aria-labelledby="proposal-heading">
      <div className={styles.layout}>
        <div>
          <p data-site-eyebrow="" data-reveal="off">{"Request a proposal"}</p>
          <h2 data-site-heading="" id="proposal-heading" data-orbilect-title="">
            {contactDetails ? (
              <>Tell us about <span>your business</span></>
            ) : (
              <>Get found by the customers <span>already searching for you</span></>
            )}
          </h2>
          {contactDetails ?? (
          <>
          <p className={styles.intro}>
            Tell us what you sell, who you want to reach, and where growth has stalled.
            We’ll use that context to recommend a starting point for your website.
            Monthly SEO plans start at $1,200.
          </p>

          <div className={styles.preview}>
            <div className={styles.stageVisual} aria-hidden="true">
              <span key={active} className={styles.stageIcon}><ActiveIcon size={22} /></span>
              <div className={styles.stageTrack}>
                <div
                  className={styles.stageFill}
                  style={{ width: `${((active + 1) / stages.length) * 100}%` }}
                />
              </div>
              <span className={styles.stageCount}>0{active + 1} / 03</span>
            </div>
            <div className={styles.stageButtons} role="group" aria-label="Explore our approach">
              {stages.map(({ label }, index) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                >
                  {label}
                </button>
              ))}
            </div>
            <p key={active} className={styles.stageCopy} aria-live="polite">
              {stages[active].description}
            </p>
          </div>
          </>
          )}
        </div>

        <form className={styles.form} onSubmit={submit} aria-busy={status === "sending"}>
          <h3>Tell us about your project</h3>
          <p className={styles.requiredNote}>All fields are required.</p>
          <div className={styles.fields}>
            <label>
              Full name
              <input name="name" autoComplete="name" required maxLength={120} />
            </label>
            <label>
              Work email
              <input name="email" type="email" autoComplete="email" required maxLength={254} />
            </label>
            <label>
              Phone number
              <input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 123 4567" required maxLength={40} />
            </label>
            <label>
              Website URL
              <input name="website" autoComplete="url" required maxLength={500} inputMode="url" placeholder="example.com" />
            </label>
            <label>
              Service
              <select name="service" defaultValue="" required>
                <option value="" disabled>Select a service</option>
                {proposalServices.map((service) => <option key={service}>{service}</option>)}
              </select>
            </label>
            <label className={styles.full}>
              Tell us how can we help you with?
              <textarea name="message" rows={4} required maxLength={2000} />
            </label>
          </div>

          <button
            type="submit"
            className={`${cta.cta} ${cta.ctaBlack} ${styles.submit}`}
            disabled={status === "sending"}
          >
            <span className={cta.ctaIcon} aria-hidden="true"><ArrowUpRight /></span>
            {status === "sending" ? "Sending…" : "Request a proposal"}
          </button>

          <div className={styles.feedback} role="status">
            {status === "success" && receipt}
            {status === "error" && error}
          </div>
        </form>
      </div>
    </section>
  );
}
