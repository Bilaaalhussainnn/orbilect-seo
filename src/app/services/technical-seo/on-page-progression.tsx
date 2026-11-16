"use client";

import { useState } from "react";
import styles from "./on-page-progression.module.css";

const months = [
  {
    "impressions": 4100,
    "clicks": 138,
    "leads": 6,
    "paid": 12,
    "work": "Sample important templates, review Search Console, and record broken paths and crawl or index anomalies."
  },
  {
    "impressions": 4500,
    "clicks": 156,
    "leads": 7,
    "paid": 12,
    "work": "Inspect representative URLs and trace internal paths and crawl controls."
  },
  {
    "impressions": 5100,
    "clicks": 181,
    "leads": 8,
    "paid": 13,
    "work": "Review the listed URLs, prepare a clean sitemap, and inspect priorities."
  },
  {
    "impressions": 5000,
    "clicks": 173,
    "leads": 8,
    "paid": 12,
    "work": "Map old URLs to the right destinations and review preferred URL signals."
  },
  {
    "impressions": 6100,
    "clicks": 218,
    "leads": 11,
    "paid": 14,
    "work": "Trace heavy resources, unstable layout, and slow interactions."
  },
  {
    "impressions": 6700,
    "clicks": 245,
    "leads": 12,
    "paid": 14,
    "work": "Check priority URLs and watch for recurring issues in indexing, performance, and critical site flows."
  }
];

const metrics = {
  "impressions": {
    "label": "Search impressions",
    "ticks": [
      9000,
      6000,
      3000,
      0
    ]
  },
  "clicks": {
    "label": "Organic clicks",
    "ticks": [
      300,
      200,
      100,
      0
    ]
  },
  "leads": {
    "label": "Organic enquiries",
    "ticks": [
      15,
      10,
      5,
      0
    ]
  }
};
type Metric = keyof typeof metrics;

const number = new Intl.NumberFormat("en-US");
const monthlyPaidSpend = 1200;
const paidTotal = months.reduce((sum, month) => sum + month.paid, 0);
const paidSpend = monthlyPaidSpend * months.length;


function Axis({ ticks }: { ticks: number[] }) {
  return (
    <div className={styles.ticks} aria-hidden="true">
      {ticks.map((tick) => <span key={tick}>{number.format(tick)}</span>)}
    </div>
  );
}

function Grid({ ticks }: { ticks: number[] }) {
  return (
    <div className={styles.grid} aria-hidden="true">
      {ticks.map((tick) => <span key={tick} style={{ bottom: (tick / ticks[0]) * 100 + "%" }} />)}
    </div>
  );
}

function PaidComparison() {
  const ticks = [15,10,5,0];
  return (
    <section className={styles.section + " " + styles.compareSection} aria-labelledby="on-page-paid-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Organic and paid search</p>
          <h2 id="on-page-paid-title">How the two channels <span>work together</span></h2>
          <p>{"Paid campaigns can send visits to a working page while technical fixes roll out. If the landing page is broken, slow, or difficult to use, increasing spend won’t repair that experience. We test the landing path and report paid campaign performance separately."}</p>
        </header>

        <figure className={styles.figure} aria-labelledby="paid-chart-caption" aria-describedby="paid-chart-note">
          <figcaption id="paid-chart-caption">Tracked enquiries by channel</figcaption>
          <p className={styles.axisTitle}>Monthly enquiries · illustrative example</p>
          <div className={styles.legend}>
            <span><i aria-hidden="true" /> Organic search</span>
            <span><i aria-hidden="true" /> Paid search</span>
          </div>
          <div className={styles.chart}>
            <Axis ticks={ticks} />
            <div className={styles.plot}>
              <Grid ticks={ticks} />
              <ol className={styles.columns + " " + styles.paired} aria-label="Monthly organic and paid enquiries">
                {months.map(({ leads, paid }, index) => (
                  <li key={index}>
                    <div className={styles.bar} style={{ height: (leads / ticks[0]) * 100 + "%" }}>
                      <span className={styles.value}>{leads}<span className={styles.srOnly}> organic enquiries</span></span>
                    </div>
                    <div className={styles.bar + " " + styles.paidBar} style={{ height: (paid / ticks[0]) * 100 + "%" }}>
                      <span className={styles.value}>{paid}<span className={styles.srOnly}> paid enquiries</span></span>
                    </div>
                    <span className={styles.month}>Month {index + 1}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p id="paid-chart-note" className={styles.note}>
            <strong>Example paid media spend</strong> ${number.format(monthlyPaidSpend)} per month, or ${number.format(paidSpend)} across six months.
            That’s about ${number.format(Math.round(paidSpend / paidTotal))} in ad spend per tracked paid enquiry in this example.
            This figure excludes management fees and SEO costs.
          </p>
        </figure>
      </div>
    </section>
  );
}

export function OnPageProgression() {
  const [metric, setMetric] = useState<Metric>("impressions");
  const [activeMonth, setActiveMonth] = useState(0);
  const { label, ticks } = metrics[metric];
  const month = months[activeMonth];

  return (
    <>
      <section id="on-page-progression" className={styles.section} aria-labelledby="on-page-progression-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Measuring Technical SEO</p>
            <h2 id="on-page-progression-title">Six months of <span>Technical SEO progress</span></h2>
            <p>{"Select a metric or month to see how Technical SEO work can be tracked alongside search performance."}</p>
          </header>

          <figure className={styles.figure} aria-labelledby="on-page-chart-caption" aria-describedby="on-page-chart-note">
            <figcaption id="on-page-chart-caption">Organic search performance</figcaption>
            <div className={styles.metricControls} role="group" aria-label="Choose an organic search metric">
              {(Object.keys(metrics) as Metric[]).map((key) => (
                <button key={key} type="button" aria-pressed={metric === key} onClick={() => setMetric(key)}>
                  {metrics[key].label}
                </button>
              ))}
            </div>
            <p className={styles.axisTitle}>{label} per month · illustrative example</p>
            <div className={styles.chart}>
              <Axis ticks={ticks} />
              <div className={styles.plot}>
                <Grid ticks={ticks} />
                <ol className={styles.columns} aria-label={label + " by month"}>
                  {months.map((item, index) => (
                    <li key={index}>
                      <button type="button" className={styles.barButton} aria-pressed={activeMonth === index}
                        aria-label={"Month " + (index + 1) + ", " + number.format(item[metric]) + " " + label.toLowerCase()}
                        onClick={() => setActiveMonth(index)}>
                        <span key={metric} className={styles.bar} style={{ height: (item[metric] / ticks[0]) * 100 + "%" }}>
                          <span className={styles.value}>{number.format(item[metric])}</span>
                        </span>
                        <span className={styles.month}>Month {index + 1}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className={styles.monthDetail} aria-live="polite" aria-atomic="true">
              <strong>Month {activeMonth + 1}</strong>
              <p>{month.work}</p>
              <p>{number.format(month.impressions)} impressions · {number.format(month.clicks)} organic clicks · {month.leads} organic enquiries</p>
            </div>
            <p id="on-page-chart-note" className={styles.note}>The figures illustrate how we report progress. Actual timing and results depend on your site, demand, competition, and which work is in scope.</p>
          </figure>
        </div>
      </section>
      <PaidComparison />
    </>
  );
}
