# Gallery v6 correction

The Home and Industries directories, gallery collections, related industry links,
footer and Reviews industry options use the nine listed categories alphabetically:
Automotive, Ecommerce, Education, Finance, Healthcare, Hospitality, Logistics,
Manufacturing, Real Estate. Utilities is not an active category.

The unlisted Home Services, Professional Services and SaaS URLs now permanently
redirect to /industries. They are excluded from the sitemap and Naila page list.
The SEO checker verifies those redirects and their exclusion explicitly.

The tech-stack heading has an explicit white text fill on its blue accent to avoid
the gallery's blue text rule making it invisible. Tool chips, stack controls and
gallery options use the requested default arrow cursor. Interactive controls still
support keyboard focus. The gallery includes the existing process walkthrough
with redesign-specific steps and the existing promotional offer immediately
before the FAQs. The homepage process copy stays unchanged.

Validation: production build; SEO checker across 94 sitemap URLs, 452 linked
sections and 154 images; explicit legacy redirect checks; alphabetical category,
related-link and gallery-section order assertions. Browser visual review remains
outstanding due the managed preview launcher's unsupported Next.js flags.

Push fix: the Mac script fetches the latest origin/main, creates a separate detached
worktree from it, overlays this release and your nine collections' images, installs
dependencies, builds and verifies SEO, commits and pushes HEAD:main without force.
It does not rewrite your current local branch, delete images, or stash changes.
On failure it keeps the temporary checkout for inspection. The release includes
prior v5 work so it can be applied on top of the latest remote main.
