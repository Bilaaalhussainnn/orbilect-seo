import { Showcase } from "./showcase";

const logo = (name: string, extension = "svg") => "/service-showcase/logos/" + name + "." + extension;

export function PpcShowcase() {
  return (
    <Showcase id="ppc-platforms" eyebrow="Paid advertising platforms" enquiry="PPC management" ctaLabel="Discuss your PPC campaign" title="Advertise where" accent="customers search"
      intro="Choose a channel based on what your audience is doing, the markets you serve, and the conversions you can track."
      items={[
        {
          label: "Google Ads", logo: logo("google-ads"), title: "Turn high-intent searches into enquiries",
          detail: "Build search campaigns around the products or services people look for. We align ad copy, keywords, and landing pages, then review the search terms and lead quality.",
          points: ["Search campaigns", "Budget and bid testing", "Call and form tracking"],
        },
        {
          label: "Microsoft Advertising", logo: logo("bing"), title: "Reach customers searching on Bing",
          detail: "Review audiences and performance separately from Google. We can start from an existing campaign where appropriate, then adapt targeting, bids, and tracking for Microsoft Advertising.",
          points: ["Bing search placements", "Search term reviews", "Qualified lead cost"],
          href: "/services/bing-advertising", linkLabel: "Explore Bing advertising",
        },
        {
          label: "ChatGPT ads", logo: logo("openai"), title: "Plan for conversations with commercial intent",
          detail: "Where advertiser access and placements are available, we can help assess the fit, prepare creative and landing pages, and design a measurement plan.",
          points: ["Market and account eligibility", "Creative readiness", "Measurable next steps"],
          href: "/services/chatgpt-advertising", linkLabel: "Explore ChatGPT advertising",
        },
        {
          label: "Meta Ads", logo: logo("meta"), title: "Test a message before putting more budget behind it",
          detail: "Plan paid social campaigns around a clear offer. Compare creatives and audiences, then connect the campaign to a landing page, lead form, or messaging flow.",
          points: ["Facebook and Instagram", "Creative testing", "Cost per qualified action"],
          href: "/services/paid-social-advertising", linkLabel: "Explore paid social advertising",
        },
      ]} />
  );
}

export function SocialShowcase() {
  return (
    <Showcase id="social-campaign-workflow" eyebrow="Social media campaign workflow" enquiry="Social media marketing" ctaLabel="Plan your social campaign" title="From campaign brief" accent="to measurable results"
      intro="See how we decide what to publish, where it should run, and what to measure once it goes live."
      channels={[
        { label: "Facebook", logo: logo("facebook") }, { label: "Instagram", logo: logo("instagram") },
        { label: "WhatsApp", logo: logo("whatsapp") }, { label: "X", logo: logo("x") },
      ]}
      items={[
        {
          label: "Plan", title: "Turn a business goal into a campaign brief",
          detail: "Agree on the audience, offer, and next action. Pick channels and formats that suit the campaign, then record a baseline and define success.",
          points: ["Audience and offer", "Channel plan", "Baseline and success criteria"],
        },
        {
          label: "Design", title: "Develop creative around one clear message",
          detail: "Plan a content calendar, write copy, design channel-specific assets, and give your team a review round before anything goes live.",
          points: ["Content calendar", "Creative concepts", "Approvals"],
        },
        {
          label: "Launch", title: "Give interested people somewhere to go",
          detail: "Publish approved posts, set up the campaign links, and agree how your team will handle enquiries from comments, direct messages, or WhatsApp.",
          points: ["Scheduling", "Campaign tracking links", "Enquiry handoff"],
        },
        {
          label: "Measure", title: "See what people did after they saw the campaign",
          detail: "Expect a report against agreed goals. We review reach and engagement alongside meaningful actions such as message conversations, enquiries, and tracked sales where available.",
          points: ["Reach and engagement", "Enquiries and tracked sales", "Next tests"],
        },
      ]} />
  );
}

