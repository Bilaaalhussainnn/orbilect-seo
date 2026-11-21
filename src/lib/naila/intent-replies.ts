import { ecommerceOperationsAnswers as ecommerce, staffingSupportAnswers as staffing } from "../customer-operations-faqs";
import { paymentMethods, projectRefund, promotionalPayment, recurringSchedule, refundTiming } from "../payment-policy";
import { businessDescription, internationalWhatsApp, pakistanAddress, pakistanWhatsApp } from "../site-identity";
import { findPublicAnswer, suggestPublicPage } from "./public-knowledge";
import { findPolicyAnswer, findPublicPassage, privacyPath, termsPath } from "./site-content";
import { blogIndex, faqEntries } from "./intent-content";
import type { Reply } from "./answers";

const pricingChecklist = { text: "Open pricing checklist", href: "/pricing#pricing-checklist" };
const callback = { text: "Open our Contact page", href: "/contact?request=Callback%20request#request-proposal" };
const quote = { text: "Get a quote", href: "/pricing#pricing-checklist" };
const terms = { text: "View Terms", href: "/terms-and-conditions" };
const audit = { text: "Request a free SEO audit", href: "/#free-audit" };
const call = { text: "Call us", href: "tel:+16466400070" };
const labsDescription = "Orbilect Labs is a global software development and product engineering company helping startups, scale-ups, and enterprises transform ambitious ideas into powerful digital products. We combine strategic thinking, innovative design, and world-class engineering to build scalable technology solutions that solve complex business challenges, drive operational efficiency, and create measurable business growth.";
const labsWebsite = { text: "Visit Orbilect Labs", href: "https://orbilectlabs.com/" };
const investment = "Sure, I can help with pricing. We call it an investment because the work is designed to help your business grow and deliver measurable results.";
const promotion = "Yes. Our pop-up advertises a limited-time Starter SEO promotion starting at $500 USD. You can request a free audit to enquire. Your written quote confirms eligibility and which billing periods the promotional price covers. " + promotionalPayment;
const expiry = "I’m not sure when the $500 Starter promotion ends. Orbilect SEO’s leadership team sets the timeframe, and our team can confirm whether it’s still available.";
const clarify = "I couldn’t quite understand your question. Could you clarify? I’d be happy to help.";
const unrelated = "That’s outside what I can help with. I can answer questions about Orbilect SEO’s products and services.";
const promoWords = /\b(?:promo\w*|(?:any|the|special|starter|limited[- ]time|seo) offers?|discount\w*|deals?|(?:most |more )?affordable|cheapest|cheaper|lowest)\b|\$\s*500\b/;
const timeWords = /\b(?:ends?|expir\w*|deadline|how long|until|lasts?|still (?:available|valid))\b/;
const pricingWords = /\b(?:pric(?:e|es|ing)|costs?|investment|quotes?|quotation|budgets?|rates?|fees?|charges?|how much|most affordable|most economical|cheapest|lowest[- ]priced)\b/;
const platforms = /\b(wordpress|shopify|woo\s?commerce|magento|adobe commerce|webflow|wix|squarespace|bigcommerce|framer)\b/;
const platformNames: Record<string, string> = {
  wordpress: "WordPress", shopify: "Shopify", woocommerce: "WooCommerce", magento: "Magento",
  "adobe commerce": "Adobe Commerce", webflow: "Webflow", wix: "Wix",
  squarespace: "Squarespace", bigcommerce: "BigCommerce", framer: "Framer",
};
const greeting = /^(hey(?: there)?|hi(?: there)?|hello(?: there)?|hiya|howdy|yo|good (?:morning|afternoon|evening)|listen to me)(?=$|[\s,.!?—-])/i;
const stop = new Set("a an the to on in for of and i my me your you it is are do does how what can could would about with please tell explain help work site website".split(" "));
const tokenize = (s: string) => [...new Set(s.toLowerCase().match(/[a-z0-9]+/g) ?? [])].filter(word => !stop.has(word));
const normalize = (s: string) => s.toLowerCase().replace(/[‘’]/g, "'").replace(/duck[\s-]+duck[\s-]+go/g, "duckduckgo");
const faqIndex = faqEntries.map(([question, text]) => ({ question: tokenize(question).join(" "), words: tokenize(question), text }));
const articles = blogIndex.map(post => ({
  ...post, titleWords: tokenize(post.title), contentWords: new Set(tokenize(post.content)),
}));

