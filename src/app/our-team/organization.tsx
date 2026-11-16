"use client";

import { useState, type PointerEvent } from "react";
import { Briefcase, Building2, ClipboardCheck, Code2, Compass, Globe, Layers, Search, Server, ShieldCheck, Smartphone, Users, Target, Sparkles, type LucideIcon } from "lucide-react";
import styles from "./organization-directory.module.css";

type Detail = { name: string; copy: string; icon: LucideIcon };
type Group = { name: string; icon: LucideIcon; departments: readonly (readonly [string, string, LucideIcon?])[] };

const levels: readonly Detail[] = [
  { name: "Executive Leadership", copy: "Sets the direction for the agency and takes responsibility for client commitments and how we support our teams.", icon: Compass },
  { name: "Senior Management", copy: "Turns priorities into operating plans, assigns resources, and resolves issues across departments.", icon: Layers },
  { name: "Heads of Departments", copy: "Set standards for their disciplines, coach team leads, and review work before it reaches clients.", icon: Briefcase },
];
const groups: readonly Group[] = [
  {
    name: "SEO and Client Delivery",
    icon: Search,
    departments: [
      ["SEO Strategy", "Sets search priorities and maps customer intent to the pages that should answer it."],
      ["Technical SEO", "Diagnoses crawl, indexing, and site structure issues and verifies the fixes."],
      ["Content & Editorial", "Researches, writes, and edits website and campaign content."],
      ["Paid Media", "Manages ad budgets, tests campaigns, and monitors qualified leads and sales."],
      ["Social Media Marketing", "Plans social content, publishing, and campaign reporting."],
      ["Design & UX", "Designs accessible pages, prototypes user journeys, and produces campaign assets."],
      ["Web Development", "Builds and maintains marketing websites, CMS templates, and landing pages."],
      ["Analytics & Reporting", "Checks measurement and connects campaign and search data to business outcomes."],
      ["Ecommerce Growth", "Improves product and collection pages, storefront navigation, and purchase journeys."],
      ["Digital PR & Outreach", "Develops client campaigns that can earn relevant editorial coverage and links."],
    ],
  },
  {
    name: "Apps and Software Engineering",
    icon: Code2,
    departments: [
      ["App Development", "Coordinates mobile app delivery across product, design, engineering, and testing.", Smartphone],
      ["Custom Software Development", "Builds business software and workflow tools around client requirements.", Code2],
      ["Frontend Engineering", "Builds accessible interfaces and reusable components for browsers.", Globe],
      ["Backend Engineering", "Builds server-side logic, databases, and services that power applications.", Server],
      ["Android Development", "Builds and maintains native Android applications.", Smartphone],
      ["iOS Development", "Builds and maintains native iPhone and iPad applications.", Smartphone],
      ["Cross-Platform Development", "Builds mobile experiences that share code across Android and iOS.", Layers],
      ["API & Integrations", "Connects applications to payment, CRM, and other business systems.", Code2],
      ["Platform Engineering", "Maintains the shared infrastructure and tools used by development teams.", Server],
      ["Cloud & DevOps", "Manages deployment workflows, monitoring, and cloud environments.", Server],
      ["Data Engineering", "Builds data pipelines and prepares reliable datasets for reporting and applications.", Server],
      ["Product Management", "Defines requirements, prioritizes features, and coordinates releases.", Briefcase],
      ["Software QA & Testing", "Tests application behavior, integrations, and regressions before release.", ClipboardCheck],
      ["Application Security", "Reviews application access controls and security risks during development.", ShieldCheck],
    ],
  },
  {
    name: "Customer Support",
    icon: Users,
    departments: [
      ["Head of Customer Support","Owns support strategy, service standards, and delivery across client accounts."],
      ["Support Operations Managers","Report to the department head and oversee account delivery, staffing, and shift performance."],
      ["Assistant Managers","Report to Operations Managers and coordinate daily coverage, handovers, and escalations."],
      ["Team Leads","Report to Assistant Managers, supervise agents across all three tiers, and coach their teams."],
      ["Floor Support","Works alongside Team Leads to help agents resolve issues during a shift."],
      ["Tier 1 Agents","Handle first-contact enquiries and routine cases, with clear handoff notes when escalating."],
      ["Tier 2 Agents","Investigate complex cases and pass specialist issues to Tier 3."],
      ["Tier 3 Agents","Handle specialist escalations and coordinate with Engineering or client teams as needed."],
      ["Training & Development (T&D)","Runs onboarding, refresher training, and coaching for support teams."],
      ["Workforce Management (WFM)","Forecasts contact volume, schedules shifts, and monitors coverage."],
      ["Quality Assurance (QA)","Reviews interactions, calibrates scoring, and shares findings with team leads and trainers."],
      ["Support Talent Acquisition","Recruits agents, specialists, and support leaders for client accounts."],
      ["Offshore Accounts","Manages offshore client communication and service reviews in coordination with Support Operations."],
    ],
  },
  {
    name: "Operations Support",
    icon: ClipboardCheck,
    departments: [
      ["Service Delivery & Client Success", "Coordinates kickoff, approvals, client updates, and escalations."],
      ["Quality Assurance", "Reviews client deliverables against the brief and flags recurring quality issues."],
      ["Training & Development", "Runs onboarding and coaching on client workflows, tools, and quality standards."],
      ["Workforce Management", "Plans schedules, coverage, and shift handoffs around delivery commitments."],
      ["Project Management Office", "Tracks milestones, dependencies, and risks across projects."],
      ["Process Improvement", "Finds where work stalls or gets repeated and improves the workflow."],
      ["Delivery Reporting", "Tracks deadlines, workload, and quality trends for operations leads."],
      ["Knowledge Management", "Maintains playbooks, handoff notes, and internal reference material."],
    ],
  },
  {
    name: "Organization Support",
    icon: Building2,
    departments: [
      ["Administration & Facilities", "Coordinates office operations, workspaces, and equipment logistics."],
      ["Information Technology", "Supports staff devices, connectivity, account access, and approved workplace tools.", Server],
      ["Finance & Accounts", "Manages budgets, invoicing, payroll coordination, and financial reporting."],
      ["Human Resources", "Supports employee relations, people policies, and career development.", Users],
      ["Domestic Talent Acquisition", "Sources and screens candidates for local roles and coordinates interviews.", Search],
      ["Technical Recruiting", "Sources and evaluates engineering and other specialist candidates.", Code2],
      ["Staffing & Placements", "Coordinates client staffing briefs, candidate shortlists, and specialist placements.", Users],
      ["Media & PR Relations", "Handles Orbilect’s press enquiries, interview requests, and brand materials.", Globe],
      ["Legal", "Coordinates contract reviews, NDAs, and business agreements."],
      ["Risk & Compliance", "Maintains operating standards and coordinates risk reviews and incident reporting.", ShieldCheck],
      ["Procurement", "Coordinates purchases, vendor selection, and supplier agreements."],
      ["Information Security", "Supports agency-wide access, information handling, and security awareness.", ShieldCheck],
      ["People Operations", "Coordinates employee records, onboarding logistics, and everyday people processes.", Users],
      ["Business Development", "Identifies prospective clients and coordinates discovery and proposals."],
      ["Partnerships", "Manages relationships with partner organizations and service providers."],
      ["Corporate Strategy", "Supports leadership with market research, planning, and business priorities.", Compass],
    ],
  },
  { name: "Client Acquisition & Sales", icon: Target, departments: [
  [
    "Business Development Managers (BDMs)",
    "Own sales pipelines, market priorities, and commercial targets."
  ],
  [
    "Senior Sales Supervisors",
    "Coach the sales team, review pipelines, and coordinate daily sales activity."
  ],
  [
    "Senior Product Strategists",
    "Lead complex discovery and guide the scope of proposed solutions."
  ],
  [
    "Product Strategists",
    "Translate client needs into product recommendations and clear briefs."
  ],
  [
    "Senior Business Development Specialists",
    "Lead complex opportunities and coach business development specialists."
  ],
  [
    "Business Development Specialists",
    "Qualify opportunities, develop proposals, and coordinate follow-up."
  ],
  [
    "Sales Interns",
    "Support market research, lead qualification, and outreach preparation."
  ],
  [
    "Australia Sales",
    "Develops opportunities and client relationships in Australia."
  ],
  [
    "Qatar Sales",
    "Develops opportunities and client relationships in Qatar."
  ],
  [
    "United Kingdom Sales",
    "Develops opportunities and client relationships in United Kingdom."
  ],
  [
    "Canada Sales",
    "Develops opportunities and client relationships in Canada."
  ]
] },
  { name: "Staff Augmentation", icon: Users, departments: [
  [
    "Client Staffing",
    "Defines the skills, experience, and availability a client needs."
  ],
  [
    "Talent Matching",
    "Shortlists specialists and coordinates interviews and practical assessments."
  ],
  [
    "Placement & Onboarding",
    "Coordinates start dates, access, and the handoff to the client’s team."
  ],
  [
    "Account Support",
    "Maintains communication after placement and helps resolve delivery concerns."
  ]
] },
  { name: "AI Products", icon: Sparkles, departments: [
  [
    "AI Product Development",
    "Defines AI product requirements and coordinates design, engineering, and evaluation."
  ],
  [
    "AI Chatbot Development",
    "Builds conversational assistants with approved knowledge, escalation paths, and human handoffs."
  ],
  [
    "AI Employees & Workflow Agents",
    "Builds task-focused AI assistants with clear permissions and human review where needed."
  ],
  [
    "AI Website Development",
    "Builds AI-powered websites and integrates AI features into web experiences."
  ],
  [
    "AI App Development",
    "Builds web and mobile applications with AI features."
  ]
] }
];

