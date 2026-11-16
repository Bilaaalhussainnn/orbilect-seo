"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Depth } from "./depth";
import HomeCta from "./home-cta";
import styles from "./workbench.module.css";

const stack = (asset: string) => "/technology-stack/" + asset;
const showcase = (asset: string) => "/service-showcase/logos/" + asset;

const categories = [
  { label: "Website design and development", detail: "Prototype the experience, build it for the right platform, and check that it works across devices.",
    tools: [["Figma", stack("figma.svg")], ["Next.js", stack("nextjs.svg")], ["React", stack("react.svg")], ["WordPress", stack("wordpress.svg")], ["Shopify", "/platform-logos/shopify.svg"]],
    href: "/services/website-redesign", link: "Explore website redesign" },
  { label: "Landing page design", detail: "Choose an industry and compare a light or dark direction. Each example uses a clear offer, a visual hierarchy, and a practical next step.",
    tools: [], href: "/services/landing-page-design", link: "Explore landing page design" },
  { label: "SEO and keyword research", detail: "Identify useful queries, review how pages perform, and turn findings into priorities for content and technical work.",
    tools: [["Semrush", stack("semrush.png")], ["Ahrefs", stack("ahrefs.png")], ["Search Console", stack("search-console.svg")], ["Google Analytics 4", showcase("analytics.svg")]],
    href: "/services/on-page-seo", link: "Explore on-page SEO" },
  { label: "Email marketing", detail: "Build templates and lifecycle journeys, test messages, and track delivery or customer actions where measurement is available.",
    tools: [["Klaviyo", showcase("klaviyo.png")], ["Mailchimp", showcase("mailchimp.svg")], ["Resend", showcase("resend.svg")]],
    href: "/services/email-marketing", link: "Explore email marketing" },
  { label: "Social media marketing", detail: "Plan creative, adapt formats to each channel, and measure the actions you want audiences to take.",
    tools: [["Canva", stack("canva.svg")], ["Meta", showcase("meta.svg")], ["Instagram", showcase("instagram.svg")], ["Facebook", showcase("facebook.svg")], ["X", showcase("x.svg")]],
    href: "/services/social-media-marketing", link: "Explore social media marketing" },
  { label: "Content production and analytics", detail: "Develop briefs, edit with your team, and use reporting to decide which pages and campaigns need attention.",
    tools: [["Google Docs", stack("google-docs.svg")], ["Grammarly", stack("grammarly.svg")], ["Looker Studio", showcase("looker-studio.svg")], ["Tag Manager", showcase("tag-manager.svg")]],
    href: "/services/marketing-analytics", link: "Explore marketing analytics" },
] as const;

const industries = [
  ["healthcare", "Healthcare"], ["real-estate", "Real estate"], ["retail", "Retail"],
  ["ecommerce", "Ecommerce"], ["shopify", "Shopify"], ["crypto", "Crypto"],
] as const;

type Industry = (typeof industries)[number][0];

export default function Technology() {
  const [open, setOpen] = useState<number | null>(0);
  const [industry, setIndustry] = useState<Industry>("healthcare");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const active = open === null ? null : categories[open];
  const industryName = industries.find(([slug]) => slug === industry)?.[1];

  return (
    <section id="technologies" className={styles.dark} aria-labelledby="technologies-title">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <p data-site-eyebrow="" data-reveal="off">Our technology stack</p>
          <h2 id="technologies-title">What we use to <span>build and grow your site</span></h2>
          <p>See the tools we use across design, development, search, and marketing. Open a category to explore the stack and the work it supports.</p>
        </div>
        <div className={styles.toolLayout}>
          <div className={styles.accordion}>
            {categories.map(({ label, detail, href, link, tools }, index) => (
              <div className={styles.accordionItem} key={label} style={{ order: index * 2 }}>
                <h3>
                  <button type="button" aria-expanded={open === index} aria-controls={`home-tech-${index}`}
                    onClick={() => setOpen(current => current === index ? null : index)}>
                    {label}<ChevronDown size={18} aria-hidden="true" />
                  </button>
                </h3>
                <div hidden={open !== index} className={styles.accordionBody} id={`home-tech-${index}`}>
                  <p>{detail}</p>
                  {tools.length === 0 && <>
                    <div className={styles.exampleControls} role="group" aria-label="Example industry">
                      {industries.map(([slug, name]) => (
                        <button key={slug} type="button" aria-pressed={industry === slug} onClick={() => setIndustry(slug)}>{name}</button>
                      ))}
                    </div>
                    <div className={styles.exampleControls} role="group" aria-label="Example theme">
                      {(["light", "dark"] as const).map(value => (
                        <button key={value} type="button" aria-pressed={theme === value} onClick={() => setTheme(value)}>{value === "light" ? "Light" : "Dark"}</button>
                      ))}
                    </div>
                  </>}
                  <HomeCta href={href}>{link}</HomeCta>
                </div>
              </div>
            ))}
          </div>

          {active && open !== null && (
            <div className={styles.techStage} style={{ order: open * 2 + 1 }}>
              <Depth>
                <div className={styles.techPanel} aria-live="polite">
                  {active.tools.length ? (
                    <div key={active.label} className={styles.briefContent}>
                      <h3>{active.label}</h3>
                      <ul className={styles.logoGrid}>
                        {active.tools.map(([name, src]) => (
                          <li key={name}>
                            <span><Image src={src} alt="" width={46} height={46} unoptimized /></span>
                            <strong>{name}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <figure key={industry + theme} className={styles.landingPreview}>
                      <Image src={`/service-showcase/ui/${industry}-${theme}.webp`}
                        alt={`${industryName} landing page in a ${theme} palette`} width={1536} height={1024}
                        sizes="(max-width: 850px) 88vw, 600px" unoptimized />
                      <figcaption>{industryName} · {theme === "light" ? "Light" : "Dark"}</figcaption>
                    </figure>
                  )}
                </div>
              </Depth>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
