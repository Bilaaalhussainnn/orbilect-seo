"use client";

import { promotionalPayment } from "@/lib/payment-policy";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import styles from "./website-redesign-promotion.module.css";

const demo = [
  ["Answer questions", "What services do you offer?", "I can help you find the right service. What are you looking for?"],
  ["Capture notes", "I need a quote for a new website.", "Tell me what the site needs to do and the best way for the team to reach you."],
  ["Book a meeting", "Can I speak to someone this week?", "With a connected calendar, I can show available times and help you choose one."],
];

export function WebsiteRedesignPromotion() {
  const [active, setActive] = useState(0);
  const [, question, answer] = demo[active];

  return (
    <section id="website-redesign-promo" className={styles.section} aria-labelledby="redesign-promo-title">
      <div className={styles.wrap}>
        <p className={styles.banner}>Promotional offer <span>Website redesign from $600</span></p>
        <div className={styles.layout}>
          <div>
            <p data-site-eyebrow="" data-reveal="off">{"Website redesign promo"}</p>
            <h2 data-site-heading="" id="redesign-promo-title">Keep customers <span>after closing time</span></h2>
            <p>Give customers a fast, mobile-friendly website that explains your services and makes it easy to get in touch after hours.</p>
            <p className={styles.price}>One-time price from <strong>$600</strong></p>
            <p>{promotionalPayment} <Link href="/terms-and-conditions#limited-time-offers">View offer terms</Link>.</p>
            <ul className={styles.benefits}>
              <li>Website redesign for your business</li>
              <li>12 months of complimentary website bug support</li>
              <li>Complimentary AI chatbot builder for FAQs, customer notes, and booking appointments or meetings with a connected calendar</li>
            </ul>
            <Link className={styles.cta} href="/contact?request=Website%20Redesign%20Promotion#request-proposal" data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
              Request a redesign proposal 
            </Link>
          </div>

          <div className={styles.demo}>
            <h3><MessageSquare size={20} aria-hidden="true" />After-hours chat demo</h3>
            <div className={styles.controls} role="group" aria-label="Explore the chatbot demo">
              {demo.map(([label], index) => (
                <button type="button" key={label} aria-pressed={index === active}
                  aria-controls="redesign-promo-chat" onClick={() => setActive(index)}>
                  {label}
                </button>
              ))}
            </div>
            <div id="redesign-promo-chat" aria-live="polite" aria-atomic="true">
              <div key={active} className={styles.exchange}>
                <p><strong>Visitor</strong>{question}</p>
                <p><strong>Website assistant</strong>{answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
