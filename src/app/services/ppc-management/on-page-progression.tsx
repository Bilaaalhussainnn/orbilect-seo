"use client";

import { useState } from "react";
import styles from "./on-page-progression.module.css";

const months = [
  {
    "impressions": 2800,
    "clicks": 115,
    "leads": 8,
    "paid": 8,
    "organic": 5,
    "work": "Launch the first campaign and verify calls and forms."
  },
  {
    "impressions": 3200,
    "clicks": 132,
    "leads": 10,
    "paid": 10,
    "organic": 6,
    "work": "Review actual searches and exclude terms unrelated to commercial work."
  },
  {
    "impressions": 3900,
    "clicks": 158,
    "leads": 12,
    "paid": 12,
    "organic": 7,
    "work": "Test a landing page that explains emergency coverage and response steps."
  },
  {
    "impressions": 3650,
    "clicks": 149,
    "leads": 11,
    "paid": 11,
    "organic": 7,
    "work": "Investigate the dip in qualified enquiries before changing budget."
  },
  {
    "impressions": 4500,
    "clicks": 183,
    "leads": 14,
    "paid": 14,
    "organic": 8,
    "work": "Shift budget toward the services producing qualified enquiries."
  },
  {
    "impressions": 4950,
    "clicks": 201,
    "leads": 16,
    "paid": 16,
    "organic": 9,
    "work": "Compare cost per qualified enquiry and agree on the next tests."
  }
];

const metrics = {
  "impressions": {
    "label": "Paid impressions",
    "ticks": [
      6000,
      4000,
      2000,
      0
    ]
  },
  "clicks": {
    "label": "Paid clicks",
    "ticks": [
      240,
      160,
      80,
      0
    ]
  },
  "leads": {
    "label": "Qualified paid enquiries",
    "ticks": [
      18,
      12,
      6,
      0
    ]
  }
};
type Metric = keyof typeof metrics;

const number = new Intl.NumberFormat("en-US");
const monthlyPaidSpend = 1500;
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
  const ticks = [18, 12, 6, 0];
  return (
    <section className={styles.section + " " + styles.compareSection} aria-labelledby="on-page-paid-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Organic and paid search</p>
          <h2 id="on-page-paid-title">How the two channels <span>work together</span></h2>
          <p>{"Paid search buys targeted reach within your budget. SEO helps useful pages earn visibility organically. We track qualified enquiries by channel and use paid query data to decide what’s worth testing on the site."}</p>
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
                {months.map(({ organic, paid }, index) => (
                  <li key={index}>
                    <div className={styles.bar} style={{ height: (organic / ticks[0]) * 100 + "%" }}>
                      <span className={styles.value}>{organic}<span className={styles.srOnly}> organic enquiries</span></span>
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
            <p className={styles.eyebrow} data-site-eyebrow="">Measuring PPC Management</p>
            <h2 id="on-page-progression-title">Six months of <span>PPC Management progress</span></h2>
            <p>{"Select a metric or month to see how we review paid reach, clicks, and qualified enquiries as a campaign develops."}</p>
          </header>

          <figure className={styles.figure} aria-labelledby="on-page-chart-caption" aria-describedby="on-page-chart-note">
            <figcaption id="on-page-chart-caption">Paid search performance</figcaption>
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
              <p>{number.format(month.impressions)} impressions · {number.format(month.clicks)} paid clicks · {month.leads} qualified paid enquiries</p>
            </div>
            <p id="on-page-chart-note" className={styles.note}>The figures illustrate how we report progress. Actual timing and results depend on your site, demand, competition, and which work is in scope.</p>
          </figure>
        </div>
      </section>
      <PaidComparison />
    </>
  );
}
