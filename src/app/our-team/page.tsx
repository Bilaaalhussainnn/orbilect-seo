import { businessDescription } from "@/lib/site-identity";
import { pageSeo } from "@/lib/orbilect-search";
import TeamBeliefs from "./team-beliefs";
import FinalCta from "../_home/final-cta";
import EmployeeSpotlight from "./employee-spotlight";
import DepartmentLeaders from "./department-leaders";
import TeamGlobe from "./team-globe";
import LeadershipMessage from "./leadership-message";
import TeamHero from "./team-hero";
import Organization from "./organization";
import type { Metadata } from "next";
import CorporatePage from "../_components/corporate-pages/corporate-page";

const content = {
  "label": "Our Team",
  "title": [
    "Meet the people",
    "behind the work"
  ],
  description: businessDescription,
  "sectionLabel": "People and expertise",
  "sectionTitle": [
    "The teams behind",
    "client delivery"
  ],
  "topics": [
    {
      "title": "Leadership and management",
      "copy": "Leadership sets the agency’s direction. Senior managers and department leads coordinate priorities, resources, and delivery standards."
    },
    {
      "title": "Delivery specialists",
      "copy": "SEO, content, paid media, design, development, and analytics specialists collaborate on the work agreed with each client."
    },
    {
      "title": "Support departments",
      "copy": "Workforce Management, Training and Development, Compliance, and IT help delivery teams stay staffed, prepared, and connected."
    }
  ],
  "action": {
    "label": "Explore careers",
    "href": "/careers"
  }
} as const;

const seoBaseMetadata: Metadata = {
  title: content.label,
  description: "Meet Orbilect SEO’s leadership, delivery specialists and support teams, and see how they work together across search, design and development.",
};

export default function Page() {
  return <CorporatePage route="/our-team" content={content} heroVisual={<TeamHero />}><Organization />
      <LeadershipMessage />
      <DepartmentLeaders />
      <EmployeeSpotlight />
      <TeamGlobe /><TeamBeliefs />
      <FinalCta />
    </CorporatePage>;
}


// Orbilect search metadata
export const metadata = pageSeo("/our-team", seoBaseMetadata as import("next").Metadata);
