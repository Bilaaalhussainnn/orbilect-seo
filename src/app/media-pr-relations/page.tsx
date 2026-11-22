import { pageSeo } from "@/lib/orbilect-search";
import MediaEditorialSections from "./pr-followup";
import type { Metadata } from "next";
import CorporatePage from "../_components/corporate-pages/corporate-page";

const content = {
  "label": "Media & PR Relations",
  "title": [
    "Talk to Orbilect SEO",
    "about your story"
  ],
  "description": "Contact Orbilect SEO for press enquiries, interviews, expert commentary, and brand asset requests.",
  "sectionLabel": "Press and media enquiries",
  "sectionTitle": [
    "How we can help",
    "with your coverage"
  ],
  "topics": [
    {
      "title": "Press enquiries",
      "copy": "Send us your publication, the topic you’re covering, and your deadline so we can direct your enquiry to the right person."
    },
    {
      "title": "Interviews and commentary",
      "copy": "Tell us what you’d like to discuss and the format you have in mind. We’ll see who on our team can speak to the subject."
    },
    {
      "title": "Brand assets",
      "copy": "Request an approved logo, company description, or other brand material for your coverage. Include where and how you plan to use it."
    }
  ],
  "action": {"label": "Email Media & PR", "href": "mailto:mediapr@orbilectseo.com"}
} as const;

const seoBaseMetadata: Metadata = {
  title: content.label,
  description: content.description,
};

export default function Page() {
  return <><CorporatePage route="/media-pr-relations" content={content} /><MediaEditorialSections /></>;
}


// Orbilect search metadata
export const metadata = pageSeo("/media-pr-relations", seoBaseMetadata as import("next").Metadata);
