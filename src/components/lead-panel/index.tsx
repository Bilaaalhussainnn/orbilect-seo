"use client";

import auditActions from "./audit-drawer-actions.module.css";
import GoogleDeviceScreen from "@/components/google-device-screen";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { submitLead } from "../../lib/leads/submit";
import type { AuditSource } from "../../lib/leads/sources";
import styles from "@/styles/orbilect-cta.module.css";
import visual from "./audit-visual.module.css";
import audit from "./audit-panel.module.css";

export default function LeadPanel({
  source = "general-audit",
  className = `${styles.cta} ${styles.ctaBlack}`,
  children,
  ctaVariant,
}: {
  source?: AuditSource;
  className?: string;
  children?: ReactNode;
  ctaVariant?: "black" | "white" | "blue" | "outline";
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setStatus("sending");
    setError("");

    try {
      setReceipt(await submitLead(form, source, window.location.pathname));
      form.reset();
      setStatus("sent");
    } catch (error) {
      setStatus("idle");
      setError(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <>
      <button
        type="button"
        className={[className, audit.trigger].filter(Boolean).join(" ")}
        data-orbilect-cta={ctaVariant}
        aria-haspopup="dialog"
        onClick={() => {
          if (status !== "sending") {
            setStatus("idle");
            setError("");
          }
          const drawer = dialog.current;
          if (!drawer) return;
          drawer.showModal();
        }}
      >
        {children ?? (
          <>
            <span className={styles.ctaIcon} aria-hidden="true">
              <ArrowUpRight />
            </span>
            Get a free SEO audit
          </>
        )}
      </button>

      <dialog
        ref={dialog}
        className={[styles.drawer, audit.drawer, visual.drawer].join(" ")}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Close audit request"
          onClick={() => dialog.current?.close()}
        >
          <X size={21} aria-hidden="true" />
        </button>

        <div className={styles.drawerBrand}>
          <img
            src="/brand/orbilect-seo-mark.svg"
            width={32}
            height={32}
            alt=""
          />
          <span>SEO AUDIT</span>
        </div>

        <div className={visual.header}>
          <div className={visual.copy}>
            <h2 id={titleId} className={visual.auditHeading} aria-label="Need an SEO audit?" data-reveal="off"><span className={visual.auditWord} aria-hidden="true"><span data-audit-char="" style={{ animationDuration: "80ms" }}>N</span><span data-audit-char="" style={{ animationDuration: "125ms" }}>e</span><span data-audit-char="" style={{ animationDuration: "170ms" }}>e</span><span data-audit-char="" style={{ animationDuration: "215ms" }}>d</span></span>{" "}<span className={visual.auditWord} aria-hidden="true"><span data-audit-char="" style={{ animationDuration: "260ms" }}>a</span><span data-audit-char="" style={{ animationDuration: "305ms" }}>n</span></span>{" "}<span className={visual.auditBlueWord} aria-hidden="true"><span data-audit-char="" style={{ animationDuration: "350ms" }}>S</span><span data-audit-char="" style={{ animationDuration: "395ms" }}>E</span><span data-audit-char="" style={{ animationDuration: "440ms" }}>O</span></span>{" "}<span className={visual.auditBlueWord} aria-hidden="true"><span data-audit-char="" style={{ animationDuration: "485ms" }}>a</span><span data-audit-char="" style={{ animationDuration: "530ms" }}>u</span><span data-audit-char="" style={{ animationDuration: "575ms" }}>d</span><span data-audit-char="" style={{ animationDuration: "620ms" }}>i</span><span data-audit-char="" style={{ animationDuration: "665ms" }}>t</span><span data-audit-char="" style={{ animationDuration: "710ms" }}>?</span></span></h2>
            <p id={descriptionId} className={styles.drawerIntro}>
          Tell us what you’d like customers to find. We’ll review your site
          and flag the changes worth making first.
        </p>
          </div>
          <AuditLens />
        </div>

        {status === "sent" ? (
          <p className={styles.formNote} role="status">{receipt}</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} aria-busy={status === "sending"}>
            <label>
              Full name *
              <input name="name" autoComplete="name" maxLength={120} required />
            </label>

            <label>
              Contact number *
              <input name="phone" type="tel" autoComplete="tel" maxLength={40} required />
            </label>

            <label>
              Website URL *
              <input
                name="website"
                inputMode="url"
                maxLength={2048}
                autoComplete="url"
                required placeholder="example.com" />
            </label>

            <label>
              Email address *
              <input
                name="email"
                type="email"
                maxLength={254}
                autoComplete="email"
                placeholder="you@yourbusiness.com"
                required
              />
            </label>

            <label>
              What should we look at? (optional)
              <textarea name="details" rows={3} maxLength={2000} />
            </label>

            <div className={auditActions.row} data-audit-drawer-actions="">
              <button className={styles.cta} type="submit" disabled={status === "sending"}>
                <span className={styles.ctaIcon} aria-hidden="true">
                  <ArrowUpRight />
                </span>
                {status === "sending" ? "Sending…" : "Request my audit"}
              </button>
              <a className={styles.cta} href="/how-free-audit-works">
                <span className={styles.ctaIcon} aria-hidden="true">
                  <ArrowUpRight />
                </span>
                {status === "sending" ? "Sending…" : "How the free audit works"}
              </a>
            </div>

            {error && <p className={styles.formNote} role="alert">{error}</p>}
          </form>
        )}
        {status !== "sent" && (
          <p className={audit.privacy}>
            We&apos;ll keep your information in our CRM to respond to your request.
            For more details, consult our <a href="/privacy-policy">privacy policy</a>.
          </p>
        )}
      </dialog>
    </>
  );
}

const auditChecks = ["Search impressions", "Search position", "Organic clicks"];

function AuditLens() {
  const [check, setCheck] = useState(0);
  const { previewRef, preview } = useAuditSearchPreview(check);

  return (
    <div className={visual.scene} ref={previewRef}>
      <button
        type="button"
        className={visual.lensButton}
        aria-label="Show the next search visibility metric"
        onClick={() => setCheck((current) => (current + 1) % auditChecks.length)}
      >
        <span key={check} className={visual.deviceStage} data-metric={check} aria-hidden="true">
          <span className={visual.laptop}>
            <span className={visual.laptopDisplay}>
              <AuditSearchScreen {...preview} />
            </span>
            <span className={visual.keyboard} />
          </span>
          <span className={visual.phone}>
            <AuditSearchScreen {...preview} />
          </span>
        </span>
      </button>
      <span className={visual.check} aria-live="polite">{auditChecks[check]}</span>
    </div>
  );
}




const auditSearchExamples = [
  { query: "local services near me", title: "Local services and bookings" },
  { query: "same-day home repair", title: "Home repair and appointments" },
  { query: "carry-on luggage with laptop sleeve", title: "Carry-on luggage collection" },
];

function useAuditSearchPreview(check: number) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const example = auditSearchExamples[check] ?? auditSearchExamples[0];
  const resultAt = 280 + example.query.length * 42;
  const websiteAt = resultAt + 900;

  useEffect(() => {
    const drawer = previewRef.current?.closest("dialog");
    if (!drawer) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let started = 0;
    let timer = 0;

    function advance() {
      if (!drawer?.open) return;
      const next = motion.matches ? websiteAt : Math.min(websiteAt, performance.now() - started);
      setElapsed(next);
      if (next < websiteAt) timer = window.setTimeout(advance, 34);
    }

    function sync() {
      window.clearTimeout(timer);
      if (!drawer?.open) return;
      started = performance.now();
      timer = window.setTimeout(advance, 0);
    }

    const observer = new MutationObserver(sync);
    observer.observe(drawer, { attributes: true, attributeFilter: ["open"] });
    motion.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      window.clearTimeout(timer);
    };
  }, [check, websiteAt]);

  return {
    previewRef,
    preview: {
      title: example.title,
      query: example.query.slice(0, Math.max(0, Math.floor((elapsed - 140) / 42))),
      showResult: elapsed >= resultAt,
      showWebsite: elapsed >= websiteAt,
    },
  };
}

function AuditSearchScreen({ title, query, showResult }: {
  title: string;
  query: string;
  showResult: boolean;
}) {
  return (
    <span className={visual.deviceScreen} data-google-preview="">
      <GoogleDeviceScreen query={query} title={title} ready={showResult} />
    </span>
  );
}
