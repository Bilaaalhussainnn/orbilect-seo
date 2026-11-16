import { businessDescription, pakistanAddress, internationalWhatsApp } from "./site-identity";
import type { Metadata } from "next";

export const origin = "https://orbilectseo.com";
export function siteUrl(path: string) {
  return new URL(path, origin).href;
}

const brand = "Orbilect SEO";
const logo = origin + "/brand/orbilect-seo-organization.png";
const share = origin + "/brand/orbilect-seo-social.jpg";
const organizationId = origin + "/#organization";
const websiteId = origin + "/#website";

const homeTitle = "Orbilect SEO | SEO & Digital Marketing Services";
const homeDescription = businessDescription;
const entries: Record<string, [title: string, description: string]> = {
  "/": [homeTitle, homeDescription],
  "/about": ["About Orbilect SEO", "Meet the Orbilect Labs team behind Orbilect SEO and see how we plan search, paid marketing, website design and conversion work."],
  "/blogs": ["SEO & Digital Marketing Blog", "Read practical Orbilect SEO guides on search indexing, XML sitemaps, ecommerce SEO, Google Business Profile, website performance, and paid search."],
  "/services": ["SEO & Digital Marketing Services", "Explore technical SEO, on-page SEO, off-page SEO, ecommerce SEO, PPC management, content strategy, and website redesign for your business."],
  "/industries": ["SEO Services by Industry", "Find SEO strategies for ecommerce, healthcare, real estate, SaaS, automotive, hospitality, and other industries. Explore what we prioritize for each market."],
  "/industries/ecommerce": ["SEO for Ecommerce Brands & Online Retailers", "See how Orbilect SEO helps online retailers improve product discovery, organize category pages, and guide shoppers from search to checkout."],
  "/reviews": ["Reviews and Online Reputation | Orbilect SEO", "Share honest feedback about Orbilect SEO services and learn how accurate listings and genuine reviews help businesses earn trust and improve."],
  "/pricing": ["SEO & Digital Marketing Pricing", "Compare Orbilect SEO plans and see how scope, technical work, content, and campaign management affect the investment for your business."],
  "/contact": ["Contact Orbilect SEO", "Talk with Orbilect SEO about search visibility, paid search, or a website redesign. Share your project goals and request a tailored proposal."],
  "/how-free-audit-works": ["How a Free SEO Audit Works", "See what Orbilect SEO checks in a free SEO audit, including crawlability, indexing, priority pages, and opportunities for qualified search traffic."],
  "/how-we-work": ["Our SEO Process", "See how Orbilect SEO scopes the work, prioritizes technical and content changes, measures progress, and reports on qualified traffic and enquiries."],
  "/staffing": ["Offshore SEO & Digital Marketing Staffing", "Build a dedicated team for SEO, content, paid media, or analytics. Explore specialist roles and how Orbilect SEO scopes staffing and onboarding."],
  "/newsroom": ["Orbilect SEO Newsroom", "Read company announcements, product briefings, and updates from Orbilect SEO and Orbilect Labs."],
  "/services/on-page-seo": ["On-Page SEO Services", "Improve page titles, headings, internal links, content, and search intent alignment so customers can find the right page and act on it."],
  "/services/off-page-seo": ["Off-Page SEO Services", "Review backlink quality, reclaim useful links, clean up citations, and plan relevant outreach to strengthen your visibility beyond your own website."],
  "/services/technical-seo": ["Technical SEO Audit & Services", "Identify crawl and indexing barriers, audit redirects and canonicals, and prioritize improvements to site structure, performance, and structured data."],
  "/services/ecommerce-management": ["Ecommerce Management Services", "Build and run your online store with ecommerce website design, SEO, paid ads, catalog and order management, AI chatbots, and customer support."],
  "/services/ecommerce-seo": ["Ecommerce SEO Services", "Make products easier to find with collection and product-page SEO, stronger internal linking, product schema, and a plan for filters and duplicate URLs."],
  "/services/digital-marketing": ["Digital Marketing Services", "Plan digital campaigns around audience, landing pages, conversion tracking, and reporting so your team can see which channels bring qualified enquiries."],
  "/services/website-redesign": ["Website Redesign & SEO Migration", "Redesign your website around clearer navigation, mobile usability, and conversions. Plan redirects and preserve important search landing pages during launch."],
  "/services/ppc-management": ["PPC Management Services", "Improve paid search performance with tighter campaign targeting, relevant ad copy, conversion tracking, and landing pages aligned to what visitors searched."],
  "/services/bing-advertising": ["Microsoft Advertising & Bing Ads Management", "Review Bing Ads structure, Microsoft Advertising targeting, search terms, campaign budgets, and conversion tracking against your paid search goals."],
  "/services/chatgpt-advertising": ["ChatGPT Advertising Services", "Explore campaign planning and readiness for advertising in ChatGPT, including audience, message, landing pages, and how to measure results where available."],
  "/services/seo-content-writing": ["SEO Content Writing Services", "Get search-focused landing pages, service pages, and editorial content planned around customer questions, clear briefs, and relevant internal links."],
  "/services/hire-seo-content-writer": ["Hire a Dedicated SEO Content Writer", "Scope a dedicated SEO writer who can work within your editorial process on briefs, drafts, service pages, and revisions."],
  "/services/digital-pr": ["Digital PR & Outreach Services", "Plan relevant media and editorial outreach around useful research, expertise, or company news, with a clear scope and coverage review."],
  "/services/email-marketing": ["Email Marketing Services", "Plan email campaigns and automations around audience segments, clear messages, landing pages, and measurable customer actions."],
  "/services/social-media-marketing": ["Social Media Marketing Services", "Plan organic social content around the channels customers use, the questions they ask, and the engagement or enquiries you can measure."],
  "/services/paid-social-advertising": ["Paid Social Advertising Services", "Improve paid social campaigns with audience planning, creative testing, landing page alignment, and conversion tracking tied to business goals."],
  "/services/marketing-analytics": ["Marketing Analytics & Attribution Services", "Validate conversion tracking, review attribution, and build reports that connect campaigns to qualified enquiries, leads, and sales."],
  "/services/conversion-rate-optimization": ["Conversion Rate Optimization Services", "Find friction in forms, product pages, and lead journeys. Prioritize conversion tests around customer intent, usability, and measurable outcomes."],
  "/services/landing-page-design": ["Landing Page Design Services", "Create focused landing pages that match ad or search intent, explain your offer clearly, and give visitors a measurable next step."],
};

