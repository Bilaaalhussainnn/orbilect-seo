import { pageSeo } from "@/lib/orbilect-search";
import AuditValue from "./audit-value";
import AfterAudit from "./after-audit";
import AuditHero from "./audit-hero";
import type { Metadata } from "next";
import LeadPanel from "@/components/lead-panel";
import TechnologyStack from "../_home/technology-stack";
import ReportContents from "./report-contents";
import styles from "./audit-guide.module.css";

const seoBaseMetadata: Metadata = {
  title: "How the Free SEO Audit Works",
  description: "See what Orbilect SEO checks in a free website audit, what the report includes, and how findings turn into a prioritized plan.",
};

const process = [
  ["Send us your website", "Share your URL, the markets you serve, and what you want to improve. Tell us which pages, products, or locations matter most."],
  ["We review the site", "We start with the pages we can access and the data you share. If you choose to share Search Console or analytics reports, we can validate more of what we find."],
  ["Get a prioritized report", "We explain what we found, which pages are affected, why it matters, and what to fix first. You can use the report with your team or ask Orbilect SEO to scope the work."],
];

export default function FreeAuditGuidePage() {
  return (
    <main>
      <AuditHero />

      <section className={styles.section} aria-labelledby="audit-process-title">
        <div className={styles.wrap}>
          <header className={styles.heading}>
            <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">How the audit works</p>
            <h2 id="audit-process-title">From your website <span>to a plan of action</span></h2>
            <p>Your report includes an executive summary, evidence from the review, affected pages where identifiable, and recommended fixes in priority order. We flag findings that need account access or further investigation.</p>
          </header>
          <ol className={styles.process}>
            {process.map(([title, description]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TechnologyStack />

      <ReportContents />

      <AfterAudit />
      <AuditValue />

      <section className={`${styles.section} ${styles.dark}`} aria-labelledby="audit-request-title">
        <div className={styles.wrap}>
          <header className={styles.heading}>
            <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Request your audit</p>
            <h2 id="audit-request-title">Find out what to <span>fix first</span></h2>
            <p>Send your website and the business goal you want the audit to focus on.</p>
          </header>
          <LeadPanel />
        </div>
      </section>
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/how-free-audit-works", seoBaseMetadata as import("next").Metadata);
