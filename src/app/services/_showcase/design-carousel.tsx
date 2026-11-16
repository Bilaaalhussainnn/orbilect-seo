import Image from "next/image";
import styles from "./showcase.module.css";
import investment from "../../_components/service-investment.module.css";
import { ShowcaseHeading } from "./section-heading";

const industries = [
  ["healthcare", "Healthcare"],
  ["real-estate", "Real estate"],
  ["crypto", "Crypto"],
  ["retail", "Retail"],
  ["ecommerce", "Ecommerce"],
  ["shopify", "Shopify store"],
] as const;

function DesignTrack({ tone, label }: { tone: "light" | "dark"; label: string }) {
  return (
    <div className={styles.viewport} tabIndex={0} role="region" aria-label={label}>
      <div className={styles.track} data-direction={tone === "light" ? "left" : "right"}>
        {[false, true].map(copy => (
          <ul className={styles.designGroup} key={String(copy)} aria-hidden={copy || undefined} data-copy={copy || undefined}>
            {industries.map(([slug, name]) => (
              <li key={slug} className={styles.design}>
                <Image src={`/service-showcase/ui/${slug}-${tone}.webp`} width={1536} height={1024}
                  unoptimized alt={copy ? "" : name + " landing page in a " + tone + " palette"} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function DesignCarousel() {
  return (
    <section id="ui-designs" className={`${investment.section} ${styles.section}`} aria-labelledby="ui-designs-title">
      <div className={investment.wrap}>
        <ShowcaseHeading id="ui-designs-title" eyebrow="Landing page portfolio" title="UI" accent="designs"
          intro="Landing page concepts for six industries, each with a light and a dark direction."
          enquiry="Landing page design" ctaLabel="Discuss your landing page" />
      </div>
      <div className={styles.carousel}>
        <DesignTrack tone="light" label="Light landing page designs" />
        <DesignTrack tone="dark" label="Dark landing page designs" />
      </div>
    </section>
  );
}
