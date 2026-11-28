# How to Create and Submit an XML Sitemap

[Orbilect SEO](https://orbilectseo.com/)

SEO & Search

Decide which URLs belong in your sitemap, submit it, and identify errors.

**Oliver Bennett**Technical Content Writer

Nov 14, 2026Updated Nov 28, 2026

## Choose which URLs to include

List public URLs that you want indexed and that represent the preferred version of the content. Leave redirects, missing pages, noindex URLs and duplicate filter variations out. For a large store, grouping products and collections into child sitemaps can make troubleshooting easier.

### 1. Define the URLs you want discovered

An XML sitemap is a file that lists preferred public URLs for crawlers. Start with the URL inventory from your CMS or an export from a site crawl. Confirm each important address is on the production domain, returns a successful response, and represents a page you want in search. Cross-check the rendered canonical and any noindex directive. Avoid URLs with tracking parameters, internal search results, staging links and filtered variations that merely reproduce another page.

A sitemap supports discovery on a new site, a large catalogue or a site with specialised content. It does not replace links visitors can follow from category and service pages. If a sitemap contains important pages that navigation cannot reach, add a useful link in the relevant section of the site. Keep redirected or intentionally retired URLs out of the ongoing production sitemap, and map replacement pages separately during migrations.

The production sitemap workflow

1. **Filter the inventory**Keep the preferred public URLs
2. **Check the file**Open the XML on the production host
3. **Verify discovery**Read the sitemap report and inspect sample pages

[How to Submit Your Website to Google Search Console](https://orbilectseo.com/blogs/how-to-submit-your-website-to-google-search-console)

## Generate and inspect the XML

Use your CMS output if it reflects the desired indexable URLs. Check that entries use absolute URLs on the correct host and that important pages return a successful response. Supply a last-modified date only if it reflects meaningful changes to the page.

### 2. Generate the file and check the response

On a managed platform, check the public sitemap it already generates before adding a plugin or a second generator. On a custom site, generate the file from the same published inventory that powers your routes. Write UTF-8 XML with the sitemap namespace and absolute URLs inside loc elements. Escape XML special characters. Use lastmod only when it represents a meaningful content, structured data or link update. Do not reset every entry’s date every time the site deploys.

An XML sitemap may contain up to 50,000 URLs or 50 MB uncompressed. If you exceed either limit, split the pages into smaller files and publish a sitemap index. Separating products, categories, articles and local pages can make it easier to spot a broken generator or unexpected URL count. Open the XML on the production host in a private window and check that the server returns the file rather than a login screen, branded error page, or cached preview sitemap.

Minimal XML sitemap example with a meaningful last-modified date

```
<code><?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/services/</loc>
    <lastmod>2026-10-29</lastmod>
  </url>
  <url>
    <loc>https://www.example.com/contact/</loc>
  </url>
</urlset></code>
```

[How Long Does Google Take to Index a Website?](https://orbilectseo.com/blogs/how-long-does-google-take-to-index-a-website)

## Submit and monitor the result

Open the live sitemap and submit it through Search Console. Review the fetch status, then inspect a sample of important pages. Sitemap inclusion supports discovery, while internal links and page quality still matter. If URLs are missing after a migration, verify the new sitemap is being generated from the production site.

### 3. Submit and diagnose Google’s sitemap report

Verify the correct property in Search Console. Open Sitemaps, enter the sitemap path or URL as requested, and submit. If you use a sitemap index, submit that index and monitor its child files. You can also publish the full sitemap URL in robots.txt. In Bing Webmaster Tools, select the site and use its Sitemaps page if you want to report the same public file to Bing.

If Google reports Couldn’t fetch, test the exact path and host outside an authenticated session. Check HTTP status, security rules, and whether a CDN returns HTML or a challenge instead of XML. For parsing errors, inspect namespace, encoding and malformed links. A Success status confirms processing of the sitemap. If individual URLs are missing from the index, see what URL Inspection says about a few representative pages before changing the XML again.

Submit the sitemap and review the result

Illustrated interface walkthrough with example data. Labels and available options may vary by account.

1. **Add a new sitemap**

  Property

  https://www.example.com/

  Sitemap path

  sitemap.xml

  **Submit**

  For a URL-prefix property and sitemap on the same host, enter the relative path if Search Console displays the prefix.
2. **Submitted sitemaps**

  Example status

  Success

  Next check

  Inspect an important page from the sitemap

  **Open URL Inspection**

  Successful processing confirms Google could read the file. Inspect individual URLs to see what Google indexed.

[The On-Page SEO Checklist for Business Websites](https://orbilectseo.com/blogs/the-on-page-seo-checklist-for-business-websites)

## Choose URLs that belong in search

Include canonical public pages that return a successful response and can be indexed. Leave redirects, account screens, internal search results, and duplicate parameter combinations out. A sitemap should reflect the preferred site architecture rather than every URL a crawler could discover.

## Generate dates from real content changes

Use lastmod only when you can supply an accurate modification time. Rebuilding a website without changing an article is not a reason to pretend it was rewritten. Keep the source date in content data or version history instead of assigning today to every page.

## Split large inventories by content type

Separate articles, products, and other large collections when that makes ownership and troubleshooting easier. Reference those files from a sitemap index. Keep a simple inventory of who maintains each generator and which database or content collection supplies its URLs.

## Validate a sample after deployment

Open the production XML and inspect a few URLs from each template. Check HTTPS, the preferred hostname, character escaping, and canonical agreement. Confirm the sitemap is available without authentication and that robots.txt points to its production address.

## Investigate exclusions without endless resubmission

Compare submitted URLs with indexing reports and inspect representative examples. Fix access, duplication, or content problems at the template level. Resubmitting unchanged XML cannot resolve a noindex directive, an incorrect canonical, or a server that fails when crawled.

## Keep sitemap URLs aligned with internal navigation

Compare a sample of sitemap entries with the URLs used in menus, category pages and contextual links. If the sitemap lists HTTPS URLs but the site links to redirected HTTP or alternate-host versions, fix the source of the inconsistency.

The aim is a coherent public URL inventory, not the largest possible file. Important pages should have useful internal discovery paths as well as sitemap entries, so a visitor and a crawler can understand where those pages belong.

[Google Search Central: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

## Distinguish a sitemap fetch problem from a page problem

Open the sitemap itself and check its response, XML structure and accessibility. Then inspect a listed page separately. An unreadable sitemap is different from a readable sitemap containing a redirected, blocked or missing page, and the fixes belong in different places.

Use the Search Console submission result as one diagnostic input. If the file is reachable and processing is delayed, retain the evidence and avoid repeatedly regenerating unrelated parts of the website.

[Google Search Console: sitemap statuses and errors](https://support.google.com/webmasters/answer/7451001)

## Exclude search, account and temporary campaign variations

Review whether generated URLs represent useful public destinations or operational states. Internal searches, account pages, preview URLs and tracking variations usually need different handling from stable service, product and article pages.

Make the inclusion rule part of the sitemap generator, rather than manually deleting entries after every build. Confirm that the same rule works when a new content type or product filter is introduced, so temporary URLs do not silently return to the file.

[Google Search Central: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

## Verify sitemap behavior after content is retired

When removing a page, decide whether there is a genuinely equivalent replacement. Update internal links and sitemap generation to reflect that decision; do not leave a retired URL in the inventory just because it once attracted traffic.

After deployment, inspect both the old URL and its intended replacement. Record whether the old page redirects, returns an appropriate error or remains live with updated content, and make sure the sitemap describes the current state.

[Google Search Console: sitemap statuses and errors](https://support.google.com/webmasters/answer/7451001)

## A store migration sitemap example

An online store consolidates its catalogue from two domains. Before launch the team records the preferred URLs and creates server-side redirects for old pages with equivalent replacements. The production sitemap then lists the new category and product URLs only. After publishing, the team verifies that the new property can fetch the sitemap and samples a product, collection, and help article in URL Inspection.

The team sets a baseline for submitted URLs by page type. If product submissions fall by half while the product inventory stays stable, it checks the generator’s filters and hosting cache before asking whether Google has chosen to index fewer pages. Different symptoms call for different checks.

Decide what belongs in production XML

| URL type | Include? | Reason |
| --- | --- | --- |
| Canonical public category page | Yes | Returns a successful response and represents an intended entry point |
| Redirected legacy product URL | No | List the live replacement if it is indexable |
| Tracking or duplicate filter URL | Usually no | List the preferred version unless the filter is a distinct page deliberately built for search |
| Private, error or noindex page | No | You do not want this page discovered as a sitemap candidate for indexing |
| Distinct translated page | Yes, if indexable | Give each language its own stable URL and align alternate-language signals when applicable |

## Common questions

### Is sitemap.xml the same thing as robots.txt?

No. The sitemap lists URLs you want discovered. Robots.txt describes crawl permissions and can point crawlers to the sitemap. A robots.txt block alone is not a reliable way to prevent indexing.

### Should I resubmit the same file after every edit?

Keep the same address and regenerate the contents when the published inventory changes. Monitor the read status and fix failures; repeated submission does not make pages rank faster.

### Do small sites need a sitemap?

A well-linked small site can be discoverable without one. A sitemap is useful after launch or a migration and makes your intended URL set easier to inspect.

### Does every URL in a successful sitemap get indexed?

No. Crawlers use it as a discovery hint. Check page accessibility, canonical selection, and the page’s unique purpose when an important URL stays unindexed.

## What to check next

Practical review checklist

- **URL list**Public canonical pages only
- **XML response**Reachable at the submitted HTTPS address
- **After release**Inspect representative product and service URLs

### Further reading and official documentation

- [Google Search Central: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Console: sitemap statuses and errors](https://support.google.com/webmasters/answer/7451001)
- [Sitemaps.org XML protocol reference](https://www.sitemaps.org/protocol.html)
- [Bing Webmaster Tools: sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)

Related articles

## Keep learning

Explore related guides for your next step.

- [SEO & Search ### How to Submit Your Website to Google Search Console A practical walkthrough of ownership verification, sitemap submission, and common Search Console errors.](https://orbilectseo.com/blogs/how-to-submit-your-website-to-google-search-console)
- [SEO & Search ### How Long Does Google Take to Index a Website? Understand how discovery, crawling, and indexing work and what can delay each one.](https://orbilectseo.com/blogs/how-long-does-google-take-to-index-a-website)
- [SEO & Search ### The On-Page SEO Checklist for Business Websites Prioritize titles, headings, internal links, and content that answers what visitors came to find.](https://orbilectseo.com/blogs/the-on-page-seo-checklist-for-business-websites)
- [Website Tutorials ### How to Build a Shopify Store Build a Shopify store step by step: compare plans, create your account, connect a domain, choose a theme, add products, configure checkout and improve SEO.](https://orbilectseo.com/blogs/how-to-build-a-shopify-store)

## Want help with SEO for your brand?

Send us your website and the questions you have about SEO. Tell us what you want to improve, whether that’s local visibility, ecommerce sales, or better-qualified enquiries.

[Contact us about SEO](https://orbilectseo.com/contact?request=How%20to%20Create%20and%20Submit%20an%20XML%20Sitemap#request-proposal)

---

Canonical page: https://orbilectseo.com/blogs/how-to-create-and-submit-an-xml-sitemap

Content use: search=yes, ai-input=yes, ai-train=no.
