import type { Reply } from "./answers";
const action = (text: string, href: string) => [{ text, href }];

// Specific conversational intents run before fuzzy website passage matching.
// Prices, legal answers and promotions continue through the existing policy logic.
export function naturalConversation(q: string, previous: string): Reply | undefined {
  if (/^(?:how are you(?: doing)?|how's (?:it going|your day)|are you (?:there|available)|anyone there)[.!?\s]*$/.test(q))
    return { text: "I’m here and ready to help, thanks for asking. What do you need help with?" };
  if (/\b(?:can i get|do you (?:offer|have)|is there|any) (?:a |any )?discount\b|\b(?:negotiate|too expensive|over my budget|lower (?:the |your )?price)\b/.test(q))
    return { text: "I can help you find a scope that fits your budget. I can’t approve a discount myself; our team can confirm any current offer in your written quote. Which service are you considering, and what budget do you have in mind?", actions: action("Discuss your scope", "/contact#request-proposal") };
  if (/\b(?:why (?:isn't|is not|isn’t) (?:my |our )?(?:website|site) (?:showing|appearing)|(?:site|website) (?:isn't|is not|isn’t) (?:on|showing on) google|not (?:showing|appearing|indexed) (?:on|in|by) google)\b/.test(q))
    return { text: "Let’s check discovery and indexing first: whether Google can crawl the page, whether it allows indexing, and which canonical URL Google selected. Is the website new, or did it stop appearing after a change?", actions: action("Read the indexing guide", "/blogs/how-long-does-google-take-to-index-a-website") };
  if (/^(?:i|we) (?:need|want)(?: some)? help with seo[.!?\s]*$/.test(q) || /^(?:seo|search engine optimi[sz]ation)[.!?\s]*$/.test(q))
    return { text: "Sure, I can help with SEO. Are you trying to get a new website found, improve existing rankings, or bring in more relevant enquiries? If you share the website URL, we can start with a free audit.", actions: action("Request a free SEO audit", "/#free-audit") };
  if (/\b(?:how (?:soon|long)|when)\b/.test(q) && /\b(?:results?|rankings?|traffic)\b/.test(q))
    return { text: "The timing depends on your starting point, competition, and the work needed. We can identify priorities in an audit, but I can’t promise a ranking or a fixed results date. Is your website new or already receiving search traffic?", actions: action("How we work", "/how-we-work") };
  if (/\b(?:guarantee|guaranteed|promise)\b/.test(q) && /\b(?:rank|first|number one|leads|results)\b/.test(q))
    return { text: "We can commit to agreed work and transparent reporting, but we can’t guarantee a search ranking or a fixed number of leads. We’ll set measurable goals around your website and market. What outcome matters most to you?", actions: action("Our approach", "/how-we-work") };
  if (/^(?:i|we) (?:have|run|own) (?:a |an )?(?:restaurant|cafe|food business)[.!?\s]*$/.test(q))
    return { text: "Great, we can look at menus, local discovery, reservations, and online ordering. Which matters most for your business right now: more visits, bookings, or orders?", actions: action("Food & Beverages", "/industries/food-beverages") };
  if (/\b(?:saas|software as a service)\b/.test(q) && !/\b(?:cost|pricing|refund|terms|blog|article)\b/.test(q))
    return { text: "Yes, we help SaaS businesses explain their product, reach relevant searches, and improve the path to a trial or demo. Are you launching a product or improving an existing website?", actions: action("SaaS services", "/industries/saas") };
  if (/\b(?:arts and entertainment|arts & entertainment|entertainment business)\b/.test(q))
    return { text: "We can help creative and entertainment businesses showcase their work, events, or performers and make ticket or enquiry journeys clearer. What kind of business are you building the website for?", actions: action("Arts & Entertainment", "/industries/arts-entertainment") };
  if (/^(?:it'?s|it is|that'?s|that is) (?:a |an )?(?:new (?:site|website)|brand new)[.!?\s]*$/.test(q) && /\b(?:seo|google|website|index)\b/.test(previous))
    return { text: "Thanks, that helps. For a new site, we’d first check crawl access, important pages, the sitemap, and a clear route from each service to the contact form. What’s the website address?", actions: action("Request a free SEO audit", "/#free-audit") };
  if (/^(?:i|we) (?:already )?have (?:a |an )?(?:existing )?(?:site|website)[.!?\s]*$/.test(q) && /\b(?:redesign|website|seo)\b/.test(previous))
    return { text: "Understood. Please share the current URL and what you’d like to improve—design, mobile usability, enquiries, or search visibility. We can review what to keep before recommending changes.", actions: action("Website redesign", "/services/website-redesign") };
  if (/^(?:what (?:do you need|should i send)|what information do you need)(?: from me| to start)?[.!?\s]*$/.test(q))
    return { text: "Start with your website URL, the service you need, your main goal, and any preferred timeline. A rough budget is helpful too. Please leave your contact details on our Contact page so a product strategist can follow up within 24 hours.", actions: action("Leave your project details", "/contact#request-proposal") };
  if (/^(?:how do (?:i|we) (?:get started|start)|let'?s (?:start|get started)|i'?d like to proceed)[.!?\s]*$/.test(q))
    return { text: "Let’s get started. Leave your website and project goals on our Contact page, and one of our product strategists will get back to you within 24 hours to discuss the next steps.", actions: action("Start the conversation", "/contact#request-proposal") };
  if (/^(?:i'?m|i am) (?:confused|not sure)(?: where to start)?[.!?\s]*$/.test(q))
    return { text: "That’s okay. Let’s take it one step at a time. Do you already have a website, and what would you most like it to do better?" };
  if (/^https?:\/\/[^\s]+\/?$/.test(q) && /\b(?:url|address|website|audit)\b/.test(previous))
    return { text: "Thanks for sharing the URL. I can guide you through the next step, but this message doesn’t run an audit or submit your details. Please use the free audit form so our team can review the website and follow up.", actions: action("Request your free audit", "/#free-audit") };
}
