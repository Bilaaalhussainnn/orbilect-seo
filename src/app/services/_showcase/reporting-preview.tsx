"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import investment from "../../_components/service-investment.module.css";
import { ShowcaseHeading } from "./section-heading";
import styles from "./showcase.module.css";

const day = [38, 64, 104, 109, 87, 58];
const dayActions = [1, 2, 3, 4, 2, 1];
const week = [360, 392, 410, 402, 455, 438, 460];
const weekActions = [8, 9, 10, 10, 12, 9, 13];

const ranges = {
  Daily: {
    labels: ["00–04", "04–08", "08–12", "12–16", "16–20", "20–00"], sessions: day, actions: dayActions,
    note: "Check traffic and tracked conversions by time of day. Start with unusual changes or a possible tracking issue.",
  },
  Weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], sessions: week, actions: weekActions,
    note: "A weekly report highlights what changed, which pages or channels contributed, and what to review next.",
  },
  Monthly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], sessions: [2515, 2690, 2840, 2917], actions: [52, 56, 64, 71],
    note: "Look at sustained trends and compare the results with campaign goals before changing budget or priorities.",
  },
};
const metrics = { Sessions: "sessions", "Tracked conversions": "actions" } as const;
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export function ReportingPreview() {
  const [range, setRange] = useState<keyof typeof ranges>("Weekly");
  const [metric, setMetric] = useState<keyof typeof metrics>("Sessions");
  const report = ranges[range];
  const values = report[metrics[metric]];
  const max = Math.max(...values);
  const sessions = sum(report.sessions);
  const actions = sum(report.actions);

  return (
    <section className={`${investment.section} ${styles.section}`} id="marketing-report-preview" aria-labelledby="marketing-report-title">
      <div className={investment.wrap}>
        <ShowcaseHeading id="marketing-report-title" eyebrow="Weekly analytics reporting" title="See how your website" accent="is performing"
          intro="We share weekly summaries with clear next steps. Switch the date range and metric in the sample report to see how we present the results."
          enquiry="Weekly website analytics reports" ctaLabel="Ask about reporting" />

        <div className={styles.reportStage}>
          <div className={styles.rig}>
            <div className={`${styles.panel} ${styles.report}`}>
              <div className={styles.panelTop}><BarChart3 size={22} aria-hidden="true" />Website performance</div>
              <p className={styles.demoLabel}>Illustrative data</p>
              <div className={styles.reportControls}>
                <div role="group" aria-label="Report period">
                  {(Object.keys(ranges) as (keyof typeof ranges)[]).map(option =>
                    <button type="button" key={option} aria-pressed={option === range} onClick={() => setRange(option)}>{option}</button>)}
                </div>
                <div role="group" aria-label="Chart metric">
                  {(Object.keys(metrics) as (keyof typeof metrics)[]).map(option =>
                    <button type="button" key={option} aria-pressed={option === metric} onClick={() => setMetric(option)}>{option}</button>)}
                </div>
              </div>
              <div aria-live="polite" aria-atomic="true">
                <dl className={styles.reportSummary}>
                  <div><dt>Sessions</dt><dd>{sessions.toLocaleString("en-US")}</dd></div>
                  <div><dt>Tracked conversions</dt><dd>{actions.toLocaleString("en-US")}</dd></div>
                </dl>
                <figure className={styles.reportChart} aria-label={range + " " + metric.toLowerCase()}>
                  <ol>
                    {values.map((value, index) => <li key={report.labels[index]}>
                      <span className={styles.barValue}>{value.toLocaleString("en-US")}</span>
                      <span className={styles.barArea} aria-hidden="true">
                        <span style={{height: `${(value / max) * 100}%`}} />
                      </span>
                      <span>{report.labels[index]}</span>
                    </li>)}
                  </ol>
                  <figcaption>{report.note}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
