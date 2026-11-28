# How to Submit Your Website to Google Search Console

[Orbilect SEO](https://orbilectseo.com/)

SEO & Search

A practical walkthrough of ownership verification, sitemap submission, and common Search Console errors.

**Oliver Bennett**Technical Content Writer

Nov 14, 2026Updated Nov 28, 2026

## Choose the right property

Open Search Console using an account the business controls. Choose Domain to cover all protocols and subdomains, or URL prefix to separate a specific section such as https://www.example.com/. Domain properties require DNS verification. For URL-prefix properties, choose one of the verification methods Search Console offers.

### 1. Add the site you actually publish

Start at search.google.com/search-console in a Google account controlled by the business. Open the property selector and choose Add property. Enter example.com without a protocol or path for a Domain property. If ownership must cover only your store or a managed subdirectory, enter the exact HTTPS URL for a URL-prefix property. A prefix for https://www.example.com/ covers that version; http://example.com/ or a different subdomain is outside that prefix. For a company site, confirm which hostname visitors reach after redirects before settling on the property you will report from.

Decide who will maintain ownership before making changes. Keep a verified business owner and grant teammates or vendors the access they need from Settings instead of sharing the owner’s sign-in. Search Console reports Google organic search activity and indexing status. Link it to your release checklist so someone will return to the reports after publishing.

From DNS ownership to a live URL check

1. **Choose your scope**Select a domain or a precise URL prefix
2. **Confirm control**Publish the ownership proof and verify it
3. **Check discovery**Submit the sitemap and inspect a priority URL

Search Console: select the property type

Illustrated interface walkthrough with example data. Labels and available options may vary by account.

1. **Add a property**

  Domain

  example.com

  Coverage

  All subdomains and protocols

  **Continue**

  Choose Domain when you control DNS for the whole domain. Enter the domain name without https:// or a path.
2. **Add a property**

  URL prefix

  https://www.example.com/

  Coverage

  URLs starting with this prefix

  **Continue with URL prefix**

  Use a URL prefix if you need a specific hostname or path, or a supported alternative to DNS verification.

[What Is Search Engine Optimization?](https://orbilectseo.com/blogs/what-is-search-engine-optimization)

## Verify ownership and submit your sitemap

For DNS verification, copy Google’s TXT value to the DNS provider that hosts your active nameservers. Existing TXT records can stay. After verification, open Sitemaps and submit the sitemap URL for the chosen property. A successful submission means Google could process the sitemap. Check important individual pages through URL Inspection.

### 2. Verify ownership, then submit the live XML

For a Domain property, open the DNS controls at the provider listed by your domain’s authoritative nameservers. Add the TXT record exactly as Google presents it. Providers often represent the root with @ or an empty Name field. Use your provider’s instructions. Save the record, return to Search Console, and select Verify. If Google cannot see the record yet, confirm the active DNS zone and allow time for the change to propagate. Keep the verification record in place after success.

For a URL prefix, use the method Search Console offers and your access supports. If you upload the provided HTML file, confirm its exact public URL works in a signed-out window. If you choose the HTML tag method, publish the tag in the homepage’s HTML head and check the page source on the live site. Once verified, open Sitemaps and enter the live sitemap location shown for your property. A successful report means Google was able to read the sitemap. Check the site’s important URLs separately.

Search Console: add ownership proof and submit the sitemap

Illustrated interface walkthrough with example data. Labels and available options may vary by account.

1. **DNS record**

  Type

  TXT

  Name or Host

  Root of example.com

  Text value

  Use the exact token shown in your account

  **Save record → Verify ownership**

  Add this at the DNS host first. Then return to Search Console. Keep any existing TXT records.
2. **Sitemaps**

  Current property

  example.com

  Add a new sitemap

  https://www.example.com/sitemap.xml

  **Submit**

  Open the live address yourself first. Use the path or full URL according to the field shown in your property.

[How to Create and Submit an XML Sitemap](https://orbilectseo.com/blogs/how-to-create-and-submit-an-xml-sitemap)

## Troubleshoot verification and indexing

If verification fails, check that the TXT record is on the correct hostname and that you edited the active DNS zone. If the sitemap cannot be fetched, open it in a private window and verify it returns XML over HTTPS. For an individual page, compare the indexed result with a live test, then check access, canonical selection and noindex before requesting recrawling.

### 3. Inspect a representative page and triage failures

Paste the full URL of an important service or product page into URL Inspection. Read the indexed result first. Compare the user-declared and Google-selected canonical if available, and check the last crawl time. Then select Test live URL after a fix to see what Google can access now. If the live URL is eligible, an owner or full user can request indexing. The live test and request provide useful signals for diagnosis. Google can still choose a different canonical or decline to index the page.

For a sitemap fetch issue, check the exact submitted URL, the live HTTP response, and whether hosting, a firewall or an authentication prompt prevents access. For a missing page, look for a redirect, robots.txt crawl restriction, noindex directive, broken render, or conflicting canonical. Record when the fix went live so you can distinguish older indexed data from the new result. If problems affect a whole template, fix the shared cause before requesting recrawls for a sample.

Search Console: inspect the live page

Illustrated interface walkthrough with example data. Labels and available options may vary by account.

1. **URL Inspection**

  URL

  https://www.example.com/services/

  Indexed result

  Review page indexing and canonical

  **Test live URL**

  The live test describes current access. The indexed result describes the copy Google previously processed.
2. **Live test**

  Example result

  URL is available to Google

  Before requesting

  Confirm the correct production URL

  **Request indexing**

  Use the request for a small number of priority URLs after resolving issues. Google considers the page independently.

![Google’s published URL Inspection screenshot showing a page excluded by a noindex tag](https://orbilectseo.com/image-media/f620fb5dad0a-v21-q70-320.webp)

Google’s 2018 URL Inspection screenshot illustrates a noindex exclusion. Your report may look different. [Google Search Central’s original walkthrough](https://developers.google.com/search/blog/2018/06/new-url-inspection-tool-more-in-search).

[How Long Does Google Take to Index a Website?](https://orbilectseo.com/blogs/how-long-does-google-take-to-index-a-website)

## Choose ownership that survives a handover

Use a business-controlled Google account and record who owns the DNS zone. A Domain property is useful when reporting needs to include subdomains and protocol variants. A URL-prefix property is useful for a specific published address. Confirm the redirect destination before choosing the reporting scope.

## Check the exact DNS hostname

Copy the complete verification value. A root-domain verification record and a record for www are different DNS names. Inspect the provider’s automatic domain suffix before saving. Keep the ownership record after verification so a future account check does not interrupt access.

## Separate discovery from indexing

A readable sitemap helps discovery; it does not prove every page is indexed. Inspect one service page, one article, and one category page. Compare the declared canonical, Google-selected canonical, crawl permission, and indexing status before repeatedly requesting another crawl.

## Turn reports into an action list

Export affected URLs and group them by template and business value. A broken service-page template may deserve attention before a low-value filter URL. Give each issue an owner, a proposed fix, and a verification date so the report becomes operational work.

## Build a repeatable reporting baseline

Save an initial date range, country, device, and search type. Compare like-for-like periods and annotate redesigns or migrations. Search Console search clicks and analytics sessions measure different things, so investigate gaps without assuming the two totals should match.

## Read the Google-selected canonical before requesting indexing

Inspect the exact HTTPS URL you want customers to reach, then expand its indexing details. Compare the declared canonical with Google's selected canonical. If the two differ, review duplicates, redirects and internal links before repeatedly requesting a crawl. A request cannot repair contradictory page signals.

Keep one record for the preferred page and one for any alternate URL. This makes it easier to distinguish an expected duplicate from a service page that genuinely needs correction.

[Google: URL Inspection tool](https://support.google.com/webmasters/answer/9012289)

## Understand why an indexed page may not appear for your brand

An indexed homepage is eligible for search; it is not a promise that it will appear for every query. If another group website ranks for your brand name, check the homepage title, visible business description and destination URLs on relevant public profiles.

Use Search Console's query and page filters to see whether your own domain receives branded impressions. Compare changes over time instead of treating a single search from one device as a complete visibility report.

[Google: Verify site ownership](https://support.google.com/webmasters/answer/9008080)

## Preserve verification during a domain or hosting change

Before switching DNS providers, copy the verification record into the new zone and confirm which organization controls that zone. Moving hosting and moving DNS are different operations, so do not assume that a successful website migration preserves every verification method.

After the change, check ownership access, the preferred-domain redirect and sitemap availability. Keep the old implementation notes until the new property remains accessible to the business owner and the team responsible for search reporting.

[Google: URL Inspection tool](https://support.google.com/webmasters/answer/9012289)

## Create an evidence log for important URL changes

For a major page update, record its URL, deployment date, intended canonical, live response and the issue you were fixing. Add the indexed inspection result separately from the live test result because they describe different moments.

Revisit the same page when fresh crawl information becomes available. A short evidence log lets your developer separate a failed release from normal processing time and prevents a later content edit from being mistaken for the cause of an earlier traffic change.

[Google: Verify site ownership](https://support.google.com/webmasters/answer/9008080)

## A launch-day verification example

A business moves from a preview address to https://www.example.com/. Its owner verifies example.com through DNS, submits the production sitemap, and inspects the homepage, a service page and a contact page. The service page’s canonical points to the preview site. The team fixes the shared template, reruns the live test and inspects another service URL before requesting indexing. One change fixes the same problem across the service section.

When you hand the issue to a developer or agency, share the public URL, property type, report status, and an approximate time when the change went live. Redact any private account details or verification tokens. That context gives the person helping you enough information to compare what the server returns with the report you are seeing.

Choose a path based on the Search Console message

| What you see | What to check | Next action |
| --- | --- | --- |
| Ownership verification failed | Active DNS zone, exact TXT record, hostname and propagation | Correct the record at the DNS provider and try Verify again |
| Sitemap couldn’t be fetched | Public HTTPS response, redirects, firewall and XML content | Fix access or submit the correct production sitemap location |
| Google selected a different canonical | Internal links, redirects, sitemap entries and the page’s canonical preference | Align the signals around the URL you want indexed |
| Page is crawled but currently not indexed | Useful primary content, duplication and the page’s purpose | Improve the page and review comparable URLs before asking for a recrawl |

## Common questions

### Is Search Console free?

Yes. A verified owner or invited user can use the reports without buying ads. Search Console and Google Ads serve different purposes.

### Does verifying a property put the site on Google?

Verification gives you access to the reports for that property. Google discovers and evaluates public pages independently. Use the sitemap and URL Inspection to see how it is processing your site.

### Do I have to submit every URL by hand?

Use a sitemap and normal internal links for a group of pages. URL Inspection is useful for a small number of important URLs, especially after a fix.

### Can I submit a localhost or private preview?

Google needs a reachable public URL to crawl. Keep private environments restricted and submit the production URLs after launch.

## What to check next

Practical review checklist

- **DNS ownership**TXT record visible at authoritative nameservers
- **Sitemap**Successful fetch and intended canonical URLs
- **URL Inspection**Correct property and live page accessible

### Further reading and official documentation

- [Google Search Console: add a property](https://support.google.com/webmasters/answer/34592)
- [Google Search Console: verify site ownership](https://support.google.com/webmasters/answer/9008080)
- [Google Search Console: Sitemaps report](https://support.google.com/webmasters/answer/7451001)
- [Google Search Console: URL Inspection](https://support.google.com/webmasters/answer/9012289)
- [Google Search Central: request recrawling](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google’s example of the URL Inspection interface](https://developers.google.com/search/blog/2018/06/new-url-inspection-tool-more-in-search)

**Stuck on DNS verification, sitemap access, or an indexing error? Send us the public URL and the message you see in Search Console.** [Contact Orbilect SEO](https://orbilectseo.com/contact#request-proposal).

Related articles

## Keep learning

Explore related guides for your next step.

- [SEO & Search ### What Is Search Engine Optimization? Learn how SEO improves search visibility and how to link that work to leads, sales, and revenue.](https://orbilectseo.com/blogs/what-is-search-engine-optimization)
- [SEO & Search ### How to Create and Submit an XML Sitemap Decide which URLs belong in your sitemap, submit it, and identify errors.](https://orbilectseo.com/blogs/how-to-create-and-submit-an-xml-sitemap)
- [SEO & Search ### How Long Does Google Take to Index a Website? Understand how discovery, crawling, and indexing work and what can delay each one.](https://orbilectseo.com/blogs/how-long-does-google-take-to-index-a-website)
- [SEO & Search ### The On-Page SEO Checklist for Business Websites Prioritize titles, headings, internal links, and content that answers what visitors came to find.](https://orbilectseo.com/blogs/the-on-page-seo-checklist-for-business-websites)

## Want help with SEO for your brand?

Send us your website and the questions you have about SEO. Tell us what you want to improve, whether that’s local visibility, ecommerce sales, or better-qualified enquiries.

[Contact us about SEO](https://orbilectseo.com/contact?request=How%20to%20Submit%20Your%20Website%20to%20Google%20Search%20Console#request-proposal)

---

Canonical page: https://orbilectseo.com/blogs/how-to-submit-your-website-to-google-search-console

Content use: search=yes, ai-input=yes, ai-train=no.
