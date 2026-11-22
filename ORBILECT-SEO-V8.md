# Orbilect SEO — Twelve Industries v8

Reference: `orbilect-seo-twelve-industries-v8`.

## Content and visual system

- The alphabetical public industry list lives in `src/app/_home/industry-growth/industries.json`. Home, Industries, footer, related cards, and Gallery read the same list.
- Industry copy lives in `src/app/industries/industry-briefs.ts`. Automotive retains its established custom page; the other eleven use the shared template.
- Twelve generated covers live in `public/industry-covers/{slug}.webp`, 640×800 pixels. All are under 32 KB. Do not replace them with the much larger source PNGs.
- Place sixteen original designs in each `public/industry-showcases/{slug}/` folder. Keep originals; the prebuild/predev optimizer creates content-hashed 240px/480px WebP variants in `public/design-media/`.
- New folders: `arts-entertainment` (`entertainment-01` through `entertainment-16`), `food-beverages` (`food-01` through `food-16`), `saas` (`saas-01` through `saas-16`). JPG, PNG, WebP and AVIF are accepted. Use one extension per design and zero-padded numbers to preserve order.
- The gallery mounts only the selected collection: four columns, four unique designs per column, a duplicate group for a seamless loop, opposite directions and top/bottom fades. Individual industry pages retain the two-row horizontal presentation. Reduced-motion settings provide a static/scrollable alternative.
- Related industry cards link to the other eleven pages directly before each detail page’s FAQ.

## Naila

`src/lib/naila/natural-conversation.ts` handles specific conversational requests before fuzzy passage matching. Existing policy and pricing rules remain authoritative. `intent-replies.ts` retains recent-topic follow-up logic. This is deterministic website logic, not training an external model.

`npm run build` indexes every public sitemap page, including all articles, privacy policy, and terms, into `src/lib/naila/public-content.json`. The generated data is copied into standalone output when present. Changing a public page requires rebuilding and redeploying to refresh Naila’s knowledge.

Run `node scripts/check-naila-conversations.cjs`. The 35 executable examples (85 visitor turns) are also readable in `NAILA-CONVERSATION-EXAMPLES.md`. Prices, promotions, employment availability, and policies should be checked against the business’s current published decisions when edited.

## Blog editing and evidence

`src/app/blogs/article-deep-dives.json` adds five original, topic-specific sections to each of the 41 guides. The main What Is Search Engine Optimization article body was not expanded. Existing comparisons, tables, official references, and labelled illustrated walkthroughs remain in place. New prose adds 8,171 words. Illustrative calculations are labelled and are not represented as client results.

The additions are practical editorial guidance. They do not fabricate studies, customer outcomes, citations, or product screenshots. Four additional real screenshots from the official WordPress and WooCommerce documentation are included in their respective tutorials, with attribution and WebP compression. Existing sourced screenshots remain attributed; illustrated walkthroughs are explicitly distinguished from actual interface screenshots. Fresh screenshots from signed-in third-party accounts have not been captured in this workspace.

Each expanded article has an updated date and Article citations drawn from its published reference list. Sitemap modification dates reflect this actual release; unchanged pages are not arbitrarily assigned a new date. Robots already permits public crawling and excludes private API/admin routes, so it did not need a speculative change.

## Verification

- `npm run build`: production compilation, TypeScript, prerendering, and public knowledge indexing.
- `node scripts/check-naila-conversations.cjs`: realistic multi-turn conversations and closings.
- `node scripts/check-twelve-industry-release.cjs`: twelve alphabetical industries, eleven related links before each FAQ, 205 rendered article additions, compressed covers, and Naila policy/industry coverage.
- `node scripts/verify-orbilect-search.cjs`: production HTTP checks for sitemap routes, metadata, schema JSON, internal links/fragments, robots, and local images.

Browser interaction/animation QA and live Hostinger deployment are not verified by these HTTP checks. There is no authenticated GitHub write credential in this workspace. The accompanying Mac publishing script builds and verifies an isolated checkout before pushing without force; Hostinger deployment must then be checked in its dashboard.

## Reusable cover prompt

Use the Orbilect SEO Search Blueprint reference as the style guide. Create a portrait 4:5 industry cover on white with the Orbilect SEO logo at the upper left, a concise industry name in Poppins-style blue #004AAD and black, fine grey grid lines, and matte dimensional browser/search panels. Add industry-specific objects: car and key; shopping products and bag; book and graduation cap; bank and calculator; plated food and menu; medical kit and stethoscope; hotel and luggage; freight and warehouse; manufacturing arm and gear; house and location pin; SaaS dashboard and cloud; theatre masks and clapperboard. Use restrained shadows, no neon, no fabricated performance statistics. Keep layout and logo placement consistent across the twelve covers. Export the website asset as 640×800 WebP, preferably below 60 KB.

## Search visibility limits

Crawlable HTML, useful source-backed explanations, canonical URLs, accurate metadata and structured data support eligibility. They cannot guarantee Google rich results, rankings, indexing dates, or citations in ChatGPT, Google AI, Bing or any other engine.

## Conservative cleanup

Removed the unused legacy IndustryDetail implementation, duplicate carousel CSS replaced by the shared marquee, redundant no-op industry investment blocks, and obsolete related-industry markup. Unrelated application code and email configuration were preserved.
