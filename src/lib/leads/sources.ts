export const leadSources = {
  "naila-callback": { name: "Naila — In-chat contact request", kind: "proposal" },
  "starter-offer": { name: "Starter Offer — Free SEO Audit", kind: "audit" },
  "contact-proposal": { name: "Contact — Proposal Request", kind: "proposal" },
  "starter-plan-proposal": { name: "Pricing — Starter Plan Request", kind: "proposal" },
  "essential-plan-proposal": { name: "Pricing — Essential Plan Request", kind: "proposal" },
  "custom-plan-proposal": { name: "Pricing — Custom Quotation", kind: "proposal" },
  "home-proposal": { name: "Home — Proposal Request", kind: "proposal" },
  "services-proposal": { name: "Services — Proposal Request", kind: "proposal" },
  "home-hero-audit": { name: "Home Hero — Free SEO Audit", kind: "audit" },
  "home-audit-preview": { name: "Audit Preview — Free SEO Audit", kind: "audit" },
  "process-audit": { name: "How We Work — Free SEO Audit", kind: "audit" },
  "industries-audit": { name: "Industries Overview — Free SEO Audit", kind: "audit" },
  "industry-detail-audit": { name: "Industry Detail — Free SEO Audit", kind: "audit" },
  "faq-audit": { name: "FAQ — Free SEO Audit", kind: "audit" },
  "hero-audit": { name: "Page Hero — Free SEO Audit", kind: "audit" },
  "blog-hero-audit": { name: "Blog Article — Free SEO Audit", kind: "audit" },
  "general-audit": { name: "Free SEO Audit", kind: "audit" },
} as const;

export type LeadSource = keyof typeof leadSources;
export type AuditSource = {
  [Source in LeadSource]: typeof leadSources[Source]["kind"] extends "audit" ? Source : never;
}[LeadSource];

export const supportProposalOptions = [
  { service: "Live Chat Support Staffing", request: "Help me offshore a customer support live chat agent.", hourly: true },
  { service: "Email Support Staffing", request: "Help me offshore a customer support email agent.", hourly: true },
  { service: "Phone Support Staffing", request: "Help me offshore a customer support phone agent.", hourly: true },
  { service: "Technical Support Staffing", request: "Help me offshore a technical support agent.", hourly: true },
  { service: "Multichannel Support Staffing", request: "Help me offshore a customer support agent for live chat, email, and phone.", hourly: true },
  { service: "Multilingual Support Staffing", request: "Help me offshore a multilingual customer support agent.", hourly: true },
  { service: "AI Chatbot Development", request: "Help me build an AI chatbot for customer support.", hourly: false },
  { service: "Agentic AI Development", request: "Help me build an agentic AI agent to automate approved workflows.", hourly: false },
] as const;

export const proposalServices = [
  "On-page SEO", "Off-page SEO", "Technical SEO", "Ecommerce SEO", "SEO Content Writing", "Digital PR",
  "Digital Marketing", "PPC Management", "Bing Advertising", "ChatGPT Advertising", "Email Marketing",
  "Social Media Marketing", "Paid Social Advertising", "Marketing Analytics", "Conversion Rate Optimization",
  "Website Redesign", "Landing Page Design", "Ecommerce Management", "Ecommerce Store Design and Development",
  "Custom CRM Development", "Dedicated Offshore Staffing",
  ...supportProposalOptions.map(({ service }) => service),
  "Service Review", "Help me choose",
] as const;

export function proposalFormHref(service: typeof proposalServices[number], request: string, details?: string) {
  const params = new URLSearchParams({ service, request });
  if (details) params.set("details", details);
  return "/contact?" + params.toString() + "#request-proposal";
}
