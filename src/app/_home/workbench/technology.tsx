"use client";
import { AssetImage } from "@/components/optimized-image";


import Image from "@/components/optimized-image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import industryCatalog from "../industry-growth/industries.json";
import media from "@/lib/landing-previews.json";
import { Depth } from "./depth";
import HomeCta from "./home-cta";
import styles from "./workbench.module.css";

const stack = (asset: string) => "/technology-stack/" + asset;
const showcase = (asset: string) => "/service-showcase/logos/" + asset;

const categories = [
  { label: "Website design and development", detail: "Prototype the experience, build it for the right platform, and check that it works across devices.",
    tools: [["Figma", stack("figma.svg")], ["Next.js", stack("nextjs.svg")], ["React", stack("react.svg")], ["WordPress", stack("wordpress.svg")], ["Shopify", "/platform-logos/shopify.svg"]],
    href: "/services/website-redesign", link: "Explore website redesign" },
  { label: "Landing page design", detail: "Choose an industry and explore current design inspiration. Each example uses a clear offer, a visual hierarchy, and a practical next step.",
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

const industries = industryCatalog.map(item => [item.slug, item.name] as const);
const previews = Object.entries(media).filter(([url]) => url.startsWith("/industry-showcases/"));
export default function Technology() {
  const [open, setOpen] = useState<number | null>(0);
  const [industry, setIndustry] = useState("automotive");
  const [design, setDesign] = useState(0);
  const options = previews.filter(([url]) => url.startsWith("/industry-showcases/" + industry + "/")).slice(0, 2);
  const preview = options[design]?.[1] ?? options[0]?.[1];
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
                        <button key={slug} type="button" aria-pressed={industry === slug} onClick={() => { setIndustry(slug); setDesign(0); }}>{name}</button>
                      ))}
                    </div>
                    <div className={styles.exampleControls} role="group" aria-label="Design example">
                      {([0, 1] as const).map(value => (
                        <button key={value} type="button" aria-pressed={design === value} onClick={() => setDesign(value)}>{`Design ${value + 1}`}</button>
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
                    <figure key={industry + design} className={styles.landingPreview}>
                      {preview && <AssetImage src={preview.src} srcSet={preview.srcSet} sizes="(max-width: 850px) 80vw, 420px" alt={`${industryName} website design inspiration`} width={480} height={600} loading="lazy" decoding="async" />}
                      <figcaption>{industryName} · Design {design + 1}</figcaption>
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
