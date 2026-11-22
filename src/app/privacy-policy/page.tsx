import { pageSeo } from "@/lib/orbilect-search";
import type { Metadata } from "next";
import LegalPage from "../_legal/legal-page";

const seoBaseMetadata: Metadata = {
  "title": "Privacy Policy",
  "description": "How Orbilect SEO handles enquiries, cookies, newsletter subscriptions, and privacy requests."
};

export default function Page() {
  return <LegalPage kind="privacy" />;
}


// Orbilect search metadata
export const metadata = pageSeo("/privacy-policy", seoBaseMetadata as import("next").Metadata);
