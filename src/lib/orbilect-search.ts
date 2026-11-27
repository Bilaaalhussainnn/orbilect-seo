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
const homeDescription = "Orbilect SEO, a product of Orbilect Labs, helps businesses grow with SEO, PPC, content, ecommerce services and website design. Request a free SEO audit.";
const entries: Record<string, [title: string, description: string]> = {
  "/": [homeTitle, homeDescription],
  "/privacy-policy": ["Privacy Policy", "How Orbilect SEO handles enquiries, cookies, newsletter subscriptions, and privacy requests."],
  "/terms-and-conditions": ["Terms and Conditions", "Orbilect SEO service terms, project scope, revisions, refunds, delivery, and SEO estimates."],
  "/careers": ["Careers", "Get to know the teams at Orbilect SEO, check for current job openings, and learn what we look for in applicants."],
  "/our-team": ["Our team", "Meet Orbilect SEO’s leadership, delivery specialists and support teams, and see how they work together across search, design and development."],
  "/corporate-social-responsibility": ["Corporate Social Responsibility", "Explore the principles that guide Orbilect SEO’s approach to people, accessibility, and responsible operations."],
  "/media-pr-relations": ["Media & PR Relations", "Contact Orbilect SEO for press enquiries, interviews, expert commentary, and brand asset requests."],
  "/about": ["About Orbilect SEO", "Meet the Orbilect Labs team behind Orbilect SEO and see how we plan search, paid marketing, website design and conversion work."],
  "/blogs": ["SEO & Digital Marketing Blog", "Read practical Orbilect SEO guides on search indexing, XML sitemaps, ecommerce SEO, Google Business Profile, website performance, and paid search."],
  "/services": ["SEO & Digital Marketing Services", "Explore technical SEO, on-page SEO, off-page SEO, ecommerce SEO, PPC management, content strategy, and website redesign for your business."],
  "/website-design-gallery": ["Website Design Gallery & Landing Page Inspiration", "Explore responsive website and landing page designs across twelve industries. Discover a visual direction for your custom website redesign with Orbilect SEO."],
  "/industries": ["SEO Services by Industry", "Explore SEO for twelve industries: arts and entertainment, automotive, ecommerce, education, finance, food and beverages, healthcare, hospitality, logistics, manufacturing, real estate, and SaaS."],
  "/industries/arts-entertainment": ["Arts & Entertainment SEO & Website Design", "Help audiences discover your events, performers, and creative work with search-focused content, mobile-friendly design, and clearer ticket and enquiry journeys."],
  "/industries/food-beverages": ["Food & Beverage SEO & Website Design", "Help customers find your restaurant, cafe, or food brand with menu discovery, local SEO, mobile-friendly design, and clear ordering and reservation journeys."],
  "/industries/saas": ["SaaS SEO & Website Design Services", "Explain your software, reach relevant buyers, and improve the path to trials and demos with SaaS SEO, useful product content, and responsive website design."],
  "/industries/automotive": ["Automotive SEO & Website Design Services", "Help vehicle shoppers find the right inventory, dealership, or service centre when they’re ready to compare options."],
  "/industries/education": ["Education SEO & Website Design Services", "Help prospective students find and compare courses, qualifications, and admissions requirements."],
  "/industries/finance": ["Finance SEO & Website Design Services", "Make financial services easier to discover with clear product pages, transparent information, and content reviewed by your specialists."],
  "/industries/healthcare": ["Healthcare SEO & Website Design Services", "Help patients find your practice, understand the services available, and take the next step toward an appointment."],
  "/industries/hospitality": ["Hospitality SEO & Website Design Services", "Help guests discover your property while comparing destinations, room types, amenities, and places to stay."],
  "/industries/logistics": ["Logistics SEO & Website Design Services", "Reach shippers and procurement teams searching for freight, fulfilment, and warehousing services."],
  "/industries/manufacturing": ["Manufacturing SEO & Website Design Services", "Help engineers and procurement teams find your capabilities, technical specifications, and products."],
  "/industries/real-estate": ["Real Estate SEO & Website Design Services", "Connect buyers and tenants with relevant properties, neighbourhood guides, and local agents through organic search."],
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

export function brandedTitle(title: string) {
  return /orbilect seo/i.test(title) ? title : title + " | " + brand;
}

export function pageSeo(route: string, previous: Metadata = {}): Metadata {
  const url = siteUrl(route);
  const entry = entries[route];
  const title = entry?.[0] ?? (typeof previous.title === "string" ? unbranded(previous.title) : previous.title);
  const description = entry?.[1] ?? previous.description;
  const shareTitle = typeof title === "string" ? brandedTitle(title) : undefined;
  const next = { ...previous };
  delete next.keywords;
  return {
    ...next,
    title: shareTitle ? { absolute: shareTitle } : title,
    description,
    alternates: { ...previous.alternates, canonical: url },
    openGraph: {
      type: "website",
      siteName: brand,
      locale: "en_US",
      images: [{ url: share, width: 1200, height: 630, alt: brand }],
      ...previous.openGraph,
      title: shareTitle,
      description,
      url,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      images: [{ url: share, alt: brand }],
      ...previous.twitter,
      title: shareTitle,
      description,
    } as Metadata["twitter"],
  };
}

export const rootSeo: Metadata = {
  other: { "p:domain_verify": "8f47ab891c7e7cbb82e98425d42ab607" },
  metadataBase: new URL(origin),
  title: { default: homeTitle, template: "%s | Orbilect SEO" },
  description: homeDescription,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": organizationId, name: brand, url: origin + "/",
      logo: { "@type": "ImageObject", url: logo, width: 423, height: 113 },
      description: businessDescription,
      email: "info@orbilectseo.com", telephone: "+1-646-640-0070",
      address: { "@type": "PostalAddress", streetAddress: pakistanAddress.split(", Karachi")[0], addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: "+1-646-640-0070", email: "info@orbilectseo.com", availableLanguage: ["en"], url: internationalWhatsApp.href },
      parentOrganization: { "@type": "Organization", name: "Orbilect Labs", url: "https://orbilectlabs.com/" },
      sameAs: [
        "https://www.linkedin.com/company/orbilect-seo",
        "https://www.instagram.com/orbilectseo/",
        "https://www.facebook.com/orbilectseo/",
        "https://x.com/orbilectseo",
        "https://www.youtube.com/@OrbilectSEO",
        "https://www.pinterest.com/orbilectseo/",
      ],
    },
    {
      "@type": "WebSite", "@id": websiteId, name: brand, alternateName: "OrbilectSEO", url: origin + "/",
      publisher: { "@id": organizationId }, inLanguage: "en",
    },
    { "@type": "WebPage", "@id": origin + "/#webpage", url: origin + "/", name: homeTitle, description: homeDescription, isPartOf: { "@id": websiteId }, about: { "@id": organizationId }, inLanguage: "en" },
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

export function articleSchema(post: Article, description = post.summary) {
  const url = siteUrl(blogPath(post.slug));
  return {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": url + "#article",
    url, mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title, description, datePublished: post.publishedAt,
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
    url, name: brandedTitle(details[0]), description: details[1], serviceType: details[0],
    provider: { "@id": organizationId, "@type": "Organization", name: brand, url: origin + "/" },
  };
}

// These paths reflect existing public navigation, not invented search features.
const navigationNames: Record<string, string> = {
  "/": "Home", "/about": "About us", "/contact": "Contact us", "/services": "Services",
  "/industries": "Industries", "/blogs": "Blogs", "/careers": "Careers", "/our-team": "Our team",
  "/newsroom": "Newsroom", "/pricing": "Pricing", "/reviews": "Reviews", "/staffing": "Offshore staffing",
  "/privacy-policy": "Privacy policy", "/terms-and-conditions": "Terms and conditions",
  "/website-design-gallery": "Website Design Gallery",
};
const labelFor = (route: string) => navigationNames[route] ?? entries[route]?.[0] ?? route.split("/").at(-1)!.replace(/-/g, " ").replace(/^./, value => value.toUpperCase());
export function breadcrumbSchema(route: string, title?: string) {
  if (route === "/") return null;
  const segments = route.split("/").filter(Boolean);
  const routes = ["/", ...segments.map((_, index) => "/" + segments.slice(0, index + 1).join("/"))];
  return { "@type": "BreadcrumbList", "@id": siteUrl(route) + "#breadcrumb", itemListElement: routes.map((path, index) => ({
    "@type": "ListItem", position: index + 1, name: index === routes.length - 1 && title ? title : labelFor(path), item: siteUrl(path),
  })) };
}
export function pageSchema(route: string, details: { name?: string; description?: string } = {}) {
  const type = route === "/about" ? "AboutPage" : route === "/contact" ? "ContactPage" : ["/services", "/industries", "/blogs", "/newsroom"].includes(route) ? "CollectionPage" : "WebPage";
  return { "@context": "https://schema.org", "@graph": [
    ...(route === "/about" ? [homeSchema["@graph"][0]] : []),
    { "@type": type, "@id": siteUrl(route) + "#webpage", url: siteUrl(route), name: brandedTitle(entries[route]?.[0] ?? details.name ?? labelFor(route)),
      ...((entries[route]?.[1] ?? details.description) ? { description: entries[route]?.[1] ?? details.description } : {}), isPartOf: { "@id": websiteId }, about: { "@id": organizationId }, inLanguage: "en" },
  ] };
}
/** Emit a self-contained graph; keep one stable identity for each real entity. */
export function withBreadcrumbs(data: object): object {
  const root = data as Record<string, unknown>;
  const pageTypes = ["WebPage", "AboutPage", "ContactPage", "CollectionPage"];
  const contentTypes = [...pageTypes, "Service", "BlogPosting", "Article"];
  const nodes = ((Array.isArray(root["@graph"]) ? root["@graph"] : [root]) as Record<string, unknown>[]).map(item => {
    if (typeof item.url !== "string") return item;
    const url = new URL(item.url, origin);
    const details = url.origin === origin ? entries[url.pathname] : undefined;
    if (!details || ![...pageTypes, "Service"].includes(String(item["@type"]))) return item;
    return { ...item, name: brandedTitle(details[0]), description: details[1] };
  });
  const node = nodes.find(item => typeof item.url === "string" && contentTypes.includes(String(item["@type"])));
  if (!node || typeof node.url !== "string") return data;
  const url = new URL(node.url, origin);
  if (url.origin !== origin) return data;

  // Service and article pages also describe the actual page, not just its subject.
  let page = nodes.find(item => pageTypes.includes(String(item["@type"])));
  if (!page) {
    page = {
      "@type": "WebPage", "@id": siteUrl(url.pathname) + "#webpage", url: siteUrl(url.pathname),
      name: brandedTitle(String(node.headline ?? node.name ?? labelFor(url.pathname))),
      description: node.description, isPartOf: { "@id": websiteId }, inLanguage: "en",
      ...(node["@id"] ? { mainEntity: { "@id": node["@id"] } } : {}),
    };
    nodes.push(page);
  }
  if (!nodes.some(item => item["@id"] === organizationId)) nodes.unshift(homeSchema["@graph"][0]);
  if (!nodes.some(item => item["@id"] === websiteId)) nodes.unshift(homeSchema["@graph"][1]);
  const breadcrumb = breadcrumbSchema(url.pathname, String(node.name ?? node.headline ?? labelFor(url.pathname)));
  if (breadcrumb) {
    if (!nodes.some(item => item["@type"] === "BreadcrumbList")) nodes.push(breadcrumb);
    page.breadcrumb = { "@id": breadcrumb["@id"] };
  }
  // Do not discard normalization when the incoming graph already has breadcrumbs.
  return {
    "@context": root["@context"] ?? "https://schema.org",
    "@graph": nodes.map(item => {
      const copy = { ...item };
      delete copy["@context"];
      return copy;
    }),
  };
}
