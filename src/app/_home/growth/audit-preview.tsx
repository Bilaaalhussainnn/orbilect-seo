"use client";

import { useState } from "react";
import { Depth } from "../workbench/depth";
import { ArrowUpRight, CheckCircle2, FileSearch, Gauge, ScanSearch } from "lucide-react";
import LeadPanel from "@/components/lead-panel";
import styles from "./audit-preview.module.css";

const checks = [
  {
    icon: ScanSearch,
    label: "Search visibility",
    title: "Find the searches you’re missing",
    items: ["Keyword opportunities", "Pages with room to grow", "Content gaps"],

  },
  {
    icon: Gauge,
    label: "Technical SEO",
    title: "See what’s blocking discovery",
    items: ["Crawl and indexing issues", "Broken links", "Page performance"],

  },
  {
    icon: FileSearch,
    label: "On-page SEO",
    title: "Prioritize the pages worth fixing",
    items: ["Page titles and descriptions", "Content structure", "Internal linking"],

  },
] as const;

export default function AuditPreview() {
  const [selected, setSelected] = useState(0);
  const check = checks[selected];
  const ScanIcon = check.icon;

  return (
    <section id="free-audit" className={styles.section} aria-labelledby="free-audit-title">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p data-site-eyebrow="" data-reveal="off">{"Free SEO audit"}</p>
          <h2 data-site-heading="" id="free-audit-title" data-orbilect-title="">
            Find what’s holding back <span>your organic search visibility</span>
          </h2>
          <p className={styles.intro}>
            Request a free SEO audit to uncover keyword opportunities, technical SEO issues,
            and on-page improvements. We’ll help you identify which fixes to prioritize.
          </p>
          <LeadPanel source="home-audit-preview" className={styles.auditCta} ctaVariant="black">
            <span data-orbilect-cta-icon="" data-explicit-arrow="" aria-hidden="true"><ArrowUpRight size={16} /></span>
            Get a free SEO audit
          </LeadPanel>
        </div>

        <div className={styles.preview}>
          <div className={styles.controls} role="group" aria-label="Explore audit checks">
            {checks.map(({ icon: Icon, label }, index) => (
              <button
                key={label}
                type="button"
                aria-pressed={index === selected}
                aria-controls="audit-findings"
                onClick={() => setSelected(index)}
              >
                <Icon size={16} aria-hidden="true" /> {label}
              </button>
            ))}
          </div>

          <Depth>
            <div className={styles.scanDeck} id="audit-findings" aria-live="polite" key={check.label}>
              <div className={styles.scanMark} aria-hidden="true">
                <div className={styles.scanTarget}><ScanIcon size={40} strokeWidth={1.35} /></div>
                <div className={styles.scanBeam} />
              </div>
              <div className={styles.findings}>
                <h3>{check.title}</h3>
                <ul>
                  {check.items.map(item => <li key={item}><CheckCircle2 size={16} aria-hidden="true" />{item}</li>)}
                </ul>
              </div>
            </div>
          </Depth>
        </div>
      </div>
    </section>
  );
}
