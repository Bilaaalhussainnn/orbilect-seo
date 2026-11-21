"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Layers, MousePointer2, Search, MonitorSmartphone } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "./industry-design-showcase.module.css";

const designBenefits: Record<string, string> = {
  Automotive: "Make vehicle inventory easy to explore and turn interest into test-drive requests, service bookings, and enquiries.",
  Finance: "Present your expertise, credentials, and service information clearly so prospective clients can approach your team with confidence.",
  "Real Estate": "Help buyers and tenants explore properties, understand locations, and request a viewing from any device.",
  Hospitality: "Show the experience clearly, make rooms and amenities easy to compare, and give guests a direct path to booking.",
  Healthcare: "Make services, practitioner information, and appointment options clear and accessible for patients and their families.",
  Ecommerce: "Bring products to life with clear collections, useful product information, and a straightforward path to checkout.",
  Logistics: "Show your coverage, facilities, and capabilities clearly so shippers can find the right service and request a quote.",
  Manufacturing: "Make capabilities, specifications, and applications easy to assess so procurement teams can move towards an RFQ.",
  Education: "Help students and families compare courses, understand admissions, and take the next step towards enrolment.",
};

const technologyLogos = [
  ["Next.js", "/technology-stack/nextjs.svg"], ["React", "/technology-stack/react.svg"],
  ["WordPress", "/technology-stack/wordpress.svg"], ["Shopify", "/platform-logos/shopify.svg"],
  ["Node.js", "/platform-logos/nodedotjs.svg"],
];
const searchLogos = [
  ["Search Console", "/technology-stack/search-console.svg"], ["Bing", "/service-showcase/logos/bing.svg"],
  ["Semrush", "/technology-stack/semrush.png"], ["Ahrefs", "/technology-stack/ahrefs.png"],
];

function LogoStrip({ logos }: { logos: string[][] }) {
  return <ul className={styles.logos} aria-label="Tools and platforms">
    {logos.map(([label, src]) => <li key={label} title={label}><img src={src} alt="" width={24} height={24} loading="lazy" /><span>{label}</span></li>)}
  </ul>;
}

function SampleGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = 0;
    let visible = false;
    function tick(time: number) {
      if (!start) start = time;
      setProgress(Math.min(((time - start) % 12000) / 6500, 1));
      frame = requestAnimationFrame(tick);
    }
    function update() {
      cancelAnimationFrame(frame);
      start = 0;
      if (motion.matches) setProgress(1);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (ref.current) observer.observe(ref.current);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={ref} className={styles.demo} aria-label="Sample growth animation">
    <small>Sample growth preview</small>
    <div className={styles.counters} aria-hidden="true">
      <span><strong>{Math.round(progress * 1200).toLocaleString("en-US")}</strong>Visits</span>
      <span><strong>+{Math.round(progress * 24)}%</strong>Visibility</span>
      <span><strong>{Math.round(progress * 36)}</strong>Enquiries</span>
    </div>
    <div className={styles.bars} aria-hidden="true">{[22, 37, 29, 51, 44, 68, 73, 93].map((height, index) => <i key={index} style={{ height: (height * (.2 + progress * .8)) + "%" }} />)}</div>
  </div>;
}

type Design = { src: string; name: string } | null;

export default function DesignShowcaseMotion({ name, images }: { name: string; images: Design[] }) {
  function tilt(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt-x", ((event.clientY - rect.top) / rect.height * -12 + 6) + "deg");
    event.currentTarget.style.setProperty("--tilt-y", ((event.clientX - rect.left) / rect.width * 16 - 8) + "deg");
  }
  return (
    <section className={styles.section} aria-labelledby="industry-design-heading">
      <div className={styles.subheading}>{name} website design</div>
      <div className={styles.heading}>
        <div>
          <h2 id="industry-design-heading" data-orbilect-title="">Built to catch the eye.<br /><span>Designed to earn the enquiry.</span></h2>
          <p>A compelling {name.toLowerCase()} website is an important part of digital growth. We bring together distinctive design, mobile usability, clear content, and SEO to help the right visitors discover your business and take the next step.</p>
          <Link href="/contact" className={`${cta.cta} ${cta.ctaBlue}`}>
            <span className={cta.ctaIcon} aria-hidden="true"><ArrowUpRight /></span>Let’s design your next chapter
          </Link>
        </div>
        <div className={styles.art} aria-hidden="true" onPointerMove={tilt} onPointerLeave={event => {
          event.currentTarget.style.setProperty("--tilt-x", "0deg");
          event.currentTarget.style.setProperty("--tilt-y", "0deg");
        }}>
          <div className={styles.stack}><i /><i /><div className={styles.window}><span /><Code2 /><b /></div></div>
          <span className={styles.chip}><Layers /></span><span className={styles.pointer}><MousePointer2 /></span>
        </div>
      </div>
      <div className={styles.gallery} aria-label={`${name} website design inspiration, sixteen concepts`}>
        {[0, 1].map(row => {
          const designs = images.slice(row * 8, row * 8 + 8);
          return <div className={styles.lane} key={row}>
            <div className={`${styles.track} ${row === 0 ? styles.right : styles.left}`}>
              {[0, 1].map(group => <div className={styles.group} key={group} aria-hidden={group === 1 ? true : undefined}>
                {[0, 1].flatMap(repeat => designs.map((image, index) => <div className={styles.card} key={`${repeat}-${index}`} aria-hidden={repeat === 1 ? true : undefined}>
                  {image ? <img src={image.src} alt={`${name} website concept: ${image.name}`} width={800} height={1000} loading="lazy" decoding="async" /> : <div className={styles.placeholder}>
                    <Code2 aria-hidden="true" /><span>{name}</span><strong>Design {String(row * 8 + index + 1).padStart(2, "0")}</strong><small>Your image goes here</small>
                  </div>}
                </div>))}
              </div>)}
            </div>
          </div>;
        })}
      </div>
      <p className={styles.note}>*Sample designs for inspiration. Your website can be tailored to your brand, preferences, and requirements.</p>
      <div className={styles.features}>
        {[
          { Icon: Code2, title: "Built on the right technology", copy: name === "Ecommerce"
            ? "Shopify, WooCommerce, or a custom Next.js and React storefront: we select the platform around your catalogue, checkout, and growth plans."
            : `Next.js, React, and WordPress give ${name.toLowerCase()} businesses flexible options for responsive websites, useful integrations, and maintainable content.` },
          { Icon: Search, title: "Designed with search in mind", copy: `Google Search Console and Bing Webmaster Tools help us monitor discovery. Semrush or Ahrefs inform keyword research and site reviews for your ${name.toLowerCase()} website.` },
          { Icon: MonitorSmartphone, title: "A better first impression", copy: designBenefits[name] ?? "A clear, attractive website helps visitors understand your business and take the next step." },
        ].map(({ Icon, title, copy }, index) => <article className={styles.feature} key={title} tabIndex={0}
          onPointerMove={tilt} onPointerLeave={event => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); }}>
          <div className={styles.symbol} aria-hidden="true"><i /><i /><span><Icon /></span></div>
          <div className={styles.featureCopy}><h3>{title}</h3><p>{copy}</p>{index === 0 ? <LogoStrip logos={technologyLogos} /> : index === 1 ? <LogoStrip logos={searchLogos} /> : <SampleGrowth />}</div>
        </article>)}
      </div>
    </section>
  );
}
