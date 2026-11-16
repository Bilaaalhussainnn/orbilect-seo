"use client";

import { BarChart3, BriefcaseBusiness, ChartNoAxesCombined, ChevronRight, FileText, Layers3, MessageCircle, Network, Search, Wrench, UsersRound } from "lucide-react";
import { useId, useState } from "react";
import { Depth } from "./depth";
import styles from "./workbench.module.css";

const symbols = {
  search: Search, wrench: Wrench, chart: BarChart3, network: Network,
  answer: MessageCircle, team: UsersRound, careers: BriefcaseBusiness, article: FileText,
};

export type Brief = {
  label: string;
  icon: keyof typeof symbols;
  title: string;
  detail: string;
  points: readonly string[];
};

export default function InteractiveBrief({ options, label }: { options: readonly Brief[]; label: string }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const option = options[active];
  const Mark = symbols[option.icon];

  return (
    <div className={styles.interactiveBrief}>
      <div className={styles.tablist} role="group" aria-label={label}>
        {options.map(({ label, icon }, index) => {
          const Icon = symbols[icon];
          return (
            <button key={label} type="button" aria-pressed={index === active} aria-controls={id}
              onClick={() => setActive(index)}>
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <Depth>
        <div id={id} aria-live="polite" className={styles.briefPanel}>
          <div className={styles.briefContent} key={option.label}>
            <div className={styles.briefTop}>
              <div className={styles.mark}><Mark size={23} aria-hidden="true" /></div>
              <span>{option.label}</span>
              <Layers3 size={18} aria-hidden="true" />
            </div>
            <h3>{option.title}</h3>
            <p>{option.detail}</p>
            <ul>{option.points.map(point => <li key={point}>{point}</li>)}</ul>
            <div className={styles.signal} aria-hidden="true">
              <div><i /><i /><i /></div>
              <ChartNoAxesCombined size={46} strokeWidth={1.3} />
            </div>
          </div>
        </div>
      </Depth>
    </div>
  );
}
