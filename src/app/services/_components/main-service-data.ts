type Work = [title: string, issue: string, fix: string, check: string];
type Step = [title: string, description: string];
type Faq = [question: string, answer: string];
type SixMonths = [number, number, number, number, number, number];

export type MainService = {
  name: string;
  title: [string, string];
  description: string;
  introTitle: string;
  intro: string;
  example: [search: string, destination: string, action: string];
  journey: Step[];
  timeline: Step[];
  work: Work[];
  metric: string;
  progress: SixMonths;
  paid: string;
  faqs: Faq[];
};

export const mainServices = {
  "off-page-seo": {
    name: "Off-page SEO",
    title: ["Build credibility", "beyond your website"],
    description: "Earn relevant mentions, correct inconsistent listings, and give prospects trustworthy sources to check before they contact you.",
    introTitle: "Give customers more than one reason to trust you",
    intro: "Off-page SEO improves what people can learn about your business beyond your own pages. We review where you’re listed, who mentions or links to you, and what customers repeatedly bring up in reviews. Then we prioritize the opportunities that make sense for your industry and audience.",
    example: ["commercial roofing contractor reviews", "Industry association member profile", "Compare credentials and request a quote"],
    journey: [
      ["Get discovered", "A facilities manager finds a roofing company through a trade association directory."],
      ["Verify the details", "They check service coverage, qualifications, and the experiences customers describe."],
      ["Reach the right page", "The association profile takes them to the commercial roofing page, where they can request a quote."],
    ],
    timeline: [
      ["Audit your footprint", "Review links, business citations, coverage, and review themes. Verify which listings and pages need corrections first."],
      ["Correct and pitch", "Update priority listings, reclaim links where possible, and pitch material that an industry publication has a reason to cite."],
      ["Check what was earned", "Verify live placements and look at referral traffic, enquiries, and relevant brand searches over time."],
    ],
    work: [
      ["Backlink audit", "Unclear which sites refer traffic", "Review referring pages and how they relate to your business.", "Prioritized list of useful links and issues."],
      ["Citation cleanup", "Old contact details on directories", "Correct priority listings using the current business details.", "Consistent phone, address, and destination URLs."],
      ["Link reclamation", "A publication links to a retired URL", "Find the correct replacement and request a link update where appropriate.", "Verified destination or a working redirect."],
      ["Digital PR outreach", "Useful expertise goes uncited", "Turn original insight or a project into a pitch for relevant editors.", "Outreach log and earned placements where secured."],
      ["Review and reputation support", "The same complaint keeps appearing", "Identify the operational issue and help the team respond and resolve it.", "A response process and a list of recurring fixes."],
    ],
    metric: "Relevant placements live",
    progress: [2, 3, 4, 4, 6, 7],
    paid: "A sponsored trade newsletter can buy a clearly labeled placement for a deadline or launch. Off-page SEO works on listings, references, and editorial opportunities that people may continue finding later. Track referral enquiries and judge each placement on audience fit.",
    faqs: [
      ["What does Off-page SEO include?", "We review backlinks, citations, brand mentions, and review themes. The plan can include listing corrections, link reclamation, and editorial outreach."],
      ["Do you sell packages of backlinks?", "We focus on relevant editorial opportunities and verifiable listings. Outreach and placements are reported individually."],
      ["Can you guarantee a publication will link to us?", "Editors control what they publish. We agree on research and outreach deliverables and report actual responses and placements."],
      ["Which directories should my business be on?", "We prioritize sources your customers use, such as credible trade associations, relevant local directories, and platforms where your category is active."],
      ["What if a directory lists our old address?", "We document the conflicting details, confirm the correct information, and use the directory’s correction or ownership process where available."],
      ["Can you recover a link lost after a redesign?", "We trace its old destination, identify the best replacement, and recommend a redirect or request an update when appropriate."],
      ["Do you help with negative reviews?", "We identify recurring complaints, help draft appropriate responses, and suggest operational fixes for issues customers keep reporting."],
      ["What do you need for digital PR?", "Useful inputs include original data, project details, specialist commentary, or a customer story you have permission to share."],
      ["How do you report results?", "We report verified listings and placements, link destinations, and relevant referral activity when analytics is available."],
      ["When should we review impact?", "Corrections and outreach can be reviewed early. We revisit referral traffic and enquiries after placements have had time to reach an audience."],
    ],
  },
  "technical-seo": {
    name: "Technical SEO",
    title: ["Clear the roadblocks", "between search and your site"],
    description: "Find and fix crawl, indexing, redirect, and performance issues on the pages your business depends on.",
    introTitle: "Make important pages easier to discover and use",
    intro: "Technical SEO examines how your site serves pages to visitors and search engines. We trace issues to their cause, such as a template generating duplicate URLs or a migration sending visitors to broken destinations. You get a fix list tied to the pages and customer journeys that matter.",
    example: ["replacement filter for model X", "Product page with one preferred URL", "Reach the product page and check stock"],
    journey: [
      ["Find the destination", "A shopper searches for a specific part. The product URL needs a clear path from the catalogue."],
      ["Open a usable page", "The destination loads, shows the right product, and works on mobile."],
      ["Complete the next step", "The shopper can check availability or add the product to their cart."],
    ],
    timeline: [
      ["Reproduce the issue", "Sample important templates, review Search Console, and record broken paths and crawl or index anomalies."],
      ["Fix and verify", "Work through the prioritized tickets. Check changes in staging where available, then verify the live URLs."],
      ["Monitor after release", "Check priority URLs and watch for recurring issues in indexing, performance, and critical site flows."],
    ],
    work: [
      ["Crawl and index review", "Important pages are missing from reports", "Inspect representative URLs and trace internal paths and crawl controls.", "Verified status and a fix list by template."],
      ["Sitemaps and Search Console", "A sitemap contains retired or duplicate URLs", "Review the listed URLs, prepare a clean sitemap, and inspect priorities.", "A cleaner sitemap and documented checks."],
      ["Redirect and canonical cleanup", "Multiple routes reach the same destination", "Map old URLs to the right destinations and review preferred URL signals.", "A tested redirect map and canonical recommendations."],
      ["Performance and mobile checks", "A template is slow or jumps on mobile", "Trace heavy resources, unstable layout, and slow interactions.", "Prioritized performance fixes by template."],
      ["Migration QA", "A new build changes important URLs", "Compare staging and live URL inventories and test critical flows.", "A launch checklist and post-launch validation."],
    ],
    metric: "Priority URLs passing agreed checks",
    progress: [18, 26, 35, 40, 44, 46],
    paid: "Paid campaigns can send visits to a working page while technical fixes roll out. If the landing page is broken, slow, or difficult to use, increasing spend won’t repair that experience. We test the landing path and report paid campaign performance separately.",
    faqs: [
      ["What is included in a Technical SEO audit?", "We review discovery, indexing, redirects, preferred URLs, sitemaps, and representative page performance. We prioritize findings by business impact."],
      ["Can you fix the issues as well as audit them?", "Yes, when the stack and agreed access allow. We can also provide implementation tickets and verify work completed by your developers."],
      ["Why isn’t an important page showing up in search?", "We check whether the URL is reachable, linked, indexable, and identified as the preferred version. Findings depend on the page and template."],
      ["Do you need Search Console access?", "Access helps us inspect real URL and performance reports. We can start with public crawl checks and agree on access needed for deeper diagnosis."],
      ["Can you help before a migration?", "Yes. We inventory priority URLs, prepare redirects, check staging, and define post-launch checks before changes go live."],
      ["Do you work on JavaScript-heavy sites?", "We compare the HTML and rendered page, then check navigation, content, and metadata across representative routes."],
      ["Can you improve Core Web Vitals?", "We identify likely causes and recommend template-level fixes. We verify what we can with lab checks and review available real-user data afterward."],
      ["Do all crawl warnings need fixing?", "We prioritize issues that affect important URLs or user journeys. Intentional exclusions and alternate URLs often require documentation rather than changes."],
      ["Will fixing technical issues guarantee rankings?", "Technical work clears specific obstacles. Search visibility also depends on the page’s relevance, competition, and demand."],
      ["What do we get at handoff?", "You get prioritized findings, affected URLs or templates, implementation notes, and a record of what was verified."],
    ],
  },
  "digital-marketing": {
    name: "Digital Marketing",
    title: ["Turn the right attention", "into measurable enquiries"],
    description: "Connect search, paid campaigns, landing pages, and reporting around the actions that grow your business.",
    introTitle: "Follow the customer from first click to enquiry",
    intro: "Digital marketing works best when the offer, the channel, and the landing page agree. We start with the customer you want and the action you can measure. Then we choose channels, define the budget and tracking, and use the results to decide what to improve.",
    example: ["managed IT support for small business", "Managed IT campaign landing page", "Submit a qualified consultation request"],
    journey: [
      ["Match the message", "A business owner searches for IT support. The ad or organic result speaks to the service they need."],
      ["Answer the buying questions", "The landing page explains coverage, service options, and what the first call involves."],
      ["Measure the enquiry", "A form or tracked call reaches the team. We review whether it matches the customer the campaign was built for."],
    ],
    timeline: [
      ["Set the objective", "Agree on the offer, audience, lead criteria, budget, and the actions we’ll track."],
      ["Launch a focused test", "Publish the first campaign and landing page, verify tracking, and review actual search terms and enquiries."],
      ["Reallocate using evidence", "Refine targeting and messaging based on costs and lead quality. Shift spend only when the data supports it."],
    ],
    work: [
      ["Channel and offer strategy", "Too many channels share one budget", "Choose channels and messages around one clear business objective.", "A channel plan and success criteria."],
      ["Paid search management", "Clicks arrive for the wrong services", "Review targeting, search terms, bids, and exclusions.", "A campaign structured around the enquiries you want."],
      ["Landing page optimization", "Clicks rarely turn into enquiries", "Align the page with the ad and test the call to action.", "A more direct path to the tracked action."],
      ["Conversion tracking", "Forms and calls are hard to attribute", "Set up or verify the events agreed for reporting.", "A record of tested conversions and known gaps."],
      ["Lead quality reporting", "Cheap leads take time to qualify", "Use sales feedback to separate qualified enquiries from form volume.", "Reporting you can use to decide what to scale."],
    ],
    metric: "Qualified enquiries across tracked campaigns",
    progress: [8, 10, 12, 11, 15, 17],
    paid: "Paid search gives you a budgeted way to test an offer. Organic search gives useful pages another way to be discovered. Compare channel spend, qualified enquiries, and close rates alongside raw traffic, and keep media spend separate from management and production costs.",
    faqs: [
      ["Which digital marketing channels do you recommend?", "We start with where customers are likely to look and what your team can measure. That may mean search, paid social, email, or a focused combination."],
      ["Is ad spend included in management fees?", "We show media spend and management fees separately in the proposal so you can see what goes to platforms and what covers the work."],
      ["Can you audit our existing ad account?", "Yes. We review structure, search terms, conversion tracking, landing pages, and budget allocation before recommending changes."],
      ["Do you build landing pages?", "We can recommend or implement landing-page improvements when included in the scope. Larger builds are quoted separately."],
      ["What counts as a qualified lead?", "We agree on criteria with you, such as service need, location, or budget. Your team’s feedback helps validate lead quality."],
      ["How much should we spend to start?", "We propose a test budget based on the audience, offer, market, and measurement plan. We review the data before recommending a larger commitment."],
      ["Can you run ads while we improve SEO?", "Yes. We can use paid campaigns to test terms and offers while improving pages that serve organic customers."],
      ["How do you attribute calls and forms?", "We use agreed tracking tools and events where access allows. Reports identify gaps when a conversion cannot be tied confidently to a channel."],
      ["Do we keep access to our accounts?", "We work with access to accounts you control where possible. Ownership and permissions are confirmed during onboarding."],
      ["When do you change or scale a campaign?", "We review search terms, conversion quality, and costs. We adjust when the data supports it and document the reason."],
    ],
  },
  "ecommerce-seo": {
    name: "Ecommerce SEO",
    title: ["Help shoppers find", "the products they came for"],
    description: "Improve category pages, product information, catalogue structure, and the path from organic search to purchase.",
    introTitle: "Give the catalogue a structure shoppers can use",
    intro: "Ecommerce SEO connects product demand to the right collection or product page. We review how shoppers browse, how the store handles variants and filters, and which details help someone decide to buy. We prioritize work around product availability and the categories that matter to your business.",
    example: ["waterproof hiking boots for women", "Women’s waterproof hiking boots collection", "Compare sizes and choose an in-stock product"],
    journey: [
      ["Find a useful collection", "A shopper searching broadly lands on a collection built around the product type they want."],
      ["Compare the right details", "They can check fit, stock, delivery, and returns on the relevant product page."],
      ["Continue to purchase", "The correct variant can be added to the cart, and the journey can be measured where tracking is available."],
    ],
    timeline: [
      ["Audit the catalogue", "Review collections, products, variants, filters, and existing organic sales data where available."],
      ["Improve key templates", "Publish targeted collection and product updates, then test links, preferred URLs, and mobile purchase paths."],
      ["Review discovery and sales", "Monitor category and product traffic alongside tracked sales, taking stock changes and promotions into account."],
    ],
    work: [
      ["Collection page optimization", "Broad searches land on an unsuitable product", "Build useful collection destinations with clear product groupings and copy.", "A category plan tied to shopping intent."],
      ["Product page optimization", "Product pages omit fit or compatibility", "Add useful descriptions, specifications, and relevant image text.", "Product page recommendations your team can apply."],
      ["Filters and variant URLs", "Filters produce many near-identical pages", "Review which filtered views need a distinct destination and how variants are handled.", "A documented URL strategy for the catalogue."],
      ["Product structured data", "Visible product details and markup disagree", "Review how price and availability are populated and validate supported markup.", "A list of markup and template fixes."],
      ["Organic revenue measurement", "Traffic reports don’t show what sold", "Connect organic landing pages with available product and purchase data.", "Reporting that relates visibility to purchases."],
    ],
    metric: "Priority catalogue pages updated and verified",
    progress: [12, 22, 31, 43, 49, 58],
    paid: "Shopping or search campaigns can promote selected in-stock products and test demand for offers. Ecommerce SEO improves how collections and products are discovered organically. Compare orders, margins, and returns by channel, and account for stock changes and promotions before judging performance.",
    faqs: [
      ["What does Ecommerce SEO cover?", "We work on collections, product pages, internal links, filters, variants, and relevant technical checks. We prioritize the catalogue around your business goals."],
      ["Can you work on Shopify or WooCommerce?", "Yes. We review the platform and theme before agreeing on changes, including which edits your team or developer needs to make."],
      ["Should we optimize products or collections first?", "It depends on how shoppers search. Broader demand often needs a collection, while a specific model or product name usually needs a product page."],
      ["Can you help with duplicate product URLs?", "We trace variants, filters, and collection paths, then recommend which URLs should be preferred and how navigation should point to them."],
      ["What should we do when a product is out of stock?", "We consider whether it will return, whether it has a useful replacement, and what visitors need to know before recommending a page change."],
      ["Do we need to rewrite every product description?", "We start with priority products and reusable template improvements. Original fit, compatibility, and use details often matter more than adding length everywhere."],
      ["Does product schema guarantee enhanced search results?", "It can help eligible pages qualify for supported search features. The search engine decides what to display."],
      ["Can you preserve visibility during a store migration?", "We map important category and product URLs, verify redirects, check key templates, and monitor the new storefront after launch."],
      ["How do you measure the work?", "We review relevant impressions, clicks, organic landing pages, and tracked orders or revenue, taking stock and promotional periods into account."],
      ["Do you also help with Shopping ads?", "Yes, when campaign management is in scope. We track paid media separately and can use campaign insights to inform collection and product priorities."],
    ],
  },
  "website-redesign": {
    name: "Website Redesign",
    title: ["Build a website customers", "can actually use"],
    description: "Redesign your website around clear navigation, mobile usability, and a direct path to booking or enquiry while protecting important URLs.",
    introTitle: "Fix the parts of your site that cost you enquiries",
    intro: "A redesign is an opportunity to fix how people find information and reach your team. We map your existing pages, identify where customers get stuck, and rebuild the layouts and booking paths that need work. If the site already earns organic traffic, we plan the migration before changing URLs.",
    example: ["book a brake inspection near me", "Mobile brake inspection page", "Complete the form and receive confirmation"],
    journey: [
      ["Arrive on the right page", "A driver opens the brake inspection page from search or a listing."],
      ["Find the information they need", "They can confirm location, what the inspection covers, and how to schedule it on mobile."],
      ["Book with confidence", "The form works, the confirmation explains what happens next, and the enquiry reaches the shop."],
    ],
    timeline: [
      ["Map the current site", "Audit priority pages, URLs, content, and booking friction. Agree on the scope and what launch success means."],
      ["Design and build", "Review layouts and copy, implement the approved pages, and test redirects, forms, mobile views, and tracking."],
      ["Launch and verify", "Check the live site and priority journeys. Review post-launch issues and track enquiries as data comes in."],
    ],
    work: [
      ["Navigation and page architecture", "Visitors cannot find the right service", "Group pages by customer need and design clear paths between them.", "A page map and navigation plan."],
      ["Responsive page design", "The desktop layout breaks on mobile", "Design and test key layouts across screen sizes.", "Responsive templates for the agreed pages."],
      ["Forms and booking flows", "Customers submit a form without confirmation", "Test validation, delivery, confirmation, and the next step.", "Verified enquiry and booking flows."],
      ["Content and page migration", "Old pages contain useful copy or search traffic", "Carry forward valuable content and map changed URLs.", "An inventory and redirect plan for launch."],
      ["Launch and handoff", "Nobody knows what to check after going live", "Verify the live build and document edits, monitoring, and agreed support.", "Launch checks and a practical handoff."],
    ],
    metric: "Tracked enquiries through the redesigned site",
    progress: [9, 10, 12, 12, 14, 16],
    paid: "A redesign improves the destination for both paid and organic visitors. If you’re buying traffic, test the forms and booking links before sending spend to the new site. Compare both channels after launch and consider traffic mix when judging changes in enquiry rate.",
    faqs: [
      ["Do I need a full redesign or just a few fixes?", "We review the pages and journeys causing the most friction. We may recommend targeted updates if the existing site can support them."],
      ["How much does a redesign cost?", "Pricing depends on page count, content, integrations, migration, and support. We confirm what’s included and the price before starting."],
      ["Will a redesign affect my existing SEO?", "A rebuild can affect visibility, especially when URLs or content change. We inventory important pages, map redirects, and verify key destinations after launch."],
      ["Can you keep my existing branding?", "Yes. We can work with your current logo, typography, and colors, or apply a refreshed design if agreed in the scope."],
      ["Do you handle copywriting?", "We can retain, edit, or rewrite priority copy as agreed. You’ll know which pages need input from your team before we publish."],
      ["Can you integrate our booking tool or CRM?", "We assess what the tool supports and confirm how enquiries and confirmations should flow. Integrations are scoped before development."],
      ["Will the site work on phones and tablets?", "We build responsive layouts and test priority pages and forms across representative screen sizes."],
      ["Can I edit the site after launch?", "Where the build includes an editable CMS, we document what your team can change and explain how to make routine updates."],
      ["What support is included after launch?", "The proposal specifies the support period, what fixes are covered, and how to request changes or ongoing maintenance."],
      ["How do we know the redesign worked?", "We verify navigation, forms, and bookings at launch, then compare tracked enquiry and conversion data with the baseline when enough data is available."],
    ],
  },
} satisfies Record<string, MainService>;

export type MainServiceSlug = keyof typeof mainServices;