function unbranded(title: string) {
  return title.replace(/\s*(?:\||[–—-])\s*Orbilect SEO\s*$/i, "");
}

export function pageSeo(route: string, previous: Metadata = {}): Metadata {
  const url = siteUrl(route);
  const entry = entries[route];
  const title = entry?.[0] ?? (typeof previous.title === "string" ? unbranded(previous.title) : previous.title);
  const description = entry?.[1] ?? previous.description;
  const shareTitle = typeof title === "string" ? title : undefined;
  const next = { ...previous };
  delete next.keywords;
  return {
    ...next,
    title: typeof title === "string" && /orbilect seo/i.test(title) ? { absolute: title } : title,
    description,
    alternates: { ...previous.alternates, canonical: previous.alternates?.canonical ?? url },
    openGraph: {
      type: "website",
      siteName: brand,
      locale: "en_US",
      title: shareTitle,
      description,
      url,
      images: [{ url: share, width: 1200, height: 630, alt: brand }],
      ...previous.openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: share, alt: brand }],
      ...previous.twitter,
    } as Metadata["twitter"],
  };
}

export const rootSeo: Metadata = {
  metadataBase: new URL(origin),
  title: { default: homeTitle, template: "%s | Orbilect SEO" },
  description: homeDescription,
};

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": organizationId, name: brand, url: origin + "/",
      logo: { "@type": "ImageObject", url: logo, width: 423, height: 113 },
      description: homeDescription,
      email: "info@orbilectseo.com", telephone: "+1-646-640-0070",
      address: { "@type": "PostalAddress", streetAddress: pakistanAddress.split(", Karachi")[0], addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", url: internationalWhatsApp.href },
      parentOrganization: { "@type": "Organization", name: "Orbilect Labs", url: "https://orbilectlabs.com/" },
      sameAs: [
        "https://www.linkedin.com/company/orbilect-seo",
        "https://www.instagram.com/orbilectseo/",
        "https://www.facebook.com/orbilectseo/",
        "https://x.com/orbilectseo",
        "https://www.youtube.com/@OrbilectSEO",
      ],
    },
    {
      "@type": "WebSite", "@id": websiteId, name: brand, url: origin + "/",
      publisher: { "@id": organizationId }, inLanguage: "en",
    },
  ],
};

type Article = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  author: { name: string };
  category: string;
  cover?: { src: string; alt: string };
};

export function blogPath(slug: string) {
  return "/blogs/" + slug;
}

export function blogSeo(post: Article, description = post.summary): Metadata {
  const route = blogPath(post.slug);
  const image = post.cover ? { url: siteUrl(post.cover.src), alt: post.cover.alt } : undefined;
  return pageSeo(route, {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      ...(image && { images: [image] }),
    },
    ...(image && { twitter: { card: "summary_large_image", images: [image] } }),
  });
}

export function articleSchema(post: Article) {
  const url = siteUrl(blogPath(post.slug));
  return {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": url + "#article",
    url, mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title, description: post.summary, datePublished: post.publishedAt,
    articleSection: post.category,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": organizationId, "@type": "Organization", name: brand, url: origin + "/", logo: { "@type": "ImageObject", url: logo } },
    image: post.cover?.src ? [siteUrl(post.cover.src)] : undefined,
    inLanguage: "en",
  };
}

export function serviceSchema(route: string) {
  const details = entries[route];
  if (!details) return null;
  const url = siteUrl(route);
  return {
    "@context": "https://schema.org", "@type": "Service", "@id": url + "#service",
    url, name: details[0], description: details[1], serviceType: details[0],
    provider: { "@id": organizationId, "@type": "Organization", name: brand, url: origin + "/" },
  };
}
