"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, Headset, Workflow } from "lucide-react";
import { useState, type FormEvent } from "react";
import { proposalFormHref, supportProposalOptions } from "@/lib/leads/sources";
import cta from "@/styles/orbilect-cta.module.css";
import { InteractiveSection } from "../_components/customer-operations/interactive-section";
import { supportScenes } from "../_components/customer-operations/support-scenes";
import styles from "../_components/customer-operations/details.module.css";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const technicalSupport = {
  label: "Technical support", icon: Headset, title: "Troubleshoot problems and document the fix",
  copy: "Guide customers through approved troubleshooting steps. Capture what happened, hand off complex cases, and follow up when there’s a resolution.",
  checks: ["Troubleshooting", "Issue records", "Escalation"],
};

const staffingScenes = [
  ...supportScenes.slice(0, 3), technicalSupport, ...supportScenes.slice(3),
  {
    label: "Agentic AI", icon: Workflow, title: "Automate approved tasks across your tools",
    copy: "Plan an AI workflow that checks orders, creates tickets, or coordinates follow-ups. Set approval points and escalate exceptions to your team.",
    checks: ["Tool permissions", "Approval steps", "Activity history"],
  },
];

export function CustomerSupportOffshoring() {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const proposal = supportProposalOptions[selected];

  function continueToContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hourly = new FormData(event.currentTarget).get("hourly");
    const amount = Number(hourly);
    if (proposal.hourly && (!Number.isFinite(amount) || amount <= 0)) return;
    const details = proposal.hourly ? "My proposed budget is " + usd.format(amount) + " USD per hour." : undefined;
    router.push(proposalFormHref(proposal.service, proposal.request, details));
  }

  return (
    <InteractiveSection id="customer-support-offshoring" eyebrow="Customer support offshoring"
      title="Build a support team" accent="around your customers"
      intro="Offshore an ecommerce customer support employee or build a team across chat, email, phone, and languages. We can also scope an AI chat agent and its handoff to people."
      scenes={staffingScenes}
      selection={{ index: selected, onChange: setSelected }}>
      <div className={styles.costs}>
        <article>
          <h3>U.S. in-house benchmark</h3>
          <strong>{usd.format(Math.round(21.53 * 2080))} per year</strong>
          <p>Annualized U.S. median wage of $21.53/hour at 2,080 work hours. Employer taxes, benefits, tools, and recruiting are additional.</p>
          <a href="https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm">U.S. Bureau of Labor Statistics · May 2025</a>
        </article>
        <form onSubmit={continueToContact}>
          <h3>{proposal.hourly ? "Propose a staffing budget" : "Plan your AI project"}</h3>
          <label>
            Service
            <select value={selected} onChange={(event) => setSelected(Number(event.target.value))}>
              {supportProposalOptions.map(({ service }, index) => <option key={service} value={index}>{service}</option>)}
            </select>
          </label>
          {proposal.hourly && <label>
            Proposed hourly budget (USD)
            <input name="hourly" type="number" min="0.01" step="0.01" inputMode="decimal" placeholder="e.g. 15" required />
          </label>}
          <button className={`${cta.cta} ${cta.ctaBlack} ${styles.proposalButton}`} type="submit" data-orbilect-cta="black">
            <span className={cta.ctaIcon} data-orbilect-cta-icon="" data-explicit-arrow="" aria-hidden="true"><ArrowUpRight size={17} /></span>
            {proposal.hourly ? "Continue with my proposal" : "Discuss my AI project"}
          </button>
        </form>
      </div>
    </InteractiveSection>
  );
}
