# Carousel performance update

Measured repository assets:
- Automotive originals: 34.92 MiB; 480px previews: 706.89 KiB (98.02% smaller).
- All 144 industry designs: 313.52 MiB; 480px previews: 6.49 MiB (97.9% smaller).
- 240px and 480px WebP variants are served using responsive srcset. This is an
  asset-byte reduction, not a measured end-to-end page-load-time improvement.

Original PNG/JPG/WebP artwork is unchanged. Some .jpg originals actually contain
PNG data; resizing and WebP encoding address their large transfer/decode cost.
Images are generated before build/dev using a pinned Sharp dependency. Content
hashes in preview filenames allow one-year immutable caching. There is no
first-request dynamic image conversion on Hostinger.

The new shared marquee reserves fixed 4:5 frames, starts loading the full selected
collection near the viewport and waits for decoding before moving. It never
pauses on hover. Reduced motion remains supported. Inactive design-gallery
categories no longer mount image elements or compete for downloads. Semrush and
Ahrefs raster marks use small local WebP versions; SVG marks are left intact.

Checks: production build; 94 sitemap URLs, 452 linked sections and 298 image URLs;
146 generated asset mappings; production WebP response cache header; responsive
sources and absence of raw original URLs in carousel markup; only 16 unique
images mounted in the active gallery category. Browser visual testing remains
outstanding because the managed preview launcher passes unsupported Next.js flags.

Run the included installer on your Mac, then the push script. It uses a temporary
checkout of the latest remote main, verifies changed remote release files, builds,
checks SEO and pushes without forcing. Original images and the current local
branch are preserved. Hostinger deployment must then finish before checking live.