function blogFor(text: string, preferred?: string) {
  if (preferred) return articles.find(post => post.slug === preferred);
  const words = tokenize(text);
  let best: (typeof articles)[number] | undefined;
  let high = 0;
  for (const post of articles) {
    const overlap = words.filter(word => post.titleWords.includes(word)).length;
    const bodyOverlap = words.filter(word => post.contentWords.has(word)).length;
    if (overlap < 2 || overlap / Math.min(words.length, post.titleWords.length) < .65) continue;
    const score = 2 * overlap / (words.length + post.titleWords.length) + .1 * bodyOverlap / words.length;
    if (score > high) { best = post; high = score; }
  }
  return best;
}

function withBlog(text: string, q: string, preferred?: string): Reply {
  const post = blogFor(q, preferred);
  return { text, actions: post ? [{ text: post.title, href: "/blogs/" + post.slug }] : undefined };
}

const topic = /\b(?:seo|search engine optimization|starter|essential|marketing|ppc|ads|paid search|staffing|offshor\w*|outsourc\w*|chatbots?|agentic ai|crm|audit|shopify|ecommerce|website|redesign|privacy|polic(?:y|ies)|terms|cookies?|refund\w*|billing|r[eé]sum[eé]|jobs?|vacanc\w*|sitemap|index\w*|backlinks?|reviews?|google business profile)\b/;
const pricingFollowup = /^(?:(?:and|so)\s+)?(?:how much(?: (?:does|would|will) (?:this|that|it) (?:cost|be))?|what(?:'s| is) (?:the )?(?:cost|price|investment)(?: of (?:this|that|it))?|(?:what|how) about (?:the )?(?:cost|pricing|price)|and the (?:cost|price))[.!?\s]*$/;
const followupOnly = /^(?:thanks(?: so much)?|thank you(?: so much)?|(?:ok(?:ay)?|sure|understood|got it|sounds good|great|perfect|that makes sense)(?:[, ]+(?:thanks|thank you))?|(?:yes|no)(?: please)?)[.!?\s]*$/;

function previousTopic(recentMessages: readonly string[]) {
  let latest = "";
  for (const message of [...recentMessages].reverse()) {
    const turn = normalize(message.trim());
    if (!turn || followupOnly.test(turn) || pricingFollowup.test(turn)) continue;
    if (topic.test(turn) || platforms.test(turn)) return turn;
    latest ||= turn;
  }
  return latest;
}

export function resolveIntent(message: string, recentMessages: readonly string[], fallback: (q: string) => Reply): Reply {
  const input = message.trim();
  const greetingMatch = input.match(greeting);
  const prefix = greetingMatch
    ? (greetingMatch[0].toLowerCase() === "listen to me" ? "Hi" : greetingMatch[0][0].toUpperCase() + greetingMatch[0].slice(1).toLowerCase()) + "! 😊 "
    : "";
  const q = normalize(greetingMatch ? input.slice(greetingMatch[0].length).replace(/^[\s,.!?—-]+/, "").replace(/^naila(?: ai)?(?=$|[\s,.!?—-])[\s,.!?—-]*/i, "") : input);
  if (!q && prefix) return { text: prefix + "How can I help you?" };
  const reply = classify(q, previousTopic(recentMessages), fallback);
  return prefix && reply.text !== serviceIntro ? { ...reply, text: prefix + reply.text } : reply;
}

function customerOperationsReply(q: string): Reply | undefined {
  const aboutStaffing = /\b(?:offshor\w*|outsourc\w*|staff\w*|hire|hiring|dedicated)\b/.test(q);
  const aboutSupport = /\b(?:customer support|customer service|support agents?|live chat agents?|email agents?|phone agents?|voice agents?|contact cent(?:er|re))\b/.test(q);
  const aboutStore = /\b(?:ecommerce|stores?|shopify|woocommerce|magento|shoppers?)\b/.test(q);
  const respond = ({ answer, href }: { answer: string; href: string }): Reply => ({
    text: answer,
    actions: [{ text: "Read more", href }],
  });

  if ((aboutStore || aboutStaffing) && /\bprivacy (?:policy|rules)\b/.test(q)) return respond(ecommerce.privacy);
  if (aboutStaffing && aboutSupport && /\b(?:agreement|terms|cancellation|notice)\b/.test(q)) return respond(ecommerce.terms);
  if (aboutStaffing && pricingWords.test(q)) return respond(staffing.cost);
  if (aboutSupport && /\b(?:trained|training|typing|mock chats?|screening)\b/.test(q)) return respond(ecommerce.training);
  if (aboutSupport && /\b(?:multilingual|languages?|bilingual)\b/.test(q)) return respond(staffing.multilingual);
  if (aboutStaffing && aboutSupport) return respond(staffing.roles);
  if (/\bagentic ai\b/.test(q)) {
    if (/\b(?:difference|compare|comparison|versus|vs)\b/.test(q)) return respond(ecommerce.comparison);
    if (/\b(?:permissions?|approval rules?|access rules?)\b/.test(q)) return respond(ecommerce.permissions);
    return respond(ecommerce.automation);
  }
  if (aboutStore && /\bcrm\b/.test(q)) return respond(ecommerce.crm);
  if (aboutStore && /\b(?:chatbots?|ai chat agents?)\b/.test(q)) return respond(ecommerce.chatbot);
  if (aboutStore && aboutSupport) return respond(ecommerce.support);
}

const staffingTopic = /\b(?:staffing|offshor\w*|outsourc\w*)\b/;
const serviceIntro = "Sure, I’m here to help. What do you need help with?";
const marketingTopic = /\b(?:digital marketing|online marketing)\b/;

function conversationalReply(q: string, previous: string): Reply | undefined {
  const jobSeeker = /\b(?:look(?:ing)? (?:for|to apply for) (?:a )?(?:job|work)|job (?:openings?|vacanc(?:y|ies)|applications?|opportunities)|vacanc(?:y|ies)|(?:need|want) (?:help (?:with|finding) )?(?:a |with a )?job|(?:help me find|apply for) (?:a )?job|are you hiring|any openings|work (?:for|at) (?:you|orbilect)|(?:send|submit) (?:my |a )?(?:cv|r[eé]sum[eé]))\b/;
  if (jobSeeker.test(q)) {
    if (/\b(?:cv|r[eé]sum[eé])\b/.test(q)) {
      return { text: "When a position opens, the listing will tell you how to apply and where to send your CV. Please check our Careers page for the latest status.", actions: [{ text: "Visit Careers", href: "/careers#openings" }] };
    }
    return { text: "Unfortunately, we don’t have any vacancies right now. Please keep an eye on our Careers page and official social channels. We’ll post new openings and application details there.", actions: [{ text: "Visit Careers", href: "/careers#openings" }] };
  }
  if (/^(?:(?:please )?(?:i (?:need|want|would like)|i'd like|looking for) (?:(?:some|your) )?(?:help|assistance|support)|(?:can|could|would|will) you (?:please )?help(?: me)?|help(?: me)?(?: please)?)[.!?\s]*$/.test(q)) {
    return { text: serviceIntro, actions: [{ text: "Explore our services", href: "/services" }] };
  }
  if (/\b(?:can you|do you|what can you)\b.*\b(?:read|access|answer from|know about)\b.*\b(?:site|website|pages?)\b/.test(q)) {
    return { text: "I can answer from the public pages in our sitemap, including our services, blog, Privacy Policy, and Terms and Conditions. I can link you to the source. What would you like to look up?", actions: [{ text: "Read Privacy Policy", href: privacyPath }, terms] };
  }
  if (marketingTopic.test(previous) && /^(?:(?:i|we) (?:want|need) )?(?:more leads|more enquir(?:ies|ys)|more inquiries|(?:more|grow) (?:online )?sales|(?:reach|a) (?:new|wider) audiences?)[.!?\s]*$/.test(q)) {
    return { text: "Got it. What do you sell, and where are your customers based? That’ll help us work out which channels and landing pages are worth looking at first.", actions: [{ text: "Explore digital marketing", href: "/services/digital-marketing" }] };
  }
  if (marketingTopic.test(q) && !pricingWords.test(q) &&
    !/\b(?:privacy|terms|refund|blog|article|guide link|marketing agency|jobs?|careers)\b/.test(q)) {
    return {
      text: "Sure, let me guide you through digital marketing. It means using online channels such as search, social media, paid ads, and email to reach customers and measure what leads to enquiries or sales. Are you looking to bring in more leads, grow online sales, or reach a new audience?",
      actions: [{ text: "Explore digital marketing", href: "/services/digital-marketing" }],
    };
  }
  if (marketingTopic.test(previous) && /^(?:(?:what|where) (?:would you do|should i start)(?: first)?|how (?:do|would) (?:we|you) start)[.!?\s]*$/.test(q)) {
    return { text: "I’d start with one goal and check what you’re already measuring. If you want more enquiries, for example, we can review where leads come from and whether the landing page makes it easy to contact you.", actions: [{ text: "Explore digital marketing", href: "/services/digital-marketing" }] };
  }
  if (staffingTopic.test(previous) && /^(?:how much(?: (?:does|would|will) (?:it|that) cost)?|(?:what(?:'s| is) (?:the )?)?(?:price|pricing|cost|rates?)|and (?:the )?(?:price|cost|rates?))[.!?\s]*$/.test(q)) {
    return { text: staffing.cost.answer, actions: [{ text: "Explore offshore staffing", href: staffing.cost.href }] };
  }
}

function classify(q: string, previous: string, fallback: (q: string) => Reply): Reply {
  if (/^(?:thanks|thank you)(?: so much)?[.!?\s]*$/.test(q)) return { text: "You’re welcome!" };
  if (followupOnly.test(q)) return { text: "Sounds good. I’m here if you have another question." };
  if (!/[a-z0-9]/.test(q) || /^(?:what(?: the)?|how|why|where|can you|do you|i was wondering)[?.!\s]*$/.test(q)) return { text: clarify };
  if (/\b(?:hungry|weather forecast|tell me a joke|who won the game|what is your favorite food)\b/.test(q)) return { text: unrelated };
  if (/\b(?:call\s?back|(?:contact|call|phone|email|reach) me|(?:get in touch|reach out|follow up) with me|(?:reach out|speak) to me)\b/.test(q)) {
    return { text: "Sure, kindly leave your details on our Contact page and one of our product strategists will get back to you within 24 hours.", actions: [callback] };
  }
  if (/\b(?:calculators?|cost estimators?|quote tools?|pricing tools?)\b/.test(q)) {
    return { text: "We have a pricing checklist you can use to select the work you need and request a tailored quote. It won’t generate an instant total.", actions: [pricingChecklist] };
  }
  const context = topic.test(q) || platforms.test(q) ? q : previous;
  const policy = findPolicyAnswer(q, context);
  if (policy) return policy;
  const policyPage = /\bprivacy policy\b/.test(q) ? privacyPath
    : /\bterms (?:and conditions|of service)\b/.test(q) ? termsPath : undefined;
  if (policyPage) {
    const link = { text: policyPage === privacyPath ? "Read Privacy Policy" : "Read Terms and Conditions", href: policyPage };
    if (/^(?:privacy policy|terms and conditions|terms of service)[.!?\s]*$/.test(q) ||
      /\b(?:where (?:is|are|can)|(?:show|send|share|link) me|link to|can i (?:read|see))\b/.test(q)) {
      return { text: "Of course. Here’s the published page. If you have a question about a specific part, I can help you find it.", actions: [link] };
    }
    return findPublicPassage(q, policyPage) ?? { text: "I can’t confirm that from the text I found. Here’s the published page so you can check the details.", actions: [link] };
  }
  const auditTopic = /\b(?:audits?|seo audits?)\b/;
  if (/\b(?:free (?:seo )?audits?|audit my (?:site|website))\b/.test(q) ||
      (auditTopic.test(context) && pricingFollowup.test(q))) {
    return { text: "Yes, you can request a free SEO audit. Share your website and tell us what you’d like customers to find. We’ll review what may be holding the site back and flag where to start.", actions: [audit] };
  }
  const conversation = conversationalReply(q, previous);
  if (conversation) return conversation;
  const aboutReputation = /\b(?:review|reviews|rate|feedback|testimonial)\b/.test(q);
  const aboutPerson = /\b(?:chat|agent|representative|naila)\b/.test(q);
  if (aboutReputation && aboutPerson && /\b(?:leave|rate|give|submit|write)\b/.test(q) && !/\b(?:your services|orbilect seo services)\b/.test(q)) {
    return { text: "When a human agent closes your support conversation, you can leave a private rating in this chat. For a review of Orbilect SEO’s services, use our Reviews page.", actions: [{ text: "Review our services", href: "/reviews#review-platforms" }] };
  }
  if (aboutReputation && /\b(?:leave|write|post|submit|give|rate|review you|review your|review orbilect|where|platform)\b/.test(q) &&
      !/\b(?:review (?:my|our|this)|you review)\b/.test(q)) {
    return { text: "You can review Orbilect SEO’s services from our Reviews page. Use an available public platform or send feedback privately to our team.", actions: [{ text: "Review our services", href: "/reviews#review-platforms" }] };
  }
  if (/\b(?:templates?|design gallery|design examples?|website examples?|sample (?:websites?|designs?)|show (?:me )?(?:your )?(?:websites?|designs?))\b/.test(q) && !/\b(?:email|invoice|resume|cv|job)\b/.test(q)) {
    return { text: "Sure. Browse our Website Design Gallery and choose from nine industry collections. The designs are starting points for inspiration; we can tailor the look, content, platform, and features to your business. Which industry are you designing for?", actions: [{ text: "Explore the design gallery", href: "/website-design-gallery" }] };
  }
  const serviceIntent = customerOperationsReply(q);
  if (serviceIntent) return serviceIntent;
  if (!pricingWords.test(q) && !/\b(?:blog|article|guide link|privacy|terms|refund)\b/.test(q)) {
    if (/\b(?:google ads|ppc|pay[- ]per[- ]click|paid search)\b/.test(q)) {
      return { text: "Yes, we can help with paid search. PPC means paying for clicks on your ads. We can review which searches you target, where clicks land, and whether those clicks lead to enquiries or sales. Are you starting a campaign or improving an existing one?", actions: [{ text: "Explore PPC management", href: "/services/ppc-management" }] };
    }
    if (/\b(?:redesign\w*|rebuild\w*)\b.*\b(?:website|site)\b|\b(?:website|site) (?:redesign|rebuild)\b/.test(q)) {
      return { text: "Yes, we can help redesign your website. We’ll review how customers move through it, what works on mobile, and which pages need to keep their search visibility. What would you most like the new site to do better?", actions: [{ text: "Explore website redesign", href: "/services/website-redesign" }] };
    }
  }
  const exactSiteAnswer = findPublicAnswer(q, true);
  if (exactSiteAnswer) return exactSiteAnswer;
  if (/\b(?:live chat|human (?:agent|rep|representative|support)|(?:talk|speak|chat|connect|transfer) (?:me )?(?:to|with) (?:a |an |your )?(?:live )?(?:human|person|agent|rep(?:resentative)?|someone)|(?:is|any) (?:an? )?(?:agent|representative) available)\b/.test(q)) {
    return { text: "Live chat depends on availability. If a team member is available, they’ll join this chat. You can also call us at +1 (646) 640-0070.", actions: [call] };
  }
  if (/\b(?:refund\w*|money back|non[- ]refundable|chargeback)\b/.test(q)) {
    const chargeback = /\bchargebacks?\b/.test(q);
    const staffing = /\b(?:staffing|offshor\w*)\b/.test(q);
    const promotion = /\b(?:promo\w*|voucher\w*|discount\w*)\b/.test(q);
    const timing = /\b(?:how long|when|days?|timeline)\b/.test(q);
    const text = chargeback
      ? "You can email refunds@orbilectseo.com for help with a billing dispute. The internal project refund window does not limit the rights or deadlines that apply through your payment provider."
      : staffing
        ? "Staffing requires at least one month’s written notice for early exit. Unused prepaid months after the effective end date are refundable without a separate early-exit penalty. Email refunds@orbilectseo.com."
        : promotion ? promotionalPayment : timing ? projectRefund + " " + refundTiming : projectRefund;
    return { text, actions: [{ text: "Email refunds", href: "mailto:refunds@orbilectseo.com" }, terms] };
  }
  if (/\b(?:recurring (?:payments?|billing)|billing cycle|direct debit|payment due date|late fees?)\b/.test(q)) {
    return { text: recurringSchedule + " Check the signed agreement for direct debit, notice and late payment terms.", actions: [{ text: "View billing terms", href: "/terms-and-conditions#recurring-and-late-payments" }] };
  }
  if (/\b(?:payment methods?|can i pay|credit cards?|debit cards?|visa|amex|american express|mastercard|paypal|wire transfer|bank transfer)\b/.test(q)) {
    return { text: paymentMethods, actions: [{ text: "View payment terms", href: "/terms-and-conditions#fees" }] };
  }
  if (/\bwhats\s?app\b/.test(q)) {
    const whatsApp = /\b(?:pakistan|karachi)\b/.test(q) ? pakistanWhatsApp : internationalWhatsApp;
    return { text: "You can reach us on WhatsApp at " + whatsApp.display + ".", actions: [{ text: "Open WhatsApp", href: whatsApp.href }] };
  }
  if (/\b(?:where (?:are you|is orbilect) (?:based|located)|(?:your|orbilect(?: seo)?(?:'s)?) (?:office |business )?address|where (?:is|are) your offices?)\b/.test(q)) {
    return { text: "United States: 450 Park Avenue, Suite 2800, New York, NY 10022.\n\nPakistan: " + pakistanAddress, actions: [{ text: "Explore office locations", href: "/contact#global-locations" }] };
  }
  if (/\b(?:parent (?:company|organization|brand)|who (?:owns|built|founded|created) orbilect(?: seo)?|who (?:owns|is behind) (?:you|your company)|(?:what|who) (?:is|are) orbilect labs|(?:about|describe) orbilect labs)\b/.test(q)) {
    const text = /\borbilect labs\b/.test(q) ? labsDescription : "Orbilect Labs is our parent company. " + labsDescription;
    return { text, actions: [labsWebsite] };
  }
  if (/\b(?:who (?:are (?:you guys|you|we)|is orbilect(?: seo)?)(?: as a company)?|what is orbilect(?: seo)?|about orbilect(?: seo)?|tell me about your company)\b/.test(q) && !/\b(?:naila|orbilect (?:labs|cx|reviews|hire|flow|create))\b/.test(q)) {
    return {
      text: businessDescription,
      actions: [{ text: "Visit Orbilect SEO", href: "https://orbilectseo.com/" }],
    };
  }
  if (staffingTopic.test(q)) {
    return { text: "Sure. Our staffing service is for businesses looking for affordable offshore support. We can help you find dedicated agents for live chat, email, phone, or multiple channels. What kind of coverage does your team need?", actions: [{ text: "Explore offshore staffing", href: "/staffing#customer-support-offshoring" }] };
  }
  const aboutPromo = promoWords.test(q) && !/\b(?:what|which) services\b/.test(q);
  if (timeWords.test(q) && (aboutPromo || (promoWords.test(previous) && /\b(?:it|that|the offer)\b/.test(q)))) return { text: expiry };
  const cheaper = /\b(?:under|below|less than|lower than|cheaper than)\s*(?:usd\s*)?\$?\s*6(?:00|50)\b/.test(q);
  if (aboutPromo || cheaper) return { text: promotion, actions: [audit] };
  const platform = (q.match(platforms) ?? (pricingFollowup.test(q) ? context.match(platforms) : null))?.[1];
  const directPriceQuestion = pricingFollowup.test(q) ||
    /^(?:pricing|price(?:s)?|cost(?:s)?|rates|fees|investment)[?!\.\s]*$/.test(q) ||
    /\b(?:how much|what(?:'s| is| are) (?:the |your |our )?(?:(?:regular|monthly|starting|estimated|seo|service|plan|starter|essential) )*(?:prices?|pricing|costs?|fees?|rates?|investment)|(?:show|send|tell|give|share)(?: me| us)? (?:the |your )?(?:prices?|pricing|rates?)|(?:what|how much) do you charge|(?:do|does) .{1,60} (?:cost|charge))\b/.test(q);
  if (directPriceQuestion && !/\b(?:what is|define|what does) (?:an? )?(?:ad spend|cost per click|cost per acquisition)\b/.test(q)) {
    if (/\bessential(?: seo)?\b/.test(context)) return { text: investment + " Essential SEO is $1,500 USD per 30-day billing cycle. We can confirm what is included for your site.", actions: [quote] };
    if (/\bstarter(?: seo)?\b/.test(context)) return { text: investment + " Regular Starter SEO starts at $650 USD. The written quote confirms what’s included and the billing schedule.", actions: [quote] };
    if (platform || /\b(?:ppc|ads|paid search|migration|redesign|website build|building a website|ecommerce|technical seo|local seo|google business profile|digital marketing|online marketing|chatbots?|crm|landing pages?)\b/.test(context)) {
      const work = platform ? "For " + platformNames[platform.replace(/woo\s+commerce/, "woocommerce")] + " work" : "For that service";
      return { text: investment + " " + work + ", we quote based on your site, scope, and goals. What would you like us to handle?", actions: [quote] };
    }
    if (/\b(?:this|that|it)\b/.test(q) && !/\b(?:seo|plan|package)\b/.test(context)) return { text: "Which service or plan do you mean? I can explain the investment once I know what you’re considering." };
    return { text: investment + " Regular Starter SEO starts at $650 USD, and Essential SEO is $1,500 USD per 30-day billing cycle. Custom work is quoted after we review your goals and scope.", actions: [quote] };
  }
  if (/\b(?:google business profile|google my business|gbp|gmb)\b/.test(q) && /\b(?:create|setup|set up|claim|verify|help|make)\b/.test(q)) {
    return withBlog("Absolutely. We can help you create or claim your Google Business Profile and fill in your business details. You may need to complete Google’s verification as the owner.", q, "how-to-set-up-your-google-business-profile");
  }
  if (/\bsitemaps?\b/.test(q) && /\b(?:submit|submission|send|resubmit)\b/.test(q)) {
    return withBlog("Sure. One of our SEO specialists can review and help submit your sitemap through Google Search Console or the relevant webmaster tools. Submission helps search engines discover URLs. They decide which pages to index.", q, "how-to-create-and-submit-an-xml-sitemap");
  }
  if (/\b(?:rank\w*|show(?:ing)? up|appear\w*|index\w*)\b/.test(q) && /\b(?:why|not|can't|cannot|won't)\b/.test(q) && /\b(?:google|search)\b/.test(q)) {
    return { text: "We can help you find out what’s holding your site back. Common causes include indexing barriers, pages that miss the search intent, thin content, or stronger competition. Request a free audit and our team can follow up with findings and a proposal where appropriate.", actions: [audit] };
  }
  if (/\b(?:which|what|all|other) search engines\b/.test(q) || /\b(?:optimi[sz]e|rank|seo)\b.*\bduckduckgo\b/.test(q)) {
    return { text: "We can help optimize for Google and Bing and apply relevant SEO practices for DuckDuckGo, Yahoo, Brave Search, and Ecosia. If you’re targeting a regional engine such as Baidu, Yandex, or Naver, tell us the country and language so we can confirm the scope and tools." };
  }
  if (/\b(?:what|which) (?:website |ecommerce )?platforms\b/.test(q)) {
    return { text: "We can scope work on WordPress, Shopify, WooCommerce, Magento / Adobe Commerce, Webflow, Wix, Squarespace, BigCommerce, Framer, and custom sites. Tell me your platform and whether you need a build, redesign, migration, or SEO." };
  }
  const siteAnswer = findPublicAnswer(q);
  if (siteAnswer) return siteAnswer;
  const words = tokenize(q);
  const exact = faqIndex.find(entry => entry.question === words.join(" "));
  if (exact) return withBlog(exact.text, q, /\bgeo\b/.test(q) ? "seo-vs-aeo-vs-geo" : undefined);
  if (/\b(?:geo|generative engine optimi[sz]ation)\b/.test(q)) {
    return withBlog(/\b(?:how|work|measure|improve)\b/.test(q)
      ? "GEO works by making useful information easy for AI search systems to discover, understand, and cite. Use clear answers, original evidence, and visible authorship. Track mentions and citations across the queries that matter to your business."
      : "GEO stands for generative engine optimization. It helps AI search systems understand your content and identify it as a potential source for their answers.", q, "seo-vs-aeo-vs-geo");
  }
  if (/\b(?:canonical|rel=canonical)\b/.test(q)) return { text: faqEntries.find(([question]) => question === "What is a canonical URL?")![1] };
  const currentPlatform = q.match(platforms)?.[1];
  if (currentPlatform && /\b(?:build|create|develop|design|seo|optimi[sz]\w*|rank)\b/.test(q)) {
    const name = platformNames[currentPlatform.replace(/woo\s+commerce/, "woocommerce")];
    const optimize = /\b(?:seo|optimi[sz]\w*|rank)\b/.test(q);
    return { text: optimize
      ? "Absolutely, we’d love to help with SEO for your " + name + " site. We can review indexing, page content, internal links, and platform-specific issues. What would you like to improve first?"
      : "Yes, we’d love to help you build a " + name + " site. Tell us what it needs to do, whether that’s selling products, generating enquiries, or publishing content.", actions: [{ text: optimize ? "Explore SEO services" : "Discuss your website", href: optimize ? "/services" : "/contact#request-proposal" }] };
  }
  const article = blogFor(q);
  if (article && /\b(?:blog|article|guide|tutorial|how|steps?)\b/.test(q)) {
    return { text: article.answer, actions: [{ text: article.title, href: "/blogs/" + article.slug }] };
  }
  const best = faqIndex.map(entry => ({ ...entry, overlap: words.filter(word => entry.words.includes(word)).length }))
    .filter(entry => entry.overlap >= 2 && entry.overlap / Math.max(words.length, entry.words.length) >= .75)
    .sort((a, b) => b.overlap - a.overlap)[0];
  if (best) return withBlog(best.text, q);
  const passage = findPublicPassage(q);
  if (passage) return passage;
  if (pricingWords.test(q) && !/\b(?:ad spend|cost per click|cost per acquisition)\b/.test(q)) {
    return { text: "I can help you work out what goes into a quote. Which service are you considering, and what would you like us to handle?", actions: [pricingChecklist] };
  }
  const page = suggestPublicPage(q);
  if (page) return page;
  const existing = fallback(q);
  if (existing.text.startsWith("Could you tell me a little more?")) return { text: clarify };
  return existing;
}
