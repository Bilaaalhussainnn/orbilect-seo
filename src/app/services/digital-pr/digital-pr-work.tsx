"use client";

import { ClipboardCheck, FileText, Globe, Mail, Newspaper, RadioTower, TrendingUp, Users } from "lucide-react";
import { InteractiveSection } from "../../_components/customer-operations/interactive-section";

const campaigns = [
  { label: "Research and data", icon: FileText, title: "Give reporters a finding they can verify", copy: "Turn credible research, aggregate data, or a survey into a story. We document the methodology and build a source page with findings, charts, and supporting context.", checks: ["Original evidence", "Source page", "Methodology"] },
  { label: "Expert commentary", icon: RadioTower, title: "Make your expertise useful to a reporter", copy: "Identify the subjects your team can speak about from direct experience. Prepare concise comments, relevant credentials, evidence, and a point of contact for follow-up.", checks: ["Named expert", "Supporting evidence", "Availability"] },
  { label: "News and launches", icon: Newspaper, title: "Explain why this development matters now", copy: "Find the audience and implications beyond your company. Prepare a media brief with what changed, who it affects, and material reporters can check.", checks: ["News angle", "Media brief", "Press assets"] },
  { label: "Resource outreach", icon: Globe, title: "Share useful work with relevant publications", copy: "Find editors, trade publications, and associations whose audiences would benefit from your resource. Explain its relevance and give them the source material to evaluate.", checks: ["Audience fit", "Targeted outreach", "Editorial discretion"] },
];

const process = [
  { label: "Brief", icon: Users, title: "Choose an audience, objective, and story", copy: "Review your expertise and evidence, agree on an audience and a newsworthy angle, and define what makes a placement relevant.", checks: ["Goal and audience", "Story angle", "Success criteria"] },
  { label: "Prepare", icon: ClipboardCheck, title: "Build the materials and check every claim", copy: "Write the brief, gather charts or expert quotes, and identify the person who can verify each claim. Get approval before any outreach goes live.", checks: ["Source checks", "Press kit", "Client approval"] },
  { label: "Pitch", icon: Mail, title: "Approach the outlets that cover your topic", copy: "Send a focused, tailored pitch, answer questions, and follow up when there’s something useful to add. Editors decide whether and how to cover the story.", checks: ["Relevant outlets", "Personalized pitch", "Timely replies"] },
  { label: "Measure", icon: TrendingUp, title: "See which coverage reached the right people", copy: "Report relevant mentions, earned links, referral visits, and enquiries where tracking is available. Compare what landed with what you set out to achieve.", checks: ["Published coverage", "Referral traffic", "Qualified actions"] },
];

export function DigitalPrWork() {
  return (
    <>
      <InteractiveSection id="digital-pr-campaigns" eyebrow="What we deliver" title="Find the story" accent="worth covering"
        intro="Start with something a publication’s audience can use. We develop research-led campaigns, expert commentary, launch stories, and resource outreach around the evidence you can share." scenes={campaigns} light />
      <InteractiveSection id="digital-pr-process" eyebrow="Our process" title="From evidence" accent="to earned coverage"
        intro="We take you from the campaign brief through approvals, outreach, and reporting. Choose a step to see how the work moves forward." scenes={process}
        link={{ label: "Plan your digital PR campaign", href: "/contact?service=Digital+PR&request=Help+me+plan+a+digital+PR+campaign#request-proposal" }} />
    </>
  );
}
