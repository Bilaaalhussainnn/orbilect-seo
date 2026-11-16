"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MainService } from "./main-service-data";
import styles from "./main-service.module.css";

const migratedRoutes = new Set(["/services/off-page-seo","/services/technical-seo","/services/digital-marketing","/services/ecommerce-seo","/services/website-redesign","/services/ppc-management","/services/bing-advertising","/services/chatgpt-advertising","/services/conversion-rate-optimization","/services/email-marketing","/services/hire-seo-content-writer","/services/landing-page-design","/services/marketing-analytics","/services/paid-social-advertising","/services/seo-content-writing","/services/social-media-marketing"]);

export function ReputationOutsideMainServices({ children }: { children: ReactNode }) {
  const pathname = usePathname()?.replace(/\/$/, "");
  return pathname && migratedRoutes.has(pathname) ? null : children;
}

export function ServiceWork({ name, work }: { name: string; work: MainService["work"] }) {
  const [selected, setSelected] = useState(0);
  const [title, issue, fix, check] = work[selected];

  return (
    <section className={styles.light} aria-labelledby="main-service-work-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">{name} services</p>
          <h2 id="main-service-work-title">See what we <span>check and improve</span></h2>
        </header>
        <div className={styles.work}>
          <div className={styles.controls} role="group" aria-label={"Explore " + name + " services"}>
            {work.map(([label], index) => (
              <button type="button" key={label} aria-pressed={selected === index}
                aria-controls="main-service-work-panel" onClick={() => setSelected(index)}>
                {label}<ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="main-service-work-panel" aria-live="polite" aria-atomic="true">
            <div key={title} className={styles.panel}>
              <h3>{title}</h3>
              <dl>
                <div><dt>What we find</dt><dd>{issue}</dd></div>
                <div><dt>What we change</dt><dd>{fix}</dd></div>
                <div><dt>What you get</dt><dd>{check}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceProgress({ metric, progress, paid }: Pick<MainService, "metric" | "progress" | "paid">) {
  const [activeMonth, setActiveMonth] = useState(0);
  const maximum = Math.ceil(Math.max(...progress) / 4) * 4;
  const ticks = [maximum, maximum * .75, maximum * .5, maximum * .25, 0];

  return (
    <>
      <section className={styles.dark} aria-labelledby="main-service-progress">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Measuring progress</p>
            <h2 id="main-service-progress">What we can measure <span>over six months</span></h2>
            <p>We agree on a baseline and review work completed, search performance, and tracked enquiries where the data is available.</p>
          </header>
          <figure className={styles.figure} aria-labelledby="main-service-chart-caption">
            <figcaption id="main-service-chart-caption">{metric} · illustrative example</figcaption>
            <div className={styles.chart}>
              <div className={styles.ticks} aria-hidden="true">
                {ticks.map((tick, index) => <span key={tick} style={{ top: index * 25 + "%" }}>{tick}</span>)}
              </div>
              <div className={styles.plot}>
                <div className={styles.gridlines} aria-hidden="true">
                  {ticks.map((tick, index) => <span key={tick} style={{ top: index * 25 + "%" }} />)}
                </div>
                <ol className={styles.bars} aria-label={metric + " by month"}>
                  {progress.map((value, index) => (
                    <li key={index}>
                      <button type="button" aria-pressed={index === activeMonth}
                        aria-label={"Month " + (index + 1) + ", " + value + " — " + metric}
                        onClick={() => setActiveMonth(index)}>
                        <span className={styles.bar} style={{ height: (value / maximum) * 100 + "%" }}>
                          <span>{value}</span>
                        </span>
                        <span className={styles.month}>Month {index + 1}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <p className={styles.chartDetail} aria-live="polite">
              <strong>Month {activeMonth + 1}</strong> · {metric}: {progress[activeMonth]}
            </p>
            <p className={styles.note}>Sample figures for reporting purposes. Actual work, timing, and outcomes depend on your starting point and agreed scope.</p>
          </figure>
        </div>
      </section>

      <section className={styles.light} aria-labelledby="main-service-paid">
        <div className={styles.wrap + " " + styles.split}>
          <header>
            <p className={styles.eyebrow} data-site-eyebrow="">Paid search and the wider plan</p>
            <h2 id="main-service-paid">Where paid promotion <span>fits</span></h2>
          </header>
          <div>
            <p>{paid}</p>
            <a className={styles.link} href="#request-proposal">Discuss your priorities <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
