import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import FinalCta from "../../_home/final-cta";
import faqStyles from "../../_home/editorial/editorial.module.css";
import { ServiceHero, type ServiceScene } from "./service-story";
import { mainServices, type MainServiceSlug } from "./main-service-data";
import { ServiceProgress, ServiceWork } from "./main-service-interactive";
import { ServicesReputation as Reputation } from "./seo-support";
import styles from "./main-service.module.css";

const phases = ["At the start", "During implementation", "After release"];

export function MainServicePage({ slug }: { slug: MainServiceSlug }) {
  const service = mainServices[slug];
  const [search, page, action] = service.example;
  const scenes: ServiceScene[] = [
    { id: "search", label: "Customer search", address: search, title: search, copy: service.journey[0][1], items: ["Search intent", "Relevant destination"] },
    { id: "page", label: "Destination", address: "example.com/" + slug, title: page, copy: service.journey[1][1], items: ["Page experience", "Customer information"] },
    { id: "links", label: "Next action", address: "example.com/" + slug, title: action, copy: service.journey[2][1], items: ["Customer action", "Measurement"] },
  ];

  return (
    <main>
      <ServiceHero eyebrow={service.name} title={service.title[0]} accent={service.title[1]}
        intro={service.description} scenes={scenes} />

      <section id="service-intro" className={styles.light} aria-labelledby="service-intro-title">
        <div className={styles.wrap}>
          <div className={styles.split}>
            <header>
              <p className={styles.eyebrow} data-site-eyebrow="">{service.name}</p>
              <h2 id="service-intro-title">{service.introTitle}</h2>
            </header>
            <div>
              <p>{service.intro}</p>
              <a className={styles.link} href="#request-proposal">Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.journey} aria-label="Example customer journey">
            {service.journey.map(([title, description]) => (
              <article key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.dark} aria-labelledby="main-service-timeline">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-site-eyebrow="">The delivery timeline</p>
            <h2 id="main-service-timeline">How we deliver <span>{service.name}</span></h2>
          </header>
          <ol className={styles.timeline} role="list">
            {service.timeline.map(([title, description], index) => (
              <li key={title}><small>{phases[index]}</small><h3>{title}</h3><p>{description}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <ServiceWork name={service.name} work={service.work} />
      <ServiceProgress metric={service.metric} progress={service.progress} paid={service.paid} />
      <Suspense fallback={null}><Reputation placement="detail" /></Suspense>

      <section id="faqs" className={faqStyles.faqs} aria-labelledby="main-service-faq-title">
        <div className={[faqStyles.container, faqStyles.faqLayout].join(" ")}>
          <div className={faqStyles.faqIntro}>
            <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
            <h2 data-site-heading="" id="main-service-faq-title"><span>{service.name}</span><br />frequently asked questions</h2>
            <div className={faqStyles.introCard}>
              <h3>Planning your project</h3>
              <p>Find out what we need from your team, what we’ll deliver, and what we’ll check afterward.</p>
              <a className={styles.link} href="#request-proposal" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />Request a proposal </a>
            </div>
          </div>
          <div className={faqStyles.questions}>
            {service.faqs.map(([question, answer], index) => (
              <details key={question} name={"faq-" + slug} open={index === 0}>
                <summary>{question}<span className={faqStyles.toggle} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
