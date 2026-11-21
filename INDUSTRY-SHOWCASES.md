# Orbilect SEO industry showcase — localhost first

The nine industries shown on the Industries directory receive the showcase: Automotive, Finance, Real Estate, Hospitality, Education, Healthcare, Ecommerce, Logistics, and Manufacturing. The three additional repository routes are excluded.

## Install and preview on your Mac

Unzip the download, then run from Terminal:

```bash
bash ~/Downloads/Orbilect-SEO-Industry-Showcases/install-local.sh ~/Desktop/orbilect-seo
cd ~/Desktop/orbilect-seo
npm run dev -- --port 3013
```

Open http://localhost:3013/industries/automotive#industry-design-heading
If port 3013 is already occupied, use another free port. The installer does not commit, push, or deploy. It checks the patch before applying, and stops if your source differs. Do not force it if that happens.

## Your images

The website images were not included in the request. Until added, each missing slot clearly says “Your image goes here”; these are placeholders, not delivered website designs.

Place 16 images per folder. **Keep original filenames if you prefer.** The code discovers JPG/JPEG, PNG, WebP and AVIF files automatically, uses natural alphabetical order, and displays the first 16: images 1–8 in row one, 9–16 in row two. Both rows repeat only for a seamless loop. Use one format per design, not duplicate PNG and JPG exports of the same picture.

For a predictable sequence, the optional exact names are `<industry>-01.jpg` through `<industry>-16.jpg` (01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16). `.png` or `.webp` works too. Export at 800×1000 or 1080×1350 (4:5). Original artwork is shown uncropped.

| Page | Folder inside orbilect-seo | Optional filenames |
| --- | --- | --- |
| `/industries/automotive` | `public/industry-showcases/automotive/` | `automotive-01.jpg` … `automotive-16.jpg` |
| `/industries/ecommerce` | `public/industry-showcases/ecommerce/` | `ecommerce-01.jpg` … `ecommerce-16.jpg` |
| `/industries/education` | `public/industry-showcases/education/` | `education-01.jpg` … `education-16.jpg` |
| `/industries/finance` | `public/industry-showcases/finance/` | `finance-01.jpg` … `finance-16.jpg` |
| `/industries/healthcare` | `public/industry-showcases/healthcare/` | `healthcare-01.jpg` … `healthcare-16.jpg` |
| `/industries/hospitality` | `public/industry-showcases/hospitality/` | `hospitality-01.jpg` … `hospitality-16.jpg` |
| `/industries/logistics` | `public/industry-showcases/logistics/` | `logistics-01.jpg` … `logistics-16.jpg` |
| `/industries/manufacturing` | `public/industry-showcases/manufacturing/` | `manufacturing-01.jpg` … `manufacturing-16.jpg` |
| `/industries/real-estate` | `public/industry-showcases/real-estate/` | `real-estate-01.jpg` … `real-estate-16.jpg` |

Refresh localhost after adding images. After replacing assets in production, rebuild and redeploy. No image imports or source changes are needed. Filenames with spaces are URL-encoded safely.

## What changed

- White section before the FAQs, brand-blue multi-color heading, industry-specific website design copy, existing CTA style linking to `/contact`.
- Two edge-to-edge rows, no spacing between images or rows. Medium 4:5 cards; smaller cards on phones and tablets.
- Continuous opposite-direction CSS motion; no hover pause, arrows, or playback buttons. The operating system’s reduced-motion setting is respected.
- Pointer-reactive 3D browser illustration with floating layers and icons.
- A small, right-aligned sample-design disclaimer with a leading asterisk.
- Three responsive feature blocks below the designs: tech stack, SEO tools, and industry-specific design benefits, each with an animated 3D symbol.
- Lined industry-specific subheading; the repeated CTA beneath the designs is removed. The heading CTA remains.
- Duplicate “SEO FAQ” and “Frequently asked questions” labels removed on industry pages only; the main FAQ heading stays.
- The nine listed industry pages’ hero spacing uses the existing About/service scale; visuals are capped and compact on phones/tablets.

## Review before deployment

Check automotive first after inserting your 16 images, then the other folders one by one. No GitHub push or Hostinger deployment has been performed. Verify with `npm run build` once your images are in place. The full production build and generated HTML checks passed before packaging. Browser layout review remains outstanding because the managed preview launcher supplies unsupported Next.js flags.
