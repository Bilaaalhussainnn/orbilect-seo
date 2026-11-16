"use client";

import { useState, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, ChevronRight } from "lucide-react";
import styles from "./offshore-sections.module.css";

const teams = [
  [
    "Search and visibility",
    [
      [
        "SEO strategist",
        "Map search demand to the pages and services that matter to your business.",
        "Prioritize fixes and brief the people responsible for implementation.",
        "Deliver an SEO roadmap and a regular progress review."
      ],
      [
        "Technical SEO specialist",
        "Investigate crawling, indexing, redirects, and slow templates.",
        "Test fixes in staging and verify priority URLs after release.",
        "Hand over a prioritized backlog and validation notes."
      ],
      [
        "On-page SEO specialist",
        "Improve titles, headings, internal links, and page structure.",
        "Match priority pages to what customers are looking for.",
        "Record the changes and track the pages affected."
      ],
      [
        "Ecommerce SEO specialist",
        "Review collections, products, filters, and variant URLs.",
        "Coordinate catalogue changes with the merchandising team.",
        "Report on priority pages and tracked organic orders."
      ],
      [
        "Local SEO specialist",
        "Check eligible Business Profiles and local business listings.",
        "Correct hours, categories, service details, and destination links.",
        "Maintain a location checklist and report available interactions."
      ],
      [
        "Digital PR specialist",
        "Research relevant publications and develop pitches around useful stories.",
        "Coordinate outreach and follow-up with approved contacts.",
        "Track replies, earned coverage, and relevant referrals."
      ]
    ]
  ],
  [
    "Content and social",
    [
      [
        "SEO content writer",
        "Write service pages, buying guides, or articles from an approved brief.",
        "Verify claims and incorporate subject-matter feedback.",
        "Deliver edited drafts with recommended internal links."
      ],
      [
        "Content editor",
        "Review copy for accuracy, clarity, consistency, and brand voice.",
        "Resolve editorial comments and check changes before publishing.",
        "Hand over a clean draft and an approval record."
      ],
      [
        "Content strategist",
        "Turn customer questions and business priorities into an editorial plan.",
        "Map each topic to an audience, format, and publishing goal.",
        "Maintain the calendar and refine it using performance data."
      ],
      [
        "Conversion copywriter",
        "Write landing-page copy, offers, and calls to action.",
        "Create variants that test a specific message or objection.",
        "Provide approved copy and document what each variant tests."
      ],
      [
        "Social media marketer",
        "Plan platform-specific posts and coordinate publishing.",
        "Track useful conversations and escalate questions to your team.",
        "Report engagement, referrals, and leads where measurable."
      ],
      [
        "Email marketing specialist",
        "Build campaigns and lifecycle messages for opted-in audiences.",
        "Test segments, links, templates, and unsubscribe flows.",
        "Report clicks, responses, orders, and delivery issues."
      ]
    ]
  ],
  [
    "Paid media and growth",
    [
      [
        "PPC specialist",
        "Manage Google Ads or Microsoft Advertising within the approved budget.",
        "Review search terms, exclusions, bids, and landing-page alignment.",
        "Report spend, conversions, and qualified lead costs."
      ],
      [
        "Paid social specialist",
        "Build campaigns around approved audiences, offers, and creative.",
        "Test variations and review lead quality before scaling.",
        "Document performance and the next creative priorities."
      ],
      [
        "Shopping feed specialist",
        "Review product identifiers, stock, prices, and feed errors.",
        "Coordinate fixes with catalogue and advertising teams.",
        "Report product eligibility and unresolved feed issues."
      ],
      [
        "Conversion optimization specialist",
        "Find friction in landing pages, forms, and checkout.",
        "Propose measurable changes and test them when data supports it.",
        "Document outcomes and recommend the next experiment."
      ],
      [
        "Marketing operations specialist",
        "Coordinate campaign briefs, approvals, launch tasks, and handoffs.",
        "Keep naming conventions and campaign documentation consistent.",
        "Maintain the delivery calendar and flag blockers early."
      ],
      [
        "CRM and lead operations specialist",
        "Set up lead routing, status fields, and follow-up workflows.",
        "Check whether enquiries reach the right owner and are tracked.",
        "Document the workflow and report gaps to your team."
      ]
    ]
  ],
  [
    "Design and development",
    [
      [
        "UI/UX designer",
        "Map user journeys and design clearer interfaces for priority pages.",
        "Prototype mobile and desktop layouts for review.",
        "Hand over annotated designs and component specifications."
      ],
      [
        "Web designer",
        "Design page layouts, landing pages, and website visuals.",
        "Apply your brand and check the layouts across screen sizes.",
        "Deliver approved designs with assets and handoff notes."
      ],
      [
        "Frontend developer",
        "Build responsive pages and reusable interface components.",
        "Test interactions, forms, and accessibility across devices.",
        "Deliver reviewed changes and implementation documentation."
      ],
      [
        "WordPress developer",
        "Build or maintain approved themes, templates, and integrations.",
        "Test updates in staging and check critical site flows.",
        "Hand over tested changes and editing instructions."
      ],
      [
        "Shopify developer",
        "Build storefront sections and improve catalogue templates.",
        "Verify product options, cart behavior, and app integrations.",
        "Deliver tested theme changes and release notes."
      ],
      [
        "Website QA specialist",
        "Test priority pages, forms, bookings, and checkout across devices.",
        "Reproduce issues and verify fixes before publication.",
        "Maintain a test log with evidence and open items."
      ]
    ]
  ],
  [
    "Data and delivery",
    [
      [
        "Web analytics specialist",
        "Define events and verify the data needed for reporting.",
        "Check forms, calls, or purchases against the agreed measurement plan.",
        "Hand over tested events and known reporting gaps."
      ],
      [
        "Marketing data analyst",
        "Combine approved campaign, site, and CRM data for analysis.",
        "Investigate changes in performance and lead quality.",
        "Share reports that explain what changed and what to check next."
      ],
      [
        "Dashboard developer",
        "Build reporting views around agreed business measures.",
        "Validate data connections and permissions before sharing.",
        "Document the metrics and provide a dashboard handoff."
      ],
      [
        "SEO research assistant",
        "Collect approved keyword, competitor, and site research.",
        "Organize findings and flag entries that need verification.",
        "Deliver source-linked research for the strategist to review."
      ],
      [
        "Digital project coordinator",
        "Maintain milestones, approvals, and delivery records.",
        "Follow up on dependencies and flag changes to scope or timing.",
        "Send clear status updates and handoff summaries."
      ],
      [
        "Catalogue operations specialist",
        "Maintain approved product records, images, and category assignments.",
        "Check batches for missing fields and inconsistent details.",
        "Log updates and escalate catalogue issues for review."
      ]
    ]
  ],
  [
    "Customer support",
    [
      ["Ecommerce customer support agent", "Help shoppers before, during, and after a purchase.", "Work through product, order, and return queries using your approved policies.", "Document ticket outcomes and escalate exceptions."],
      ["Live chat agent", "Handle real-time product and checkout questions.", "Prioritize concurrent chats and route complex issues.", "Leave clear chat notes and follow-ups."],
      ["Email support agent", "Manage order and customer enquiries from a shared inbox.", "Apply approved policies and templates with a personal response.", "Track each ticket through resolution."],
      ["Phone support agent", "Answer calls about your products and orders.", "Verify callers when required and use your escalation process.", "Log each call and record the next step."],
      ["Multichannel customer support agent", "Work across chat, email, and phone.", "Shift between queues as agreed with your team.", "Keep an accurate shared support history."],
      ["Multilingual customer support agent", "Support customers in the agreed languages.", "Follow language-specific terminology, scripts, and routing rules.", "Report recurring questions by market and language."]
    ]
  ]
] as const;

