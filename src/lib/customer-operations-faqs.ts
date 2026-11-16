const service = "/services/ecommerce-management";
export const staffingSupportAnswers = {
  roles: {
    question: "What customer support roles can I offshore?",
    answer: "We can recruit ecommerce customer support agents for live chat, email, phone, multilingual coverage, or a multichannel role. We can also scope an AI chatbot and its handoff to human agents.",
    href: "/staffing#customer-support-offshoring",
  },
  cost: {
    question: "How much does offshore customer support cost?",
    answer: "Orbilect quotes offshore support based on skills, languages, shifts, tools, and supervision. On the staffing page you can propose an hourly budget for a human agent and send it to our team for review. AI projects use a separate scope without an hourly staffing budget.",
    href: "/staffing#customer-support-offshoring",
  },
  multilingual: {
    question: "Can an offshore customer support agent work in more than one language?",
    answer: "Yes. Tell us the markets, languages, channels, and hours you need. We assess written and spoken fluency for the role and confirm candidate availability.",
    href: "/staffing#customer-support-offshoring",
  },
};

export const ecommerceOperationsAnswers = {
  support: {
    question: "What does ecommerce customer support handle?",
    answer: "Our agents can answer product and availability questions before a sale, help with checkout and delivery options during the sale, and support order updates, returns, and escalations afterward.",
    href: service + "#ecommerce-support",
  },
  chatbot: {
    question: "Can you build an AI chatbot for my online store?",
    answer: "Yes. We can build a chatbot that uses approved product, shipping, and returns information. We define what it can look up and when it hands off to a person, including refund or account decisions.",
    href: service + "#ecommerce-support",
  },
  training: {
    question: "How are ecommerce customer support agents trained?",
    answer: "We assess typing speed and accuracy, interview candidates, and train selected agents on your products, policies, and tools. Agents practice repeated mock chats and calls, receive coaching, and are assessed before handling live queues.",
    href: service + "#ecommerce-agent-training",
  },
  platforms: {
    question: "Which platforms do you build and manage ecommerce stores on?",
    answer: "We can build and manage stores on Shopify, WordPress with WooCommerce, Magento or Adobe Commerce, BigCommerce, Wix, Squarespace, and Webflow. We scope design, migration, inventory, and integrations around the platform and markets you use.",
    href: service + "#ecommerce-store-development",
  },
  crm: {
    question: "Can you build a custom CRM for an ecommerce store?",
    answer: "Yes. We can scope a dedicated CRM or integrate your existing tools so permitted staff can see customer history, orders, stock, returns, and support cases in one place.",
    href: service + "#ecommerce-store-development",
  },
  automation: {
    question: "What can agentic AI automate in ecommerce?",
    answer: "Agentic AI can carry out approved multi-step tasks such as checking a delayed order, opening a ticket, flagging stock mismatches, or assigning follow-ups. We define tool permissions, approval steps, and escalation before rollout.",
    href: service + "#agentic-ai-development",
  },
  comparison: {
    question: "What is the difference between an AI chat agent and agentic AI?",
    answer: "An AI chat agent answers questions and routes conversations. Agentic AI can also act across approved tools, keep track of a task, request approval, and report outcomes. The comparison covers ten differences and an order-tracking example.",
    href: service + "#ai-agent-comparison",
  },
  permissions: {
    question: "What are the access and approval rules for ecommerce support and automation?",
    answer: "You control business accounts and grant only the permissions needed for the work. We agree which actions require approval, including refunds, spending, and sensitive account changes, and route exceptions to a person.",
    href: "/terms-and-conditions",
  },
  privacy: {
    question: "Where can I read your privacy policy for ecommerce support and AI data?",
    answer: "Our Privacy Policy explains how we handle contact details, project access, and Naila conversations. For ecommerce support or AI projects we agree what customer data the team and tools may access before work starts.",
    href: "/privacy-policy",
  },
  terms: {
    question: "Where can I read billing and notice terms for offshore customer support?",
    answer: "The Terms and Conditions explain staffing billing and notice. Your signed staffing agreement confirms the roles, coverage, fees, notice arrangements, and handover that apply to your engagement.",
    href: "/terms-and-conditions",
  },
};

export const staffingSupportFaqs = Object.values(staffingSupportAnswers);
export const ecommerceOperationsFaqs = Object.values(ecommerceOperationsAnswers);
