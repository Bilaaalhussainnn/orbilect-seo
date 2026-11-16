"use client";

import { useState } from "react";
import styles from "./on-page-progression.module.css";

const months = [
  {
    "impressions": 3400,
    "clicks": 115,
    "leads": 5,
    "paid": 9,
    "work": "Audit priority pages, URLs, content, and booking friction. Agree on the scope and what launch success means."
  },
  {
    "impressions": 3300,
    "clicks": 109,
    "leads": 6,
    "paid": 9,
    "work": "Group pages by customer need and design clear paths between them."
  },
  {
    "impressions": 3700,
    "clicks": 127,
    "leads": 8,
    "paid": 10,
    "work": "Design and test key layouts across screen sizes."
  },
  {
    "impressions": 4100,
    "clicks": 146,
    "leads": 9,
    "paid": 11,
    "work": "Test validation, delivery, confirmation, and the next step."
  },
  {
    "impressions": 4400,
    "clicks": 164,
    "leads": 11,
    "paid": 11,
    "work": "Carry forward valuable content and map changed URLs."
  },
  {
    "impressions": 4800,
    "clicks": 182,
    "leads": 12,
    "paid": 12,
    "work": "Check the live site and priority journeys. Review post-launch issues and track enquiries as data comes in."
  }
];

const metrics = {
  "impressions": {
    "label": "Search impressions",
    "ticks": [
      6000,
      4000,
      2000,
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
          <p>{"A redesign improves the destination for both paid and organic visitors. If you’re buying traffic, test the forms and booking links before sending spend to the new site. Compare both channels after launch and consider traffic mix when judging changes in enquiry rate."}</p>
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
            <p className={styles.eyebrow} data-site-eyebrow="">Measuring Website Redesign</p>
            <h2 id="on-page-progression-title">Six months of <span>Website Redesign progress</span></h2>
            <p>{"Select a metric or month to see how Website Redesign work can be tracked alongside search performance."}</p>
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
