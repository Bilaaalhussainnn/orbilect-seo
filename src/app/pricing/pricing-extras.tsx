import { StaffingTeam } from "./staffing-team";
import { InvestmentRanges } from "./investment-ranges";
import PricingGlobe from "@/components/global-locations";
import styles from "./pricing-extras.module.css";

const groups = [
  {
    "name": "Main services",
    "rows": [
      [
        "On-page SEO",
        "$1,200–$2,500",
        "Monthly",
        "First priorities in 2–4 weeks",
        "Keyword-to-page mapping, priority page updates, metadata, internal links, and monthly reporting."
      ],
      [
        "Off-page SEO",
        "$1,200–$3,000",
        "Monthly",
        "Audit in 1–2 weeks, then monthly",
        "Backlink and citation review, listing corrections, link reclamation, and editorial outreach."
      ],
      [
        "Technical SEO",
        "$700–$2,500",
        "One-time",
        "2–5 weeks",
        "Crawl and indexing audit, prioritized fixes, redirect and sitemap review, and implementation checks."
      ],
      [
        "Digital Marketing",
        "$1,500–$4,000",
        "Monthly",
        "Setup in 2–3 weeks, then monthly",
        "Channel plan, campaign management, landing-page recommendations, and qualified enquiry reporting."
      ],
      [
        "Ecommerce SEO",
        "$1,500–$4,000",
        "Monthly",
        "First catalogue priorities in 2–4 weeks",
        "Collection and product optimization, catalogue technical checks, and organic order reporting."
      ],
      [
        "Website Redesign",
        "$1,200–$4,500",
        "One-time",
        "3–8 weeks",
        "Page map, responsive layouts, implementation, enquiry or booking tests, and launch handoff."
      ]
    ]
  },
  {
    "name": "Growth Mix",
    "rows": [
      [
        "Bing Advertising",
        "$450–$1,400",
        "Monthly",
        "Setup in 1–2 weeks",
        "Microsoft Advertising setup, keyword and search-term reviews, tracking, and optimization."
      ],
      [
        "ChatGPT Advertising",
        "$700–$2,000",
        "One-time pilot setup",
        "2–4 weeks after access is confirmed",
        "Eligibility review, offer and creative preparation, campaign setup where available, and pilot review."
      ],
      [
        "Conversion Rate Optimization",
        "$750–$2,500",
        "Monthly",
        "First changes in 2–4 weeks",
        "Funnel review, prioritized changes or experiments, and performance analysis."
      ],
      [
        "Email Marketing",
        "$450–$1,600",
        "Monthly",
        "First sends in 1–3 weeks",
        "Segmentation, email copy, campaign or lifecycle setup, testing, and reporting."
      ],
      [
        "Dedicated SEO Content Writer",
        "$900–$2,400",
        "Monthly",
        "Onboarding in 1–2 weeks",
        "Dedicated writing capacity, briefs, drafts, agreed revisions, and editorial handoff."
      ],
      [
        "Landing Page Optimization",
        "$400–$1,600",
        "One-time",
        "1–3 weeks",
        "Page audit, message and form improvements, mobile checks, and conversion-event verification."
      ],
      [
        "Conversion Tracking and Analytics",
        "$350–$1,400",
        "One-time",
        "1–3 weeks",
        "Measurement plan, event setup, validation, and reporting handoff."
      ],
      [
        "Paid Social Advertising",
        "$650–$2,200",
        "Monthly",
        "Setup in 1–2 weeks",
        "Audience planning, ad variants, campaign management, and lead-quality reporting."
      ],
      [
        "PPC Management",
        "$650–$2,000",
        "Monthly",
        "Setup in 1–2 weeks",
        "Account audit, search campaigns, exclusions, conversion checks, and budget reviews."
      ],
      [
        "SEO Content Writing",
        "$200–$850",
        "One-time per brief",
        "1–2 weeks per brief",
        "Research, outline, draft, editing, and agreed revisions."
      ],
      [
        "Social Media Marketing",
        "$650–$2,000",
        "Monthly",
        "First calendar in 1–2 weeks",
        "Content calendar, platform-specific posts, publishing, and engagement reporting."
      ]
    ]
  }
];
const roles = [
  [
    "SEO strategists",
    "Search priorities, site audits, briefs, and reporting."
  ],
  [
    "Technical SEO specialists",
    "Crawl, indexing, migration, and performance work."
  ],
  [
    "Content writers and editors",
    "Service pages, buying guides, product copy, and editorial review."
  ],
  [
    "Website designers",
    "Responsive layouts, landing pages, and customer journeys."
  ],
  [
    "Website developers",
    "Frontend builds, CMS changes, integrations, and implementation."
  ],
  [
    "PPC specialists",
    "Campaign setup, search terms, ad testing, and budget reviews."
  ],
  [
    "Social media marketers",
    "Channel planning, publishing, and performance reporting."
  ],
  [
    "Analytics specialists",
    "Conversion events, dashboards, and lead-quality reporting."
  ]
];

export function SampleInvestments() {
  return <InvestmentRanges groups={groups} globe={<PricingGlobe />} />;
}

export function StaffingOverview({ standalone = false }: { standalone?: boolean }) {
  return <StaffingTeam roles={roles} standalone={standalone} />;
}
