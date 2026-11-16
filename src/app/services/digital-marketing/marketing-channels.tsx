"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./marketing-channels.module.css";

const channels = [
  {
    name: "PPC and paid search",
    platforms: "Google Ads · Microsoft Advertising / Bing",
    work: "Build campaigns around the searches you want to pay for. Match ads to landing pages, add exclusions for irrelevant searches, and review budget and bid decisions against actual enquiries.",
    measure: "Qualified leads, cost per qualified lead, and tracked sales where available.",
  },
  {
    name: "Organic social media marketing",
    platforms: "Instagram · Facebook · LinkedIn · TikTok",
    work: "Choose the networks your customers use. Build a content calendar around their questions, publish platform-specific posts, and give readers a useful next step.",
    measure: "Relevant engagement, referral visits, and conversations that turn into enquiries.",
  },
  {
    name: "Paid social",
    platforms: "Meta Ads · LinkedIn Ads · TikTok Ads",
    work: "Test creative, audiences, and offers in a focused campaign. Route each audience to a page that matches the ad and review lead quality before expanding spend.",
    measure: "Tracked conversions, lead quality, and cost by campaign.",
  },
  {
    name: "Shopping campaigns and product feeds",
    platforms: "Google Merchant Center · Google Shopping",
    work: "Review product titles, identifiers, prices, and stock data. Fix feed issues where possible and organize campaigns around products you can fulfil profitably.",
    measure: "Product approvals, tracked orders, revenue, and return on ad spend.",
  },
  {
    name: "SEO content and distribution",
    platforms: "Service pages · Ecommerce collections · Buying guides",
    work: "Use search research and recurring customer questions to prioritize pages. Write useful content and distribute it through the channels where customers already follow you.",
    measure: "Relevant search impressions, organic clicks, and tracked actions from priority pages.",
  },
  {
    name: "Email and customer follow-up",
    platforms: "Email newsletters · CRM · Ecommerce lifecycle",
    work: "Build campaigns for people who have opted in. Segment contacts and set up relevant welcome, post-purchase, or re-engagement messages.",
    measure: "Clicks, replies, orders, and unsubscribe trends.",
  },
  {
    name: "Video, display, and remarketing",
    platforms: "YouTube · Google Display · Eligible remarketing audiences",
    work: "Test video or display placements around a clear offer. Where consent and platform rules allow, reconnect with people who already visited a product or service page.",
    measure: "Audience reach, relevant visits, and tracked conversions, with view-through results reported separately where available.",
  },
  {
    name: "Local listings and reputation",
    platforms: "Google Business Profile · Relevant local directories",
    work: "Help eligible businesses improve their profiles and correct hours, service information, and booking links. Use recurring customer feedback to identify problems worth fixing.",
    measure: "Available profile interactions, website visits, and tracked local enquiries.",
  },
  {
    name: "Landing pages and conversion tracking",
    platforms: "Landing pages · Analytics · Forms and call tracking",
    work: "Check the path from click to enquiry. Improve mobile layouts and calls to action, test submissions, and agree on which actions count as conversions.",
    measure: "Conversion rate, qualified enquiries, and gaps in attribution.",
  },
];

const steps = [
  ["Choose the goal", "Agree on your offer, target customer, budget, and what counts as a qualified enquiry or sale."],
  ["Build the campaign", "Set up targeting, creative, and landing pages. Test tracking and check that leads reach the right person."],
  ["Launch and review", "Start with a focused test. Review search terms, audience response, costs, and the quality of enquiries."],
  ["Improve what earns its budget", "Refine the offer, creative, or landing page using what we learn. Expand when the results and your capacity support it."],
];

