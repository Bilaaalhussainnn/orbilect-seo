import { OffshoreResearch } from "./offshore-research";
import { OffshoreWorkflow } from "./offshore-workflow";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, FileCheck, Laptop, ListChecks, Search, Users } from "lucide-react";
import { OffshoreRoles } from "./offshore-roles";
import styles from "./offshore-sections.module.css";

const steps = [
  { icon: ClipboardList, title: "Send us your role brief", copy: "Tell us what the specialist needs to do, which tools they’ll use, and the working hours and time-zone overlap you need. We agree on the scope, fees, and hiring plan." },
  { icon: Search, title: "We research and post the role", copy: "We research the talent market, draft the job description, and advertise through relevant channels. We review applications against the agreed criteria." },
  { icon: ListChecks, title: "We examine, test, and interview", copy: "We screen experience and availability, give qualified applicants a role-specific practical test, and interview them about how they approached the work." },
  { icon: Users, title: "You choose from the shortlist", copy: "We share relevant profiles and assessment summaries. You can interview the finalists and make the final selection." },
  { icon: FileCheck, title: "We agree the contract and onboard", copy: "The signed agreement identifies the employing or contracting party and sets out fees, coverage, responsibilities, confidentiality, and the notice or replacement terms. We then confirm a start date and onboard the selected specialist." },
  { icon: Laptop, title: "Work directly with your specialist", copy: "Your specialist works from our office and communicates directly with your team about priorities, approvals, and progress. They use approved workstations and only the accounts and permissions you authorize." },
];

const research = [
  ["Software development and IT operations", "Companies use offshore teams for engineering, QA, and technology operations. A larger talent pool can help them staff specialist roles and support products across time zones.", "Reuters · Costco’s India technology hub, November 2026", "https://www.reuters.com/world/india/costco-eyes-broader-india-tech-footprint-ai-bets-grow-2026-11-12/"],
  ["Customer support and back-office operations", "Support queues and repeatable administrative work lend themselves to documented workflows, quality checks, and coverage across shifts. Companies may use offshore teams to extend hours or handle fluctuating volumes.", "Deloitte · Global shared services and outsourcing survey", "https://www.deloitte.co.uk/sharedservicesconference/assets/pdf/deloitte-uk-gx-2021-global-shared-services-report.pdf"],
  ["Finance, accounting, and tax operations", "Businesses can centralize repeatable work such as reconciliations and reporting support. Cost, consistency, and access to specialist skills can all shape the decision.", "Deloitte · 2025 Tax Transformation Trends", "https://www.deloitte.com/global/en/services/tax/research/tax-transformation-trends.html"],
  ["Digital marketing, content, and web production", "Teams can assign defined work such as campaign operations, editorial production, design, and site updates to offshore specialists. Clear briefs and approval paths help the local team retain control over the brand.", "Deloitte · 2024 Global Outsourcing Survey", "https://www.deloitte.com/us/en/issues/work/global-outsourcing-survey.html"],
  ["Global technology and shared-services teams", "A company may build its own offshore center when it needs long-term capacity or closer control over a large operation. In 2026, Reuters reported on Starbucks’ planned technology center in Chennai.", "Reuters via Investing.com · Starbucks’ Chennai technology center, September 2026", "https://www.investing.com/news/stock-market-news/us-coffee-chain-starbucks-plans-tech-centre-in-india-source-says-4908308"],
];

export function OffshoreSections() {
  return (
    <>
      <OffshoreRoles />
      <section id="offshore-contracts" className={styles.light} aria-labelledby="offshore-contracts-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">Offshore staffing contracts</p>
            <h2 id="offshore-contracts-title">From your brief <span>to your first working day</span></h2>
            <p>Orbilect SEO runs the hiring process. Your company makes the final selection and works directly with the specialist on the day-to-day brief.</p>
          </header>
          <OffshoreWorkflow steps={steps.map(({ icon: Icon, title, copy }) => ({
            title,
            copy,
            icon: <Icon size={23} aria-hidden="true" />,
          }))} />
          <aside className={styles.callout}>
            <h3>Office and access rules</h3>
            <p>Personal electronic devices, pens, and paper are prohibited in the work area. Your specialist uses an approved workstation, works within the access you grant, and follows the handling instructions agreed for your project. Your designated contact can request changes to access or ask for it to be removed.</p>
          </aside>
          <Link className={styles.cta} href="/contact?request=Offshore%20staffing%20brief#request-proposal" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
            Send us your role brief 
          </Link>
        </div>
      </section>

      <section id="offshoring-research" className={styles.dark} aria-labelledby="offshoring-research-title">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">US offshoring in 2026</p>
            <h2 id="offshoring-research-title">What US companies offshore <span>and why</span></h2>
            <p>Companies move work overseas to reach specialist talent, manage operating costs, extend coverage, or build long-term delivery capacity. These examples draw on recent US company reporting and broader industry research.</p>
          </header>
          <OffshoreResearch entries={research} />
          <aside className={styles.callout}>
            <h3>How to read the evidence</h3>
            <p>US services trade data measures activity by service category. Surveys describe the companies that responded, and news reports describe individual employers. The examples above are unranked.</p>
            <a href="https://www.bea.gov/data/intl-trade-investment/international-services-expanded">US Bureau of Economic Analysis · International Services</a>
            <a href="https://www.deloitte.com/us/en/services/consulting/services/shared-services-survey.html">Deloitte · 2025 Global Business Services Survey</a>
          </aside>
        </div>
      </section>
    </>
  );
}
