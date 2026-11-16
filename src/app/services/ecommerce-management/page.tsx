import Link from "next/link";
import { BarChart3, Boxes, Globe, Headset, Megaphone, Plus, Search, ShoppingBag, Store } from "lucide-react";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo, serviceSchema } from "@/lib/orbilect-search";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { HomeFaq } from "../../_home/editorial";
import FinalCta from "../../_home/final-cta";
import { ServiceHero, type ServiceScene } from "../_components/service-story";
import styles from "../_components/service-story.module.css";
import supportStyles from "../_components/seo-support.module.css";
import { EcommerceJourney } from "./ecommerce-journey";
import { EcommerceOperations } from "./ecommerce-operations";
import { ecommerceOperationsFaqs } from "@/lib/customer-operations-faqs";
import { EcommerceReporting } from "./ecommerce-reporting";
import { EcommerceManagementSection } from "./ecommerce-management-section";

const route = "/services/ecommerce-management";

export const metadata = pageSeo(route);

const scenes: ServiceScene[] = [
  {
    id: "page",
    label: "Storefront",
    address: "Storefront / Catalog",
    title: "Launch a store that’s easy to shop",
    copy: "Bring your brand, product catalog, checkout, and delivery options together.",
    items: ["Brand and store design", "Mobile checkout"],
  },
  {
    id: "search",
    label: "Growth",
    address: "Acquisition / Campaigns",
    title: "Turn relevant traffic into orders",
    copy: "Connect organic search, Shopping ads, and paid social to the products and offers people came for.",
    items: ["Product SEO", "Paid ads and reporting"],
  },
  {
    id: "links",
    label: "Operations",
    address: "Operations / Orders and support",
    title: "Keep the store running after launch",
    copy: "Coordinate order updates, returns, customer service, and AI chatbot handoffs with your team.",
    items: ["Order handling", "Customer support and AI"],
  },
];

const cases = [
  { title: "Launch or migrate a store", copy: "Choose a platform around your catalog and markets. For a migration, map existing URLs, move approved data, and test stock, tax, shipping, and checkout before switching over." },
  { title: "Grow an existing store", copy: "Use search data and ad performance to find promising products and collections. Improve their landing pages, track completed purchases and returns, and review acquisition cost alongside revenue." },
  { title: "Take daily store work off your team", copy: "Agree who owns the catalog, inventory updates, order queues, returns, and support coverage. Set approval rules for refunds and escalation so your team can stay in control." },
];

const phases = [
  { icon: Search, timing: "Before work starts", title: "Review the store and markets", copy: "Audit the platform, brand, catalog, acquisition channels, and fulfillment setup. Agree on which countries, languages, currencies, and sales channels belong in scope." },
  { icon: Store, timing: "Before launch or rollout", title: "Build, connect, and test", copy: "Prepare the store and campaigns, connect approved tools, and run test orders. Check confirmation emails, stock updates, delivery options, and support handoffs." },
  { icon: BarChart3, timing: "Once the store is live", title: "Run and improve the store", copy: "Review traffic, purchases, fulfillment issues, and customer questions. Use those findings to prioritize store changes and report the work completed." },
];

const scope = [
  { icon: ShoppingBag, title: "Brand, storefront, and checkout", copy: "Develop the visual identity and product copy, design the storefront, and configure checkout, payments, and shipping options supported by the platform and market." },
  { icon: Search, title: "Organic search and content", copy: "Improve collection and product pages, fix technical SEO issues, write useful buying guides, and protect important URLs during redesigns or migrations." },
  { icon: Megaphone, title: "Paid search, Shopping ads, and paid social", copy: "Build product feeds, campaigns, and landing pages. Set up measurement where supported and agree on ad budgets and targets before spending." },
  { icon: Boxes, title: "Catalog, inventory, orders, and returns", copy: "Maintain approved catalog and stock updates, coordinate order routing and tracking, and handle cancellations, returns, or refunds within the permissions you authorize." },
  { icon: Headset, title: "Customer support and AI chatbots", copy: "Set up support workflows for pre-sale questions and post-order help. Give AI assistants an approved knowledge base and route exceptions, private account requests, and payment disputes to people." },
  { icon: Globe, title: "International storefronts and reporting", copy: "Review country-specific delivery, language, and payment needs with your team. Report sales and operating performance by channel or market when the underlying data supports it." },
];

