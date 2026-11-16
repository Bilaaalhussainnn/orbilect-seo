"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, Code2, FileText, Gauge, Megaphone, Monitor, Search, Users } from "lucide-react";
import styles from "./staffing-team.module.css";

const profiles = {
  "SEO strategists": { icon: Search, work: "Set search priorities", handoff: "SEO roadmap and review notes" },
  "Technical SEO specialists": { icon: Gauge, work: "Diagnose crawl and performance issues", handoff: "Prioritized fixes and validation notes" },
  "Content writers and editors": { icon: FileText, work: "Turn briefs into publish-ready copy", handoff: "Edited drafts and CMS handoff" },
  "Website designers": { icon: Monitor, work: "Design responsive pages", handoff: "Layouts and implementation notes" },
  "Website developers": { icon: Code2, work: "Build pages and integrations", handoff: "Tested changes and documentation" },
  "PPC specialists": { icon: Megaphone, work: "Manage and refine campaigns", handoff: "Spend and lead-quality review" },
  "Social media marketers": { icon: Megaphone, work: "Plan and publish social content", handoff: "Content calendar and channel review" },
  "Analytics specialists": { icon: BarChart3, work: "Verify how conversions are tracked", handoff: "Tested events and reporting notes" },
} as const;

export function StaffingTeam({ roles, standalone }: { roles: string[][]; standalone: boolean }) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [role, description] = roles[selected];
  const profile = profiles[role as keyof typeof profiles];
  const Icon = profile?.icon ?? Users;
  const href = standalone
    ? "/contact?request=" + encodeURIComponent(role + " staffing enquiry") + "#request-proposal"
    : "/staffing";

  return (
    <section id="staffing-roles" className={styles.section} aria-labelledby={id + "-title"}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Staffing and offshoring</p>
          <h2 id={id + "-title"}>Add the expertise <span>your team needs next</span></h2>
          <p>Bring in a specialist for a defined project or build a dedicated offshore team. We agree on what they own, when they’re available, and how work gets reviewed.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.roles} role="group" aria-label="Explore specialist roles">
            {roles.map(([name], index) => {
              const RoleIcon = profiles[name as keyof typeof profiles]?.icon ?? Users;
              return (
                <button key={name} type="button" aria-pressed={selected === index}
                  aria-controls={id + "-preview"} onClick={() => setSelected(index)}>
                  <RoleIcon size={18} aria-hidden="true" />
                  <span>{name}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div id={id + "-preview"} className={styles.preview}>
            <div key={role} className={styles.scene}>
              <div className={styles.diagram} aria-hidden="true">
                <div className={styles.node}><Users size={22} /><span>Your team</span></div>
                <span className={styles.connector} />
                <div className={styles.specialist}><Icon size={26} /><span>{role}</span></div>
                <span className={styles.connector} />
                <div className={styles.node}><ArrowRight size={22} /><span>Handoff</span></div>
              </div>
              <div className={styles.detail} aria-live="polite" aria-atomic="true">
                <h3>{role}</h3>
                <p>{description}</p>
                {profile && (
                  <dl>
                    <div><dt>What they own</dt><dd>{profile.work}</dd></div>
                    <div><dt>What you receive</dt><dd>{profile.handoff}</dd></div>
                  </dl>
                )}
              </div>
            </div>
            <Link className={styles.cta} href={href} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
              {standalone ? "Discuss this role" : "Explore Dedicated Marketing Teams"}
              
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
