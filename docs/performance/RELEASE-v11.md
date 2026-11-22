# Orbilect SEO performance and internal OS release

## Measured changes

- One-off compression of 244 oversized raster assets: 489.17 MiB to 68.71 MiB (85.95% smaller for the input set, excluding generated design thumbnails).
- Industry design originals: 408.80 MiB before this release, now 45.49 MiB. Filenames and aspect ratios are preserved. Original versions remain recoverable through Git history and installer backups.
- Responsive 240/480px WebP carousel derivatives are generated at build time. Their URLs contain a content hash. The median 480px design is approximately 44 KiB.
- Home promotion changes from 48 unique previews / 128 image elements to 16 unique previews / 32 image elements, arranged in four alternating vertical columns, with top/bottom gradient masks.
- The dashboard and landing-page-design service reuse current industry preview assets. The 12 obsolete light/dark mockups and six replaced city illustrations are removed after their references were migrated.
- Forty other large PNG/JPEG illustrations now serve content-hashed WebP derivatives: 19.22 MiB of already compressed source files becomes 1.84 MiB at their largest delivery size (90.4% smaller). Native image elements also receive responsive variants.
- Other image URLs get a release content version at build time, including unoptimized Next images and native image elements. Changed images request a fresh URL rather than depending on an inaccessible CDN purge. Original SVG logos remain vectors.
- Six dark city illustrations are 960×640 WebP files, individually below 65 KiB. No image generation request is made at runtime.

These are asset/file measurements, not a public PageSpeed score or a guarantee of a particular download time. Hosting latency, visitor bandwidth and third-party widgets still matter. The local production route/image checks passed; visual browser QA could not run because the managed preview service sends unsupported Next.js startup flags.

## Loading and interaction

The initial loading indicator is server-rendered, waits 900ms before becoming visible and disappears immediately after hydration. It never waits for lazy images, chat or analytics. CSS hides it after eight seconds even if JavaScript fails. Next's actual pending-route fallback uses the same visual style. A website cannot render its loader before its HTML/CSS have arrived.

The logo cursor is a 32px PNG with a native cursor fallback on fine-pointer devices. Cross-origin iframe content and browser chrome remain controlled by their own document/browser. Touch devices retain native behaviour.

Footer links use blue hover/focus styling; social buttons gain a blue fill and raised hover. The bold multicolour tagline uses the existing pointer-responsive CSS depth effect, without an additional WebGL renderer.

## Caching and deployment status

This release prepares content-versioned image URLs and long cache headers only for immutable generated or release-versioned assets. Existing hashed files are retained so previously cached pages are not broken. Caching remains enabled; repeated purges would make visitors download files again.

No Hostinger CDN purge was performed. Hostinger restricts sign-in from the cloud browser, and this workspace has no authorised Hostinger API connection. No GitHub push was performed from this workspace because GitHub write credentials are unavailable. Use the included publisher to build, check and push from your existing authorised Mac checkout. It does not force-push or overwrite your local branch/staging area.

Provider reference: https://www.hostinger.com/support/hostinger-cdn-how-to-clear-the-cache/
Access limitation: https://help.openai.com/articles/20001280-using-cloud-browser-in-chatgpt#when-a-website-blocks-the-task

## Naila and Orbilect OS

100 additional fictional support examples contain exactly 25 messages each: one Naila opening, twelve customer messages and twelve tested replies. They cover ten services, different industry/customer goals, prices, offers, security, glossary explanations, conversation recovery and explicit closing. Existing 100×50 examples are retained. These are tested examples, not external-model training or a new autonomous-agent deployment.

The runtime now recognises misunderstanding/restart requests and OS access/data-handling questions. It remains grounded in the website's existing reply engine and rebuilt public-page index. Published promotions remain subject to the existing written-quote conditions.

The public policies add 47 substantive OS handling and acceptable-use statements, including employee-only access, approved company email accounts, purpose/role limits, confidential handling, exports/screenshots/personal notes, incident reporting, retention, offboarding, separate product rights and contact with Orbilect Labs. They do not claim that OS authentication or monitoring has already been implemented in the separate OS project. Discipline and legal remedies are qualified by applicable law; the company does not automatically impose criminal penalties or arbitrary fines. Protected disclosures and employment rights are preserved.

Legal context consulted: https://www.legislation.gov.uk/ukpga/2018/12/section/170 (jurisdiction-specific; not asserted to govern every employee).

## Reproducible checks

```bash
npm run build
node scripts/check-media-performance.cjs
node scripts/check-site-polish.cjs
node scripts/check-naila-conversations.cjs
node scripts/check-naila-long-conversations.cjs
node scripts/check-naila-additional-conversations.cjs
node scripts/check-naila-api-recovery.cjs
node scripts/verify-orbilect-search.cjs
```

Compression is an explicit migration, not a repeated destructive prebuild operation. Future gallery uploads automatically receive responsive derivatives. To compress other newly added oversized photos intentionally, run `node scripts/compress-public-images.cjs`, inspect the result, then build. The current release's original-byte backup is available through the installer and Git history.
