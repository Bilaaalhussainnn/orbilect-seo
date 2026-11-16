"use client";

import { useState } from "react";
import { ArrowRight, ClipboardCheck, GraduationCap, Keyboard, MessageSquare } from "lucide-react";
import type { Scene } from "../../_components/customer-operations/interactive-section";
import styles from "./agent-training.module.css";

const training = [
  { label: "Typing and accuracy", icon: Keyboard, title: "Screen for speed and clear writing", copy: "We check typing speed, accuracy, and written comprehension with timed order and product queries. The bar depends on the role, language, and expected chat load.", checks: ["Typing test", "Written accuracy", "Channel readiness"] },
  { label: "Interviews", icon: MessageSquare, title: "Interview for judgment and customer care", copy: "We use product questions, a test call or chat, and a written follow-up to assess how candidates explain options and handle an upset customer. Your team can interview finalists.", checks: ["Role-specific interview", "Channel simulation", "Client selection"] },
  { label: "Product training", icon: GraduationCap, title: "Learn your products and policies", copy: "Our Training and Development team turns your product catalog, tone of voice, shipping rules, and return policy into a practical training plan. Agents practice in a test environment before working on live accounts.", checks: ["Product knowledge", "Help-desk practice", "Privacy and permissions"] },
  { label: "Test chats and QA", icon: ClipboardCheck, title: "Practice realistic chats before going live", copy: "Agents handle repeated mock chats and calls on pre-sale questions, checkout trouble, late orders, and returns. Trainers score accuracy, tone, resolution, and escalation, then coach and retest gaps.", checks: ["Repeated simulations", "Quality scorecard", "Coaching and sign-off"] },
] satisfies Scene[];

const practice = [
  { prompt: "A shopper needs to update an order address.", response: "Identify what to verify, outline the next step, and write a clear reply." },
  { prompt: "A customer disagrees with the return policy.", response: "Explain the available options and when to escalate the case." },
  { prompt: "A shopper asks if an item is in stock and ships internationally.", response: "Look up the item in the training catalog, then confirm the shipping rules." },
  { prompt: "An order is late and tracking hasn't moved.", response: "Practise the conversation, document the outcome, and flag any gaps during QA." },
];

export function AgentTraining() {
  const [active, setActive] = useState(0);
  const step = training[active];
  const example = practice[active];
  const Icon = step.icon;

  return (
    <section id="ecommerce-agent-training" className={styles.section} aria-labelledby="ecommerce-agent-training-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p data-site-eyebrow="">Agent screening and training</p>
          <h2 id="ecommerce-agent-training-title" data-site-heading="">Train agents <span>on your store</span></h2>
          <p>Our Training and Development team uses your products, policies, and realistic support scenarios to prepare agents for live conversations.</p>
        </header>
        <ol className={styles.steps} aria-label="Training stages">
          {training.map(({ label, icon: StepIcon }, index) => (
            <li key={label}><button type="button" aria-pressed={active === index} aria-controls="agent-training-detail" onClick={() => setActive(index)}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <StepIcon size={18} aria-hidden="true" />
              <span>{label}</span>
            </button></li>
          ))}
        </ol>
        <div id="agent-training-detail" aria-live="polite" aria-atomic="true">
          <div className={styles.detail} key={step.label}>
            <div className={styles.copy}>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <ul>{step.checks.map(check => <li key={check}>{check}</li>)}</ul>
            </div>
            <div className={styles.simulation}>
              <div className={styles.simulationHeader}><Icon size={17} aria-hidden="true" /> Training exercise</div>
              <p className={styles.prompt}>{example.prompt}</p>
              <p className={styles.response}><ArrowRight size={16} aria-hidden="true" />{example.response}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