export function EmailShowcases() {
  return (
    <>
      <Showcase id="email-marketing-platforms" eyebrow="Email marketing tools" enquiry="Email marketing services" title="Email tools and" accent="what comes next"
        intro="Match outreach and lifecycle email to the tools, data, and reporting your team needs."
        items={[
          {
            label: "Apollo.io", logo: logo("apollo", "png"), title: "Organize business outreach",
            detail: "Build segmented outreach sequences and review which contacts reply. Keep follow-up, sending limits, and exclusions visible to the team.",
            points: ["Sequences", "Reply handling", "Contact exclusions"],
          },
          {
            label: "Instantly.ai", logo: logo("instantly", "png"), title: "Run and review outreach experiments",
            detail: "Set up audience segments, message variants, and inbox workflows. Compare positive replies and meetings against the audience and offer.",
            points: ["Campaign variants", "Inbox workflows", "Positive replies"],
          },
          {
            label: "Klaviyo", logo: logo("klaviyo", "png"), title: "Build email around the customer journey",
            detail: "Use store and customer events to shape welcome, post-purchase, and retention flows. Review tracked sales, unsubscribes, and segment performance.",
            points: ["Customer segments", "Lifecycle flows", "Tracked sales"],
          },
          {
            label: "Mailchimp", logo: logo("mailchimp"), title: "Send newsletters with a clear audience plan",
            detail: "Organize subscribers, build campaigns, and compare how segments respond. Keep subscriber preferences and opt-outs available to the team.",
            points: ["Newsletters", "Subscriber segments", "Engagement reviews"],
          },
          {
            label: "What’s next", title: "Build around first-party signals and preferences",
            detail: "Use customer actions and stated preferences to decide what to send and when. Human approval keeps automated segments and AI-assisted drafts aligned with your brand.",
            points: ["Preference controls", "Event-based automation", "Human-reviewed AI drafts"],
          },
        ]} />
      <Showcase id="custom-email-tool" eyebrow="Custom email software" enquiry="Custom email marketing platform" title="Build your own" accent="email marketing platform"
        intro="If an off-the-shelf tool cannot support your workflow, we can help design and build a platform around how your team works."
        items={[
          {
            label: "Next.js", logo: logo("nextjs"), title: "Give your team one campaign workspace",
            detail: "Build a responsive campaign dashboard with templates, preview, test sends, approval steps, and access controls for different roles.",
            points: ["Campaign editor", "Approvals and roles", "Responsive dashboard"],
          },
          {
            label: "Supabase", logo: logo("supabase"), title: "Keep subscriber data and preferences organized",
            detail: "Model contacts, segments, and consent history in PostgreSQL. Track suppression and unsubscribe events so each campaign uses the right audience.",
            points: ["PostgreSQL", "Subscriber preferences", "Suppression lists"],
          },
          {
            label: "Resend", logo: logo("resend"), title: "Connect sending to delivery events",
            detail: "Integrate a sending provider with verified domains, queued sends, and event webhooks. Review deliveries, bounces, and campaign outcomes in your dashboard.",
            points: ["Domain setup", "Delivery events", "Campaign reporting"],
            href: "/contact?request=Custom%20email%20marketing%20platform#request-proposal", linkLabel: "Discuss your email platform",
          },
          {
            label: "TypeScript", logo: logo("typescript"), title: "Keep campaign rules consistent",
            detail: "Use shared types and validation to check campaign drafts, event payloads, and scheduling rules before they reach the sending workflow.",
            points: ["Shared data models", "Validation", "Campaign rules"],
          },
          {
            label: "React", logo: logo("react"), title: "Build reusable email templates",
            detail: "Use component-based templates for common messages and campaign variants. Give editors previews and send test messages before approving a campaign.",
            points: ["Reusable templates", "Previews and test sends", "Editorial approvals"],
          },
          {
            label: "PostgreSQL", logo: logo("postgresql"), title: "Keep a history you can report on",
            detail: "Use PostgreSQL, hosted in Supabase, for audience data, subscription changes, campaign versions, and delivery-event history.",
            points: ["Audience segments", "Version history", "Delivery-event records"],
          },
          {
            label: "Vercel", logo: logo("vercel"), title: "Review changes before they go live",
            detail: "Deploy the Next.js dashboard with separate preview and production environments. Review the application before release and keep background sending in the appropriate queue or worker.",
            points: ["Preview deployments", "Production configuration", "Release reviews"],
          },
        ]} />
    </>
  );
}
