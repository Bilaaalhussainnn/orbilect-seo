import Image from "@/components/optimized-image";
import Link from "next/link";
import styles from "./article.module.css";

export const sections = [
  { id: "what-seo-means", title: "What SEO means" },
  { id: "how-search-works", title: "How search engines work" },
  { id: "why-invest", title: "Why businesses invest in SEO" },
  { id: "who-needs-seo", title: "Which businesses benefit" },
  { id: "what-goes-into-seo", title: "What goes into SEO" },
  {"id":"seo-resources","title":"What resources contribute to SEO"},
  {"id":"seo-technical-basics","title":"What technical SEO details to know beforehand"},
  {"id":"seo-website-builders","title":"When website builders need SEO plugins"},
  {"id":"food-vs-ecommerce-seo","title":"How SEO differs for food and ecommerce brands"},
  { id: "brand-and-social", title: "Business name, tagline and social media" },
  { id: "measure-results", title: "How to measure results" },
  { id: "continuous-seo", title: "Why SEO is a continuous process" },
  {"id":"seo-hurdles","title":"Eight SEO hurdles Orbilect SEO helps solve"},
];

export const related = [
  "How to Submit Your Website to Google Search Console",
  "How to Create and Submit an XML Sitemap",
  "The On-Page SEO Checklist for Business Websites",
  "How Long Does Google Take to Index a Website?",
];

