"use client";

import { Bot, Boxes, Code2, Database, Network, PackageCheck, PanelsTopLeft, Shield, ShoppingCart, Workflow } from "lucide-react";
import { proposalFormHref } from "@/lib/leads/sources";
import { InteractiveSection, type Scene } from "../../_components/customer-operations/interactive-section";
import { AgentTraining } from "./agent-training";
import { supportScenes } from "../../_components/customer-operations/support-scenes";
import base from "../on-page-seo/on-page-subservices.module.css";
import styles from "../../_components/customer-operations/details.module.css";

const development = [
  { label: "Shopify and BigCommerce", icon: ShoppingCart, title: "Build around the catalog you actually manage", copy: "Design storefront themes, structure collections and product variants, connect permitted apps, and prepare channel feeds. Test checkout, shipping, and stock updates before release.", checks: ["Store design", "Catalog and product feeds", "Checkout testing"] },
  { label: "WordPress and WooCommerce", icon: Code2, title: "Connect content and commerce", copy: "Build or redesign the WordPress site and WooCommerce store, test plugin and gateway changes on staging, and migrate agreed products, copy, and URLs.", checks: ["Custom templates", "Plugin upkeep", "Product and URL migration"] },
  { label: "Magento and Adobe Commerce", icon: Boxes, title: "Manage complex catalogs and store views", copy: "Scope storefront development around Magento Open Source or Adobe Commerce, including store views, variant rules, inventory sources, and authorized fulfillment connections.", checks: ["Multi-store setup", "Inventory rules", "Fulfillment integrations"] },
  { label: "Wix, Squarespace and Webflow", icon: PanelsTopLeft, title: "Build a store that fits your brand and tools", copy: "Design the site and product templates, configure supported checkout and shipping, and document how your team edits products and promotions. Verify platform limits for each market first.", checks: ["Brand and storefront", "Product management", "Market setup"] },
  { label: "Inventory and custom CRM", icon: Database, title: "Give your team one view of store activity", copy: "We can build a dedicated CRM or integrate your existing tools so authorized staff can see customer history, stock, orders, returns, and support tickets. We define the inventory source of truth and how to resolve sync errors.", checks: ["Inventory visibility", "Customer and order history", "Permission-limited CRM"] },
] satisfies Scene[];

const workflows = [
  { label: "Orders and fulfillment", icon: PackageCheck, title: "Turn order events into coordinated work", copy: "When a shipment stalls, a scoped agent can check the order and carrier status, prepare the next action, open a help-desk ticket, and request approval before sending a sensitive reply.", checks: ["Order and tracking lookup", "Ticket creation", "Exceptions and approval"] },
  { label: "Inventory and catalog", icon: Boxes, title: "Catch stock and listing gaps early", copy: "Monitor inventory or product-feed events, compare records from approved systems, and queue a correction or send an alert when the sources disagree.", checks: ["Stock checks", "Product feed alerts", "Review uncertain changes"] },
  { label: "CRM and support", icon: Network, title: "Move approved tasks between systems", copy: "Create support cases, summarize a customer history from approved data, and assign follow-ups. Use permission limits and approval rules for financial or account changes.", checks: ["Tool permissions", "Approval queues", "Audit history"] },
  { label: "Monitoring and recovery", icon: Shield, title: "Keep people in control of the workflow", copy: "Test each workflow against realistic failures. Record tool actions, limit repetition, and route errors to a human with enough context to intervene.", checks: ["Sandbox testing", "Retries and escalation", "Manual override"] },
] satisfies Scene[];

const differences = [
  ["Purpose", "Answers questions and guides customers.", "Completes an approved operational task."],
  ["Trigger", "Usually starts with a live chat message.", "Can start from a message, event, or schedule."],
  ["Tools", "Reads the knowledge base and approved lookups.", "Coordinates multiple approved systems through APIs."],
  ["Steps", "Follows conversation and handoff rules.", "Plans and executes several steps inside a defined workflow."],
  ["State", "Carries context within the conversation.", "Can track progress on a task after the conversation ends."],
  ["Actions", "Explains policy or prepares a handoff.", "Can write to approved systems or queue an action for review."],
  ["Approvals", "Escalates requests beyond the chat scope.", "Pauses before sensitive actions such as refunds or account changes."],
  ["Errors", "Hands unresolved questions to an agent.", "Uses bounded retries, records failures, and routes exceptions."],
  ["Measurement", "Answer accuracy, resolution, and handoff quality.", "Task completion, error rate, and approval turnaround."],
  ["Example", "Explains how to track an order.", "Checks the carrier, creates a ticket, and queues a follow-up."],
];

const proposal = proposalFormHref("Ecommerce Store Design and Development", "Help me design and develop my ecommerce store or CRM.");

export function EcommerceOperations() {
  return (
    <>
      <InteractiveSection id="ecommerce-support" eyebrow="Ecommerce customer support"
        title="There is an agent" accent="for everyone"
        intro="Help shoppers before they buy, during checkout, and after delivery. We train agents on your products, policies, and tone so they can handle day-to-day questions across live chat, email, and voice. Add multilingual coverage or a custom AI chatbot as your store grows."
        scenes={supportScenes}
        link={{ label: "Explore customer support staffing", href: "/staffing#customer-support-offshoring" }} />
      <AgentTraining />
      <InteractiveSection id="ecommerce-store-development" eyebrow="Store design and development"
        title="Build and manage" accent="your storefront"
        intro="We design and develop online stores, manage product records and inventory updates, and connect orders to your fulfillment and support teams. Ask us for a dedicated CRM if your current tools leave your team switching between systems."
        scenes={development}
        link={{ label: "Discuss your store or CRM", href: proposal }} />
      <InteractiveSection id="agentic-ai-development" eyebrow="Agentic AI development" light
        title="Automate the work" accent="behind the storefront"
        intro="We build AI agents that carry out agreed workflows across your store, CRM, help desk, and inventory tools. Start with repeatable tasks, define the allowed actions, and keep approval with your team where money or customer data is involved."
        scenes={workflows}
        link={{ label: "Scope an AI workflow", href: proposalFormHref("Agentic AI Development", "Help me build an agentic AI agent to automate approved workflows.") }} />
      <section id="ai-agent-comparison" className={styles.comparison} aria-labelledby="ai-agent-comparison-title">
        <div className={base.wrap}>
          <header className={base.header}>
            <p className={base.eyebrow} data-site-eyebrow="">AI agent comparison</p>
            <h2 id="ai-agent-comparison-title" data-site-heading="">AI chat agent <span>or agentic AI?</span></h2>
            <p>An AI chat agent supports a conversation. An agentic AI system can also do approved work across your operations tools.</p>
          </header>
          <div className={styles.tableFrame}>
            <table className={styles.table} aria-label="AI chat agent and agentic AI comparison">
              <thead><tr><th scope="col">Capability</th><th scope="col"><Bot size={16} aria-hidden="true" /> AI chat agent</th><th scope="col"><Workflow size={16} aria-hidden="true" /> Agentic AI</th></tr></thead>
              <tbody>
                {differences.map(([label, chat, workflow]) => <tr key={label}><th scope="row">{label}</th><td>{chat}</td><td>{workflow}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
