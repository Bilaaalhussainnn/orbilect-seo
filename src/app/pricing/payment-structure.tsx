import Link from "next/link";
import { CalendarDays, ClipboardCheck, CreditCard } from "lucide-react";
import { promotionalPayment, recurringSchedule, standardAdvance, standardBalance } from "@/lib/payment-policy";
import styles from "./pricing-factors.module.css";
import payment from "./payment-structure.module.css";

export function PaymentStructure() {
  return (
    <section id="payment-structure" className={styles.section} aria-labelledby="payment-structure-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-site-eyebrow="">Payment structure</p>
          <h2 id="payment-structure-title">When each <span>payment is due</span></h2>
          <p>We quote fixed-price projects and recurring services separately. Before work begins, we set out the service terms, deliverables and billing in the signed service agreement. Both parties sign the NDA covering confidentiality and access.</p>
        </header>
        <div className={payment.cards}>
          <article className={styles.value}>
            <div className={styles.icon}><ClipboardCheck size={24} aria-hidden="true" /></div>
            <p className={styles.valueLabel}>Category 1</p>
            <h3>Fixed-price projects</h3>
            <p>{standardAdvance}</p>
            <p>{standardBalance}</p>
          </article>
          <article className={styles.value}>
            <div className={styles.icon}><CalendarDays size={24} aria-hidden="true" /></div>
            <p className={styles.valueLabel}>Category 2</p>
            <h3>Recurring services</h3>
            <p>{recurringSchedule}</p>
            <p>Where available, you can authorize direct debit for the scheduled calendar date. See your invoice for the payment method and due date.</p>
          </article>
        </div>
        <div className={styles.footer}>
          <div>
            <h3><CreditCard size={18} aria-hidden="true" /> Promotional purchases</h3>
            <p>{promotionalPayment} See the terms for refunds and staffing notice periods.</p>
          </div>
          <Link className={styles.cta} href="/terms-and-conditions#fees" data-orbilect-cta="black">
            <span data-orbilect-cta-icon="" aria-hidden="true" />
            Read payment terms
          </Link>
        </div>
      </div>
    </section>
  );
}
