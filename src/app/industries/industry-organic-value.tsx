"use client";

import { useState } from "react";
import { ArrowDown, FileText, MousePointer2, Search } from "lucide-react";
import styles from "./industry-organic-value.module.css";

const examples = [
  {
    industry: "Home services",
    query: "water heater replacement near me",
    page: "Local water heater replacement page",
    action: "Book a service visit",
    value: "We build location and service pages that answer pricing, coverage, and availability questions before a homeowner calls.",
  },
  {
    industry: "Ecommerce",
    query: "carry-on luggage with a laptop compartment",
    page: "Carry-on luggage collection",
    action: "Buy a carry-on",
    value: "We improve collections and buying guides so shoppers can compare the right products and move from search to checkout.",
  },
  {
    industry: "B2B",
    query: "ISO 9001 precision machining supplier",
    page: "Machining capabilities and certifications",
    action: "Request a quote",
    value: "We make capabilities, tolerances, and certifications easy to find so buyers can qualify your business before sending an enquiry.",
  },
];

export default function IndustryOrganicValue() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  const steps = [
    { label: "What they search", value: example.query, Icon: Search },
    { label: "The page they find", value: example.page, Icon: FileText },
    { label: "What they can do next", value: example.action, Icon: MousePointer2 },
  ];

  return (
    <section className={styles.section} aria-labelledby="industry-organic-title">
      <div className={styles.inner}>
        <header>
          <p className={styles.label}>Organic growth across industries</p>
          <p data-site-eyebrow="" data-reveal="off">{"Build demand that outlasts the campaign"}</p>
          <h2 data-site-heading="" id="industry-organic-title" data-orbilect-title="">
            Build demand that <span>outlasts the campaign</span>
          </h2>
          <p className={styles.intro}>
            Paid ads can put an offer in front of customers quickly. When the
            campaign ends, that placement ends with it. Organic search helps
            people discover your business through pages you own, without a
            media fee for each click.
          </p>
        </header>

        <div className={styles.layout}>
          <div>
            <h3>See how it works in your industry</h3>
            <div className={styles.controls} role="group" aria-label="Industry examples">
              {examples.map(({ industry }, index) => (
                <button
                  key={industry}
                  type="button"
                  aria-pressed={selected === index}
                  aria-controls="industry-organic-example"
                  onClick={() => setSelected(index)}
                >
                  {industry}
                </button>
              ))}
            </div>

            <p className={styles.value}>
              <strong>How we create value</strong>
              We connect what customers search for to the page that answers
              them. Then we use search and conversion data to decide which
              pages to improve and where to expand.
            </p>
          </div>

          <div id="industry-organic-example" className={styles.example} aria-live="polite">
            <div className={styles.scene}>
              <ol className={styles.track} key={example.industry}>
                {steps.map(({ label, value, Icon }, index) => (
                  <li key={label} className={styles.step}>
                    <Icon size={22} aria-hidden="true" />
                    <div><span>{label}</span><strong>{value}</strong></div>
                    {index < steps.length - 1 && (
                      <ArrowDown className={styles.arrow} size={16} aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <p className={styles.caption}>{example.value}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
