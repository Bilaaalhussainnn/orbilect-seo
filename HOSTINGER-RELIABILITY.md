# Orbilect SEO reliability release v21

## What this fixes

- HTML is visible before JavaScript hydrates. The full-page startup overlay was removed; the navigation loading UI is retained.
- Local images use responsive WebP files generated during the build. Homepage rendering does not wait for Node to transcode images or download third-party APIs.
- Legacy known-local `/_next/image` requests redirect to a prepared static file. Arbitrary image proxy requests are rejected.
- Image originals are retained for future exports. Hash-named delivery files can be cached immutably. The UI showcase originals already have separately generated smaller previews.
- Heading reveal rescans ignore character-by-character typing mutations and observe the main page rather than chat and footer mutations.
- Lead receipt waits for database persistence, but email notification runs after the HTTP response. Failed notifications remain available in the existing admin retry flow.
- Public pages retain unique metadata, their own canonical, brand schema, and appropriate page schema. Homepage title: `SEO & Digital Marketing Services - Orbilect SEO`. Metadata and schema are checked across all 97 sitemap pages.
- Naila has the existing public-site knowledge index refreshed from 97 build pages; no private admin information is ingested. 200 recognition examples and 200 fictional 86-message QA conversations cover services, policies, definitions, follow-ups and contact collection. Examples test the rule-based assistant; they do not train an external model or guarantee arbitrary open-ended answers.

## Hostinger deployment

1. Deploy the updated GitHub main. Build command `npm run build`, start command `npm run start`; keep the existing supported Node.js version (20.9+). Do not disable the prebuild image generation or the postbuild public knowledge index.
2. Preserve existing production environment variables. Naila requires a stable `NAILA_SESSION_SECRET`. Callback persistence requires the existing `SUPABASE_URL` and `SUPABASE_SECRET_KEY`; notification requires `RESEND_API_KEY`, a verified `RESEND_FROM_EMAIL` (or `LEAD_NOTIFICATION_FROM`), and `LEAD_EMAILS` (or `LEAD_NOTIFICATION_TO`). Never expose these as NEXT_PUBLIC variables.
3. Check deployment logs, then visit `/api/health`. It must return status `ok` and release `reliability-v21`. The health endpoint tests Node responsiveness, not database or mail availability.
4. Purge cached HTML once after successful deployment; then warm the homepage and important service pages. Keep long-lived caches for hash-named static images and `/_next/static/`. Repeatedly purging images makes the next visits slower. Do not cache `/api/naila`, inquiries, admin or personalized responses.
5. Keep one canonical app/domain deployment. Verify that HTTP and www redirect to `https://orbilectseo.com` without running an unnecessary second Node application. Check Hostinger plan CPU, memory, I/O and process-limit graphs during a slow period.
6. Ask Hostinger to investigate the repeated legitimate IP block using the affected URL, timestamp, your public IP privately, status code and `x-hcdn-request-id`. Request a precise false-positive exception. Do not broadly disable the firewall. This application release cannot change Hostinger's IP block list.
7. Set an external monitor to request `/api/health` and the homepage at a reasonable interval, such as every five minutes, and alert on failed/slow responses. Compare mobile/VPN with normal Wi-Fi to separate IP blocking from application failure. A local benchmark does not predict the production hosting limits or guarantee 24/7 availability.

## Google after deployment

- Run `node scripts/check-search-v16.cjs --live https://orbilectseo.com/` to check the new release and homepage metadata.
- In Search Console, inspect the homepage, run Test live URL, check Google's selected canonical and rendered page, and request indexing after the release is live.
- Submit `https://orbilectseo.com/sitemap.xml` if absent or reporting an error. Repeated submissions do not accelerate rankings. Check Page indexing, Crawl stats, Manual actions and Security issues. A site already indexed can still rank below directory/parent-company results.
- Validate representative service/article pages in Google's Rich Results Test. Organization and breadcrumb/article markup describe real content; self-serving business review stars are not added. Google chooses rich results and sitelinks. No title format, schema patch or sitemap submission guarantees a first-position result or immediate recrawl.

## DMCA.com setup (not completed by this release)

The free badge registration page is https://www.dmca.com/Badges.aspx . Register the account for Orbilect SEO, complete its terms/email verification, and obtain the certificate ID from that account's badge code. Do not use another company's certificate or the unregistered sample code shown before signup.

Set `DMCA_BADGE_ID` in Hostinger to that UUID and redeploy. The global footer then displays the official compact badge and loads its helper after the page. Until the real ID is configured, no protected-status claim is shown. Verify the certificate covers orbilectseo.com after deployment. DMCA.com explains a 30-day period before its protected/free-takedown status applies. This is a private protection service, not a government copyright registration or a Google ranking mechanism.

## Verification

`npm run build`

`node scripts/check-search-v16.cjs`

`node scripts/verify-orbilect-search.cjs`

`node scripts/check-naila-v21.cjs`

`node scripts/check-reliability-v21.cjs`

The 200 complete fictional conversations are in `docs/naila/200-conversations-v21.json`; they are not bundled into browser JavaScript. No production emails or customer records are created by these checks.
