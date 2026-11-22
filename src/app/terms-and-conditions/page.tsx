import { pageSeo } from "@/lib/orbilect-search";
import type { Metadata } from "next";
import LegalPage from "../_legal/legal-page";

const seoBaseMetadata: Metadata = {
  "title": "Terms and Conditions",
  "description": "Orbilect SEO service terms, project scope, revisions, refunds, delivery, and SEO estimates."
};

export default function Page() {
  return <LegalPage kind="terms" />;
}


// Orbilect search metadata
export const metadata = pageSeo("/terms-and-conditions", seoBaseMetadata as import("next").Metadata);
