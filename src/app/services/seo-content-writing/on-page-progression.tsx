"use client";

import { useState } from "react";
import styles from "./on-page-progression.module.css";

const months = [
  {
    "impressions": 4,
    "clicks": 2,
    "leads": 1,
    "paid": 3,
    "organic": 1,
    "work": "Topic research. Review what is already in place and identify gaps that could affect this project."
  },
  {
    "impressions": 7,
    "clicks": 5,
    "leads": 3,
    "paid": 5,
    "organic": 3,
    "work": "Content briefs. Document the requirements and agree on what belongs in the first delivery."
  },
  {
    "impressions": 10,
    "clicks": 7,
    "leads": 5,
    "paid": 7,
    "organic": 5,
    "work": "Service-page writing. Build the first version around this specific customer or operational need."
  },
  {
    "impressions": 11,
    "clicks": 8,
    "leads": 6,
    "paid": 8,
    "organic": 6,
    "work": "Product and category copy. Check that the experience or handoff works in the environment people actually use."
  },
  {
    "impressions": 14,
    "clicks": 11,
    "leads": 8,
    "paid": 10,
    "organic": 8,
    "work": "Editing and fact checks. Test the setup and document what is verified before judging performance."
  },
  {
    "impressions": 17,
    "clicks": 14,
    "leads": 11,
    "paid": 13,
    "organic": 11,
    "work": "Publishing and performance review. Review the results or completed work and agree on the next improvement."
  }
];

const metrics = {
  "impressions": {
    "label": "Topics scoped",
    "ticks": [
      18,
      12,
      6,
      0
    ]
  },
  "clicks": {
    "label": "Drafts delivered",
    "ticks": [
      18,
      12,
      6,
      0
    ]
  },
  "leads": {
    "label": "Pages published",
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
          <h2 id="on-page-paid-title">{"What we compare "}<span>{"at each review"}</span></h2>
          <p>{"We compare work delivered with the subset that has passed review. This makes it easier to see what is ready and what still needs attention."}</p>
        </header>

        <figure className={styles.figure} aria-labelledby="paid-chart-caption" aria-describedby="paid-chart-note">
          <figcaption id="paid-chart-caption">Work delivered and passed review</figcaption>
          <p className={styles.axisTitle}>Monthly counts · illustrative example</p>
          <div className={styles.legend}>
            <span><i aria-hidden="true" /> Passed review</span>
            <span><i aria-hidden="true" /> Work delivered</span>
          </div>
          <div className={styles.chart}>
            <Axis ticks={ticks} />
            <div className={styles.plot}>
              <Grid ticks={ticks} />
              <ol className={styles.columns + " " + styles.paired} aria-label="Monthly work delivered and passed review">
                {months.map(({ organic, paid }, index) => (
                  <li key={index}>
                    <div className={styles.bar} style={{ height: (organic / ticks[0]) * 100 + "%" }}>
                      <span className={styles.value}>{organic}<span className={styles.srOnly}> passed review</span></span>
                    </div>
                    <div className={styles.bar + " " + styles.paidBar} style={{ height: (paid / ticks[0]) * 100 + "%" }}>
                      <span className={styles.value}>{paid}<span className={styles.srOnly}> work delivered</span></span>
                    </div>
                    <span className={styles.month}>Month {index + 1}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p id="paid-chart-note" className={styles.note}>Illustrative counts. The two series show a total and a subset, so they are not added together.</p>
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
            <p className={styles.eyebrow} data-site-eyebrow="">Measuring SEO Content Writing</p>
            <h2 id="on-page-progression-title">{"How we track "}<span>{"SEO Content Writing"}</span></h2>
            <p>{"Explore the illustrative review schedule and the measures we agree on for this service."}</p>
          </header>

          <figure className={styles.figure} aria-labelledby="on-page-chart-caption" aria-describedby="on-page-chart-note">
            <figcaption id="on-page-chart-caption">SEO Content Writing reporting</figcaption>
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
              <p>{number.format(month.impressions)} topics scoped · {number.format(month.clicks)} drafts delivered · {month.leads} pages published</p>
            </div>
            <p id="on-page-chart-note" className={styles.note}>The figures illustrate how we report progress. Actual timing and results depend on your site, demand, competition, and which work is in scope.</p>
          </figure>
        </div>
      </section>
      <PaidComparison />
    </>
  );
}
