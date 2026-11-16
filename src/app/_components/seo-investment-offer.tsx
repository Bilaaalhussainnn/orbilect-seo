"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe, ScanLine, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { submitLead } from "../../lib/leads/submit";
import logos from "../about/seo-engine-logos.json";
import styles from "./seo-investment.module.css";

const previewIcons = [Search, ScanLine, Globe];
const previewLabels = ["Search visibility", "Technical health", "Site structure"];

function OfferForPage({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(0);
  const Icon = previewIcons[preview];

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search)
      .get("preview-seo-offer") === "1";

    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (dialog?.isConnected && !dialog.open) dialog.showModal();
    }, preview ? 0 : 30_000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  async function submitAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    setError("");
    setStatus("sending");

    try {
      await submitLead(event.currentTarget, "starter-offer", pathname);
      setStatus("sent");
    } catch (error) {
      setStatus("idle");
      setError(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.offer} aria-labelledby="seo-offer-title">
      <div className={styles.offerLayout}>
        <button
          type="button"
          className={styles.close}
          onClick={() => dialogRef.current?.close()}
          aria-label="Close offer"
        >
          <X size={18} />
        </button>

        <div>
          <p className={styles.offerLabel}>Limited-time Starter offer</p>
          <h2 id="seo-offer-title">Start at <span>$500</span></h2>
          <p>Save $150 on the regular <s>$650</s> Starter investment.</p>


          {status === "sent" ? (
            <p className={styles.auditSuccess} role="status">
              <strong>Audit request received.</strong>
              <br />
              Thank you for submitting your details. One of our product strategists will be in touch within the next 24 hours.
            </p>
          ) : (
            <form onSubmit={submitAudit} aria-busy={status === "sending"}>
              <div className={styles.auditFields}>
                <label>
                  Full name
                  <input name="name" autoComplete="name" maxLength={100} required />
                </label>
                <label>
                  Contact number
                  <input name="phone" type="tel" autoComplete="tel" maxLength={32} required />
                </label>
                <label className={styles.auditWideField}>
                  Website URL
                  <input name="website" inputMode="url" autoComplete="url" maxLength={2048} required placeholder="example.com" />
                </label>
                <label className={styles.auditWideField}>
                  Email address
                  <input name="email" type="email" autoComplete="email" maxLength={254} required />
                </label>
              </div>

              {error && <p className={styles.error} role="alert">{error}</p>}

              <button className={styles.button} type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Submitting…" : "Request my free audit"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

        <div className={styles.auditVisual}>
          <pre className={styles.auditCode} aria-hidden="true">
            {"audit.onPage = check(titles, content, links)\naudit.offPage = review(mentions, backlinks)\naudit.indexing = inspect(sitemap, robotsTxt)"}
          </pre>

          <button
          type="button"
          className={styles.preview}
          onClick={() => setPreview((value) => (value + 1) % previewIcons.length)}
          aria-label={`Audit preview: ${previewLabels[preview]}. Show next check.`}
        >
          <span className={styles.previewScene} aria-hidden="true">
            <span className={styles.backLayer} />
            <span className={styles.middleLayer} />
            <span className={styles.frontLayer} key={preview}><Icon size={30} /></span>
          </span>
          <span className={styles.previewLabel}>{previewLabels[preview]} ↻</span>
        </button>

          <ul className={styles.auditEngineMarks} aria-label="Search engines">
            <li><Image src={logos.google} alt="" width={21} height={21} unoptimized /> Google</li>
            <li><Image src={logos.bing} alt="" width={21} height={21} unoptimized /> Bing</li>
          </ul>
          <p className={styles.auditEngineCopy}>
            Your customers are looking for you.{" "}
            <span className={styles.offerTaglineAccent}>Make sure they find you!</span>
          </p>
          <ul className={styles.offerLogos} aria-label="Website and design tools">
            <li><Image src="/technology-stack/react.svg" alt="React" width={16} height={16} unoptimized /></li>
            <li><Image src="/technology-stack/nextjs.svg" alt="Next.js" width={16} height={16} unoptimized /></li>
            <li><Image src="/technology-stack/figma.svg" alt="Figma" width={16} height={16} unoptimized /></li>
            <li><Image src="/blogs/platform-logos/shopify.svg" alt="Shopify" width={16} height={16} unoptimized /></li>
            <li><Image src="/blogs/platform-logos/wordpress.svg" alt="WordPress" width={16} height={16} unoptimized /></li>
          </ul>
        </div>

        <p className={styles.offerFinePrint}>
          Promotional offers are payable in full and non-refundable, view all our{" "}
          <a href="/terms-and-conditions#limited-time-offers">terms here</a>.
        </p>
      </div>
    </dialog>
  );
}

export default function SeoInvestmentOffer() {
  const pathname = usePathname();
  if (!pathname) return null;

  return <OfferForPage key={pathname} pathname={pathname} />;
}