const faqs = [
  { question: "Can Orbilect SEO manage the entire store?", answer: "Yes. We can combine brand and store design, ecommerce SEO, paid media, and day-to-day store operations in one scope. We agree which responsibilities stay with your team or your fulfillment partner." },
  { question: "Can you work with a store that is already live?", answer: "Yes. We can improve the store in place or plan a migration. We start by identifying what already generates sales and protecting important URLs, tracking, and checkout flows during changes." },
  { question: "Do you work with stores selling to more than one country?", answer: "Yes. We plan around the markets you sell to, including language, currency, delivery, returns, and compatible payment options. The exact setup depends on the platform and providers." },
  { question: "Who controls the store, ad accounts, and refunds?", answer: "You keep ownership of your business accounts. We use permission-limited access and follow the approval rules you set for ad spend, cancellations, refunds, and changes to the live store." },
  { question: "Can a chatbot replace ecommerce customer support?", answer: "It can answer routine questions from approved information and help route tickets. We define when it hands over to a person, especially for disputes, payment or account questions, and exceptions." },
  { question: "Can we start with only one part of ecommerce management?", answer: "Yes. Start with a scoped launch, a growth program, or an operating workflow. We can add other responsibilities when the store and your team are ready." },
  ...ecommerceOperationsFaqs,
];

export default function EcommerceManagementPage() {
  return (
    <main className={supportStyles.onPage}>
      <SeoJsonLd data={serviceSchema(route)} />
      <ServiceHero
        eyebrow="Ecommerce management"
        title="Build, grow and run"
        accent="your ecommerce store"
        intro="One team for online stores worldwide. We build websites and brands, run ads, grow organic traffic, and help handle orders and customer support after launch."
        ctaLabel="See how we manage stores"
        showCtaArrow
        scenes={scenes}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we manage</p>
            <h2 id="service-intro-title">What is <span>ecommerce management?</span></h2>
          </div>
          <div className={styles.prose}>
            <p>Ecommerce management brings your website, brand, marketing, and store operations under one plan. We can build or redesign the storefront, maintain the catalog, run ads, and help customers before and after they place an order.</p>
            <p>We work with stores worldwide, from teams launching their first Shopify store to established businesses managing multiple catalogs and markets. You decide which responsibilities to hand over and which your staff or vendors keep.</p>
          </div>
        </div>
      </section>

      <EcommerceManagementSection standalone />
      <EcommerceOperations />

      <section className={supportStyles.dark} aria-labelledby="ecommerce-scenarios-title">
        <div className={supportStyles.wrap}>
          <div className={supportStyles.linkHelp}>
            <header className={supportStyles.intro}>
              <p className={supportStyles.eyebrow} data-site-eyebrow="">Where we can help</p>
              <h2 id="ecommerce-scenarios-title">What does your store <span>need next?</span></h2>
              <p>Start with a launch, improve a live storefront, or hand over specific tasks so your team can focus on products and customers.</p>
              <Link className={supportStyles.cta} href="/contact#request-proposal" data-orbilect-cta="outline">
                <span data-orbilect-cta-icon="" aria-hidden="true" />Discuss your ecommerce project
              </Link>
            </header>
            <div className={supportStyles.linkCases}>
              {cases.map(({ title, copy }) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <EcommerceJourney />

      <section className={`${styles.dark} ${styles.process}`} aria-labelledby="service-process-title">
        <div className={styles.wrap}>
          <header className={styles.processHeader}>
            <div>
              <p className={styles.eyebrow} data-site-eyebrow="">The ecommerce timeline</p>
              <h2 id="service-process-title">How we <span className={styles.highlight}>manage your store</span></h2>
              <p className={styles.lead}>We start with your catalog and goals, test the customer and order flows, then agree how to measure growth and store performance.</p>
            </div>
          </header>
          <ol className={styles.phases} role="list">
            {phases.map(({ icon: Icon, timing, title, copy }) => (
              <li key={title}>
                <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                <p className={styles.timing}>{timing}</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>

          <div className={styles.scope}>
            <p data-site-eyebrow="" data-reveal="off">Store, marketing and operations</p>
            <h2 data-site-heading="">What our <span className={styles.highlight}>ecommerce team handles</span></h2>
            <div>
              {scope.map(({ icon: Icon, title, copy }) => (
                <details key={title}>
                  <summary>
                    <Icon size={20} aria-hidden="true" />
                    <span>{title}</span>
                    <Plus className={styles.toggle} size={19} aria-hidden="true" />
                  </summary>
                  <p>{copy}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EcommerceReporting />
      <InvestmentBeforeFaq routes={[route]} />
      <HomeFaq hideCta hideSectionLabel items={faqs} introTitle="Before we take on your store" introCopy="Find out what we can manage, how we work with your team, and who stays in control of your accounts." />
      <FinalCta />
    </main>
  );
}
