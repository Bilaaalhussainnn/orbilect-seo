import glossary from "./technical-glossary.json";
import type { Reply } from "./answers";
const normalize = (text: string) => text.toLowerCase().replace(/[‘’]/g,"'").replace(/[?.!,]+$/g,"").trim();
const link = (text: string, href: string) => [{text,href}];
export const conversationServices = [
  { name:"on-page SEO", href:"/services/on-page-seo", test:/\bon[- ]page seo\b/, checks:"page purpose, titles, headings, internal links, and the questions customers need answered" },
  { name:"off-page SEO", href:"/services/off-page-seo", test:/\boff[- ]page seo\b/, checks:"existing backlinks, relevant mentions, business listings, and legitimate outreach opportunities" },
  { name:"technical SEO", href:"/services/technical-seo", test:/\btechnical seo\b/, checks:"crawl access, indexing, canonicals, redirects, template performance, and the sitemap" },
  { name:"ecommerce SEO", href:"/services/ecommerce-seo", test:/\becommerce seo\b/, checks:"collections, product information, filter URLs, internal links, and the route to checkout" },
  { name:"website redesign", href:"/services/website-redesign", test:/\bwebsite redesign\b/, checks:"mobile usability, page structure, content, enquiry journeys, and existing URLs worth preserving" },
  { name:"digital marketing", href:"/services/digital-marketing", test:/\bdigital marketing\b/, checks:"your audience, offer, channels, landing pages, and how enquiries or sales are measured" },
  { name:"PPC management", href:"/services/ppc-management", test:/\bppc(?: management)?\b/, checks:"conversion tracking, search terms, targeting, ad relevance, budgets, and landing pages" },
  { name:"paid social advertising", href:"/services/paid-social-advertising", test:/\bpaid social(?: advertising)?\b/, checks:"audiences, creative, campaign objectives, tracking, and the mobile landing-page experience" },
  { name:"email marketing", href:"/services/email-marketing", test:/\bemail marketing\b/, checks:"audience permissions, segmentation, useful messages, delivery setup, and measurable actions" },
  { name:"offshore staffing", href:"/staffing", test:/\boffshore staffing\b/, checks:"the role, skills, working hours, coverage, access permissions, and onboarding responsibilities" },
];
export function glossaryReply(message: string): Reply | undefined {
  const q=normalize(message);
  if (/\b(?:promotions?|promo|offers?|discounts?|refunds?|quotations?)\b/.test(q)) return;
  const wantsDefinition=/^(?:(?:please )?(?:what (?:is|are|does)|define|explain|describe|tell me about|introduce)|(?:can|could) you explain)\b|\b(?:meaning|definition|stands? for|mean)\b/.test(q);
  const matches=glossary.filter(item=>[item.term,...item.aliases].some(alias=>{
    const a=normalize(alias);const escaped=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    return new RegExp("(?:^|[^a-z0-9])"+escaped+"(?:$|[^a-z0-9])").test(q);
  })).sort((a,b)=>b.term.length-a.term.length);
  const entry=matches[0];
  if (!entry || (!wantsDefinition && ![entry.term,...entry.aliases].some(alias=>normalize(alias)===q))) return;
  // Requests about our actual prices/policies must use their authoritative routes.
  if (/\b(?:your|our|my)\b/.test(q) && /\b(?:cost|price|policy|offer|refund)\b/.test(q)) return;
  return {text:entry.definition+" Would you like to know how this applies to your website?",actions:link("Explore this topic",entry.href)};
}
export function continuityReply(message: string, previous: string): Reply | undefined {
  const q=normalize(message), service=conversationServices.find(item=>item.test.test(previous));
  const direct=conversationServices.find(item=>item.test.test(q));
  if (/\borbilect os\b/.test(q) || (/\borbilect os\b/.test(previous) && /\b(?:sign in|log in|gmail|screenshots?|data|employees?|access|copy|photos?|fines?)\b/.test(q))) {
    if (/\b(?:screenshots?|photos?|copy|export|customer data)\b/.test(q)) return {text:"Customer information is confidential. Unauthorised screenshots, photographs, copying, personal notes and exports are prohibited. Follow the approved internal process for any permitted transfer. The OS usage terms explain the rules and lawful consequences.",actions:link("Orbilect OS usage terms","/terms-and-conditions#orbilect-os")};
    return {text:"Orbilect OS is an internal employee workspace. Access requires an approved Orbilect product email account and individual authorisation; personal email accounts are not permitted. If you want a similar product for your business, please contact Orbilect Labs.",actions:[{text:"OS privacy notice",href:"/privacy-policy#orbilect-os"},{text:"Contact Orbilect Labs",href:"https://orbilectlabs.com/"}]};
  }
  if (/^(?:that.s not what i meant|you misunderstood me|i.m confused|i don.t understand|can we start again|let me try again)[.!?\s]*$/.test(q)) return {text:"Thanks for telling me. Let’s take it one step at a time 🙂 What are you trying to achieve with your website?"};
  if (/^(?:i.m|we.re) (?:worried|nervous|not sure)(?: about .*)?$/.test(q)) return {text:"That’s understandable. We can go through it together without rushing. Is your main concern the scope, the investment, or how the work will be handled?"};
  if (direct && /\b(?:considering|looking for|keep helping|return to|back to|interested in|need help with our)\b/.test(q))
    return {text:"Sure, we can help with "+direct.name+". We’d review "+direct.checks+". What would you most like to improve?",actions:link("Explore "+direct.name,direct.href)};
  if (/^(?:it|our (?:site|website)) (?:runs|is built) on\b/.test(q))
    return {text:"Thanks, I’ll keep that platform in mind for this conversation. Which part of the current experience is causing the most trouble?"};
  if (/^(?:our|my) (?:main )?goal is\b/.test(q))
    return {text:"Understood. We can use that goal to decide what to review and measure first. What’s the current website URL, and which market do you serve?"};
  if (/^(?:we|i) (?:already )?have (?:an? )?(?:existing )?(?:site|website)$/.test(q))
    return {text:"Thanks. Please share the current URL and the main thing you want to improve. We can review what is working before recommending changes.",actions:link("Discuss your website","/contact#request-proposal")};
  if (/\bwhat would you (?:check|review|look at) first\b/.test(q))
    return {text:service?"For "+service.name+", I’d start with "+service.checks+". Then we’d prioritize the changes closest to your goal.":"I’d start with your main goal, the website, and whether people can complete the intended enquiry or purchase. Which service are we focusing on?",actions:link("How we work","/how-we-work")};
  if (/\b(?:is ad spend included|does (?:that|it) include ad spend)\b/.test(q))
    return {text:"Advertising platform spend is separate from management or design fees unless your written quote explicitly includes it. We’ll make the scope and budget clear before you proceed.",actions:link("Review service terms","/terms-and-conditions#fees")};
  if (/\b(?:how long would the project take|project timeline|when could (?:we|you) launch)\b/.test(q))
    return {text:"The project schedule depends on the pages, content, integrations, access, and approvals needed. Share your preferred launch date and we’ll confirm a realistic schedule in the proposal.",actions:link("Discuss your timeline","/contact#request-proposal")};
  if (/\b(?:not sure i explained|didn't explain|you misunderstood|you didn't understand|couldn't understand me|that isn't what i meant)\b/.test(q))
    return {text:"Thanks for clarifying. We can keep going. What’s the one thing you’d like help with first?"};
  if (/\b(?:simpler words|more simply|plain english|simple terms)\b/.test(q))
    return {text:service?"In simpler terms, "+service.name+" means reviewing "+service.checks+" so customers can understand the offer and take the next step. Which part would you like me to unpack?":"Of course. Tell me the term or part that felt unclear and I’ll explain it one step at a time."};
  if (/\bwhat do you need from (?:us|me) to start\b/.test(q))
    return {text:"Start with the website URL, main goal, target market, preferred timeline, and the work you need help with. Leave contact details on our Contact page so a product strategist can follow up within 24 hours.",actions:link("Share your project","/contact#request-proposal")};
  if (/\b(?:need my passwords|send (?:you )?(?:my |our )?passwords?|share (?:my |our )?login)\b/.test(q))
    return {text:"Please don’t send passwords in this chat. When access is needed, we’ll agree secure, role-based invitations or an appropriate sharing method through your project channel.",actions:link("Read our privacy policy","/privacy-policy#sources-and-project-access")};
  if (/\b(?:contact a strategist|speak to a product strategist|reach your team)\b/.test(q))
    return {text:"Sure. Leave your details on our Contact page and one of our product strategists will get back to you within 24 hours.",actions:link("Contact our team","/contact#request-proposal")};
  if (/^(?:thank you|thanks)[, ]+(?:that helps|that makes sense|that clears it up)$/.test(q))
    return {text:"You’re welcome. We can keep going if you have another question."};
}
