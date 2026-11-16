"use client";

import { useEffect, useId, useState, type PointerEvent } from "react";
import { ArrowRight, BarChart3, ClipboardCheck, Code2, FileText, Search, Users } from "lucide-react";
import styles from "./department-flow.module.css";

const teams = [
  { name: "Client Success", icon: Users, x: 50, y: 12, receives: "Your brief, priority customers, and the business result you want to improve.", sends: "An agreed goal, priority pages, and access requirements for SEO Strategy." },
  { name: "SEO Strategy", icon: Search, x: 83, y: 30, receives: "The client brief and available search data.", sends: "A prioritized page map and content brief for Content & Design." },
  { name: "Content & Design", icon: FileText, x: 83, y: 70, receives: "Priority pages, search intent, and the questions customers need answered.", sends: "Approved copy, layouts, and publishing notes for Development." },
  { name: "Development", icon: Code2, x: 50, y: 88, receives: "Approved content, layouts, and technical requirements.", sends: "A testable release and a list of changes for Quality Assurance." },
  { name: "Quality Assurance", icon: ClipboardCheck, x: 17, y: 70, receives: "The release, its acceptance criteria, and the changes to verify.", sends: "Verified pages and tracking events for Analytics, plus any fixes for Development." },
  { name: "Analytics", icon: BarChart3, x: 17, y: 30, receives: "Verified changes, tracking events, and the agreed baseline.", sends: "Results and open questions for the next review with Client Success." },
];

export default function DepartmentFlow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const detailId = useId();
  const team = teams[active];
  const Icon = team.icon;
  const next = teams[(active + 1) % teams.length];

  useEffect(() => {
    if (!playing) return;
    const timeout = window.setTimeout(() => {
      if (active === teams.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 3000);
    return () => window.clearTimeout(timeout);
  }, [active, playing]);

  function select(index: number) {
    setPlaying(false);
    setActive(index);
  }

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const { left, top, width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    stage.style.setProperty("--rx", `${(.5 - (event.clientY - top) / height) * 12}deg`);
    stage.style.setProperty("--ry", `${((event.clientX - left) / width - .5) * 16}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section className={styles.section} aria-labelledby="department-flow-title">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Department collaboration</p>
          <h2 id="department-flow-title">Different teams <span>one shared goal</span></h2>
          <p>Every team works toward the result agreed with the client. Follow an example project to see how each department builds on the last team’s work.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
            <div className={styles.map} role="group" aria-label="Project departments">
              <svg className={styles.routes} viewBox="0 0 100 100" aria-hidden="true">
                {teams.map(({ name, x, y }, index) => {
                  const destination = teams[(index + 1) % teams.length];
                  return <line key={name} x1={x} y1={y} x2={destination.x}
                    y2={destination.y} pathLength="1" data-active={index === active} />;
                })}
              </svg>
              <div className={styles.goal}>Client goal</div>
              {teams.map(({ name, icon: TeamIcon, x, y }, index) => (
                <button key={name} type="button" style={{ left: `${x}%`, top: `${y}%` }}
                  aria-pressed={active === index} aria-controls={detailId} onClick={() => select(index)}>
                  <TeamIcon size={18} aria-hidden="true" /><span>{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.reader}>
            <div id={detailId} aria-live={playing ? "off" : "polite"} aria-atomic="true">
              <div key={team.name} className={styles.readout}>
                <h3><Icon size={22} aria-hidden="true" />{team.name}</h3>
                <dl>
                  <div><dt>What comes in</dt><dd>{team.receives}</dd></div>
                  <div><dt>What goes to {next.name}</dt><dd>{team.sends}</dd></div>
                </dl>
              </div>
            </div>
            <div className={styles.controls}>
              <button type="button" onClick={() => {
                if (playing) setPlaying(false);
                else { setActive(0); setPlaying(true); }
              }}>{playing ? "Pause walkthrough" : "Follow the handoffs"}</button>
              <button type="button" onClick={() => select((active + 1) % teams.length)}>
                Next handoff <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