const categories = [
  { name: "Client Services", groups: ["SEO and Client Delivery", "Customer Support", "Client Acquisition & Sales", "Staff Augmentation"] },
  { name: "Technology", groups: ["Apps and Software Engineering", "AI Products"] },
  { name: "Business Support", groups: ["Operations Support", "Organization Support"] },
];

function tilt(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--pitch", (-20 * ((event.clientY - bounds.top) / bounds.height - .5)) + "deg");
  event.currentTarget.style.setProperty("--yaw", (28 * ((event.clientX - bounds.left) / bounds.width - .5)) + "deg");
}

export default function Organization() {
  const [category, setCategory] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [active, setActive] = useState<Detail>(levels[0]);
  const ActiveIcon = active.icon;
  const visibleGroups = categories[category].groups.flatMap(name => groups.filter(group => group.name === name));

  return (
    <section className={styles.section} aria-labelledby="organization-title">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Organizational structure</p>
          <h2 id="organization-title">How our teams <span>work together</span></h2>
          <p>Every team at Orbilect SEO works together toward one purpose: delivering better outcomes for our clients.</p>
        </header>

        <ol className={styles.levels} aria-label="Leadership hierarchy">
          {levels.map(level => (
            <li key={level.name}>
              <button type="button" aria-pressed={active.name === level.name} onClick={() => setActive(level)}>
                <level.icon size={18} aria-hidden="true" />{level.name}
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.tabs} role="group" aria-label="Department categories">
          {categories.map(({ name }, index) => (
            <button key={name} type="button" aria-pressed={category === index}
              onClick={() => { setCategory(index); setExpanded(null); setActive(levels[0]); }}>
              {name}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          <div className={styles.branches}>
            {visibleGroups.map(({ name, icon: Icon, departments }) => (
              <details key={name} open={expanded === name}>
                <summary onClick={event => {
                  event.preventDefault();
                  const opening = expanded !== name;
                  setExpanded(opening ? name : null);
                  setActive(opening ? {
                    name, icon: Icon, copy: "Select a team or role to see what it does."
                  } : levels[0]);
                }}>
                  <Icon size={20} aria-hidden="true" />
                  <span>{name}<small>{departments.length} teams and roles</small></span>
                </summary>
                <ul>
                  {departments.map(([title, copy, DetailIcon]) => (
                    <li key={title}>
                      <button type="button" aria-pressed={active.name === title}
                        onClick={() => setActive({ name: title, copy, icon: DetailIcon ?? Icon })}>{title}</button>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <aside className={styles.panel} aria-label="Team responsibilities">
            <div className={styles.scene} onPointerMove={tilt} onPointerLeave={event => {
              event.currentTarget.style.removeProperty("--pitch");
              event.currentTarget.style.removeProperty("--yaw");
            }} aria-hidden="true">
              <div className={styles.orbit} />
              <div className={styles.rig}>
                <div className={styles.back} /><div className={styles.middle} />
                <div className={styles.face} key={active.name}><ActiveIcon size={40} strokeWidth={1.6} /></div>
              </div>
            </div>
            <div className={styles.detail} aria-live="polite" aria-atomic="true">
              <h3>{active.name}</h3><p>{active.copy}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
