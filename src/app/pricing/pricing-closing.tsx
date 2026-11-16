import { projectRefund, promotionalPayment, refundTiming } from "@/lib/payment-policy";
import { DeliveryCommitment } from "./delivery-commitment";
import faqStyles from "../_home/editorial/editorial.module.css";
import { InvestmentGrowth } from "./investment-growth";



const faqs = [
  ["How much do Starter and Essential cost?", "Regular Starter starts at $650 per billing cycle. Essential is $1,500 per billing cycle. We quote Custom plans after reviewing the work you need."],
  ["What’s included in Essential?", "Essential includes website redesign within the agreed scope, 12 months of complimentary website bug support, hosting migration, eight blog posts per month, relevant business directory profile setup or cleanup, and ongoing SEO reporting."],
  ["How do you calculate a custom quote?", "We review your starting point, the work in scope, the specialists and hours required, and the support you need. The proposal sets out the deliverables, schedule, and billing."],
  ["Which services are one-time and which recur?", "Starter and Essential are recurring plans billed every 30 calendar days. Ongoing PPC or social media management can also be quoted monthly. Standalone redesigns, migrations, and defined projects can be quoted as one-time work."],
  ["Does PPC management include ad spend?", "Media spend and campaign management are quoted separately. The proposal identifies the agreed management work and the budget allocated to the advertising platform."],
  ["Will I see what I’m paying for on the invoice?", "Yes. Your invoice identifies the agreed services, whether each item is one-time or recurring, and any separate charges that apply."],
  ["Does the free audit commit me to a paid plan?", "You can request the free audit and review the recommendations before deciding whether to request a quote for paid work."],
  ["How do I request a project refund?", projectRefund],
  ["Can I cancel recurring services or staffing?", "Give at least one month’s written notice. For staffing, we refund unused prepaid months after the effective end date without a separate early-exit penalty. Send refund requests to refunds@orbilectseo.com."],
  ["Are promotional purchases refundable?", promotionalPayment],
  ["How long does an approved refund take?", refundTiming],
] as const;

export function PricingClosing() {
  return (
    <>
      <InvestmentGrowth />

      <DeliveryCommitment />

      <section id="faqs" className={faqStyles.faqs} aria-labelledby="pricing-faq-heading">
        <div className={[faqStyles.container, faqStyles.faqLayout].join(" ")}>
          <div className={faqStyles.faqIntro}>
            <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
            <h2 data-site-heading="" id="pricing-faq-heading"><span>Pricing and refunds</span><br />frequently asked questions</h2>
            <div className={faqStyles.introCard}>
              <h3>Before we start your project</h3>
              <p>Find out which pages we work on, how changes get published, and how we measure the result.</p>
            </div>
          </div>
          <div className={faqStyles.questions}>
            {faqs.map(([question, answer], index) => (
              <details key={question} name="orbilect-pricing-faq" open={index === 0}>
                <summary>{question}<span className={faqStyles.toggle} aria-hidden="true" /></summary>
                <p>{answer.split(/(refunds@orbilectseo\.com)/g).map((part, index) =>
                  part === "refunds@orbilectseo.com" ? <a key={index} href={"mailto:" + part}>{part}</a> : part
                )}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
