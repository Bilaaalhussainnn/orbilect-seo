import articleSeries from "./article-series.json";

export const authors = [
  { name: "Oliver Bennett", role: "Technical Content Writer" },
  { name: "Hamza Malik", role: "SEO Content Writer" },
  { name: "Hira Qureshi", role: "Editorial Content Writer" },
  { name: "Charlotte Hayes", role: "Content Writer, AI and Automation" },
  { name: "Mahnoor Sheikh", role: "Content Writer, Business and Technology" },
] as const;

export const categories = [
  "SEO & Search", "Website Tutorials", "Paid Media & CRO",
  "Industry & Business", "AI & Automation", "Tech News & Digital Marketing",
] as const;

type Category = (typeof categories)[number];
export type Topic = {
  slug: string;
  title: string;
  summary: string;
  cover?: BlogImage;
  category: Category;
  author: (typeof authors)[number];
};
export type BlogImage = { src: string; alt: string };
export type ArticleImage = BlogImage & { caption?: string; afterSectionId: string };
export type PublishedPost = Topic & { publishedAt: string; inlineImages?: ArticleImage[] };

// Use the topic slug as the key and a URL under /blogs/ for files in public/blogs/.
const covers: Partial<Record<string, BlogImage>> = {
  // Generated blog cover paths
  "what-is-search-engine-optimization": {
    "src": "/blogs/what-is-search-engine-optimization.webp",
    "alt": "What is search engine optimization — Orbilect SEO illustrated guide cover"
  },
  "how-to-submit-your-website-to-google-search-console": {
    "src": "/blogs/how-to-submit-your-website-to-google-search-console.webp",
    "alt": "How to submit your website to google search console — Orbilect SEO illustrated guide cover"
  },
  "how-to-set-up-your-google-business-profile": {
    "src": "/blogs/how-to-set-up-your-google-business-profile.webp",
    "alt": "How to set up your google business profile — Orbilect SEO illustrated guide cover"
  },
  "how-to-create-and-submit-an-xml-sitemap": {
    "src": "/blogs/how-to-create-and-submit-an-xml-sitemap.webp",
    "alt": "How to create and submit an xml sitemap — Orbilect SEO illustrated guide cover"
  },
  "how-long-does-google-take-to-index-a-website": {
    "src": "/blogs/how-long-does-google-take-to-index-a-website.webp",
    "alt": "How long does google take to index a website — Orbilect SEO illustrated guide cover"
  },
  "seo-vs-aeo-vs-geo": {
    "src": "/blogs/seo-vs-aeo-vs-geo.webp",
    "alt": "Seo vs aeo vs geo — Orbilect SEO illustrated guide cover"
  },
  "the-on-page-seo-checklist-for-business-websites": {
    "src": "/blogs/the-on-page-seo-checklist-for-business-websites.webp",
    "alt": "The on page seo checklist for business websites — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-wordpress-website": {
    "src": "/blogs/how-to-build-a-wordpress-website.webp",
    "alt": "How to build a wordpress website — Orbilect SEO illustrated guide cover"
  },
  "10-web-hosting-platforms-compared": {
    "src": "/blogs/10-web-hosting-platforms-compared.webp",
    "alt": "10 web hosting platforms compared — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-squarespace-website": {
    "src": "/blogs/how-to-build-a-squarespace-website.webp",
    "alt": "How to build a squarespace website — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-webflow-website": {
    "src": "/blogs/how-to-build-a-webflow-website.webp",
    "alt": "How to build a webflow website — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-wix-website": {
    "src": "/blogs/how-to-build-a-wix-website.webp",
    "alt": "How to build a wix website — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-framer-website": {
    "src": "/blogs/how-to-build-a-framer-website.webp",
    "alt": "How to build a framer website — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-shopify-store": {
    "src": "/blogs/how-to-build-a-shopify-store.webp",
    "alt": "How to build a shopify store — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-woocommerce-store": {
    "src": "/blogs/how-to-build-a-woocommerce-store.webp",
    "alt": "How to build a woocommerce store — Orbilect SEO illustrated guide cover"
  },
  "how-to-improve-your-website-conversion-rate": {
    "src": "/blogs/how-to-improve-your-website-conversion-rate.webp",
    "alt": "How to improve your website conversion rate — Orbilect SEO illustrated guide cover"
  },
  "ppc-vs-organic-search": {
    "src": "/blogs/ppc-vs-organic-search.webp",
    "alt": "Ppc vs organic search — Orbilect SEO illustrated guide cover"
  },
  "how-to-tell-whether-ppc-is-profitable": {
    "src": "/blogs/how-to-tell-whether-ppc-is-profitable.webp",
    "alt": "How to tell whether ppc is profitable — Orbilect SEO illustrated guide cover"
  },
  "meta-ads-in-2026": {
    "src": "/blogs/meta-ads-in-2026.webp",
    "alt": "Meta ads in 2026 — Orbilect SEO illustrated guide cover"
  },
  "how-to-write-a-landing-page-that-converts": {
    "src": "/blogs/how-to-write-a-landing-page-that-converts.webp",
    "alt": "How to write a landing page that converts — Orbilect SEO illustrated guide cover"
  },
  "how-to-track-leads-and-sales-in-ga4": {
    "src": "/blogs/how-to-track-leads-and-sales-in-ga4.webp",
    "alt": "How to track leads and sales in ga4 — Orbilect SEO illustrated guide cover"
  },
  "how-to-audit-a-google-ads-account": {
    "src": "/blogs/how-to-audit-a-google-ads-account.webp",
    "alt": "How to audit a google ads account — Orbilect SEO illustrated guide cover"
  },
  "why-real-estate-businesses-need-seo": {
    "src": "/blogs/why-real-estate-businesses-need-seo.webp",
    "alt": "Why real estate businesses need seo — Orbilect SEO illustrated guide cover"
  },
  "seo-vs-paid-advertising-for-clinics": {
    "src": "/blogs/seo-vs-paid-advertising-for-clinics.webp",
    "alt": "Seo vs paid advertising for clinics — Orbilect SEO illustrated guide cover"
  },
  "how-customer-support-fits-into-us-services-exports": {
    "src": "/blogs/how-customer-support-fits-into-us-services-exports.webp",
    "alt": "How customer support fits into us services exports — Orbilect SEO illustrated guide cover"
  },
  "how-saas-companies-use-seo-to-generate-demos": {
    "src": "/blogs/how-saas-companies-use-seo-to-generate-demos.webp",
    "alt": "How saas companies use seo to generate demos — Orbilect SEO illustrated guide cover"
  },
  "how-ecommerce-brands-grow-with-category-page-seo": {
    "src": "/blogs/how-ecommerce-brands-grow-with-category-page-seo.webp",
    "alt": "How ecommerce brands grow with category page seo — Orbilect SEO illustrated guide cover"
  },
  "how-local-service-businesses-turn-search-into-enquiries": {
    "src": "/blogs/how-local-service-businesses-turn-search-into-enquiries.webp",
    "alt": "How local service businesses turn search into enquiries — Orbilect SEO illustrated guide cover"
  },
  "when-to-hire-an-seo-team-or-an-agency": {
    "src": "/blogs/when-to-hire-an-seo-team-or-an-agency.webp",
    "alt": "When to hire an seo team or an agency — Orbilect SEO illustrated guide cover"
  },
  "how-ai-search-changes-content-discovery": {
    "src": "/blogs/how-ai-search-changes-content-discovery.webp",
    "alt": "How ai search changes content discovery — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-an-ai-chatbot-for-customer-support": {
    "src": "/blogs/how-to-build-an-ai-chatbot-for-customer-support.webp",
    "alt": "How to build an ai chatbot for customer support — Orbilect SEO illustrated guide cover"
  },
  "how-to-use-ai-for-keyword-research": {
    "src": "/blogs/how-to-use-ai-for-keyword-research.webp",
    "alt": "How to use ai for keyword research — Orbilect SEO illustrated guide cover"
  },
  "where-human-review-fits-in-ai-assisted-content": {
    "src": "/blogs/where-human-review-fits-in-ai-assisted-content.webp",
    "alt": "Where human review fits in ai assisted content — Orbilect SEO illustrated guide cover"
  },
  "what-ai-agents-can-do-for-small-businesses": {
    "src": "/blogs/what-ai-agents-can-do-for-small-businesses.webp",
    "alt": "What ai agents can do for small businesses — Orbilect SEO illustrated guide cover"
  },
  "how-ai-appointment-booking-works": {
    "src": "/blogs/how-ai-appointment-booking-works.webp",
    "alt": "How ai appointment booking works — Orbilect SEO illustrated guide cover"
  },
  "how-to-evaluate-an-ai-website-builder": {
    "src": "/blogs/how-to-evaluate-an-ai-website-builder.webp",
    "alt": "How to evaluate an ai website builder — Orbilect SEO illustrated guide cover"
  },
  "what-is-digital-marketing": {
    "src": "/blogs/what-is-digital-marketing.webp",
    "alt": "What is digital marketing — Orbilect SEO illustrated guide cover"
  },
  "what-google-search-updates-mean-for-site-owners": {
    "src": "/blogs/what-google-search-updates-mean-for-site-owners.webp",
    "alt": "What google search updates mean for site owners — Orbilect SEO illustrated guide cover"
  },
  "what-privacy-changes-mean-for-marketing-analytics": {
    "src": "/blogs/what-privacy-changes-mean-for-marketing-analytics.webp",
    "alt": "What privacy changes mean for marketing analytics — Orbilect SEO illustrated guide cover"
  },
  "what-core-web-vitals-tell-you-about-your-website": {
    "src": "/blogs/what-core-web-vitals-tell-you-about-your-website.webp",
    "alt": "What core web vitals tell you about your website — Orbilect SEO illustrated guide cover"
  },
  "how-to-build-a-digital-marketing-plan-for-a-small-business": {
    "src": "/blogs/how-to-build-a-digital-marketing-plan-for-a-small-business.webp",
    "alt": "How to build a digital marketing plan for a small business — Orbilect SEO illustrated guide cover"
  },
  "how-search-and-social-platforms-are-changing-product-discovery": {
    "src": "/blogs/how-search-and-social-platforms-are-changing-product-discovery.webp",
    "alt": "How search and social platforms are changing product discovery — Orbilect SEO illustrated guide cover"
  }
};

const groups: [Category, [number, string, string][]][] = [
  ["SEO & Search", [
    [1, "What Is Search Engine Optimization?", "Learn how SEO improves search visibility and how to link that work to leads, sales, and revenue."],
    [0, "How to Submit Your Website to Google Search Console", "A screenshot-led walkthrough of verification, sitemap submission, and common errors."],
    [1, "How to Set Up Your Google Business Profile", "A step-by-step guide to setup, verification, and profile optimization, with fixes for common problems."],
    [0, "How to Create and Submit an XML Sitemap", "Decide which URLs belong in your sitemap, submit it, and identify errors."],
    [1, "How Long Does Google Take to Index a Website?", "Understand how discovery, crawling, and indexing work and what can delay each one."],
    [1, "SEO vs AEO vs GEO", "Compare search optimization, answer engine optimization, and generative engine optimization."],
    [1, "The On-Page SEO Checklist for Business Websites", "Prioritize titles, headings, internal links, and content that answers what visitors came to find."],
  ]],
  ["Website Tutorials", [
    [0, "How to Build a WordPress Website", "Choose a domain, hosting, theme, and page builder, then prepare your site for launch."],
    [2, "10 Web Hosting Platforms Compared", "Compare hosting by renewal cost, backups, support, performance, and site requirements."],
    [0, "How to Build a Squarespace Website", "Choose a template, structure the site, connect a domain, and check mobile layouts."],
    [0, "How to Build a Webflow Website", "Plan responsive layouts, set up collections, and check redirects and metadata before launch."],
    [0, "How to Build a Wix Website", "Choose an editor, set up core pages, connect your domain, and configure your search settings."],
    [0, "How to Build a Framer Website", "Use components and CMS collections to launch a responsive marketing site."],
    [0, "How to Build a Shopify Store", "Organize products, payments, shipping, and storefront settings for launch."],
    [0, "How to Build a WooCommerce Store", "Set up a catalogue, configure checkout, and test payments and order emails."],
  ]],
  ["Paid Media & CRO", [
    [2, "How to Improve Your Website Conversion Rate", "Use analytics and customer feedback to identify friction and prioritize experiments."],
    [2, "PPC vs Organic Search", "Compare timelines, costs, and how each channel contributes to qualified leads."],
    [4, "How to Tell Whether PPC Is Profitable", "Compare campaign cost with lead quality, margin, and the revenue campaigns generate."],
    [2, "Meta Ads in 2026", "Review changes to campaign setup, creative testing, and measurement."],
    [2, "How to Write a Landing Page That Converts", "Match the offer to visitor intent and make the next action easy to find."],
    [0, "How to Track Leads and Sales in GA4", "Define useful events, validate tracking, and assess lead and sales performance."],
    [2, "How to Audit a Google Ads Account", "Review search terms, conversion tracking, ads, and where your budget goes."],
  ]],
  ["Industry & Business", [
    [1, "Why Real Estate Businesses Need SEO", "Build visibility around neighborhoods, listings, and the questions local buyers ask."],
    [4, "SEO vs Paid Advertising for Clinics", "Compare local discovery, short-term demand, and how each channel contributes to bookings."],
    [4, "How Customer Support Fits Into US Services Exports", "Explain when cross-border support contracts count as services exports and which country records them."],
    [4, "How SaaS Companies Use SEO to Generate Demos", "Connect educational and comparison content with relevant demo and trial paths."],
    [1, "How Ecommerce Brands Grow With Category Page SEO", "Improve collection pages and clarify how customers browse and find products."],
    [2, "How Local Service Businesses Turn Search Into Enquiries", "Use service pages, reviews, and location information to help customers get in touch."],
    [4, "When to Hire an SEO Team or an Agency", "Compare staffing, scope, ownership, and how to evaluate the investment."],
  ]],
  ["AI & Automation", [
    [3, "How AI Search Changes Content Discovery", "Explore citations, summaries, and how to track AI-driven discovery."],
    [3, "How to Build an AI Chatbot for Customer Support", "Plan the knowledge base, escalation rules, evaluation, and rollout."],
    [3, "How to Use AI for Keyword Research", "Group search topics, assess intent, and verify suggestions against real data."],
    [3, "Where Human Review Fits in AI-Assisted Content", "Define editorial checks for accuracy, sources, and customer usefulness."],
    [3, "What AI Agents Can Do for Small Businesses", "Match business workflows to realistic automation opportunities and oversight needs."],
    [3, "How AI Appointment Booking Works", "Explore scheduling rules, calendar availability, and confirmation workflows."],
    [3, "How to Evaluate an AI Website Builder", "Review responsive layout, accessibility, editing controls, and export options."],
  ]],
  ["Tech News & Digital Marketing", [
    [2, "What Is Digital Marketing?", "See how search, email, paid media, social, and analytics work together."],
    [4, "What Google Search Updates Mean for Site Owners", "Understand what to check before attributing traffic changes to a search update."],
    [4, "What Privacy Changes Mean for Marketing Analytics", "Explore consent, first-party data, and the limits of attribution."],
    [0, "What Core Web Vitals Tell You About Your Website", "Use performance metrics to prioritize issues that affect real visitors."],
    [2, "How to Build a Digital Marketing Plan for a Small Business", "Set measurable goals, choose channels, and build a realistic publishing and testing schedule."],
    [4, "How Search and Social Platforms Are Changing Product Discovery", "Compare how customers find and evaluate products across platforms."],
  ]],
];

export const topics: Topic[] = groups.flatMap(([category, entries]) =>
  entries.map(([author, title, summary]) => ({
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
    title, summary, category, author: authors[author],
  })).map(topic => ({ ...topic, cover: covers[topic.slug] })),
);

export const seoGuideSlug = "what-is-search-engine-optimization";

function requireTopic(slug: string) {
  const topic = topics.find(item => item.slug === slug);
  if (!topic) throw new Error("Published blog post has no catalogue entry: " + slug);
  return topic;
}

const publishedPosts: PublishedPost[] = [
  ...Object.entries(articleSeries).map(([slug, metadata]) => ({
    ...requireTopic(slug),
    ...metadata,
  })),
  {
    ...requireTopic(seoGuideSlug),
    publishedAt: "2026-11-14",
    cover: { src: "/blogs/what-is-search-engine-optimization.webp", alt: "Search results illustrated with a magnifying glass" },
  },
];

export function getPublishedPosts() {
  return publishedPosts.slice().sort((a, b) =>
    Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export function formatPublicationDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(date));
}
