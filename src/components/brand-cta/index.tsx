import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./button.module.css";
export default function BrandCta({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className={styles.button}><span className={styles.disc} aria-hidden="true"><ArrowUpRight /></span><span className={styles.label}>{children}</span></Link>;
}
