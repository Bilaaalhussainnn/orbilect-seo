import Image from "next/image";
import { ArrowLeftRight, Landmark } from "lucide-react";
import styles from "./legal.module.css";

const cardMethods = [
  { label: "PayPal", logo: "paypal.svg" },
  { label: "Visa", logo: "visa.svg" },
  { label: "Mastercard", logo: "mastercard.svg" },
  { label: "American Express", logo: "american-express.svg" },
];

export default function AcceptedPayments() {
  return <div className={styles.acceptedPayments}>
    <h3>Accepted payment methods</h3>
    <ul className={styles.paymentMethods} aria-label="Accepted payment methods">
      <li><span className={styles.paymentLogo}><Landmark size={30} aria-hidden="true" /></span><span>Bank transfer</span></li>
      <li><span className={styles.paymentLogo}><ArrowLeftRight size={30} aria-hidden="true" /></span><span>Wire transfer</span></li>
      {cardMethods.map(method => <li key={method.label}>
        <span className={styles.paymentLogo}><Image src={"/payment-methods/" + method.logo}
          alt="" width={96} height={34} unoptimized /></span>
        <span>{method.label}</span>
      </li>)}
    </ul>
  </div>;
}
