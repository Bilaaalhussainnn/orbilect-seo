import { pageSeo } from "@/lib/orbilect-search";
import type { Metadata } from "next";
import CorporatePage from "../_components/corporate-pages/corporate-page";

const content = {
  "label": "Corporate Social Responsibility",
  "title": [
    "How we work",
    "with responsibility"
  ],
  "description": "Explore the principles that guide Orbilect SEO’s approach to people, accessibility, and responsible operations.",
  "sectionLabel": "Our responsibilities",
  "sectionTitle": [
    "Where we focus",
    "our efforts"
  ],
  "topics": [
    {
      "title": "Responsible operations",
      "copy": "We consider how our work affects clients and colleagues, including how we handle sensitive information and set expectations about the work."
    },
    {
      "title": "Accessible digital experiences",
      "copy": "We consider readability, navigation, and ease of use when improving digital experiences, so more people can use the websites we work on."
    },
    {
      "title": "Skills and opportunity",
      "copy": "We value fair access to opportunities and practical learning that helps people build confidence in their work."
    }
  ],
  "action": {
    "label": "Learn about Orbilect SEO",
    "href": "/about"
  }
} as const;

const seoBaseMetadata: Metadata = {
  title: content.label,
  description: content.description,
};

export default function Page() {
  return <CorporatePage route="/corporate-social-responsibility" content={content} />;
}


// Orbilect search metadata
export const metadata = pageSeo("/corporate-social-responsibility", seoBaseMetadata as import("next").Metadata);
