import { staffingLocations } from "@/lib/site-identity";
import { pageSeo } from "@/lib/orbilect-search";
import { StaffingFaq } from "./staffing-faq";
import { CustomerSupportOffshoring } from "./customer-support-offshoring";
import StaffingFinalCta from "../_home/final-cta";
import { OffshoreSections } from "./offshore-sections";
import { ServiceHero, type ServiceScene } from "../services/_components/service-story";
import { StaffingComparison } from "./staffing-comparison";
import type { Metadata } from "next";
import { StaffingOverview } from "../pricing/pricing-extras";

const seoBaseMetadata: Metadata = {
  title: "Dedicated Marketing Teams | Orbilect SEO",
  description: "Hire dedicated SEO specialists, website designers and developers, paid media specialists, and social media marketers.",
};

const staffingScenes: ServiceScene[] = [
  {
    "id": "search",
    "label": "Choose a role",
    "address": "Team requirements",
    "title": "Find the skills your team needs",
    "copy": "Start with the work you need covered, from SEO and paid media to design, development, and content.",
    "items": [
      "Role",
      "Skills",
      "Working hours"
    ]
  },
  {
    "id": "page",
    "label": "Set up the handoff",
    "address": "Onboarding plan",
    "title": "Give your specialist a clear first week",
    "copy": "Agree on tool access, who approves work, and the first deliverable. Share your brand and customer context up front.",
    "items": [
      "Access",
      "Brief",
      "First milestone"
    ]
  },
  {
    "id": "links",
    "label": "Work together",
    "address": "Delivery and reviews",
    "title": "Keep the work moving with regular reviews",
    "copy": "Set a rhythm for updates, feedback, and handoff so you can see what’s complete and what needs a decision.",
    "items": [
      "Deliverables",
      "Feedback",
      "Next priorities"
    ]
  }
];

export default function StaffingPage() {
  return (
    <main>
      
      <ServiceHero
        eyebrow="Staffing and offshoring"
        title="Build your team"
        accent="with dedicated offshore talent"
        intro={"Add experienced SEO specialists, marketers, writers, designers, developers, or ecommerce customer support agents. " + staffingLocations}
        scenes={staffingScenes}
        ctaLabel="Compare hiring and offshoring"
      />
      <StaffingComparison />
      <StaffingOverview standalone />
    <OffshoreSections />
    <CustomerSupportOffshoring />
    <StaffingFaq />
    <StaffingFinalCta />
      </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/staffing", seoBaseMetadata as import("next").Metadata);
