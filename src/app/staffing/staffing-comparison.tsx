"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock3, Users } from "lucide-react";
import styles from "./staffing-comparison.module.css";

const factors = [
  {
    label: "Recruiting",
    icon: Users,
    title: "Spend fewer hours filling the role",
    domestic: "Write the job description, advertise, screen candidates, run interviews, and handle the offer.",
    offshore: "Brief us on the role, skills, and hours you need. We handle sourcing and screening, and your team can review the fit before work starts.",
    benefit: "Less internal recruiting time and fewer hiring steps for your team.",
  },
  {
    label: "Onboarding",
    icon: Clock3,
    title: "Start with someone who knows the work",
    domestic: "Train a new hire on your tools, standards, and delivery process. The ramp-up depends on their experience and your team’s availability.",
    offshore: "Bring in someone with the core skills already in place. Use onboarding to cover your brand, access, approvals, and first assignment.",
    benefit: "Less time teaching the role from scratch. Your team still provides the context that makes the work useful.",
  },
  {
    label: "Overhead",
    icon: Briefcase,
    title: "Quote for the capacity you actually need",
    domestic: "Budget for compensation and benefits, plus the equipment, software, workspace, and administration the role requires.",
    offshore: "Choose the role and coverage you need. We itemize what the quote includes and identify any tools or costs your team will cover.",
    benefit: "A clearer view of the full cost before you commit to a role.",
  },
];

export function StaffingComparison() {
  const [active, setActive] = useState(0);
  const factor = factors[active];
  const Icon = factor.icon;

  return (
    <section id="service-intro" className={styles.section} aria-labelledby="staffing-comparison-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">The economics of offshoring</p>
          <h2 id="staffing-comparison-title">Put more of your budget <span>into the work itself</span></h2>
          <p>When US hiring costs stretch your budget, a dedicated offshore specialist can give you more room to invest in delivery. Compare the full cost of the role, including recruiting, training, and overhead.</p>
        </header>

        <div className={styles.layout}>
          <div>
            <div className={styles.controls} role="group" aria-label="Compare staffing costs">
              {factors.map(({ label, icon: FactorIcon }, index) => (
                <button key={label} type="button" aria-pressed={index === active}
                  aria-controls="staffing-cost-preview" onClick={() => setActive(index)}>
                  <FactorIcon size={20} aria-hidden="true" />{label}
                </button>
              ))}
            </div>

            <aside className={styles.benchmark}>
              <strong>$46.89</strong>
              <p>Average hourly US private-sector employer compensation, including $14.07 in benefits.</p>
              <a href="https://www.bls.gov/opub/ted/2026/compensation-costs-for-private-industry-workers-averaged-46-89-per-hour-worked-in-june-2026.htm">
                US Bureau of Labor Statistics · June 2026 <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <p>Figures cover private-sector workers across roles. Your quote depends on the specialist and coverage you need.</p>
            </aside>
          </div>

          <div id="staffing-cost-preview" className={styles.stage} aria-live="polite" aria-atomic="true">
            <div className={styles.panel} key={factor.label}>
              <h3><Icon size={23} aria-hidden="true" />{factor.title}</h3>
              <dl>
                <div><dt>US in-house hire</dt><dd>{factor.domestic}</dd></div>
                <div><dt>Dedicated offshore specialist</dt><dd>{factor.offshore}</dd></div>
              </dl>
              <p className={styles.benefit}>{factor.benefit}</p>
            </div>
          </div>
        </div>

        <Link className={styles.cta} href="#staffing-roles" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
          Explore specialist roles 
        </Link>
      </div>
    </section>
  );
}
