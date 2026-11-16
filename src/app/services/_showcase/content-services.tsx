import { Showcase } from "./showcase";

export function ContentGrowthShowcase() {
  return (
    <Showcase id="content-growth" eyebrow="Content writing and growth" title="Write for the searches" accent="your customers make"
      intro="We use search research and audience questions to plan website copy, articles, and social content. Each format has a clear job and a useful next step."
      enquiry="Content writing and growth" ctaLabel="Discuss your content plan"
      items={[
        {
          label: "Targeted keywords",
          title: "Match the keyword to the reason behind the search",
          detail: "Group related terms by intent and assign each group to the page that best answers it. For example, a comparison belongs in a guide, while a service enquiry belongs on a service page. Use the relevant language naturally in the title, headings, and copy.",
          points: ["Search intent", "Keyword-to-page mapping", "Natural language"],
        },
        {
          label: "Website copy",
          title: "Make it easy to understand the offer and act",
          detail: "Write service, product, and landing pages around real customer questions. Explain what is included, answer common objections, and guide ready visitors to an enquiry, booking, or purchase.",
          points: ["Service and product pages", "Clear benefits", "Relevant calls to action"],
        },
        {
          label: "Blogs and guides",
          title: "Answer the questions people ask before buying",
          detail: "Use examples, sources, and subject-matter input to answer useful questions. Link articles to related guides and the relevant service page, then review organic clicks and enquiries to decide what to improve.",
          points: ["Editorial briefs", "Internal linking", "Search and enquiry tracking"],
        },
        {
          label: "Social media",
          title: "Give useful ideas a format people will read",
          detail: "Turn an article, insight, or client question into platform-specific posts, captions, and scripts. Track actions such as saves, replies, and qualified site visits to see which ideas are worth exploring further.",
          points: ["Posts and captions", "Platform-specific edits", "Engagement and referrals"],
        },
      ]} />
  );
}

export function WriterStaffingShowcase() {
  return (
    <Showcase id="writer-staffing" eyebrow="Offshore content staffing" title="Hire an experienced" accent="SEO content writer"
      intro="We help you find an offshore writer who can take a brief from research to a publish-ready draft. Review relevant samples and a focused writing task before deciding who fits your team."
      enquiry="Offshore SEO content writer" ctaHref="/staffing" ctaLabel="Explore staffing"
      items={[
        {
          label: "Define the role",
          title: "Agree on what the writer will own",
          detail: "Set your subject areas, content formats, expected volume, and review process. Decide whether you need a specialist in one industry or someone who can work across several.",
          points: ["Industry expertise", "Content formats", "Hours and time-zone overlap"],
        },
        {
          label: "Review relevant experience",
          title: "Evaluate experience through comparable work",
          detail: "Review samples from similar projects for research quality, clarity, SEO judgment, and the ability to follow an editorial brief. We can help shortlist writers whose experience matches the work.",
          points: ["Writing samples", "Relevant industry experience", "Research and editorial judgment"],
        },
        {
          label: "Assess the writing",
          title: "Use a short assignment to check the fit",
          detail: "Agree on a focused brief and review the work against the same criteria for each candidate. Consider how they handle feedback, explain their choices, and deliver revisions.",
          points: ["Focused writing task", "Clear evaluation criteria", "Feedback and revisions"],
        },
        {
          label: "Onboard the writer",
          title: "Give the writer a clear editorial workflow",
          detail: "Share your style guide, source requirements, and approval process. Set a delivery cadence and review early drafts together so both your team and the writer know what good work looks like.",
          points: ["Style guide", "Delivery cadence", "Early draft reviews"],
        },
      ]} />
  );
}
