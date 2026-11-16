"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./pricing-checklist.module.css";

const categories = [
  {
    name: "Technical SEO",
    items: [
      ["Crawl access", "Check whether important URLs can be reached and whether crawler rules block pages you want discovered."],
      ["Indexing checks", "Inspect priority URLs to find pages that are missing, excluded, or indexed under a different URL."],
      ["XML sitemaps", "Review which URLs the sitemap lists and remove retired or unsuitable entries from the proposed scope."],
      ["Canonical URLs", "Check which version of a page is marked as preferred and whether internal links agree."],
      ["Redirects and broken URLs", "Find dead ends, redirect chains, and old pages that need a working replacement."],
      ["Site architecture", "Map menus, categories, and page depth so important destinations have clear paths from the rest of the site."],
      ["Page performance", "Identify slow responses, heavy files, and layout shifts on the templates customers use most."],
      ["Structured data", "Review relevant markup against visible content and document validation issues."],
    ],
  },
  {
    name: "On-page SEO",
    items: [
      ["Keyword and intent mapping", "Decide which searches each page should answer before changing copy or creating new pages."],
      ["Page titles", "Review whether titles are distinct and describe the page, service, product, or location clearly."],
      ["Meta descriptions", "Draft concise descriptions for priority pages and align them with what visitors will find."],
      ["Heading structure", "Check how headings organize the page and whether customers can scan for the answer they need."],
      ["Internal links", "Find pages with few useful links pointing to them and recommend relevant sources and anchor text."],
      ["Image alt text", "Describe images that convey useful information and leave decorative images with empty alt text."],
      ["Duplicate page content", "Identify pages that cover the same topic and decide whether to differentiate, consolidate, or keep them."],
      ["Service and location pages", "Check whether each page answers questions about coverage, availability, and how to get in touch."],
    ],
  },
  {
    name: "Content and creative",
    items: [
      ["Content inventory", "List what is worth keeping, updating, merging, or retiring before commissioning new copy."],
      ["Content gaps", "Compare what customers ask with what the site already answers and prioritize missing topics."],
      ["Research and source material", "Identify the interviews, product information, or source checks needed to produce accurate copy."],
      ["Editorial briefs", "Define the audience, purpose, main questions, and approved sources for each piece."],
      ["Service page copy", "Explain the service, who it suits, and what the customer should do next."],
      ["Guides and articles", "Plan practical content that helps people compare options or answer a buying question."],
      ["Editing and review rounds", "Agree on who reviews the work, how feedback is collected, and which revisions are included."],
      ["Images and ad creative", "Scope the assets, formats, and variants needed for the agreed pages or campaigns."],
    ],
  },
  {
    name: "Backlinks and local visibility",
    items: [
      ["Backlink review", "Check which sites link to you, where those links point, and whether they are relevant to your business."],
      ["Lost or broken backlinks", "Find links pointing to retired pages and recommend a destination, redirect, or update request."],
      ["Relevant outreach", "Identify publications or associations with a reason to reference your expertise or original material."],
      ["Unlinked brand mentions", "Review relevant mentions and decide where asking for a link would help readers find you."],
      ["Business citations", "Check priority directories for inconsistent names, addresses, phone numbers, or website links."],
      ["Google Business Profile", "For eligible businesses, review profile access, business details, services, and customer links."],
      ["Reviews and reputation", "Identify recurring customer complaints and flag issues with bookings, communication, or fulfilment."],
      ["Location and booking links", "Test the path from listings and profiles to the correct page, phone number, or booking form."],
    ],
  },
  {
    name: "Ecommerce SEO",
    items: [
      ["Collection and category structure", "Map shopping demand to clear catalogue groups and useful browsing paths."],
      ["Product page content", "Review descriptions, specifications, availability, and information customers need before buying."],
      ["Filters and variant URLs", "Check how filters and variants create URLs and which destinations should be discoverable."],
      ["Product markup", "Check that displayed price, stock, and product details agree with the structured data."],
      ["Product feeds", "Review Merchant Center feed issues, identifiers, price mismatches, and landing pages where applicable."],
      ["Out-of-stock products", "Decide how the site should handle temporary stock gaps, discontinued products, and alternatives."],
      ["Cart and checkout usability", "Test product selection, cart actions, payment handoffs, and order confirmation."],
      ["Organic order tracking", "Check whether reports can connect organic landing pages to tracked orders or revenue."],
    ],
  },
  {
    name: "Website redesign",
    items: [
      ["Navigation and page map", "Agree on which pages stay, move, or need rebuilding before design work starts."],
      ["Responsive layouts", "Identify templates that need to work better across mobile, tablet, and desktop."],
      ["Reusable page components", "Scope the blocks and templates your team will need to edit or reuse after handoff."],
      ["Forms and booking flows", "Test submissions, notifications, confirmations, and where requests go."],
      ["CMS and integrations", "Review the platform, permissions, and tools the website must connect to."],
      ["Hosting and migration", "Check whether hosting is the bottleneck and scope staging, cutover, and rollback where needed."],
      ["Redirect planning", "Map important old URLs to their new destinations when the site structure changes."],
      ["Launch checks and handoff", "Confirm the testing, documentation, training, and support included in the proposal."],
    ],
  },
  {
    name: "PPC and measurement",
    items: [
      ["Ad account review", "Review campaign structure, targeting, spend, and existing conversion actions."],
      ["Keywords and exclusions", "Check which searches are worth paying for and which should be excluded."],
      ["Ad copy and testing", "Scope the offers, messages, and creative variants the campaign needs."],
      ["Landing-page alignment", "Check whether the destination delivers what the ad promises and makes the next step easy."],
      ["Conversion tracking", "Verify forms, calls, or purchase events and document any gaps in reporting."],
      ["Lead quality and attribution", "Agree on what qualifies as a lead and reconcile campaign reports with available sales data."],
      ["Media budget and management", "Separate platform ad spend from campaign setup, management, and optimization fees."],
      ["Reporting and review cadence", "Define the baseline, the measures we’ll review, and how often we’ll share findings."],
    ],
  },
];

