import PageStructuredData from "@/components/seo/page-data";
import HeroAudit, { HeroActions } from "@/components/lead-panel/hero-audit";
import { pageSeo } from "@/lib/orbilect-search";
import CareersTitle from "./careers-title";
import CareersStructure from "./careers-structure";
import CareersClosing from "./careers-closing";
import WorkplaceIntegrity from "./workplace-integrity";
import CareersJobs from "./careers-jobs";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Users } from "lucide-react";
import TeamPreview from "./team-preview";
import { CareersStaffing } from "./careers-experience";
import styles from "./careers.module.css";

const seoBaseMetadata: Metadata = {
  title: "Careers | Orbilect SEO",
  description: "Get to know the teams at Orbilect SEO, check for current job openings, and learn what we look for in applicants.",
};

const requirements = [
  { title: "Age 18 or older", copy: "Applicants must be at least 18 years old." },
  { title: "Bachelor’s degree or higher", copy: "A completed bachelor’s degree is the minimum educational requirement." },
  { title: "IT literacy", copy: "Be comfortable using workplace software, shared documents, and online communication tools." },
  { title: "Flexible shift availability", copy: "Be able to work flexible shifts. The schedule will depend on the role and client coverage." },
  { title: "Excellent communication", copy: "Communicate clearly in writing and conversation, give timely updates, and ask questions when something needs clarification." },
];

export default function CareersPage() {
  return (
    <main>
      <PageStructuredData route="/careers" />
      <section className={styles.hero} aria-labelledby="careers-title">
        <div className={styles.heroGrid}>
          <div>
            <CareersTitle />
            <p>We help businesses across markets get found online. Meet the teams behind that work and see what we look for when a role opens.</p>
            <HeroActions>
              <Link className={styles.action} href="#openings" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />
                Check job openings
              </Link>
              <HeroAudit />
            </HeroActions>
          </div>
          <TeamPreview />
        </div>
      </section>

      <CareersStructure />

      <section id="openings" className={styles.openings} aria-labelledby="careers-openings">
        <div className={styles.wrap}>
          <div className={styles.status}>
            <Users size={26} aria-hidden="true" />
            <div>
              <p className={styles.eyebrow} data-site-eyebrow="">Current openings</p>
              <h2 id="careers-openings">Explore your <span>next opportunity</span></h2>
              <p>Check our live Mustakbil job board for available roles, requirements, and application instructions.</p>
              <Link href="#mustakbil-jobs" className={styles.action}>View current opportunities <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.eligibility} aria-labelledby="careers-eligibility">
        <div className={styles.wrap}>
          <div className={styles.heading}>
            <p data-site-eyebrow="" data-reveal="off">{"Application requirements"}</p>
            <h2 data-site-heading="" id="careers-eligibility">Who can <span>apply</span></h2>
            <p>These are the general requirements for future roles. Each vacancy will list any additional skills or experience it requires.</p>
          </div>
          <ul className={styles.requirements}>
            {requirements.map(({ title, copy }) => (
              <li key={title}>
                <Check size={19} aria-hidden="true" />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CareersStaffing />
      <WorkplaceIntegrity />
      <CareersJobs />
      <CareersClosing />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/careers", seoBaseMetadata as import("next").Metadata);
