"use client";

import dynamic from "next/dynamic";
import styles from "./about-store-scene.module.css";

const BoutiqueCanvas = dynamic(() => import("./boutique-canvas"), {
  ssr: false,
  loading: () => <div className={styles.loading} />,
});

export default function StorefrontScene() {
  return (
    <div className={styles.scene}>
      <BoutiqueCanvas />
    </div>
  );
}
