"use client";

import Image from "@/components/optimized-image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import cta from "@/styles/orbilect-cta.module.css";
import { services } from "./catalog";
import styles from "./home-sections.module.css";

type Service = (typeof services)[number];

function ServiceImage({ service }: { service: Service }) {
  return (
    <Image
      src={`/service-covers-landscape/${service.slug}.webp`}
      alt=""
      width={960}
      height={540}
      sizes="(max-width: 820px) 92vw, 42vw"
      className={styles.art}
    />
  );
}

function ServiceLink({ service, label }: { service: Service; label: string }) {
  return (
    <Link
      className={`${cta.cta} ${cta.ctaBlue} ${styles.sectionCta}`}
      href={`/services/${service.slug}`}
      aria-label={`${label}: ${service.title}`}
     data-orbilect-cta="blue"><span data-orbilect-cta-icon="" aria-hidden="true" />

      {label}
    </Link>
  );
}

export default function Services() {
  const [activeSlug, setActiveSlug] = useState<Service["slug"]>(services[0].slug);
  const activeService = services.find((service) => service.slug === activeSlug) ?? services[0];

  return (
    <section id="seo-services" className={styles.services} aria-labelledby="services-title">
      <div className={styles.wrap}>
        <p data-site-eyebrow="" data-reveal="off">{"Orbilect SEO services"}</p>
        <h2 data-site-heading="" id="services-title" className={styles.heading} data-orbilect-title="">
          Built to be found, <span>designed to convert</span>
        </h2>
        <p className={styles.subtitle}>
          Improve search visibility, attract relevant traffic, and make it easier
          for visitors to buy, book, or get in touch.{" "}<Link href="/services">Explore all SEO and digital marketing services</Link>.
        </p>

        <div className={styles.serviceGrid}>
          <div className={styles.sticky}>
            <ServiceImage key={activeService.slug} service={activeService} />
            <div className={styles.artFooter}>
              <span>{activeService.title}</span>
              <ServiceLink service={activeService} label="Explore service" />
            </div>
          </div>

          <div>
            {services.map((service) => {
              const selected = service.slug === activeSlug;
              const panelId = `service-panel-${service.slug}`;

              return (
                <article key={service.slug} className={styles.row} data-selected={selected}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={selected}
                      aria-controls={panelId}
                      onClick={() => setActiveSlug(service.slug)}
                    >
                      {service.title}
                      <span className={styles.toggle} aria-hidden="true">
                        {selected ? <Minus size={17} /> : <Plus size={17} />}
                      </span>
                    </button>
                  </h3>
                  <div className={styles.panel} id={panelId} hidden={!selected}>
                    {selected && (
                      <>
                        <div className={styles.mobileArt}><ServiceImage service={service} /></div>
                        <ul className={styles.tags}>
                          {service.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                        <p>{service.summary}</p>
                        <ServiceLink service={service} label="Learn more" />
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
