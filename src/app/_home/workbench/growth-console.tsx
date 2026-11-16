"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, MousePointerClick, Search, Target, TrendingUp } from "lucide-react";
import { Depth } from "./depth";
import styles from "./delivery.module.css";

const outcomes = [
  { label: "Organic traffic", icon: Search, title: "Be found for the searches that matter", description: "Combine technical, on-page, off-page, local, and ecommerce SEO with content that answers the questions customers actually ask.", metrics: ["Search visibility", "Qualified visits", "Priority pages"], href: "/services/technical-seo" },
  { label: "Paid traffic", icon: Target, title: "Bring qualified buyers to the right offer", description: "Plan PPC and paid social around the audience, offer, keywords, and landing page. Track spend and conversions to see which campaigns earn more investment.", metrics: ["Search terms", "Cost per enquiry", "Lead quality"], href: "/services/ppc-management" },
  { label: "Conversions", icon: MousePointerClick, title: "Make it easier to enquire, book, or buy", description: "Design or redesign websites and landing pages around clear offers, mobile usability, and conversion paths. Use audience feedback and tracking to improve what visitors do next.", metrics: ["Get a quote", "Book a call", "Complete checkout"], href: "/services/conversion-rate-optimization" },
  { label: "Profitability", icon: TrendingUp, title: "Connect acquisition costs to what you earn", description: "Review qualified enquiries, actual sales, ad spend, and contribution margins where data is available. Prioritize the traffic and offers most likely to support profitable growth.", metrics: ["Acquisition cost", "Revenue", "Contribution margin"], href: "/blogs/how-to-tell-whether-ppc-is-profitable" },
  { label: "Measurable growth", icon: ChartNoAxesCombined, title: "Know what moved and what to do next", description: "Start with a baseline and agree on reporting. Connect search and campaign data with leads, sales, and email performance where tracking and permissions allow.", metrics: ["Baseline", "Business outcomes", "Next priorities"], href: "/services/marketing-analytics" },
];

export default function GrowthConsole() {
  const [selected, setSelected] = useState(0);
  const outcome = outcomes[selected];
  const Icon = outcome.icon;
  return (
    <div className={styles.console}>
      <div className={styles.rail} role="group" aria-label="Explore growth outcomes">
        {outcomes.map(({ label, icon: Symbol }, index) => (
          <button type="button" aria-pressed={index === selected} onClick={() => setSelected(index)} key={label}>
            <Symbol size={17} aria-hidden="true" />{label}
          </button>
        ))}
      </div>
      <Depth>
        <div className={styles.growthPanel} key={outcome.label}>
          <div aria-live="polite">
            <span className={styles.tileIcon}><Icon size={22} aria-hidden="true" /></span>
            <h3>{outcome.title}</h3>
            <p>{outcome.description}</p>
          </div>
          <ul className={styles.metrics} aria-label="What we review">
            {outcome.metrics.map((item, index) => <li key={item}><span aria-hidden="true">0{index + 1}</span>{item}</li>)}
          </ul>
          <Link className={styles.textLink} href={outcome.href}>Explore {outcome.label.toLowerCase()} <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </Depth>
    </div>
  );
}
