"use client";

import { useId, useState, type PointerEvent } from "react";
import {
  ArrowRight, BarChart3, CalendarDays, ClipboardCheck,
  Code2, FileText, Search, Users,
} from "lucide-react";
import styles from "./team-globe.module.css";

const teams = [
  {
    name: "Client Success", short: "Client Success", icon: Users, x: 50, y: 10,
    route: "M50 10 Q76 7 85 30",
    input: "The client’s business goals, priority pages, and target launch date.",
    output: "An agreed brief with milestone dates, owners, and approval responsibilities.",
    deadline: "Confirms what the team needs from the client and when each decision is due.",
  },
  {
    name: "SEO Strategy", short: "SEO Strategy", icon: Search, x: 85, y: 30,
    route: "M85 30 Q98 50 85 70",
    input: "The project brief, search data, and findings from the site audit.",
    output: "A prioritized page map, content briefs, and technical requirements.",
    deadline: "Identifies which fixes must happen first and flags dependencies before production.",
  },
  {
    name: "Content & Design", short: "Content & Design", icon: FileText, x: 85, y: 70,
    route: "M85 70 Q76 93 50 90",
    input: "Priority pages, customer questions, brand standards, and search intent.",
    output: "Reviewed copy, responsive layouts, and implementation notes.",
    deadline: "Shares drafts early so feedback can be resolved before development begins.",
  },
  {
    name: "Development", short: "Development", icon: Code2, x: 50, y: 90,
    route: "M50 90 Q24 93 15 70",
    input: "Approved copy, layouts, and technical requirements.",
    output: "A testable release and a list of changes for QA to verify.",
    deadline: "Raises blockers early and keeps the release focused on the agreed scope.",
  },
  {
    name: "Quality Assurance", short: "QA", icon: ClipboardCheck, x: 15, y: 70,
    route: "M15 70 Q2 50 15 30",
    input: "The release, acceptance criteria, and the pages and events to verify.",
    output: "Verified changes and a list of any issues that need rework.",
    deadline: "Checks priority paths on mobile and desktop before handoff, while there’s still time to correct issues.",
  },
  {
    name: "Analytics", short: "Analytics", icon: BarChart3, x: 15, y: 30,
    route: "M15 30 Q24 7 50 10",
    input: "Verified changes, tracking events, and the agreed measurement baseline.",
    output: "Results and opportunities to discuss at the next client review.",
    deadline: "Checks that measurement is ready at launch so reporting can begin on schedule.",
  },
];

export default function TeamGlobe() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const team = teams[active];
  const next = (active + 1) % teams.length;
  const Icon = team.icon;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const { left, top, width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    stage.style.setProperty("--rx", `${(.5 - (event.clientY - top) / height) * 18}deg`);
    stage.style.setProperty("--ry", `${((event.clientX - left) / width - .5) * 24}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section className={styles.section} aria-labelledby="team-globe-title">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Department collaboration</p>
          <h2 id="team-globe-title">Different teams <span>one shared goal</span></h2>
          <p>Follow a project from brief to results review. Each team knows what it owns, when it’s due, and what the next team needs to keep moving.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
            <div className={styles.orbit} role="group" aria-label="Select a department">
              <div className={styles.sphere} aria-hidden="true"><i /><i /><i /></div>
              <svg className={styles.routes} viewBox="0 0 100 100" aria-hidden="true">
                {teams.map(({ name, route }) => <path key={name} d={route} className={styles.track} />)}
                <path key={team.name} d={team.route} pathLength={1} className={styles.signal} />
              </svg>
              {teams.map(({ name, short, icon: NodeIcon, x, y }, index) => (
                <button key={name} type="button" className={styles.node}
                  style={{ left: `${x}%`, top: `${y}%` }} aria-label={name}
                  aria-pressed={active === index} aria-controls={panelId}
                  onClick={() => setActive(index)}>
                  <NodeIcon size={18} aria-hidden="true" /><span>{short}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div id={panelId} aria-live="polite" aria-atomic="true">
              <div key={team.name} className={styles.readout}>
                <div className={styles.badge} aria-hidden="true"><Icon size={25} /></div>
                <h3>{team.name}</h3>
                <dl>
                  <div><dt>What comes in</dt><dd>{team.input}</dd></div>
                  <div><dt>Handoff to {teams[next].name}</dt><dd>{team.output}</dd></div>
                  <div><dt>How we protect the deadline</dt><dd>{team.deadline}</dd></div>
                </dl>
              </div>
            </div>
            <button type="button" className={styles.next} onClick={() => setActive(next)}>
              Next handoff <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={styles.commitments}>
          <div>
            <CalendarDays size={22} aria-hidden="true" />
            <div><h3>Meet the agreed deadline</h3><p>We assign an owner to each milestone, track approvals, and flag blockers early. If timing is at risk, we explain what changed and agree on the next step with you.</p></div>
          </div>
          <div>
            <ClipboardCheck size={22} aria-hidden="true" />
            <div><h3>Look for ways to exceed expectations</h3><p>We check the work against the brief before handoff. When we spot a useful improvement beyond the scope, we explain its value and agree with you on whether to pursue it.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
