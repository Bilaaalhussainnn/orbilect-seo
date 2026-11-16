import { ReportingPreview } from "./reporting-preview";
import { Showcase } from "./showcase";

const insights = "https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics";
const access = "https://help.openai.com/en/articles/20001245-ads-manager-availability";
const assets = "/service-showcase/logos/";

export function ChatGptAdsShowcase() {
  return <Showcase id="chatgpt-ads-workflow" eyebrow="ChatGPT Ads setup" title="How ChatGPT" accent="advertising works"
    intro="See where sponsored placements appear, what we need from your team, and how we prepare a campaign for review."
    enquiry="ChatGPT Ads setup" ctaLabel="Discuss a ChatGPT campaign"
    items={[
      {
        label: "Placement", logo: assets + "openai.svg", visual: "ad", title: "How an ad appears in ChatGPT",
        detail: "Sponsored placements can appear below responses for eligible users. OpenAI may use conversation context to help select relevant ads. An ad leads to the advertiser’s landing page.",
        points: ["Sponsored placement", "Landing page match"], href: insights, linkLabel: "OpenAI’s guide to ChatGPT Ads",
      },
      {
        label: "What we need", logo: assets + "openai.svg", title: "Share the business and campaign brief",
        detail: "Send your advertiser name, website and landing page, billing country, target markets, offer, budget range, and campaign goal. Share approved brand assets and invite us through account permissions if you already have Ads Manager access.",
        points: ["Business and billing details", "Approved imagery and logo", "Target audience and conversion goal"],
        href: access, linkLabel: "Check advertiser availability",
      },
      {
        label: "Build and review", logo: assets + "openai.svg", title: "Prepare your ad for approval",
        detail: "Draft a headline and description, pair them with an image, check the destination page, and confirm the schedule and budget with you before submitting the ad for review.",
        points: ["Ad creative", "Budget and schedule", "Account and ad review"],
      },
      {
        label: "Measure", logo: assets + "openai.svg", title: "Connect delivery to business outcomes",
        detail: "Review delivery and clicks in Ads Manager. Where tracking is configured, compare landing-page engagement and conversions against your agreed goal before changing creative or spend.",
        points: ["Delivery and clicks", "Tracked conversions", "Creative and budget decisions"],
      },
    ]} />;
}

export function AnalyticsShowcases() {
  return <>
    <Showcase id="analytics-tools" eyebrow="Marketing analytics tools" title="The tools behind" accent="your reports"
      intro="We use six tools to check measurement, understand search and website performance, and share results your team can act on."
      enquiry="Marketing analytics reporting" ctaLabel="Discuss your reporting"
      items={[
        {
          label: "Microsoft Excel", logo: assets + "excel.svg", title: "Work with data you can take anywhere",
          detail: "We deliver exportable tables and can use Excel to reconcile variances, build pivot tables, and document calculations in a workbook your team can keep.",
          points: ["Pivot tables", "Reconciliation", "Portable reports"],
        },
        {
          label: "Google Analytics 4", logo: assets + "analytics.svg", title: "See what visitors do on your site",
          detail: "Read sessions, engagement and key events such as valid form submissions or purchases. We agree on the events that answer your business questions.",
          points: ["Acquisition", "Key events", "Conversion paths"],
        },
        {
          label: "Google Search Console", logo: assets + "search-console.svg", title: "See how your site appears in Google Search",
          detail: "Track organic clicks and impressions by page or query. Use page indexing reports to identify pages worth investigating.",
          points: ["Queries and landing pages", "Clicks and impressions", "Indexing"],
        },
        {
          label: "Google Tag Manager", logo: assets + "tag-manager.svg", title: "Check that what you measure fires correctly",
          detail: "Configure and test events for priority actions. Validate tags and duplicate triggers before using the numbers for decisions.",
          points: ["Event setup", "Tag validation", "Trigger checks"],
        },
        {
          label: "Looker Studio", logo: assets + "looker-studio.svg", title: "Give your team a report it can explore",
          detail: "Build dashboards with date filters, channel breakdowns and clear metric definitions. Add notes that explain what changed and what to do next.",
          points: ["Shared dashboards", "Date filters", "Channel breakdowns"],
        },
        {
          label: "BigQuery", logo: assets + "bigquery.svg", title: "Answer questions that need event-level data",
          detail: "Where the data is exported, query event-level records to examine segments, join relevant sources and validate more detailed reporting.",
          points: ["Event data", "SQL analysis", "Custom reporting"],
        },
      ]} />
    <ReportingPreview />
  </>;
}

export function CroShowcase() {
  return <Showcase id="cro-tools-and-trust" eyebrow="Conversion tools and online reputation" title="Make your website" accent="easier to trust and use"
    intro="We look at the website experience and what customers see before they reach it. Then we verify changes against meaningful actions, such as completed enquiries or purchases."
    enquiry="Conversion rate optimization and website trust" ctaLabel="Discuss your conversion goals"
    items={[
      {
        label: "Website quality", visual: "speed", title: "Make the next step clear on every device",
        detail: "Use PageSpeed Insights to flag loading and layout issues. Review mobile navigation, service information, contrast and forms, then test an accessible, direct route to the call or checkout.",
        points: ["PageSpeed Insights", "Clean mobile layout", "Clear forms and calls to action"],
      },
      {
        label: "Behaviour and testing", visual: "behavior", title: "Test the friction you can actually measure",
        detail: "Use GA4 to define the baseline, and Clarity where appropriate to spot confusing interactions. Prioritize a change, verify event tracking, and compare suitable periods or use a split test when traffic supports it.",
        points: ["GA4 key events", "Microsoft Clarity", "Test design and verification"],
      },
      {
        label: "Google Business Profile", logo: assets + "business-profile.svg", visual: "profile", title: "Give people accurate information before they visit",
        detail: "Review your hours, categories, services and website link. Send visitors to a page that reflects the offer they saw and makes booking, calling or buying straightforward.",
        points: ["Accurate listings", "Relevant landing pages", "Trackable enquiries"],
      },
      {
        label: "Online reviews", visual: "reviews", title: "Use customer feedback to remove doubts",
        detail: "Look for recurring concerns about service, availability or delivery. Respond to genuine feedback and improve the website copy or process that caused the uncertainty. Compare progress using agreed conversion metrics.",
        points: ["Genuine reviews", "Reputation themes", "Website and service improvements"],
      },
    ]} />;
}
