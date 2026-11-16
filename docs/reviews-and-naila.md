# Reviews and Naila support

## Public review destinations

`/reviews` is available as soon as the site is deployed. Its private-feedback link uses the existing enquiries form. The listed platform logos identify review networks. They do not indicate a listing, accreditation, partnership, or published rating.

Set the server variable `ORBILECT_REVIEW_PROFILES` to a JSON object when you have confirmed your own public submission URLs. The keys are `google`, `bing`, `yelp`, `trustpilot`, `designrush`, `techbehemoths`, `clutch`, `goodfirms`, `reviewsio`, `trustradius`, `bbb`, and `softwareworld`. Each entry accepts a `reviewUrl` from that platform. Open each link signed out and confirm it names Orbilect SEO and goes to the intended listing or submission form. For Google, use the link from **Business Profile → Read reviews → Get more reviews**. Use the public business listing URL for Bing and Yelp.

If the platform provides a compatible official iframe, add its exact HTTPS `embedUrl` to the verified entry. The page loads it only when a visitor asks. Arbitrary scripts and raw HTML aren't accepted. An unchanged direct link remains available when a platform doesn't allow embedding. Rebuild and redeploy the site after changing this variable because the reviews page is prerendered.

## Human chat and private agent reviews

1. Apply `supabase/migrations/20261116000002_naila_human_chat.sql` to the project's Supabase database. It creates private storage and a server-only function.
2. Keep `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `NAILA_SESSION_SECRET`, and the existing `LEAD_ADMIN_USERNAME` and `LEAD_ADMIN_PASSWORD` on the server. Set `NAILA_HUMAN_CHAT_ENABLED=1` and redeploy. Keep the service key and signing secret out of client-side environment variables. The public widget inherits its enabled setting from the build environment.
3. In Naila, choose **Chat options → Talk to a person**, then confirm that the current conversation can be shared with support.
4. Open `/admin/naila/chats`. Join a waiting conversation with the agent's display name, send a reply, then choose **Close chat and request a rating**. The open visitor session checks for updates every five seconds. A minimized chat shows a rating prompt when the page is visible.
5. The private inbox stores the shared transcript, human messages, and the optional rating and review under a numbered support record such as `Vis01`. These support record numbers are separate from analytics visit numbers. The signed session cookie is needed to return to the visitor side of an existing chat.

Set a database retention job for this table according to your support-record policy. For example, if the agreed retention is 45 days, schedule `delete from public.naila_human_chats where updated_at < now() - interval '45 days';`. The sequence is independent of retention and numbers can skip.
