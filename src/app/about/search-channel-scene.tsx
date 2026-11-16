"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { CalendarDays, FlaskConical, PauseCircle, Rocket, SlidersHorizontal, Target, TrendingUp, Zap } from "lucide-react";
import styles from "./search-channel-scene.module.css";

const stages = [
  {
    label: "Launch",
    icon: Rocket,
    paid: "Once ads go live, your offer can reach a targeted audience quickly.",
    organic: "Search engines need time to discover updates. New pages may take longer to earn visibility.",
    paidBars: [66, 84, 78, 88],
    organicBars: [12, 20, 30, 40],
  },
  {
    label: "Build momentum",
    icon: TrendingUp,
    paid: "Campaign data helps you test offers, refine targeting, and decide where to spend.",
    organic: "Improved pages can attract more relevant searches as their visibility grows.",
    paidBars: [65, 78, 69, 83],
    organicBars: [30, 46, 63, 80],
  },
  {
    label: "Pause ads",
    icon: PauseCircle,
    paid: "The paused campaign stops bringing in new visits once its ads stop running.",
    organic: "Published pages can continue attracting search visits. Visibility still depends on rankings and demand.",
    paidBars: [82, 75, 0, 0],
    organicBars: [58, 66, 64, 72],
  },
  {
    label: "Test an offer",
    icon: FlaskConical,
    paid: "Send traffic to different offers and compare which generates more qualified enquiries.",
    organic: "Use what you learn to improve the pages people discover in search, then track how those pages perform.",
    paidBars: [36, 64, 46, 72],
    organicBars: [30, 32, 36, 39],
  },
  {
    label: "Cut the budget",
    icon: SlidersHorizontal,
    paid: "A lower budget can reduce reach. Concentrate spending on the campaigns that generate the strongest leads.",
    organic: "Existing pages can still attract visits. Reducing SEO investment can slow new improvements and leave older pages in need of updates.",
    paidBars: [78, 66, 40, 34],
    organicBars: [55, 57, 53, 54],
  },
  {
    label: "Seasonal demand",
    icon: CalendarDays,
    paid: "Increase campaign coverage around busy dates, then reduce spending as demand falls.",
    organic: "Prepare seasonal pages ahead of peak demand so search engines have time to discover the updates.",
    paidBars: [32, 68, 92, 45],
    organicBars: [28, 52, 75, 48],
  },
  {
    label: "Scale up",
    icon: Target,
    paid: "Expand winning campaigns and watch whether the cost of each additional lead stays within target.",
    organic: "Expand coverage into related products, services, or locations where you can publish useful, distinct pages.",
    paidBars: [46, 66, 82, 94],
    organicBars: [36, 47, 59, 74],
  },
];

const visitTicks = [100, 75, 50, 25, 0];

function ActivityBars({
  values,
  channel,
}: {
  values: number[];
  channel: string;
}) {
  const firstWeek = values[0];
  const lastWeek = values[values.length - 1];
  const change = lastWeek - firstWeek;
  const trend =
    change === 0
      ? "No change in visits"
      : Math.abs(change) + (change > 0 ? " more visits" : " fewer visits");

  return (
    <figure className={styles.visitChart} aria-label={channel + " weekly website visits"}>
      <figcaption className={styles.metric}>Weekly website visits</figcaption>

      <div className={styles.chartGrid}>
        <div className={styles.ticks} aria-hidden="true">
          {visitTicks.map((tick) => <span key={tick}>{tick}</span>)}
        </div>

        <div>
          <div className={styles.bars} aria-hidden="true">
            {values.map((value, index) => (
              <div key={index} className={styles.track}>
                <div
                  className={styles.bar}
                  data-zero={value === 0}
                  style={{ height: value + "%" }}
                />
              </div>
            ))}
          </div>

          <ol className={styles.weekLabels} aria-label="Visits by week">
            {values.map((value, index) => (
              <li key={index}>
                <span>Week {index + 1}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className={styles.visitTrend}>
        <strong>{trend}</strong>
        <span>Week 1 to Week {values.length}</span>
      </p>
    </figure>
  );
}


export default function SearchChannelScene({
  variant = "bars",
}: {
  variant?: "bars" | "markers";
}) {
  const [selected, setSelected] = useState(0);
  const [entered, setEntered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stage = stages[selected];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.15 });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const scene = event.currentTarget;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    scene.style.setProperty("--yaw", `${x * 12}deg`);
    scene.style.setProperty("--pitch", `${y * -9}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--yaw");
    event.currentTarget.style.removeProperty("--pitch");
  }

  return (
    <div ref={rootRef} className={styles.root} data-chart={variant} data-entered={entered} data-reveal="off">
      <div className={styles.controls} role="group" aria-label="Compare channels by stage">
        {stages.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={selected === index}
            aria-controls="channel-comparison"
            onClick={() => setSelected(index)}
          >
            <Icon size={17} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className={styles.viewport} onPointerMove={tilt} onPointerLeave={reset}>
        <div id="channel-comparison" className={styles.scene} aria-live="polite">
          <article className={styles.paid}>
            <h3><Zap size={22} aria-hidden="true" /> Paid campaigns</h3>
            <ActivityBars values={stage.paidBars} channel="Paid campaign" />
            <p>{stage.paid}</p>
          </article>
          <article className={styles.organic}>
            <h3><TrendingUp size={22} aria-hidden="true" /> Organic SEO</h3>
            <ActivityBars values={stage.organicBars} channel="Organic search" />
            <p>{stage.organic}</p>
          </article>
        </div>
      </div>

      <p className={styles.caption}>Illustrative visit counts. Both charts use the same 0–100 scale.</p>
    </div>
  );
}
