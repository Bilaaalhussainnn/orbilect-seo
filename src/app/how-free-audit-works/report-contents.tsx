"use client";

import { useId, useState, type PointerEvent } from "react";
import { ArrowRight, FileSearch, Lightbulb, Wrench } from "lucide-react";
import guide from "./audit-guide.module.css";
import styles from "./report-lab.module.css";

const checks = [
  {
    title: "Crawling and indexing",
    check: "Review priority URLs, sitemap entries, robots directives, canonical tags, redirects, and errors. Use Search Console indexing evidence when available.",
    finding: "A priority page may be blocked, redirecting, or pointing search engines to another URL. The evidence helps us distinguish an intentional exclusion from a mistake.",
    fix: "Correct the relevant directive, canonical, or redirect. Update the sitemap and internal links, then verify the change on the affected URLs.",
  },
  {
    title: "Search visibility and keyword intent",
    check: "Compare priority pages with relevant search results and the terms customers use. Review query and page performance in Search Console when shared.",
    finding: "An important search may have no suitable page, or several pages may target the same need. Impressions with few clicks can also flag a result worth investigating.",
    fix: "Map each search intent to the best page. Update the page’s content and search snippet, consolidate overlapping pages where appropriate, or plan a new page for a genuine gap.",
  },
  {
    title: "Page content and metadata",
    check: "Review titles, descriptions, headings, copy, and image alt text on priority templates and pages.",
    finding: "A page may be vague, duplicated, or missing answers people need before they buy, book, or enquire. Informative images may lack usable descriptions.",
    fix: "Rewrite titles and headings, add missing answers and relevant details, and write useful alt text for images that communicate information.",
  },
  {
    title: "Site structure and internal linking",
    check: "Look at navigation, links between related pages, click depth, and broken or isolated paths.",
    finding: "A key service or product may be buried or hard to reach from relevant pages. A broken link can interrupt the path to an enquiry or purchase.",
    fix: "Add contextual links, improve navigation or breadcrumbs where useful, and point broken or outdated links directly to the correct destination.",
  },
  {
    title: "Mobile experience and page speed",
    check: "Review priority pages on mobile and use performance diagnostics to look for oversized assets, slow loading, layout shifts, or delayed interactions.",
    finding: "A template may load slowly or shift while a visitor is trying to read or tap. Lab tests can help isolate causes, and real-user data can confirm whether the issue shows up in practice when available.",
    fix: "Prioritize the cause, such as an oversized image, an expensive script, or an unsized element. Retest the updated template and review real-user data when available.",
  },
  {
    title: "Structured data",
    check: "Inspect relevant schema markup for page types, organization details, and products where applicable. Check for validation errors or mismatches with visible content.",
    finding: "Missing or inaccurate markup can make page details harder to interpret or affect eligibility for supported search features.",
    fix: "Correct the markup to reflect visible content and validate representative URLs before rolling out template changes.",
  },
  {
    title: "Backlinks and local presence",
    check: "Review available backlink data, relevant listings, and Google Business Profile details where local search matters.",
    finding: "Valuable links may point to retired pages, or customers may see conflicting business information across listings.",
    fix: "Recover useful links where possible, correct outdated destinations, and align relevant listings with the business’s current information.",
  },
  {
    title: "Conversion paths and measurement",
    check: "Walk through calls, forms, bookings, or checkout on priority pages. Review conversion events when analytics access or reports are available.",
    finding: "A broken step can lose an enquiry. Missing or duplicate tracking can make a working path appear better or worse than it is.",
    fix: "Repair friction in the customer journey and test the relevant events so future reporting can distinguish visits from meaningful actions.",
  },
];

const layers = [
  { key: "check", label: "What we check", icon: FileSearch },
  { key: "finding", label: "What it tells us", icon: Lightbulb },
  { key: "fix", label: "What we’d do", icon: Wrench },
] as const;

const shortTitles = [
  "Crawling and indexing", "Keywords and visibility", "Content and metadata",
  "Internal linking", "Mobile and speed", "Structured data",
  "Backlinks and listings", "Conversions and tracking",
];

export default function ReportContents() {
  const [topic, setTopic] = useState(0);
  const [layer, setLayer] = useState(0);
  const readerId = useId();
  const check = checks[topic];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = event.currentTarget;
    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;
    stage.style.setProperty("--rx", `${(0.5 - (event.clientY - box.top) / box.height) * 26}deg`);
    stage.style.setProperty("--ry", `${((event.clientX - box.left) / box.width - 0.5) * 34}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section id="audit-report" className={styles.section} aria-labelledby="audit-report-title">
      <div className={guide.wrap}>
        <header className={guide.heading}>
          <p className={guide.eyebrow} data-site-eyebrow="" data-reveal="off">Inside the audit report</p>
          <h2 id="audit-report-title">From a finding <span>to a recommended fix</span></h2>
          <p>Choose a topic to see what we examine, what the evidence can reveal, and which change we’d recommend.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.index} role="group" aria-label="Audit topics">
            {checks.map(({ title }, index) => (
              <button key={title} type="button" aria-pressed={index === topic}
                aria-controls={readerId} onClick={() => { setTopic(index); setLayer(0); }}>
                <span>{shortTitles[index] ?? title}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className={styles.stage} aria-hidden="true" onPointerMove={tilt}
            onPointerLeave={reset} onPointerCancel={reset}>
            <div className={styles.model}>
              {layers.map(({ key, label, icon: Icon }, index) => (
                <div key={key} className={styles.sheet}
                  data-depth={(index - layer + layers.length) % layers.length}>
                  <Icon size={24} />
                  <strong>{label}</strong>
                  <span key={check.title} className={styles.sheetTitle}>
                    {shortTitles[topic] ?? check.title}
                  </span>
                  <i /><i />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.reader} id={readerId}>
            <h3 aria-live="polite">{check.title}</h3>
            <div className={styles.findings} role="group" aria-label="Report layers">
              {layers.map(({ key, label, icon: Icon }, index) => (
                <button key={key} type="button" aria-pressed={index === layer}
                  onClick={() => setLayer(index)}>
                  <Icon size={18} aria-hidden="true" />
                  <span><strong>{label}</strong><span>{check[key]}</span></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