export function PricingChecklist() {
  const [activeTab, setActiveTab] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [brief, setBrief] = useState<string[]>([]);

  function toggleBrief(label: string) {
    setBrief((items) => items.includes(label)
      ? items.filter((item) => item !== label)
      : [...items, label]);
  }

  const quoteUrl = "/contact?request=Pricing%20checklist%20quote&details=" +
    encodeURIComponent(brief.join(", ")) + "#request-proposal";

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();

  function selectTab(index: number) {
    setActiveTab(index);
    setOpenItem(null);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % categories.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + categories.length) % categories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = categories.length - 1;
    else return;

    event.preventDefault();
    selectTab(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="pricing-checklist" className={styles.section} aria-labelledby={id + "-title"}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Pricing checklist</p>
          <h2 id={id + "-title"}>What we check <span>before we quote</span></h2>
          <p>When you submit the form or request an audit, we look at the areas relevant to your site. We start with structural issues that block other work, then explain which fixes belong in the proposal and why.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.tabs} role="tablist" aria-orientation="vertical" aria-label="Cost elements by service area">
          {categories.map(({ name }, index) => (
            <button key={name} type="button" role="tab"
              id={id + "-tab-" + index} aria-controls={id + "-panel-" + index}
              aria-selected={activeTab === index} tabIndex={activeTab === index ? 0 : -1}
              ref={(node) => { tabRefs.current[index] = node; }}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleTabKey(event, index)}>
              {name}
            </button>
          ))}
        </div>

        {categories.map(({ name, items }, tabIndex) => (
          <div key={name} role="tabpanel" className={styles.panel}
            id={id + "-panel-" + tabIndex} aria-labelledby={id + "-tab-" + tabIndex}
            hidden={activeTab !== tabIndex}>
            <header className={styles.categoryHeading}>
              <h3>{name}</h3>
              <span>{items.length} checks</span>
            </header>
            {activeTab === tabIndex && (
              <div className={styles.items}>
                {items.map(([label, copy], itemIndex) => {
                  const expanded = openItem === itemIndex;
                  const itemId = id + "-item-" + tabIndex + "-" + itemIndex;
                  return (
                    <div className={styles.item} key={label} data-expanded={expanded}>
                      <button type="button" aria-expanded={expanded} aria-controls={itemId}
                        onClick={() => setOpenItem(expanded ? null : itemIndex)}>
                        <span>{label}</span><ChevronDown size={17} aria-hidden="true" />
                      </button>
                      <div id={itemId} className={styles.answer} aria-hidden={!expanded}>
                        <div>
                          <p>{copy}</p>
                          <button type="button" className={styles.saveCheck}
                            tabIndex={expanded ? 0 : -1}
                            aria-pressed={brief.includes(label)}
                            onClick={() => toggleBrief(label)}>
                            {brief.includes(label) ? "Remove from quote brief" : "Add to quote brief"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        </div>

<aside className={styles.quoteBrief} aria-labelledby={id + "-brief-title"}>
          <div>
            <h3 id={id + "-brief-title"}>Your quote brief</h3>
            <p aria-live="polite">{brief.length
              ? brief.length + (brief.length === 1 ? " check selected" : " checks selected")
              : "Open a check to add it to your quote request."}</p>
          </div>
          {brief.length > 0 && (
            <>
              <ul>
                {brief.map((label) => (
                  <li key={label}><button type="button" aria-label={"Remove " + label}
                    onClick={() => toggleBrief(label)}>{label} <span aria-hidden="true">×</span></button></li>
                ))}
              </ul>
              <a href={quoteUrl}>Send this quote brief <span aria-hidden="true">↗</span></a>
            </>
          )}
        </aside>

        <div className={styles.invoice}>
          <h3>What appears on your invoice</h3>
          <p>We agree on the scope and quote before paid work begins. Your invoice itemizes the work you approve and separates fees such as media spend where applicable. This checklist shows what we may review. Your invoice reflects the work you agreed to purchase.</p>
        </div>
      </div>
    </section>
  );
}
