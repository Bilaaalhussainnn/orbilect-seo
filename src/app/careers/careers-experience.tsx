"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, Layers, Search, Users } from "lucide-react";
import styles from "./careers-experience.module.css";

const levels = [
  { title: "Leadership", description: "Sets the agency’s direction, decides which markets and services to invest in, and takes responsibility for client commitments." },
  { title: "Senior management", description: "Turns agency priorities into operating plans, assigns resources across teams, and resolves issues that affect delivery." },
  { title: "Heads of departments", description: "Lead their disciplines, set quality standards, coach team leads, and review work before it reaches the client." },
];

const departments = [
  { title: "SEO Strategy", description: "Sets organic search priorities, maps demand to pages, and reviews whether the roadmap is bringing in relevant visitors and enquiries." },
  { title: "Technical SEO", description: "Investigates crawling, indexing, redirects, and site performance, then works with developers to validate fixes." },
  { title: "Content and Editorial", description: "Plans content, writes briefs, and edits service pages and articles for clarity, accuracy, and search intent." },
  { title: "Paid Media", description: "Builds and manages advertising campaigns, monitors spend, and uses conversion data to guide tests." },
  { title: "Social Media", description: "Plans publishing, creates social campaigns with the design team, and reports what audiences respond to." },
  { title: "Design and UX", description: "Designs accessible page layouts, prototypes key interactions, and makes it easier for visitors to take the next step." },
  { title: "Web Development", description: "Builds and maintains websites, implements technical changes, and tests releases before they go live." },
  { title: "Analytics and Reporting", description: "Defines what to measure, checks event tracking, and reports on enquiries, bookings, or sales where tracking is available." },
  { title: "Workforce Management", description: "Coordinates schedules, coverage, and shift handoffs so project teams have the people they need when they need them." },
  { title: "Training and Development", description: "Runs onboarding and coaching around client workflows, tools, and delivery standards." },
  { title: "Compliance", description: "Communicates requirements for handling client information, managing access, and reporting suspected incidents." },
  { title: "IT Support", description: "Keeps workstations, connectivity, and approved tools running, and helps teams recover when something interrupts work." },
];

const staffingSteps = [
  { label: "Find talent", icon: Search, title: "Find specialists for your brief", description: "We use your role requirements, working hours, and project goals to source and assess candidates.", angle: -19 },
  { label: "Select your specialist", icon: Users, title: "Meet the shortlist", description: "Review relevant experience and assessment notes, interview finalists, and make the final selection.", angle: 15 },
  { label: "Start working together", icon: Check, title: "Work directly with your specialist", description: "Agree on responsibilities, tools, and reporting before kickoff. Your specialist then works directly with your team.", angle: -8 },
];

export function CareersOrganization() {
  const [active, setActive] = useState(levels[0]);
  const id = useId();
  const isDepartment = departments.includes(active);
  const Icon = isDepartment ? Layers : Compass;

  return (
    <div className={styles.organization}>
      <div className={styles.map}>
        <ol className={styles.levels} aria-label="Leadership hierarchy">
          {levels.map((level) => (
            <li key={level.title}>
              <button type="button" aria-pressed={active === level} aria-controls={id} onClick={() => setActive(level)}>
                {level.title}
              </button>
            </li>
          ))}
        </ol>
        <div className={styles.branch} aria-hidden="true" />
        <div className={styles.departments} role="group" aria-label="Departments">
          {departments.map((department) => (
            <button key={department.title} type="button" aria-pressed={active === department}
              aria-controls={id} onClick={() => setActive(department)}>
              {department.title}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.detail} id={id} aria-live="polite" aria-atomic="true">
        <div key={active.title} className={styles.enter}>
          <div className={styles.emblem} aria-hidden="true"><Icon size={26} /></div>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
        </div>
      </div>
    </div>
  );
}

export function CareersStaffing() {
  const [active, setActive] = useState(0);
  const id = useId();
  const { icon: Icon, title, description, angle } = staffingSteps[active];

  return (
    <section className={styles.staffing} aria-labelledby="careers-staffing">
      <div className={styles.staffingGrid}>
        <div className={styles.copy}>
          <p data-site-eyebrow="" data-reveal="off" className={styles.eyebrow}>Global staffing</p>
          <h2 id="careers-staffing">Build your team <span>across borders</span></h2>
          <p>We help businesses worldwide find offshore specialists in SEO, content, digital marketing, design, and development. You choose who joins your team.</p>
          <Link href="/staffing" className={styles.cta} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />Explore staffing </Link>
        </div>

        <div className={styles.staffingPanel}>
          <div className={styles.stepButtons} role="group" aria-label="Staffing process">
            {staffingSteps.map(({ label }, index) => (
              <button key={label} type="button" aria-pressed={index === active}
                aria-controls={id} onClick={() => setActive(index)}>
                {label}
              </button>
            ))}
          </div>

          <div className={styles.placement} id={id}>
            <div className={styles.stage} aria-hidden="true">
              <div className={styles.tilt}>
                <div className={styles.model} style={{ transform: `rotateX(13deg) rotateY(${angle}deg)` }}>
                  <span className={styles.back} />
                  <span className={styles.middle} />
                  <span className={styles.front}><Icon key={title} className={styles.enter} size={34} /></span>
                </div>
              </div>
            </div>
            <div aria-live="polite" aria-atomic="true">
              <div key={title} className={styles.enter}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
