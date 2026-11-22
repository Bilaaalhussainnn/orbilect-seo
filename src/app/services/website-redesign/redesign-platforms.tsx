"use client";

import { useState } from "react";
import Image from "@/components/optimized-image";
import { ArrowUpRight, Gauge, Server, ShieldCheck } from "lucide-react";
import styles from "./redesign-platforms.module.css";

const stacks = [
  {
    "name": "WordPress",
    "icon": "wordpress",
    "mark": "W",
    "summary": "Block themes, visual builders, and custom WordPress sites.",
    "points": [
      [
        "Redesign without losing useful content",
        "Keep valuable pages, editorial content, and working integrations while replacing dated layouts and navigation."
      ],
      [
        "Rebuild templates and editing workflows",
        "Set up reusable blocks, theme templates, or builder components your team can edit after launch."
      ],
      [
        "Reduce plugin and theme overhead",
        "Review overlapping plugins, heavy scripts, and media on the pages customers actually use."
      ],
      [
        "Protect search visibility during launch",
        "Keep important URLs where possible and check redirects, titles, sitemaps, and forms after release."
      ]
    ],
    "logo": "/platform-logos/wordpress.svg"
  },
  {
    "name": "Squarespace",
    "icon": "squarespace",
    "mark": "Sq",
    "summary": "Drag-and-drop layouts, service sites, and small catalogues.",
    "points": [
      [
        "Redesign inside Squarespace",
        "Rework page sections and navigation using the existing builder when it can support the project."
      ],
      [
        "Make mobile layouts easier to use",
        "Check spacing, headings, images, and how customers reach the booking or enquiry form."
      ],
      [
        "Simplify booking and integrations",
        "Review scheduling embeds, forms, and third-party scripts so customers have a clear next step."
      ],
      [
        "Plan a move when you outgrow the builder",
        "Inventory pages, content, and integrations before rebuilding on a different stack."
      ]
    ],
    "logo": "/platform-logos/squarespace.svg"
  },
  {
    "name": "Wix",
    "icon": "wix",
    "mark": "Wix",
    "summary": "Wix Editor and Wix Studio websites, bookings, and business sites.",
    "points": [
      [
        "Improve the existing site",
        "Restructure service pages and navigation and rebuild the sections customers use to decide."
      ],
      [
        "Review mobile layouts and apps",
        "Check breakpoints, scripts, and widgets that slow pages or interfere with forms."
      ],
      [
        "Test Wix Bookings and forms",
        "Verify the steps from service selection to confirmation and check where submissions go."
      ],
      [
        "Rebuild on another stack when needed",
        "Map the content, URLs, and functions that need to move before choosing the replacement."
      ]
    ],
    "logo": "/platform-logos/wix.svg"
  },
  {
    "name": "Shopify",
    "icon": "shopify",
    "mark": "S",
    "summary": "Storefront themes, collections, product pages, and app integrations.",
    "points": [
      [
        "Redesign the storefront around the catalogue",
        "Make collections easier to browse and give product pages clearer fit, availability, and shipping details."
      ],
      [
        "Build and test in a theme preview",
        "Verify product variants, carts, and app behavior before publishing the theme."
      ],
      [
        "Review app and theme performance",
        "Check scripts, images, and features that slow priority mobile pages."
      ],
      [
        "Protect product and collection URLs",
        "Map changed paths, verify redirects, and review sitemap and search visibility after launch."
      ]
    ],
    "logo": "/platform-logos/shopify.svg"
  },
  {
    "name": "Magento",
    "icon": "magento",
    "mark": "M",
    "summary": "Magento Open Source and Adobe Commerce catalogues.",
    "points": [
      [
        "Design for large catalogues",
        "Improve category pages, product templates, and filters around how shoppers browse."
      ],
      [
        "Check store views and extensions",
        "Verify regional storefronts, catalogue rules, and integrations that the redesign needs to retain."
      ],
      [
        "Test performance at catalogue scale",
        "Check representative product and category pages and investigate slow filters or responses."
      ],
      [
        "Launch with a tested URL map",
        "Test redirects, search destinations, and purchase flows across the store views in scope."
      ]
    ],
    "logo": "/platform-logos/magento.svg"
  },
  {
    "name": "WooCommerce",
    "icon": "woocommerce",
    "mark": "Woo",
    "summary": "WordPress stores with product, checkout, and payment extensions.",
    "points": [
      [
        "Rebuild shop and product templates",
        "Clarify category browsing, product options, and purchase actions on phones and desktops."
      ],
      [
        "Keep the right store integrations",
        "Test payments, shipping, inventory, and confirmation emails before replacing the live theme."
      ],
      [
        "Review plugin and hosting performance",
        "Investigate slow product pages and checkout requests, then prioritize the fixes that affect shoppers."
      ],
      [
        "Verify the path from search to checkout",
        "Check key product URLs, carts, purchase tracking, and live orders after release."
      ]
    ],
    "logo": "/platform-logos/woocommerce.svg"
  },
  {
    "name": "React",
    "icon": "react",
    "mark": "R",
    "summary": "Custom interfaces, component libraries, and interactive sites.",
    "points": [
      [
        "Redesign reusable components",
        "Build consistent navigation, forms, and layouts around a shared component library."
      ],
      [
        "Review how important pages render",
        "Check whether the content customers need is present at the right URLs and accessible when the page loads."
      ],
      [
        "Reduce unnecessary JavaScript",
        "Review bundle size, heavy dependencies, and costly interactions on key pages."
      ],
      [
        "Test the workflows customers use",
        "Verify forms, integrations, and mobile interactions before handing over the build."
      ]
    ],
    "logo": "/platform-logos/react.svg"
  },
  {
    "name": "Next.js",
    "icon": "nextdotjs",
    "mark": "N",
    "summary": "Custom marketing sites, CMS integrations, and headless storefronts.",
    "points": [
      [
        "Choose the right rendering for each page",
        "Plan how marketing pages, catalogue routes, and frequently updated content should be served."
      ],
      [
        "Rebuild metadata and navigation together",
        "Verify titles, preferred URLs, internal links, and sitemaps for the routes in scope."
      ],
      [
        "Review images, scripts, and caching",
        "Test the parts of the site that contribute most to load time and slow interactions."
      ],
      [
        "Stage and verify the migration",
        "Check redirects, integrations, and key URLs before launch and again on the live site."
      ]
    ],
    "logo": "/platform-logos/nextdotjs.svg"
  },
  {
    "name": "HTML websites",
    "icon": "html5",
    "mark": "HTML",
    "summary": "Static websites built with HTML, CSS, and JavaScript.",
    "points": [
      [
        "Rebuild outdated layouts",
        "Replace rigid templates with responsive layouts and clear navigation."
      ],
      [
        "Keep a lightweight stack where it fits",
        "Review assets, scripts, and embeds and keep the features the site actually needs."
      ],
      [
        "Make content and forms easier to use",
        "Improve headings, links, labels, and contact forms across representative devices."
      ],
      [
        "Choose how the site will be maintained",
        "Keep a static workflow or add a CMS if your team needs to publish and edit regularly."
      ]
    ],
    "logo": "/platform-logos/html5.svg"
  }
];
const hostingSteps = [
  { icon: Gauge, title: "Find the bottleneck", copy: "Check server response times, mobile performance, uptime, and key pages under normal use. Slow hosting, oversized images, and heavy scripts need different fixes." },
  { icon: Server, title: "Choose the right upgrade or move", copy: "If hosting is the bottleneck, we can help select a suitable plan or migrate to a new provider. For hosted builders and storefronts, we assess what can be improved in place and what would require a platform migration." },
  { icon: ShieldCheck, title: "Protect the routes people already use", copy: "Back up and test before cutover, preserve priority URLs when possible, map redirects when they change, and verify forms, checkout, HTTPS, and search monitoring after launch." },
];

