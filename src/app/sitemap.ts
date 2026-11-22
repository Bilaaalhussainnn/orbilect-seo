import industries from "./_home/industry-growth/industries.json";
import type { MetadataRoute } from "next";
import { blogPath, siteUrl } from "@/lib/orbilect-search";
import { seoGuideSlug } from "./blogs/blog-data";
import { getPublishedGuides } from "./blogs/published-guides";

const publicPages = [
  "/",
  "/about",
  "/blogs",
  blogPath(seoGuideSlug),
  "/careers",
  "/contact",
  "/corporate-social-responsibility",
  "/how-free-audit-works",
  "/how-we-work",
  "/industries",
  "/industries/arts-entertainment",
  "/industries/automotive",
  "/industries/ecommerce",
  "/industries/education",
  "/industries/finance",
  "/industries/food-beverages",
  "/industries/healthcare",
  "/industries/hospitality",
  "/industries/logistics",
  "/industries/manufacturing",
  "/industries/real-estate",
  "/industries/saas",
  "/media-pr-relations",
  "/newsroom",
  "/newsroom/erp-platform",
  "/newsroom/large-language-model",
  "/newsroom/naila-ai",
  "/newsroom/orbilect-create",
  "/newsroom/orbilect-reviews",
  "/our-team",
  "/pricing",
  "/privacy-policy",
  "/reviews",
  "/services",
  "/services/bing-advertising",
  "/services/chatgpt-advertising",
  "/services/conversion-rate-optimization",
  "/services/digital-marketing",
  "/services/digital-pr",
  "/services/ecommerce-management",
  "/services/ecommerce-seo",
  "/services/email-marketing",
  "/services/hire-seo-content-writer",
  "/services/landing-page-design",
  "/services/marketing-analytics",
  "/services/off-page-seo",
  "/services/on-page-seo",
  "/services/paid-social-advertising",
  "/services/ppc-management",
  "/services/seo-content-writing",
  "/services/social-media-marketing",
  "/services/technical-seo",
  "/services/website-redesign",
  "/website-design-gallery",
  "/staffing",
  "/terms-and-conditions"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Set(["/", "/industries", "/website-design-gallery", "/services/website-redesign", ...industries.map(item => "/industries/" + item.slug)]);
  return [
    ...publicPages.map(route => ({ url: siteUrl(route), ...(updated.has(route) ? { lastModified: "2026-11-22" } : {}) })),
    ...getPublishedGuides().map(({ post }) => ({ url: siteUrl(blogPath(post.slug)), lastModified: "2026-11-22" })),
  ];
}
