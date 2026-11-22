"use client";

import Image from "@/components/optimized-image";
import Link from "next/link";
import { ArrowUpRight, Headset, ShoppingBag, TrendingUp } from "lucide-react";
import { useState, type PointerEvent } from "react";
import ctaStyles from "@/styles/orbilect-cta.module.css";
import styles from "../on-page-seo/on-page-subservices.module.css";
import sectionStyles from "./ecommerce-management-section.module.css";

const platforms = [
  { name: "Shopify", logo: "/platform-logos/shopify.svg", detail: "Organize collections, configure markets, connect approved apps, and test the checkout flow before launch." },
  { name: "Magento", logo: "/platform-logos/magento.svg", detail: "Plan Magento Open Source or Adobe Commerce storefronts with complex catalogs, store views, and inventory integrations." },
  { name: "WordPress", logo: "/platform-logos/wordpress.svg", detail: "Build content-led storefronts that connect buying guides and campaigns to product pages, with WooCommerce or an integrated checkout." },
  { name: "WooCommerce", logo: "/platform-logos/woocommerce.svg", detail: "Configure product variants, shipping rules, and payment integrations, then test plugin changes on staging." },
  { name: "BigCommerce", logo: "/platform-logos/bigcommerce.svg", detail: "Set up product rules, storefronts, and sales channel feeds around the catalog your team actually maintains." },
  { name: "Wix", logo: "/platform-logos/wix.svg", detail: "Build with Wix Stores, configure product options and shipping, and connect promos to the campaigns that drive traffic." },
  { name: "Squarespace", logo: "/platform-logos/squarespace.svg", detail: "Design a catalog-led Squarespace store with consistent product photography, brand pages, and offer updates." },
  { name: "Webflow", logo: "/technology-stack/webflow.svg", detail: "Create branded product and campaign pages, then validate that Webflow’s checkout and integrations suit your markets." },
];

const workstreams = [
  {
    label: "Build",
    icon: ShoppingBag,
    title: "Build the store and the brand",
    detail: "Shape the brand, design the website, create product pages, configure checkout, and test buying and payment flows across devices.",
    steps: ["Brand and storefront", "Catalog and checkout", "Launch testing"],
  },
  {
    label: "Grow",
    icon: TrendingUp,
    title: "Bring in shoppers ready to buy",
    detail: "Improve collection and product SEO. Run paid search, Shopping, and social campaigns, then use purchase data to decide what to improve.",
    steps: ["Organic search", "Paid campaigns", "Conversion reporting"],
  },
  {
    label: "Operate",
    icon: Headset,
    title: "Run the store after launch",
    detail: "Maintain listings and stock updates, coordinate order handling and returns, and set up customer support with AI chatbots and human escalation.",
    steps: ["Catalog and orders", "Support and AI", "Returns and escalation"],
  },
];

export function EcommerceManagementSection({ standalone = false }: { standalone?: boolean }) {
  const [platform, setPlatform] = useState(platforms[0]);
  const [workstream, setWorkstream] = useState(workstreams[0]);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 10}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 13}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  const Icon = workstream.icon;

  return (
    <section id="ecommerce-management-platforms" className={`${styles.section} ${sectionStyles.section}`} aria-labelledby="ecommerce-platforms-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">360° ecommerce management</p>
          <h2 id="ecommerce-platforms-title" data-orbilect-title="">Build, grow and run <span>your online store</span></h2>
          <p>One team for storefronts and brands worldwide. We build websites, run paid campaigns, grow organic sales, and help manage the catalog, orders, and customer support after launch.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.controls} role="group" aria-label="Choose an ecommerce platform">
            {platforms.map((option) => (
              <button key={option.name} type="button" onClick={() => setPlatform(option)} aria-pressed={platform === option}>
                <Image className={sectionStyles.logo} src={option.logo} alt="" height={30} width={30} unoptimized />
                {option.name}
                <ArrowUpRight className={styles.arrow} size={16} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className={sectionStyles.preview}>
            <div className={sectionStyles.workstreams} role="group" aria-label="Choose ecommerce work">
              {workstreams.map((option) => (
                <button key={option.label} type="button" onClick={() => setWorkstream(option)} aria-pressed={workstream === option}>
                  <option.icon size={16} aria-hidden="true" />
                  {option.label}
                </button>
              ))}
            </div>
            <div className={styles.stage} onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
              <div className={`${styles.device} ${sectionStyles.device}`}>
                <div className={styles.chrome}>
                  <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
                  Ecommerce management preview
                </div>
                <div className={styles.screen} aria-live="polite" aria-atomic="true">
                  <div key={platform.name} className={styles.target}>
                    <Image className={sectionStyles.logo} src={platform.logo} alt="" height={30} width={30} unoptimized />
                    <div>
                      <strong>{platform.name}</strong>
                      <p>{platform.detail}</p>
                    </div>
                  </div>
                  <div key={workstream.label} className={`${styles.explanation} ${sectionStyles.workstream}`}>
                    <h3><Icon size={20} aria-hidden="true" />{workstream.title}</h3>
                    <p>{workstream.detail}</p>
                    <ul className={sectionStyles.steps} role="list">
                      {workstream.steps.map((step) => <li key={step}>{step}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          className={`${ctaStyles.cta} ${ctaStyles.ctaBlack} ${sectionStyles.cta}`}
          href={standalone ? "/contact#request-proposal" : "/services/ecommerce-management"}
          data-orbilect-cta="black"
        >
          <span className={ctaStyles.ctaIcon} data-orbilect-cta-icon="" aria-hidden="true" />
          {standalone ? "Discuss your store" : "Explore ecommerce management"}
        </Link>
      </div>
    </section>
  );
}
