# Reviews and search consistency v15

Checked 24 November 2026 against GitHub main c202ac32d982b32b17fbd139faad46e5ff3404e2.

## Search findings and limits

The live homepage, robots.txt and sitemap.xml returned HTTP 200. The www hostname redirects to https://orbilectseo.com/. Public indexing directives allow crawling/indexing; the sitemap lists 97 URLs. No public robots/noindex obstruction was found. These observations do not establish Google's current index or ranking state. The Search Console screenshot supplied on 22 November showed the homepage indexed at that time. A missing branded result requires current Search Console evidence to diagnose; schema alone cannot restore or guarantee rankings.

One shared metadata function now produces the HTML title, Open Graph title and Twitter title, with one brand suffix. Each page keeps its own distinct title and description. Public schema descriptions use the same catalog. Missing catalog entries for industry, legal, careers and company pages were filled. The SEO-definition article's schema now uses its existing meta description. Article headlines retain the actual article heading. Canonical URLs consistently use the main non-www domain. Valid existing robots, sitemap and redirects are preserved.

## Reviews

All 13 existing directory options were retained. Six new directory cards were added: FindBestFirms, SelectedFirms, Agency Spotter, Trusted IT Firms, AgencyListed and SEMfirms. Google and Bing retain their configured profile and embed controls. The other 17 cards have one full-card link, one matching visual CTA, uniform logo frames, and no hidden widgets or badge buttons. Shared moving review carousels were not changed.

TechBehemoths' own profile HTML reported ratingValue 5 and reviewCount 1, matching its visible “5.0 from 1 review” summary. The card shows five blue stars and “5.0/5 · 1 review.” This is a dated snapshot, not a live rating feed. Update src/app/reviews/review-directory-data.ts when the source changes. No review quotes were copied, and no AggregateRating was added to the site's structured data.

Profiles explicitly reporting no reviews at this check: Trustpilot, Clutch, GoodFirms, Techreviewer, TrueFirms, SmartCustomer, FindBestFirms, SelectedFirms, Agency Spotter, Trusted IT Firms and SEMfirms. Other cards direct visitors to the provider for current information without asserting a score.

The supplied RightFirms profile URL returned HTTP 404, including slash/query/host variants; its supplied Read Reviews image was retrievable and is included. The card retains the requested profile URL; confirm the published URL in RightFirms and edit its href if needed. TrustRadius has no supplied company profile: its existing platform is preserved and uses a configured profile if present, otherwise its directory. TopDevelopers retains the existing directory link because no company profile was supplied. Those fallbacks explicitly say “Visit platform,” rather than claiming to link to an Orbilect SEO profile.

The SelectedFirms footer badge uses the supplied category/tracking link and official Top SEO Company image. Its review card links to the supplied Orbilect SEO profile. The directory badge is not used as evidence of a specific rating or an independently verified award. Logos and badges are delivered locally; no new third-party widget scripts or runtime logo requests are introduced. The AgencyListed mark is extracted from the provider's own public inline SVG. Source artwork is preserved except delivery resizing of SelectedFirms and Trusted IT Firms images.

## Primary profile evidence

- https://techbehemoths.com/company/orbilect-seo
- https://www.trustpilot.com/review/orbilectseo.com
- https://clutch.co/profile/orbilect-seo
- https://www.goodfirms.co/company/orbilect-seo
- https://techreviewer.co/companies/orbilect-seo
- https://findbestfirms.com/company/orbilect-seo/
- https://www.truefirms.co/company/Orbilect-SEO/4364
- https://www.smartcustomer.com/reviews/orbilectseo.com
- https://selectedfirms.co/agency/orbilect-seo
- https://www.agencyspotter.com/orbilect-seo
- https://trusteditfirms.com/company/orbilect-seo/
- https://agencylisted.com/agencies/orbilect-seo
- https://www.semfirms.com/profile/orbilect-seo

## Validation

Production build/TypeScript, all-URL route checks and dedicated metadata/card checks are included. Browser visual QA was unavailable: the managed preview runner passes Vite-only --host and --strictPort flags to Next.js, which rejects them. Application scripts were not changed to compensate. Review the cards on localhost at desktop, tablet and phone widths before deploying if visual approval is needed. Google Rich Results Test is not part of the local checker; run it on deployed URLs.

## Deployment and Google follow-up

Install/publish using the README command. The publisher fetches GitHub main, refuses conflicting changes to release files, builds/tests in a separate worktree and pushes without force. Your local branch, unrelated work and environment files remain intact. It uses your existing local GitHub login. Nothing is pushed from this workspace, and no Hostinger/CDN account is accessed.

After Hostinger deploys, inspect https://orbilectseo.com/ in Search Console, run Test live URL and Request indexing once. Confirm Google-selected canonical. Check Manual actions, Security issues and Removals, then compare Performance impressions/position for “orbilect seo” over recent versus previous dates. Submit or confirm the existing https://orbilectseo.com/sitemap.xml; repeated submission is not a ranking fix.

Official guidance:
- https://support.google.com/webmasters/answer/9012289
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/sitelinks
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet

Google chooses sitelinks and rich-result displays. Self-serving Organization/LocalBusiness review stars are ineligible; on-page blue stars are not a promise of Google review snippets.
