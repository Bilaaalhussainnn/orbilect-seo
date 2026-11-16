"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../on-page-seo/on-page-progression.module.css";

const reports = [
  {
    label: "Organic growth",
    metrics: "Product and collection clicks · Organic orders · Organic revenue",
    example: "If collection clicks grow while purchases stay flat, check whether the page matches what shoppers searched for and whether products are in stock.",
    href: "/services/ecommerce-seo",
    link: "Explore ecommerce SEO",
  },
  {
    label: "Paid media",
    metrics: "Ad spend · Cost per order · Revenue attributed to ads",
    example: "If a campaign brings in more orders but acquisition costs rise, check which products still make sense to promote after returns and delivery costs.",
    href: "/services/ppc-management",
    link: "Explore PPC management",
  },
  {
    label: "Store operations",
    metrics: "Time to dispatch · Return reasons · Support response time",
    example: "If delivery questions increase, check whether tracking updates are sent on time and whether order emails set clear delivery expectations.",
    href: "/services/marketing-analytics",
    link: "Explore analytics and reporting",
  },
];

export function EcommerceReporting() {
  const [report, setReport] = useState(reports[0]);

  return (
    <section className={styles.section} aria-labelledby="ecommerce-reporting-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Ecommerce reporting</p>
          <h2 id="ecommerce-reporting-title">See what is <span>driving store performance</span></h2>
          <p>Review organic growth, paid campaigns, and store operations together. We agree up front on what we can measure and which changes the numbers should inform.</p>
        </header>
        <div className={styles.figure}>
          <div className={styles.metricControls} role="group" aria-label="Choose an ecommerce report">
            {reports.map((item) => (
              <button key={item.label} type="button" aria-pressed={item === report} onClick={() => setReport(item)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className={styles.monthDetail} aria-live="polite" aria-atomic="true">
            <strong>{report.metrics}</strong>
            <p>{report.example}</p>
            <p><Link href={report.href}>{report.link}</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}