export function RedesignPlatforms() {
  const [selected, setSelected] = useState(0);
  const stack = stacks[selected];

  return (
    <>
      <section id="redesign-platforms" className={styles.light} aria-labelledby="redesign-platform-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Website redesign tech stacks</p>
            <h2 id="redesign-platform-title">Redesign what works. <span>Rebuild what holds you back.</span></h2>
            <p>We work with visual builders, ecommerce platforms, and custom code. Choose your stack to see what we can keep, improve, or rebuild.</p>
          </header>
          <div className={styles.layout}>
            <div className={styles.controls} role="group" aria-label="Choose your website platform">
              {stacks.map((item, index) => (
                <button key={item.name} type="button" aria-pressed={index === selected}
                  aria-controls="redesign-platform-panel" onClick={() => setSelected(index)}>
                  <span className={styles.logo} aria-hidden="true">
                    {"logo" in item && item.logo
                      ? <Image src={item.logo} width={22} height={22} alt="" unoptimized />
                      : item.mark}
                  </span>
                  {item.name}
                </button>
              ))}
            </div>
            <div id="redesign-platform-panel" className={styles.panel}>
              <div aria-live="polite" aria-atomic="true">
                <h3>{stack.name}</h3>
                <p>{stack.summary}</p>
              </div>
              <div className={styles.accordion} key={stack.name}>
                {stack.points.map(([title, copy], index) => (
                  <details key={title} name={"redesign-" + stack.icon} open={index === 0}>
                    <summary>{title}<span aria-hidden="true">+</span></summary>
                    <p>{copy}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="hosting-and-migration" className={styles.dark} aria-labelledby="redesign-hosting-title">
        <div className={styles.wrap + " " + styles.layout}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Hosting and migration</p>
            <h2 id="redesign-hosting-title">When a slow website <span>needs more than a redesign</span></h2>
            <p>An overloaded hosting plan can make pages slow or unreliable. Shoppers may leave before they see the offer, and recurring server errors can interfere with crawling. We find out where the delay starts before recommending a new plan.</p>
            <a className={styles.cta} href="#request-proposal" data-orbilect-cta="outline"><span data-orbilect-cta-icon="" aria-hidden="true" />Discuss a redesign or hosting move </a>
          </header>
          <ol className={styles.steps} role="list">
            {hostingSteps.map(({ icon: Icon, title, copy }) => (
              <li key={title}><Icon size={20} aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
