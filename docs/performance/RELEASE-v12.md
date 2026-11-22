# Orbilect SEO — Loading and speed v12

Based on GitHub main 1761c67 (the deployed-source v11 release). This update changes loading visuals, footer tagline colour, cursor behaviour, Home gallery pacing and image delivery. No email, lead-form, pricing, policy or chatbot logic is changed.

## Changes

- Loader: near-black gradient (#020305 to #070b12) with a subtle blue glow. The typing tagline has white and blue segments. Both initial hydration and pending-route fallback use one shared visual. No button or link remains in the loader. Its 900ms delayed appearance, immediate removal after hydration and eight-second CSS fail-open limit remain intact.
- Footer: entire bold tagline is solid brand blue #004AAD. Existing interactive icon and footer hover effects are preserved.
- Cursor: custom logo cursor CSS and asset are removed. Existing native arrow, pointer and text-caret styles apply again.
- Home vertical wall: 36 seconds per loop instead of 90 seconds, 2.5× faster. Other gallery pages keep their existing 90-second pacing. Reduced-motion behaviour remains supported.
- Gallery derivatives: WebP quality 64 with 240/320/480px candidates, selected via srcset. Total 192 largest 480px derivatives fall from 8.37 MiB to 7.02 MiB (16.1% smaller). Home's sixteen largest thumbnails fall from 691 KiB to 580 KiB. Source design images are preserved; earlier hashed derivatives remain available for cached older pages.
- Other large illustration derivatives use WebP quality 68 instead of 76. Tool bitmap logos use 96/192px derivatives at quality 82; wordmarks use appropriately bounded 240/480px candidates. SVG logos remain vectors. A derivative is used only when it materially reduces bytes.
- Combined WebP deliveries now cover 47 illustrations/bitmap logos: 19.33 MiB of source images becomes approximately 1.55 MiB at largest delivery sizes. This differs from the previous 40-item total because seven smaller logo assets are now included.
- The Home dashboard imports only its 24 required design previews instead of the full 192-design manifest.
- Current-version logo URLs under brand, technology-stack, service-showcase/logos, platform-logos and naila receive immutable one-year caching. Unversioned URLs retain their normal policy. Content-hashed image-media/design-media files retain immutable caching. No broad cache-everything rule was added.

## Validation

Production build and public-content indexing passed. Checks covered 97 sitemap routes, 666 linked sections and 392 image URLs; Home wall/media budgets; footer/native-cursor/loading markup; current-version logo cache headers; and preserved reduced-motion/gallery behaviour. Smaller representative UI and wordmark files were inspected.

Managed browser layout QA remains unavailable in this environment because its preview runner passes flags unsupported by Next.js. Transfer budgets above are local asset measurements, not a public PageSpeed score or a guarantee of network latency.

No GitHub push or Hostinger CDN purge was completed here. GitHub write credentials are unavailable in the preparation session. The included publisher verifies the release in a separate checkout and pushes using your existing Mac authentication. Hostinger then needs to finish its automatic deployment.

## Hostinger CDN guide

1. Open hPanel → Websites → Orbilect SEO → Manage site → Performance → CDN. On Agency Hosting, CDN appears directly in the sidebar. Enable CDN if your hosting plan/domain is eligible and it is not already enabled. Use one active CDN; do not stack Hostinger CDN with a second CDN unintentionally.
2. Leave Development mode OFF for the live website; it bypasses CDN caching. Use it only while deliberately testing changes.
3. Where your plan exposes Website optimization, enable WebP image compression. Smart image optimization can use automatic settings initially. This application already creates small responsive WebPs, so avoid a second unnecessarily aggressive quality reduction. Agency plans may not expose these optimization controls.
4. After a successful deployment, use Flush cache once if you need to invalidate old copies. Then leave caching enabled. Repeated flushing forces fresh origin fetches and removes the benefit of a warm cache.
5. Check an actual image or logo request in browser Developer Tools → Network → Response Headers. The first fetch may show x-hcdn-cache-status: MISS; a later cached fetch should show HIT, or REVALIDATED where applicable. HTML can legitimately be DYNAMIC; inspect static files separately. If a static file repeatedly shows BYPASS/DYNAMIC, check CDN status, Development mode and response Cache-Control rather than continually clearing browser data.
6. Compare first-load and repeat-load results on mobile and desktop after deployment. If small assets still take seconds before their first byte, check hosting resource usage, origin response time and CDN configuration. Additional image compression cannot solve a slow origin or network connection by itself.

Official Hostinger references (checked 22 November 2026):

- https://www.hostinger.com/support/7935917-hostinger-cdn-website-optimization/
- https://www.hostinger.com/support/hostinger-cdn-how-to-clear-the-cache/
- https://www.hostinger.com/support/how-hostinger-cdn-caching-works/

Your application uses Next.js, so WordPress plugins and WordPress-specific cache instructions do not apply.
