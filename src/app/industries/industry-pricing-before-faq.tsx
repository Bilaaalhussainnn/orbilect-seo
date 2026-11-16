"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { ServiceInvestment } from "../_components/service-investment";

function matches(pattern: string, url: string) {
  const expected = pattern.split("/");
  const actual = url.split("/");
  return expected.length === actual.length && expected.every((part, i) =>
    part === actual[i] || (part.startsWith("[") && part.endsWith("]") && Boolean(actual[i]))
  );
}

function IndustryPricing({ routes }: { routes: string[] }) {
  const url = usePathname()?.replace(/\/$/, "") ?? "";
  if (!url.startsWith("/industries/") || !routes.some((route) => matches(route, url))) return null;

  const slug = url.split("/").at(-1) ?? "";
  const label = slug === "saas" ? "SaaS" : slug.split("-").map((word) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
  const service = label + " SEO";

  return <ServiceInvestment service={service} eyebrow={service + " Investment"}
    heading="The cost of" headingAccent={service} />;
}

export function IndustryPricingBeforeFaq({ routes }: { routes: string[] }) {
  return <Suspense fallback={null}><IndustryPricing routes={routes} /></Suspense>;
}