export function OffshoreRoles() {
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState(0);
  const [, roles] = teams[category];
  const [role, responsibilities, workflow, handoff] = roles[selected];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    stage.style.setProperty("--rx", ((0.5 - (event.clientY - rect.top) / rect.height) * 13) + "deg");
    stage.style.setProperty("--ry", (((event.clientX - rect.left) / rect.width - 0.5) * 17) + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section id="offshore-roles" className={styles.dark} aria-labelledby="offshore-roles-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Offshore specialist roles</p>
          <h2 id="offshore-roles-title">Find the specialist <span>your team needs</span></h2>
          <p>Explore 30 roles you can fill through Orbilect SEO. We source and screen talent against your brief, then quote for the skills, hours, and coverage you need. Choose a role to see the work that person could own.</p>
        </header>
        <div className={styles.tabs} role="group" aria-label="Choose a team">
          {teams.map(([name], index) => (
            <button key={name} type="button" aria-pressed={index === category}
              onClick={() => { setCategory(index); setSelected(0); }}>{name}</button>
          ))}
        </div>
        <div className={styles.explorer}>
          <div className={styles.roles} role="group" aria-label="Choose a specialist">
            {roles.map(([name], index) => (
              <button key={name} type="button" aria-pressed={index === selected}
                aria-controls="offshore-role-preview" onClick={() => setSelected(index)}>
                {name}<ChevronRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="offshore-role-preview" className={styles.stage} onPointerMove={tilt}
            onPointerLeave={reset} onPointerCancel={reset}>
            <div className={styles.stack}>
              <div className={styles.sheet} aria-live="polite" aria-atomic="true">
                <div key={role} className={styles.reveal}>
                  <BriefcaseBusiness size={24} aria-hidden="true" />
                  <h3>{role}</h3>
                  <ul><li>{responsibilities}</li><li>{workflow}</li><li>{handoff}</li></ul>
                </div>
                <Link className={styles.cta}
                  href={"/contact?request=" + encodeURIComponent(role + " staffing enquiry") + "#request-proposal"} data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />
                  Discuss this role 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
