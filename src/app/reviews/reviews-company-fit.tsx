"use client";

import { useState, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Layers3, ListChecks, Plus } from "lucide-react";
import styles from "./reviews-company-fit.module.css";

const sizes = [
  { label: "Small businesses", description: "We tackle the fixes most likely to help you get found and contacted. We start with your most important services, local listings where relevant, and a way to track calls or enquiries." },
  { label: "Growing and mid-sized businesses", description: "We organize work around the categories, locations, or markets you’re adding. We agree on a roadmap and coordinate technical improvements, content, and measurement with your team." },
  { label: "Enterprise teams", description: "We work with your internal teams on complex websites, large catalogs, and multiple locations. We agree on approval and release processes so changes can be tested and measured before they roll out more widely." },
];

const workflow = [
  ["Priority service pages", "Local visibility", "Enquiries"],
  ["Site structure", "Priority markets", "Growth reporting"],
  ["Release planning", "Catalogs and locations", "Measurement"],
];

const industries = [
  { slug: "ecommerce", label: "Ecommerce and retail", need: "Shoppers search by product, category, and problem, so the right collections and products need to be discoverable.", benefit: "Relevant search traffic reaches pages that can lead to purchases.", work: "We optimize category structure, product content, and indexing, then measure product discovery and sales where tracking is available." },
  { slug: "healthcare", label: "Healthcare", need: "Patients look for nearby providers, specific services, and clear booking information.", benefit: "Accurate pages make it easier to compare services and request an appointment.", work: "We organize service and location pages, maintain public business details, and coordinate medical content review with your team." },
  { slug: "professional-services", label: "Professional services", need: "Buyers search the problem they need solved and compare expertise before getting in touch.", benefit: "Focused pages can attract better-fit enquiries and help buyers assess your experience.", work: "We map buyer questions to service pages, use client-approved evidence, and measure qualified enquiry actions." },
  { slug: "hospitality", label: "Hospitality", need: "Guests compare locations, amenities, and availability across search, maps, and booking sites.", benefit: "Clear answers support more direct visits to your booking pages.", work: "We improve property and location pages, correct listing information, and review the path to booking." },
  { slug: "real-estate", label: "Real estate", need: "Buyers and renters search by neighborhood, property type, and practical needs.", benefit: "Useful local pages help people find suitable listings and the right contact.", work: "We organize listings and guides, improve indexing for priority pages, and make enquiry routes easier to use." },
  { slug: "manufacturing", label: "Manufacturing", need: "Buyers often search for technical specifications, materials, and production capabilities.", benefit: "Clear product and capability pages help procurement teams find suppliers that fit.", work: "We build search-friendly specifications and industry pages, then improve navigation to request-a-quote forms." },
  { slug: "automotive", label: "Automotive", need: "Drivers look for specific vehicles, parts, and repair services close to where they live.", benefit: "Up-to-date pages can turn relevant searches into calls, visits, or orders.", work: "We structure inventory and service pages, maintain location details, and check how visitors reach sales or service." },
  { slug: "education", label: "Education", need: "Prospective students and families search by program, qualification, location, and cost.", benefit: "Accessible program pages help people compare options and take the next step.", work: "We clarify program details and admissions journeys, then monitor discovery and application enquiries." },
  { slug: "finance", label: "Finance", need: "Customers look for clear answers to specific questions before trusting a provider with financial decisions.", benefit: "Well-organized, credible information helps customers assess whether a service fits.", work: "We structure service and resource pages for search and send customer-facing claims through your review process." },
  { slug: "home-services", label: "Home services", need: "Homeowners often search by service and location when they need help quickly.", benefit: "Clear coverage areas and contact options make it easier to request an estimate or book a visit.", work: "We improve local listings, service pages, and call or booking routes, then track qualified leads." },
  { slug: "logistics", label: "Logistics", need: "Shippers search for routes, service levels, and specialized capabilities.", benefit: "Clear pages make it easier for the right businesses to compare coverage and request pricing.", work: "We group services around buyer needs, improve search visibility for priority routes, and review quote enquiries." },
  { slug: "saas", label: "SaaS", need: "Buyers search for use cases, integrations, and alternatives throughout a long decision process.", benefit: "Useful pages meet buyers earlier and give qualified prospects a path to a demo.", work: "We map content to the research journey, improve the technical foundation, and measure trial or demo actions." },
];

export function ReviewsCompanyFit() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const size = sizes[sizeIndex];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { height, left, top, width } = event.currentTarget.getBoundingClientRect();
    if (!height || !width) return;
    event.currentTarget.style.setProperty("--tilt-x", ((.5 - (event.clientY - top) / height) * 16) + "deg");
    event.currentTarget.style.setProperty("--tilt-y", (((event.clientX - left) / width - .5) * 22) + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
  }

  return (
    <section id="companies-we-work-with" className={styles.section} aria-labelledby="companies-heading">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p data-site-eyebrow="">Who we work with</p>
          <h2 id="companies-heading" data-site-heading="">From small businesses <span>to enterprise teams</span></h2>
          <p>How we approach SEO depends on what customers search for, how your business operates, and what your team can deliver.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.sizes}>
            <h3>Business sizes</h3>
            <div className={styles.sizeOptions} role="group" aria-label="Select a business size">
              {sizes.map(({ label }, index) => (
                <button key={label} type="button" aria-pressed={sizeIndex === index} aria-controls="business-size-preview" onClick={() => setSizeIndex(index)}>{label}</button>
              ))}
            </div>
            <p key={size.label} className={styles.sizeCopy}>{size.description}</p>
          </div>

          <div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
            <div className={styles.rig} id="business-size-preview" aria-live="polite">
              <ul className={styles.stack} key={size.label}>
                {workflow[sizeIndex].map((label, index) => {
                  const Icon = [ListChecks, Layers3, BarChart3][index];
                  return <li key={label}><Icon size={21} aria-hidden="true" /><span>{label}</span></li>;
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.group}>
          <h3>Industries</h3>
          <div className={styles.industries}>
            {industries.map(({ slug, label, need, benefit, work }, index) => (
              <details key={slug} name="reviews-industries" open={index === 0}>
                <summary>{label}<Plus size={17} aria-hidden="true" /></summary>
                <div className={styles.body}>
                  <p><strong>Why SEO matters.</strong> {need}</p>
                  <p><strong>What it helps you do.</strong> {benefit}</p>
                  <p><strong>How we work with you.</strong> {work}</p>
                  <Link href={"/industries/" + slug}>{label} SEO <ArrowUpRight size={15} aria-hidden="true" /></Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
