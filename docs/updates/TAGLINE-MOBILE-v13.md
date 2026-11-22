# Tagline and mobile layout update v13

Based on GitHub main 5fbbefd (v12).

This update is limited to the requested tagline and responsive presentation changes:

- Home hero, footer signature and page loading screen share one letter-by-letter tagline component. Character reveal timing matches the former Home hero: 52ms between letters and a 140ms reveal. Accent words are #004AAD; remaining text follows the white foreground. The loading screen keeps its near-black background and contains no continue button.
- Footer typing begins when the signature enters the viewport. It runs once per mount. Reduced-motion users see complete text without character animation; an accessible full-text version is retained for assistive technology.
- Mobile/tablet public-page headings, supporting paragraphs, subheadings and captions are centred. CTA groups and individual CTAs are centred. Footer branding/contact/social/legal groups are centred at the same responsive breakpoint.
- CTAs use 13px text on tablets and 12px on phones, narrower padding, 26px arrow discs and 14px arrows. Their width follows the label, wraps when necessary and stays within the viewport. Minimum tap height stays 44px. Existing colours and hover behaviour are preserved.
- Responsive rules apply below 1024px, and below 1366px on coarse-pointer devices. Desktop layout remains unchanged. Input text and table columns keep their useful native alignment. Standalone admin routes do not load this public layout stylesheet; chat conversation layout is outside the targeted public content regions.

No image compression, carousel timing, policies, emails, promotions, forms or Naila reply logic were changed in this update.

Production build and public-content indexing passed. Representative rendered markup/shared typography checks passed, along with existing gallery/media checks and the production route/metadata/schema/link/image verification. Browser layout QA was unavailable because the managed preview infrastructure passes flags unsupported by this Next.js project; computed layouts at actual device sizes have not been visually verified here.

Install and inspect locally before publishing if desired. The included publisher can build/check and push through the Mac's existing GitHub authentication when you choose to run it. No push or deployment has been performed from the preparation session.
