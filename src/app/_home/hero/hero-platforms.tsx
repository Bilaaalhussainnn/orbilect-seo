import type { CSSProperties } from "react";
import styles from "./hero-platforms.module.css";

const platforms = [
  ["Shopify", "shopify", "#95bf47", "#192513"],
  ["WordPress", "wordpress", "#21759b", "#dbedf4"],
  ["WooCommerce", "woocommerce", "#873eff", "#18102b"],
  ["Wix", "wix", "#111", "#d5daef"],
  ["React", "react", "#61dafb", "#14242b"],
  ["Next.js", "nextdotjs", "#080a0e", "#cdd3df"],
  ["Node.js", "nodedotjs", "#5fa04e", "#17241b"],
] as const;

export default function HeroPlatforms() {
  return (
    <ul className={styles.platforms} aria-label="Platforms and technologies" role="list">
      {platforms.map(([label, logo, ink, surface]) => (
        <li key={logo} className={styles.tile} title={label} style={{
          "--mark": `url("/platform-logos/${logo}.svg")`,
          "--ink": ink,
          "--surface": surface,
        } as CSSProperties}>
          <span className={styles.logo} role="img" aria-label={label} />
        </li>
      ))}
    </ul>
  );
}