export function MarketingChannels() {
  const [active, setActive] = useState(0);
  const channel = channels[active];

  return (
    <>
      <section id="digital-marketing-channels" className={styles.dark} aria-labelledby="marketing-channels-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Digital marketing channels</p>
            <h2 id="marketing-channels-title">Reach customers <span>where they make decisions</span></h2>
            <p>Explore the channels we manage and the work behind each one. We choose the mix around your customer, budget, and sales process.</p>
          </header>

          <div className={styles.layout}>
            <div className={styles.controls} role="group" aria-label="Explore digital marketing channels">
              {channels.map(({ name }, index) => (
                <button key={name} type="button" aria-pressed={active === index}
                  aria-controls="marketing-channel-panel" onClick={() => setActive(index)}>
                  {name}<ArrowRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div id="marketing-channel-panel" className={styles.panel} aria-live="polite" aria-atomic="true">
              <div key={channel.name} className={styles.channel}>
                <p className={styles.platforms}>{channel.platforms}</p>
                <h3>{channel.name}</h3>
                <dl>
                  <div><dt>What we do</dt><dd>{channel.work}</dd></div>
                  <div><dt>What we measure</dt><dd>{channel.measure}</dd></div>
                </dl>
              </div>
            </div>
          </div>

          <h3 className={styles.workflowTitle}>How we run your campaign</h3>
          <ol className={styles.workflow} role="list">
            {steps.map(([title, copy]) => (
              <li key={title}><h4>{title}</h4><p>{copy}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <SeoMarketingConnection />
    </>
  );
}


const seoExamples = [
  {
    name: "PPC searches",
    source: "Paid search terms",
    example: "managed IT support for small businesses",
    title: "Build a page for the search that brings in qualified leads",
    copy: "If this term consistently brings in the right enquiries, build or improve the matching service page. Explain who the service is for, what it covers, and how to get a quote.",
    measure: "Relevant organic clicks and qualified enquiries",
  },
  {
    name: "Customer questions",
    source: "Questions from social, email, and sales",
    example: "What’s included in monthly IT support?",
    title: "Answer the question before someone has to ask",
    copy: "Add a clear breakdown to the service page, then link to it from related guides. Share the answer through the channels where customers raised the question.",
    measure: "Visits to the updated page and actions taken from it",
  },
  {
    name: "Landing pages",
    source: "Mobile enquiry flow",
    example: "Visitors start the form but leave before submitting",
    title: "Make the next step easier for every visitor",
    copy: "Check how the page loads, simplify the form, and test the confirmation. Use the same improvements on the destination paid and organic visitors already use.",
    measure: "Completed enquiries by channel",
  },
];

function SeoMarketingConnection() {
  const [active, setActive] = useState(0);
  const example = seoExamples[active];

  return (
    <section id="seo-and-digital-marketing" className={styles.light + " " + styles.seoConnection} aria-labelledby="seo-marketing-title">
      <div className={styles.wrap + " " + styles.connectionLayout}>
        <header className={styles.header + " " + styles.connectionIntro}>
          <p className={styles.eyebrow} data-site-eyebrow="">SEO and digital marketing</p>
          <h2 id="seo-marketing-title">Use what customers tell you <span>to improve what they find</span></h2>
          <p>Campaigns show which searches bring in the right enquiries. Social, email, and sales reveal what customers still need to know. We use both to decide which pages to improve and what to measure next.</p>
          <a className={styles.connectionCta} href="#request-proposal" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
            <span aria-hidden="true"><ArrowUpRight size={16} /></span>
            Discuss your marketing plan
          </a>
        </header>

        <div className={styles.connectionStage}>
          <div className={styles.connectionTabs} role="group" aria-label="Choose a marketing example">
            {seoExamples.map(({ name }, index) => (
              <button key={name} type="button" aria-pressed={active === index}
                aria-controls="seo-marketing-example" onClick={() => setActive(index)}>
                {name}
              </button>
            ))}
          </div>

          <div id="seo-marketing-example" aria-live="polite" aria-atomic="true">
            <div key={example.name} className={styles.connectionFlow}>
              <div className={styles.connectionSource}>
                <span>{example.source}</span>
                <strong>{example.example}</strong>
              </div>
              <div className={styles.connectionLine} aria-hidden="true"><i /></div>
              <div className={styles.connectionResult}>
                <p className={styles.connectionLabel}>What we change on your site</p>
                <h3>{example.title}</h3>
                <p>{example.copy}</p>
                <p className={styles.connectionMeasure}><strong>What we measure</strong>{example.measure}</p>
              </div>
            </div>
          </div>

          <p className={styles.connectionNote}>Paid search gives us data to work with. Ad spend does not improve organic rankings.</p>
        </div>
      </div>
    </section>
  );
}
