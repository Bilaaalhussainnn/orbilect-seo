export const secondaryServices = {
  "ppc-management": {
    "name": "PPC management",
    "icon": "MousePointer2",
    "summary": "Reach people searching for what you sell with focused pay-per-click campaigns.",
    "fit": "You want to test demand for a defined offer and can track enquiries, orders, or booked calls.",
    "work": [
      "Group keywords around buyer intent and set up negative keywords to reduce irrelevant clicks.",
      "Write ads that match the search and lead to a page where visitors can take the next step.",
      "Review search terms, bids, and spend against the actions your business values."
    ],
    "measure": "Track spend, relevant visits, conversions, and cost per conversion."
  },
  "bing-advertising": {
    "name": "Bing advertising",
    "icon": "Search",
    "summary": "Reach searchers on Bing through Microsoft Advertising campaigns.",
    "fit": "You want to test Bing as an additional paid search channel with its own budget and reporting.",
    "work": [
      "Review existing search campaigns and select the keywords and markets worth testing on Bing.",
      "Adapt campaign settings, ad copy, and exclusions for the Microsoft Advertising account.",
      "Set up conversion measurement and review search terms before increasing spend."
    ],
    "measure": "Compare Bing search terms, qualified visits, conversions, and acquisition costs."
  },
  "chatgpt-advertising": {
    "name": "ChatGPT advertising",
    "icon": "MessagesSquare",
    "summary": "Plan and test sponsored placements in ChatGPT where advertiser access is available.",
    "fit": "You have a clear offer and landing page and want to assess whether a ChatGPT Ads test is appropriate for your business.",
    "work": [
      "Check current advertiser access, market availability, and offer eligibility before planning a launch.",
      "Prepare creative, copy, and a landing page that explains the offer clearly.",
      "Define the test budget and the actions to measure. Set up the campaign where your account is eligible."
    ],
    "measure": "Review delivery, traffic, and downstream actions where reporting and tracking are available."
  },
  "social-media-marketing": {
    "name": "Social media marketing",
    "icon": "Share2",
    "summary": "Build an organic social presence around the questions your customers ask.",
    "fit": "You want a steady publishing schedule and have products, projects, or expertise to share.",
    "work": [
      "Choose content themes and channels based on what your customers need to know.",
      "Plan a publishing calendar for useful posts, short videos, and customer questions.",
      "Review engagement, profile visits, and site referrals to decide what to publish next."
    ],
    "measure": "Track meaningful engagement, referral traffic, and enquiries where measurable."
  },
  "paid-social-advertising": {
    "name": "Paid social advertising",
    "icon": "Megaphone",
    "summary": "Test audiences, creative, and offers with paid social campaigns.",
    "fit": "You have a product launch, lead offer, or promotion with a page ready to receive visitors.",
    "work": [
      "Choose an objective and audience that fit the offer and the platform.",
      "Build creative variants with clear messages and matching landing pages.",
      "Compare performance by audience and creative and adjust spend based on the results."
    ],
    "measure": "Review reach, landing-page visits, lead quality, and cost per action."
  },
  "seo-content-writing": {
    "name": "SEO content writing",
    "icon": "FileText",
    "summary": "Publish useful service pages, guides, and product copy built around search intent.",
    "fit": "You need completed content for a specific page, collection, or editorial project.",
    "work": [
      "Map the topic and target search intent to a clear brief.",
      "Write copy using your subject expertise, examples, and customer questions.",
      "Review headings, metadata, internal links, and the next step for readers."
    ],
    "measure": "Monitor indexing, impressions, search clicks, and relevant actions over time."
  },
  "hire-seo-content-writer": {
    "name": "Hire an SEO content writer",
    "icon": "PenLine",
    "summary": "Bring a dedicated SEO writer into your ongoing content workflow.",
    "fit": "Your team needs recurring writing capacity and a writer who can follow your editorial process.",
    "work": [
      "Agree on the assignment cadence, topics, voice, review process, and deadlines.",
      "Turn briefs and interviews into publish-ready copy for your team.",
      "Use editorial feedback and page performance to improve future assignments."
    ],
    "measure": "Review delivery cadence, editorial quality, and the performance of published work."
  },
  "email-marketing": {
    "name": "Email marketing",
    "icon": "Mail",
    "summary": "Bring subscribers back with useful newsletters, offers, and follow-up sequences.",
    "fit": "You have a permission-based email list and something useful to share with subscribers.",
    "work": [
      "Segment subscribers around their interests and relationship to the business.",
      "Write campaigns and sequences with a clear reason to click and a relevant destination.",
      "Review deliverability, clicks, unsubscribes, and downstream actions."
    ],
    "measure": "Track qualified visits, replies, unsubscribes, and conversions from email."
  },
  "digital-pr": {
    "name": "Digital PR and outreach",
    "icon": "Globe",
    "summary": "Give relevant publications a reason to cover your expertise and send readers to your site.",
    "fit": "You have original insight, useful data, or a story that matters to a defined audience.",
    "work": [
      "Identify a story or resource worth pitching and prepare supporting material.",
      "Find relevant publications and tailor outreach to their readers.",
      "Track published coverage, referral visits, and the conversations it starts."
    ],
    "measure": "Review relevant coverage, referral traffic, and the quality of new opportunities."
  },
  "conversion-rate-optimization": {
    "name": "Conversion rate optimization",
    "icon": "Target",
    "summary": "Make it easier for existing visitors to enquire, book, or buy.",
    "fit": "Your site already gets relevant traffic and you want to understand where people drop out.",
    "work": [
      "Review priority pages, visitor behavior, and your conversion data.",
      "Identify friction in the offer, navigation, forms, or checkout.",
      "Prioritize changes and test them when traffic and measurement support a useful comparison."
    ],
    "measure": "Compare completion rates and lead quality against a baseline."
  },
  "landing-page-design": {
    "name": "Landing page design",
    "icon": "PanelsTopLeft",
    "summary": "Give each campaign a page that matches the promise in the ad or message.",
    "fit": "You are launching an offer, testing a new market, or sending traffic to a page with a specific goal.",
    "work": [
      "Define the audience, offer, and main action before designing the page.",
      "Build a mobile-friendly page with clear copy, relevant proof, and a straightforward form or checkout path.",
      "Check loading, accessibility, and conversion tracking before sending traffic."
    ],
    "measure": "Compare visitor engagement and completed actions by campaign and device."
  },
  "marketing-analytics": {
    "name": "Marketing analytics and attribution",
    "icon": "ChartNoAxesCombined",
    "summary": "See which campaigns and pages are contributing to visits, enquiries, and sales.",
    "fit": "You are investing across channels and need a clearer view of what each one contributes.",
    "work": [
      "Define your key actions and review the tracking already in place.",
      "Set a consistent approach to campaign tags and conversion reporting.",
      "Build reporting that explains the data, its limits, and what to test next."
    ],
    "measure": "Report on channel performance, tracked outcomes, and gaps in measurement."
  }
} as const;

export type SecondarySlug = keyof typeof secondaryServices;
