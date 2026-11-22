"use client";

import { useState } from "react";
import Image from "@/components/optimized-image";
import { ArrowUpRight, BarChart3, Layers, MapPin, Package, Search } from "lucide-react";
import styles from "./platform-sections.module.css";

const platforms = [
  {
    name: "Shopify",
    slug: "shopify",
    focus: "Collections, product templates, and app performance",
    intro: "We work within Shopify’s catalogue and theme structure. The priority is to make collections useful search destinations and keep product details consistent across the storefront.",
    points: [
      ["Map demand to collections", "Build collection pages around what shoppers compare, such as waterproof hiking boots or wide-fit running shoes. Use clear titles, helpful copy, and links to in-stock products."],
      ["Review product and collection URLs", "Check canonical output, internal links, and redirects when the same product appears through different catalogue paths."],
      ["Check themes and product data", "Review the theme’s product markup against visible price, availability, and variants. Check whether apps are duplicating markup or slowing down key templates."],
      ["Make the sitemap useful", "Review Shopify’s generated sitemap, submit it in Search Console when needed, and inspect the collections and products that matter most."],
      ["Connect visibility to sales", "Compare organic impressions and clicks with tracked landing-page visits and orders. Account for promotions and stock changes when reviewing results."],
    ],
  },
  {
    name: "Magento",
    slug: "magento",
    focus: "Large catalogues, layered navigation, and store views",
    intro: "For Magento Open Source and Adobe Commerce, we start with how categories, filters, extensions, and store views generate URLs. A fix may need to be tested across thousands of products.",
    points: [
      ["Control which filter pages are discoverable", "Identify filter combinations that serve distinct demand and review how the rest are linked, crawled, and indexed."],
      ["Review canonical tags and URL rewrites", "Check category and product URL patterns, audit old redirects, and test that links point to the intended destination."],
      ["Audit sitemaps and store views", "Sample sitemap entries for each relevant store view. Review language and regional signals when the catalogue serves multiple markets."],
      ["Test catalogue performance", "Check representative category and product templates on mobile. Prioritize heavy scripts, slow filters, and delays that interfere with shopping."],
      ["Measure fixes by template", "Track samples of priority categories and products after release. Compare discovery, organic visits, and orders by store view where data is available."],
    ],
  },
  {
    name: "WooCommerce",
    slug: "woocommerce",
    focus: "Product taxonomies, variation pages, and plugin conflicts",
    intro: "WooCommerce runs on WordPress. We look at how your theme, SEO plugin, and commerce extensions work together, especially where several tools control the same page or markup.",
    points: [
      ["Review categories, tags, and attributes", "Give useful product categories a clear role. Audit overlapping tag and attribute archives so priority categories stay easy to find."],
      ["Improve variable products", "Make size, color, or compatibility easy to check. Review how variation links and availability are presented on the product page."],
      ["Check SEO plugin and theme output", "Review generated titles, canonicals, breadcrumbs, and structured data. Resolve overlapping output from extensions when it occurs."],
      ["Reduce mobile friction", "Test product filters, images, cart actions, and checkout. Address plugin or theme overhead on the pages shoppers actually use."],
      ["Track products and orders", "Review organic entry pages and verified purchase events to see which categories attract shoppers who buy."],
    ],
  },
  {
    name: "WordPress",
    slug: "wordpress",
    focus: "Content-led storefronts, product landing pages, and catalogue integrations",
    intro: "For WordPress sites with embedded shops or external checkouts, the content and shopping experience can live in different places. We make the path between them clear and measurable.",
    points: [
      ["Give guides and product pages separate jobs", "Map informational searches to guides and shopping searches to relevant landing pages. Link from buying advice to the correct destination."],
      ["Review permalinks and archive pages", "Check old URLs, redirects, thin archives, and duplicate landing pages. Give each important topic a preferred destination."],
      ["Check what the storefront exposes", "Review whether embedded product content is available on useful, crawlable pages. Recommend dedicated pages where shoppers need more detail."],
      ["Improve page templates and media", "Audit headings, image sizes, alt text, and scripts. Prioritize changes on guides and landing pages with a clear path to purchase."],
      ["Measure the checkout handoff", "Where the setup allows, verify tracking from a WordPress landing page to an external store or checkout and document any reporting gaps."],
    ],
  },
];

