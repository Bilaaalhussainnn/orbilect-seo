import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./workbench.module.css";

export default function HomeCta({ href, children, variant = "black" }: {
  href: string;
  children: ReactNode;
  variant?: "black" | "white";
}) {
  return (
    <Link href={href} className={styles.cta} data-orbilect-cta={variant}>
      <span data-orbilect-cta-icon="" data-explicit-arrow="" aria-hidden="true"><ArrowUpRight size={16} /></span>
      {children}
    </Link>
  );
}
