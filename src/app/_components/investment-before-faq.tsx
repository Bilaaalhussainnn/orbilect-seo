"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { ServiceInvestment } from "./service-investment";

const specificNames: Record<string, string> = {
  ppc: "PPC Management", "ppc-management": "PPC Management",
  "on-page-seo": "On-page SEO", "off-page-seo": "Off-page SEO",
  "ecommerce-seo": "Ecommerce SEO", ecommerce: "Ecommerce",
  "website-redesign": "Website Redesign", saas: "SaaS",
  "chatgpt-advertising": "ChatGPT Advertising",
  "hire-an-seo-content-writer": "Hire an SEO Content Writer",
};

const acronyms: Record<string, string> = { seo: "SEO", ppc: "PPC", smm: "SMM", cro: "CRO", pr: "PR", ai: "AI", b2b: "B2B" };

function matchesRoute(pattern: string, pathname: string) {
  if (pattern === pathname) return true;
  const expected = pattern.split("/");
  const actual = pathname.split("/");
  return expected.length === actual.length && expected.every((part, index) =>
    part === actual[index] || (part.startsWith("[") && part.endsWith("]") && Boolean(actual[index]))
  );
}

function Placement({ routes }: { routes: string[] }) {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  if (pathname.startsWith("/industries/")) return null;
  if (!routes.some((route) => matchesRoute(route, pathname))) return null;

  switch (pathname) {
    case "/": return <ServiceInvestment eyebrow="Orbilect SEO Investment" heading="Orbilect SEO" />;
    case "/contact": return <ServiceInvestment eyebrow="Discuss your investment" heading="Orbilect SEO" />;
    case "/about": return <ServiceInvestment eyebrow="How we quote our work" heading="Orbilect SEO" />;
    case "/services": return <ServiceInvestment eyebrow="Service Investment" heading="SEO and Digital Marketing" />;
    case "/industries": return <ServiceInvestment eyebrow="Industry Investment" heading="Industry SEO" />;
  }

  const slug = pathname.split("/").at(-1) ?? "";
  const label = specificNames[slug] ?? slug.split("-").map((word) =>
    acronyms[word] ?? word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
  if (pathname.startsWith("/industries/")) {
    const service = label + " SEO";
    return <ServiceInvestment service={service} eyebrow={service + " Investment"}
      heading="The cost of" headingAccent={service} />;
  }
  const service = label;
  return <ServiceInvestment service={service}
    eyebrow={label === "PPC Management" ? "PPC Investment" : service + " Investment"}
    heading={service} />;
}

export function InvestmentBeforeFaq({ routes }: { routes: string[] }) {
  return <Suspense fallback={null}><Placement routes={routes} /></Suspense>;
}