const shopifySteps = [
  {
    icon: Search, title: "Start with what shoppers search",
    copy: "Match broad shopping searches to collections and product-specific searches to product pages. Give buying guides their own role and link them to the right inventory.",
  },
  {
    icon: Layers, title: "Fix the theme and catalogue paths",
    copy: "Review sitemap coverage, canonical output, and links between collections and products. Check that important templates are usable on mobile and keep product details current.",
  },
  {
    icon: Package, title: "Prepare products for free listings",
    copy: "Help connect the catalogue to Google Merchant Center, review product identifiers and feed issues, and check that price, availability, and landing pages agree.",
  },
  {
    icon: BarChart3, title: "Measure which pages sell",
    copy: "Review search visibility, organic landing pages, and tracked orders. Use those findings to decide which collections, products, or buying guides to improve next.",
  },
];

export function EcommercePlatformSections() {
  const [selected, setSelected] = useState(0);
  const platform = platforms[selected];

  return (
    <>
      <section id="ecommerce-platforms" className={styles.light} aria-labelledby="ecommerce-platform-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Ecommerce tech stacks</p>
            <h2 id="ecommerce-platform-title">How we optimize <span>your ecommerce platform</span></h2>
            <p>Choose your platform to see how we handle its catalogue, page templates, and organic search reporting.</p>
          </header>

          <div className={styles.layout}>
            <div className={styles.controls} role="group" aria-label="Choose an ecommerce platform">
              {platforms.map((item, index) => (
                <button key={item.slug} type="button" aria-pressed={selected === index}
                  aria-controls="ecommerce-platform-panel" onClick={() => setSelected(index)}>
                  <span className={styles.logo}>
                    <Image src={"/platform-logos/" + item.slug + ".svg"} width={25} height={25} alt="" unoptimized />
                  </span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            <div id="ecommerce-platform-panel" className={styles.panel}>
              <div className={styles.panelTitle} aria-live="polite" aria-atomic="true">
                <p>{platform.name}</p>
                <h3>{platform.focus}</h3>
              </div>
              <div className={styles.platformBody} key={platform.slug}>
                <p>{platform.intro}</p>
                {platform.points.map(([title, copy], index) => (
                  <details key={title} name={"platform-" + platform.slug} open={index === 0}>
                    <summary>{title}<span aria-hidden="true">+</span></summary>
                    <p>{copy}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="shopify-organic-growth" className={styles.dark} aria-labelledby="shopify-growth-title">
        <div className={styles.wrap}>
          <div className={styles.layout}>
            <header className={styles.header}>
              <p className={styles.eyebrow} data-site-eyebrow="">Shopify organic growth</p>
              <h2 id="shopify-growth-title">Help shoppers find <span>the products they came for</span></h2>
              <p>We start with the collections that matter to your store, improve the pages shoppers land on, and check whether organic visits turn into orders.</p>
              <div className={styles.local}>
                <MapPin size={21} aria-hidden="true" />
                <div>
                  <h3>Google Business Profile for eligible stores</h3>
                  <p>If you serve customers in person, we can check eligibility, help you claim and verify your profile, and keep hours, location, and store links accurate. For an online-only store, we focus on your Shopify storefront and eligible Merchant Center free listings.</p>
                </div>
              </div>
              <a className={styles.cta} href="#request-proposal" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />Request a Shopify SEO proposal </a>
            </header>

            <ol className={styles.steps} role="list">
              {shopifySteps.map(({ icon: Icon, title, copy }) => (
                <li key={title}>
                  <Icon size={20} aria-hidden="true" />
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
