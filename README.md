# Orbilect SEO

Next.js App Router site for `https://orbilectseo.com`. Use Node.js 20.9 or newer.

## Development

```bash
npm ci
npm run dev
```

Open the localhost URL printed by Next.js. Keep service credentials in your local `.env.local` or your host's environment variables.

## Verify the production build before pushing

```bash
npm run seo:verify
```

This builds the current source and starts a temporary production server on a free loopback port. It checks the sitemap against the App Router, then checks rendered pages for HTTP errors, indexing directives, distinct titles and descriptions, canonicals, headings, social metadata, supported structured data fields, internal links, and local images. It closes its own server when the audit finishes.

To check an already running build or the published site, pass its explicit URL:

```bash
node scripts/check-orbilect-search.cjs http://127.0.0.1:3000
```

## Maintaining search metadata

- Shared metadata, structured data, and the canonical origin are in `src/lib/orbilect-search.ts`. Keep titles and descriptions specific to the content of each page.
- The sitemap lists the public static routes in `src/app/sitemap.ts`. When adding, removing, or renaming one, update that list. Published blog guides come from the same validated records that generate the article pages. Add a catalogue entry, publication record, and article body together for each new guide.
- `src/app/robots.ts` sets crawler access and points to the sitemap. Server authorization for administrative functions belongs in those routes.
- Set dates from the actual editorial records. Only add sitemap `lastmod` if it represents a meaningful content update.

## After your page edits and deployment

1. Configure the published site on `https://orbilectseo.com` and redirect alternate domain variants to the equivalent canonical URLs. Run the checker against that public origin and verify that the host does not add an indexing block.
2. Submit `https://orbilectseo.com/sitemap.xml` from Google Search Console and Bing Webmaster Tools. Use URL Inspection on the homepage and representative service and article pages after deployment.
3. Check the homepage and a published article in Google's Rich Results Test. The local audit verifies the HTML and structured data it receives. Indexing, sitelinks, rich results, and rankings are determined by each search engine.
