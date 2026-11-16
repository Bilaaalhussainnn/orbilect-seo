"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./audit-guide.module.css";

const AuditModel = dynamic(() => import("../_home/growth/audit-model"), {
  ssr: false,
  loading: () => <div className={styles.placeholder} aria-hidden="true" />,
});

const modes = ["Search visibility", "Technical SEO", "On-page SEO"];

export default function AuditScene() {
  const [selected, setSelected] = useState(0);
  const [scan, setScan] = useState(0);

  return (
    <div className={styles.scene}>
      <AuditModel selected={selected} scan={scan} />
      <div className={styles.controls} role="group" aria-label="Audit preview">
        {modes.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={index === selected}
            onClick={() => {
              setSelected(index);
              setScan((value) => value + 1);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