export function SeoGuide() {
  return <>
    <section aria-labelledby="what-seo-means">
      <h2 id="what-seo-means">What <span>SEO means</span></h2>
      <p><strong>Search engine optimization (SEO)</strong> is the ongoing work of making a website easier for search engines to discover and understand, and more useful to the people who find it through unpaid search results. The aim is to show up for searches connected to what you offer and make it easy for those visitors to take the next step.</p>
      <p>Suppose you run a commercial cleaning company. Someone who searches “how often should an office be deep cleaned?” needs an explanation. Someone who searches “commercial cleaning services near me” is more likely to want a provider, a service area, and a way to request a quote. A useful website answers those searches on different pages and connects them where it makes sense.</p>
      <p>SEO applies to organic listings. Paid search ads have a separate buying and auction process. You can run both channels and use the questions people ask in one to improve what they find in the other.</p>
    </section>

    <section aria-labelledby="how-search-works">
      <h2 id="how-search-works">How search <span>engines work</span></h2>
      <p>Google describes three main stages: crawling, indexing, and serving results. Discovery happens before a crawler can fetch a new URL. A page can be discovered and crawled without being indexed, and an indexed page may show up for some searches and have very little visibility for others.</p>
      <figure className={styles.figure}>
        <figcaption>How a page gets from your website to search results</figcaption>
        <ul className={styles.process}>
          <li><strong>Discover</strong><span>Find a URL through links or a sitemap.</span></li>
          <li><strong>Crawl</strong><span>Fetch the page and resources it needs.</span></li>
          <li><strong>Index</strong><span>Interpret the content and determine whether to store it.</span></li>
          <li><strong>Serve</strong><span>Consider eligible pages for a particular search.</span></li>
        </ul>
      </figure>
      <p>For example, a new office cleaning page might have no link from your services navigation. Add a descriptive internal link and include the intended URL in your sitemap. If Google knows about the URL but it still fails to appear, inspect it in Search Console. Check that it loads successfully, can be indexed, and points to the intended canonical URL. A sitemap helps discovery. Google decides whether to index and serve the page.</p>
      <p className={styles.source}><a href="https://developers.google.com/search/docs/fundamentals/how-search-works">Google Search Central’s guide to crawling, indexing and serving</a></p>
    </section>

    <section aria-labelledby="why-invest">
      <h2 id="why-invest">Why businesses invest <span>in SEO</span></h2>
      <p>Search reaches people who are already asking a question, comparing options, or looking for a business. A well-built service page can answer questions about scope, costs, locations, and fit before a prospect speaks to sales. A useful product page can help shoppers compare specifications or check delivery. Those pages can continue attracting visitors as long as they remain relevant and discoverable.</p>
      <p>Businesses also use SEO to identify gaps. If potential buyers search for “same-day delivery” and your product page buries delivery terms in a PDF, the improvement might be a clearer page and a better buying experience. If a service page receives traffic but few qualified enquiries, the work might be to explain eligibility, write a more precise offer, or simplify the form.</p>
      <p>SEO takes time and budget for people, tools, implementation, and maintenance. Evaluate the work against sales or other business goals and allow for seasonality, competition, and longer buying cycles. Search visibility on its own can’t tell you whether the investment paid off.</p>
    </section>

    <section aria-labelledby="who-needs-seo">
      <h2 id="who-needs-seo">Which businesses <span>benefit</span></h2>
      <p>SEO is worth considering when customers search for what you sell or for problems you solve. The right starting point depends on how they buy, how much information they need, and what the business can realistically deliver.</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="SEO priorities by business model">
        <table>
          <caption>Where to start by business model</caption>
          <thead><tr><th scope="col">Business</th><th scope="col">What people search for</th><th scope="col">What to build first</th></tr></thead>
          <tbody>
            <tr><th scope="row">Local services</th><td>Nearby providers, areas served and availability</td><td>Service pages and an accurate Business Profile if eligible</td></tr>
            <tr><th scope="row">Ecommerce</th><td>Categories, specific products, comparisons and specifications</td><td>Findable category pages and complete product details</td></tr>
            <tr><th scope="row">B2B and SaaS</th><td>Use cases, integrations, alternatives and pricing</td><td>Use-case pages that lead to a relevant demo or trial</td></tr>
            <tr><th scope="row">Clinics</th><td>Services offered, location, opening hours and booking</td><td>Reviewed service information and an accessible booking path</td></tr>
            <tr><th scope="row">Real estate</th><td>Neighbourhoods, property types and location-specific listings</td><td>Useful area guides and maintained listing pages</td></tr>
          </tbody>
        </table>
      </div>
      <p>A brand entering a market with little existing search demand may get more immediate feedback from outreach, partnerships, or paid campaigns. It can still build search foundations by describing its product clearly and publishing pages around the problems buyers already recognise.</p>
    </section>

    <section aria-labelledby="what-goes-into-seo">
      <h2 id="what-goes-into-seo">What goes <span>into SEO</span></h2>
      <h3>Website structure and technical SEO</h3>
      <p>Start with a clear site structure: home, categories or services, and the individual pages customers need. Important pages should have stable URLs, normal navigation links, and mobile layouts where the primary content is readily available. Check broken pages, redirect chains, duplicate URLs created by filters, and staging rules that may have made their way into production.</p>
      <p>Keep an XML sitemap of the preferred URLs you want crawlers to discover. Use redirects when a page genuinely moves. Review robots rules and indexing directives separately: limiting crawling and telling a search engine to omit an accessible page from results are different actions. After a redesign, check old URLs, preferred URLs, navigation, and sitemap endpoints before and after launch.</p>
      <h3>Search intent and on-page content</h3>
      <p>Start with what the visitor needs to do. A comparison page should explain trade-offs. A service page should explain who it serves, what is included, and what happens after an enquiry. Use specific titles, headings, and descriptions that reflect the page. Add examples, original photos, specifications, or decision criteria where they answer questions a customer would actually ask.</p>
      <p>Review which existing pages already target the same need before commissioning new content. A stronger existing page can be a better use of time than another near-duplicate. Keep the main answer near the top and link to more detailed pages where someone may need them.</p>
      <h3>Internal links and links from other websites</h3>
      <p>Internal links connect related pages and help readers and crawlers reach important content. Link from a guide about how often offices need deep cleaning to the relevant cleaning service page. Use link text that describes the destination. Check for pages buried deep in menus or reachable only through a search box.</p>
      <p>External links can come from trade associations, credible directories, partners, news coverage, or resources that cite original work. Build things people have a reason to reference, such as useful research, a tool, or an expert explanation. Evaluate links for relevance and audience. Buying links to manipulate rankings creates policy risk.</p>
      <h3>Images, accessibility and page experience</h3>
      <p>Use images that help someone understand or choose: product details from multiple angles, local storefront photos, and annotated screenshots in tutorials. Resize images for their layout, compress them, and reserve space with dimensions so the page stays stable while loading. Keep important content in real text and provide useful alt text for informative images. Decorative graphics can use empty alt text.</p>
      <p>For a service photo, “Technician testing an outdoor AC unit” communicates more than a string of service keywords. Place visuals near the text they illustrate. Check the mobile version on a slower connection and confirm that forms, navigation, and the main content are still usable.</p>
      <p className={styles.source}><a href="https://developers.google.com/search/docs/essentials">Google Search Essentials</a><a href="https://developers.google.com/search/docs/appearance/google-images">Google’s image SEO guidance</a></p>
    </section>

    <section aria-labelledby="seo-resources">
      <h2 id="seo-resources">What resources <span>contribute to SEO</span></h2>
      <p>Start with what you control: a clear website, original material worth finding, and people who can make changes. Backlinks, reviews, and referrals can expand discovery when they come from places your customers already use.</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Resources that support SEO">
        <table>
          <caption>Resources that support SEO</caption>
          <thead><tr><th scope="col">Resource</th><th scope="col">How to use it</th></tr></thead>
          <tbody>
            <tr><th scope="row">Your website</th><td>Service, category, and product pages give searchers a destination. Link to them from menus and relevant guides so visitors and crawlers can find them.</td></tr>
            <tr><th scope="row">Original content and assets</th><td>Use expert answers, product specifications, photos, tools, and examples to answer questions that generic copy leaves open.</td></tr>
            <tr><th scope="row">Relevant backlinks</th><td>A trade association, supplier, or publication may link to a resource it can genuinely recommend. Check the source, the audience, and the destination before pursuing a link.</td></tr>
            <tr><th scope="row">Business listings and reviews</th><td>Maintain accurate details on eligible profiles and relevant directories. Ask real customers for honest feedback and make it easy to find the right location.</td></tr>
            <tr><th scope="row">Measurement and people</th><td>Search Console reveals visibility and indexing issues. Analytics and CRM data show what happened after the click. Developers, editors, and subject experts turn those findings into fixes.</td></tr>
          </tbody>
        </table>
      </div>
      <p>For example, a food producer could publish a shelf-life and storage guide, then share it with retailers and trade publications. A link from a relevant stockist can reach people already interested in the brand. Avoid buying links to influence rankings and judge outreach by relevance, referrals, and the value of the relationship.</p>
      <p className={styles.source}><a href="https://developers.google.com/search/docs/crawling-indexing/links-crawlable">Google’s link best practices</a><a href="https://developers.google.com/search/docs/essentials/spam-policies">Google’s search spam policies</a></p>
    </section>

    <section aria-labelledby="seo-technical-basics">
      <h2 id="seo-technical-basics">What technical SEO details <span>to know beforehand</span></h2>
      <p>Before a launch or redesign, document who controls the domain, hosting, CMS, and Search Console property. List the pages that should be public, the pages that should stay private, and any older URLs that will change.</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Technical SEO checks before launch">
        <table>
          <caption>Technical SEO checks before launch</caption>
          <thead><tr><th scope="col">Item</th><th scope="col">Purpose</th><th scope="col">What to verify</th></tr></thead>
          <tbody>
            <tr><th scope="row">XML sitemap</th><td>List the preferred, public URLs you want crawlers to discover.</td><td>Open the live sitemap, check a sample of URLs, then submit it in Search Console. Submission gives Google a discovery path and does not guarantee indexing.</td></tr>
            <tr><th scope="row">robots.txt and noindex</th><td>Use robots.txt to manage crawling. Use noindex to keep a crawlable page out of results.</td><td>Keep a page crawlable if Google needs to see noindex. Use authentication for private content, including restricted staging sites.</td></tr>
            <tr><th scope="row">Canonical URLs and redirects</th><td>Signal a preferred URL for duplicate pages. Redirect old URLs when their content genuinely moves.</td><td>Align internal links, sitemap entries, and canonical tags. Test permanent redirects on high-value pages after a migration.</td></tr>
            <tr><th scope="row">Schema markup</th><td>Describe eligible visible content with structured data such as Product, BreadcrumbList, or an applicable LocalBusiness type.</td><td>Validate the rendered markup and keep it aligned with what visitors see. Eligibility does not guarantee a rich result.</td></tr>
            <tr><th scope="row">Rendering and site speed</th><td>Check that mobile visitors and crawlers can access the main content, images, and links.</td><td>Inspect the rendered page in Search Console. Investigate slow content loading, layout shifts, and delayed interactions on important templates.</td></tr>
            <tr><th scope="row">HTTP status and access</th><td>Keep intended pages reachable. Return an appropriate status for missing, moved, or unavailable content.</td><td>Test real responses at launch, including old URLs, redirected pages, and pages created from filters.</td></tr>
          </tbody>
        </table>
      </div>
      <p>After publishing, inspect one URL from each important template. Compare the live page and its rendered content with your expectations. That catches template-wide problems before you spend time on individual page edits.</p>
      <p className={styles.source}><a href="https://developers.google.com/search/docs/fundamentals/get-started">Google’s technical SEO guidance</a><a href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls">Canonical URL guidance</a></p>
    </section>

    <section aria-labelledby="seo-website-builders">
      <h2 id="seo-website-builders">When website builders <span>need SEO plugins</span></h2>
      <p>Start with the platform’s built-in controls. Add a plugin or integration only when there is a specific gap, such as bulk metadata editing, custom schema, redirects, or product-feed management. A plugin cannot fix thin content or a navigation structure that hides important pages.</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="SEO controls by website platform">
        <table>
          <caption>SEO controls by website platform</caption>
          <thead><tr><th scope="col">Platform</th><th scope="col">Start here</th><th scope="col">What to check before adding tools</th></tr></thead>
          <tbody>
            <tr><th scope="row">WordPress</th><td>WordPress core includes XML sitemaps. Check what the theme and hosting setup already provide.</td><td>Use one maintained plugin if you need a consistent editing interface for titles, indexing controls, or structured data. Check which sitemap and schema each plugin outputs.</td></tr>
            <tr><th scope="row">Webflow</th><td>Use page SEO settings and configure the sitemap on the hosted site.</td><td>Inspect rendered Collection pages. Use the platform’s schema controls or custom code if the project needs fields its current setup does not provide.</td></tr>
            <tr><th scope="row">Squarespace</th><td>Start with the built-in SEO fields and sitemap.</td><td>Use an integration only for a specific gap, such as a reporting workflow. Check what your site and plan support before relying on injected code.</td></tr>
            <tr><th scope="row">Wix</th><td>Start with the platform’s SEO setup and generated sitemap.</td><td>Review settings on representative pages and templates before adding an app for a larger catalogue or reporting workflow.</td></tr>
            <tr><th scope="row">Shopify</th><td>Shopify generates sitemap.xml and robots.txt for the storefront.</td><td>Inspect product and collection templates. Use a feed or catalogue app for a concrete requirement, and check for duplicate Product markup.</td></tr>
          </tbody>
        </table>
      </div>
      <p>After adding a tool, inspect representative live pages. Check for competing canonical tags, repeated structured data, extra scripts, and changes to sitemaps. Decide which system owns each SEO setting and document how the team should use it.</p>
      <p className={styles.platformLinks}><a href="https://make.wordpress.org/core/2020/07/22/new-xml-sitemaps-functionality-in-wordpress-5-5/"><Image src="/blogs/platform-logos/wordpress.svg" alt="" width={22} height={22} unoptimized /><span>WordPress</span></a><a href="https://help.webflow.com/hc/en-us/articles/33961355371667-Create-a-sitemap-in-Webflow"><Image src="/blogs/platform-logos/webflow.svg" alt="" width={22} height={22} unoptimized /><span>Webflow</span></a><a href="https://support.squarespace.com/hc/en-us/articles/360002090267-SEO-checklist"><Image src="/blogs/platform-logos/squarespace.svg" alt="" width={22} height={22} unoptimized /><span>Squarespace</span></a><a href="https://support.wix.com/en/article/submitting-your-sitemap-and-urls-directly-to-search-engines"><Image src="/blogs/platform-logos/wix.svg" alt="" width={22} height={22} unoptimized /><span>Wix</span></a><a href="https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview"><Image src="/blogs/platform-logos/shopify.svg" alt="" width={22} height={22} unoptimized /><span>Shopify</span></a></p>
    </section>

    <section aria-labelledby="food-vs-ecommerce-seo">
      <h2 id="food-vs-ecommerce-seo">How SEO differs for <span>food and ecommerce brands</span></h2>
      <p>The biggest difference is how customers buy. A restaurant or bakery with local pickup needs to answer where, when, and how to order. An online retailer needs to make its catalogue easy to browse and answer questions about delivery, returns, fit, and availability.</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Local food business and online retailer SEO">
        <table>
          <caption>Local food business and online retailer SEO</caption>
          <thead><tr><th scope="col">Decision</th><th scope="col">Local food business</th><th scope="col">Online retailer</th></tr></thead>
          <tbody>
            <tr><th scope="row">Customer search</th><td>“Bakery near me,” “vegan brunch in Karachi,” or “order a cake for pickup.”</td><td>“Buy espresso machine online,” “waterproof running shoes,” or a specific product model.</td></tr>
            <tr><th scope="row">Priority pages</th><td>Locations, menus, ordering or booking, delivery areas, and opening hours.</td><td>Collections, product pages, buying guides, and shipping or returns information.</td></tr>
            <tr><th scope="row">Images and trust</th><td>Current menu photos, storefront images, consistent hours, and customer reviews.</td><td>Product angles, variant photos, accurate stock and pricing, and clear policies.</td></tr>
            <tr><th scope="row">Search presence</th><td>An eligible Google Business Profile, accurate categories, and current menus or ordering links.</td><td>Discoverable category navigation, relevant Product markup, and a Merchant Center feed where appropriate.</td></tr>
            <tr><th scope="row">Business outcomes</th><td>Track reservations, confirmed orders, calls, and direction requests separately.</td><td>Track product discovery, purchases, and revenue or margin from organic traffic.</td></tr>
          </tbody>
        </table>
      </div>
      <p>A packaged-food brand can need both approaches. Build a stockist or location page for people who want to buy nearby and product pages for people ordering online. Publish accurate ingredients, allergens, pack sizes, storage instructions, and delivery information wherever they help someone choose.</p>
      <p className={styles.source}><a href="https://support.google.com/business/answer/9455840">Google’s Business Profile menu guidance</a><a href="https://developers.google.com/search/docs/specialty/ecommerce/">Google’s ecommerce SEO guidance</a></p>
    </section>

    <section aria-labelledby="brand-and-social">
      <h2 id="brand-and-social">Business name, tagline <span>and social media</span></h2>
      <h3>Use a consistent business identity</h3>
      <p>Use the name customers recognise on the home page, contact page, relevant directories, and business profiles. Keep details such as your website URL, phone number, public address or service area, and opening hours accurate. On an eligible Google Business Profile, follow the naming rules and choose the category that best describes what the business actually does.</p>
      <p>A tagline should explain the value of the business in a way a visitor can understand. “Commercial cleaning for offices and clinics” tells a prospect more about the offer than “Solutions for a better tomorrow.” Put the practical details in the page copy and use titles specific to each page. Site-name and organisation structured data can help Google interpret identity, while Google chooses how to display it in search.</p>
      <h3>Manage social media as a discovery channel</h3>
      <p>Keep the business name, website link, and description accurate on LinkedIn and X. Share original articles with a short explanation of who they help. Reuse a strong example as a carousel or short post, respond to recurring questions, and bring those questions back into future articles or service FAQs.</p>
      <p>Track social referrals with consistent campaign tags so you can separate those visits from organic search traffic. Social distribution can help people discover your work and may lead to referrals or editorial coverage. Treat follower counts and likes as social metrics. Local search has its own considerations, including relevance, distance, and how well-known a business is.</p>
      <p className={styles.source}><a href="https://support.google.com/business/answer/7091">Google’s local ranking guidance</a><a href="https://developers.google.com/search/docs/appearance/site-names">Google’s site name guidance</a></p>
    </section>

    <section aria-labelledby="measure-results">
      <h2 id="measure-results">How to <span>measure results</span></h2>
      <p>Use Search Console to understand search impressions, clicks, and landing pages. Use analytics to see what visitors do after they arrive. Where possible, connect qualified enquiries to your CRM or bookings so you can tell which visits turn into useful conversations, trials, or sales. Agree on definitions first: a form submission and a qualified lead measure different things.</p>
      <figure className={styles.figure}>
        <figcaption>Illustrative SEO funnel for a service website</figcaption>
        <p>Example figures only. Bar length indexes each stage to the one before it.</p>
        <dl className={styles.bars}>
          {[["Search impressions", "20,000", 100], ["Organic clicks", "1,000 · 5% of impressions", 5], ["Enquiries", "40 · 4% of clicks", 4], ["Qualified leads", "18 · 45% of enquiries", 45]].map(([label, value, width]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd><span>{value}</span><span className={styles.track} aria-hidden="true"><span style={{ width: width + "%" }} /></span></dd>
            </div>
          ))}
        </dl>
      </figure>
      <p>If impressions rise while clicks lag, check whether the page appears for relevant searches and whether its title reflects the offer. If clicks grow but enquiries fall, compare landing pages and test the contact flow on mobile. If enquiries rise but lead quality drops, revisit the search intent and make service scope, geography, or eligibility clearer. Aggregate trends are leads for investigation, so compare similar periods and annotate major site changes.</p>
    </section>

    <section aria-labelledby="continuous-seo">
      <h2 id="continuous-seo">Why SEO is <span>a continuous process</span></h2>
      <p>Websites change. Pages move, products sell out, service areas expand, new competitors arrive, and customers start asking different questions. SEO has a maintenance cycle: diagnose a problem, make the smallest change that addresses it, verify implementation, measure, and decide what to work on next.</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="SEO maintenance schedule">
        <table>
          <caption>A practical SEO review schedule</caption>
          <thead><tr><th scope="col">When</th><th scope="col">What to check</th></tr></thead>
          <tbody>
            <tr><th scope="row">After a release</th><td>Test important URLs, redirects, indexing directives, and the enquiry path.</td></tr>
            <tr><th scope="row">Monthly</th><td>Review visibility and qualified leads. Investigate meaningful changes and prioritise a few fixes.</td></tr>
            <tr><th scope="row">Quarterly</th><td>Refresh outdated pages, review content gaps and internal links, and compare business outcomes.</td></tr>
            <tr><th scope="row">When details change</th><td>Update your contact details, Business Profile, directory listings, and social bios.</td></tr>
          </tbody>
        </table>
      </div>
      <p>Start with a small set of important pages and a measurable business goal. If you have a new site and aren’t sure whether Google can see it, <Link href="/blogs#how-to-submit-your-website-to-google-search-console">find the Google Search Console guide in the blog library</Link>.</p>
      <p className={styles.source}><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide">Google Search Central’s SEO Starter Guide</a></p>
    </section>
    <section aria-labelledby="seo-hurdles">
      <h2 id="seo-hurdles">Eight SEO hurdles <span>Orbilect SEO helps solve</span></h2>
      <p>The right fix depends on where the problem appears. A page that cannot be crawled needs a different response from a page that attracts clicks but sends few qualified leads.</p>
      <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Common SEO hurdles and how Orbilect SEO addresses them">
        <table>
          <caption>Common SEO hurdles and how Orbilect SEO addresses them</caption>
          <thead><tr><th scope="col">Hurdle</th><th scope="col">Orbilect SEO’s approach</th></tr></thead>
          <tbody>
            <tr><th scope="row">Priority pages are missing from search</th><td>Inspect representative URLs, isolate crawling or indexing barriers, then verify the affected templates after the fix.</td></tr>
            <tr><th scope="row">Duplicates dilute discovery</th><td>Map filter, parameter, and duplicate URLs. Align canonicals, sitemap entries, and internal links around the intended pages.</td></tr>
            <tr><th scope="row">Pages attract visitors with the wrong intent</th><td>Review actual queries and landing pages. Map each target to a page that serves the customer’s need and makes the next step clear.</td></tr>
            <tr><th scope="row">Slow or unstable mobile pages</th><td>Identify the templates with the largest problems. Prioritise heavy images, delayed scripts, and layout shifts, then test on mobile.</td></tr>
            <tr><th scope="row">Few relevant sites link to the business</th><td>Find publications, partners, and directories that serve the right audience. Build resources worth referencing, then pursue relevant editorial mentions.</td></tr>
            <tr><th scope="row">Customers find inconsistent local information</th><td>Audit public business details, fix conflicting hours or location information, and verify the path to a call, order, or booking.</td></tr>
            <tr><th scope="row">A redesign breaks links or search visibility</th><td>Inventory important URLs before launch, prepare redirect mappings, and recheck live navigation, sitemap entries, and indexing signals afterward.</td></tr>
            <tr><th scope="row">Reporting stops at rankings or visits</th><td>Set up meaningful conversion tracking and reconcile leads or sales with the CRM or order system. Use the results to decide what to improve next.</td></tr>
          </tbody>
        </table>
      </div>
      <figure className={styles.figure}>
        <figcaption>How Orbilect SEO works through an issue</figcaption>
        <ul className={styles.process}>
          <li><strong>Diagnose</strong><span>Find the affected pages and establish a baseline.</span></li>
          <li><strong>Prioritise</strong><span>Weigh business impact against effort and dependencies.</span></li>
          <li><strong>Implement</strong><span>Update the page or template and test it before release.</span></li>
          <li><strong>Verify</strong><span>Recheck the live change and monitor the outcome.</span></li>
        </ul>
      </figure>
      <p>If several of these problems look familiar, choose one commercially important page or template first. Establish a baseline, fix the most consequential issue, and check the live result before expanding the work.</p>
    </section>

  </>;
}
