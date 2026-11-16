export const stories = [
  {
    "slug": "orbilect-reviews",
    "category": "Business reviews",
    "title": "Inside Orbilect Reviews, a directory for comparing service providers",
    "summary": "A closer look at Orbilect Labs’ approach to company profiles, client reviews, and shortlisting.",
    "alt": "Orbilect Reviews dashboard mockup showing filters, provider comparisons, and sample reviews",
    "sections": [
      [
        "Start with the work you need done",
        "Business directories like Clutch and GoodFirms help buyers discover providers. Orbilect Reviews is designed for a similar decision. A buyer can start with the service they need, review relevant company profiles, and compare providers before deciding whom to contact."
      ],
      [
        "Give reviews more context",
        "A rating alone says little about the type of engagement. The product direction brings client feedback and provider details into one view so buyers can ask better questions about relevant experience, communication, and delivery."
      ],
      [
        "From discovery to a shortlist",
        "The dashboard mockup shows how search filters, profile comparisons, and review excerpts could support a shortlist. The companies and ratings in the illustration are sample data."
      ]
    ]
  },
  {
    "slug": "orbilect-create",
    "category": "AI website builder",
    "title": "Orbilect Create turns a website brief into an editable first draft",
    "summary": "A look at how Orbilect Labs brings AI-assisted site creation, editing, and responsive previews into one workspace.",
    "alt": "Orbilect Create dashboard mockup with a prompt panel, site preview, and page tree",
    "sections": [
      [
        "Start with a brief",
        "Describe what the website is for, who it needs to reach, and what visitors should be able to do. Orbilect Create is designed to turn that brief into a first draft so you can review a page structure and layout early."
      ],
      [
        "Refine the draft in context",
        "The workspace puts the brief, page tree, and visual preview together. Teams can review copy, adjust layouts, and check how the experience looks at different screen sizes as they refine the site."
      ],
      [
        "Review before publishing",
        "An early draft gives the team something concrete to test. Business details, accessibility, and key actions such as submitting a form or booking a call still need review before the site goes live."
      ]
    ]
  },
  {
    "slug": "naila-ai",
    "category": "Customer support AI",
    "title": "How Naila AI handles routine questions and hands off complex cases",
    "summary": "Explore the support assistant’s approach to approved knowledge, conversation context, and human handoff.",
    "alt": "Naila AI dashboard mockup showing a support inbox, chat transcript, and human handoff",
    "sections": [
      [
        "Give routine answers a reliable source",
        "Naila AI is designed to answer common questions using information a support team approves. Keeping source material close to the answer helps teams review responses and update guidance when policies or product details change."
      ],
      [
        "Carry context into the handoff",
        "Questions that need judgment or account-specific action can go to a person. A useful handoff gives the agent the conversation and the reason it was escalated, so the customer can continue without repeating the whole story."
      ],
      [
        "Use recurring questions to improve support",
        "Teams can use repeated questions to spot missing documentation or confusing steps in a customer journey. That gives them a concrete place to improve self-service and agent guidance."
      ]
    ]
  },
  {
    "slug": "large-language-model",
    "category": "AI research",
    "title": "How Orbilect Labs approaches language model development",
    "summary": "A look at the LLM work and the role of task-specific evaluation before a model enters a workflow.",
    "alt": "Language model workspace mockup showing a prompt editor, sample outputs, and evaluation history",
    "sections": [
      [
        "Define the task before testing the model",
        "Orbilect Labs’ language model work explores how models can help with defined tasks such as summarizing material, drafting text, or extracting information. Each task has different criteria for what makes the output useful."
      ],
      [
        "Compare outputs against examples",
        "The evaluation workspace illustrates how a team can run a set of prompts, compare responses, and review problems such as omitted details or unsupported claims. A history of test runs helps reviewers trace what changed between iterations."
      ],
      [
        "Set boundaries for real workflows",
        "Where an output affects a customer or a business decision, the workflow needs clear review and escalation points. The dashboard is a mockup of that evaluation process, and the scores are illustrative."
      ]
    ]
  },
  {
    "slug": "erp-platform",
    "category": "Enterprise software",
    "title": "An ERP platform that connects orders, inventory, and invoicing",
    "summary": "Inside the Orbilect Labs ERP platform and the handoffs it brings into one workspace.",
    "alt": "ERP dashboard mockup showing an order pipeline, inventory records, and invoicing summary",
    "sections": [
      [
        "Follow an order across teams",
        "An order can start with sales, pass through inventory and fulfilment, and end with finance. The ERP platform is designed to give each team a shared record of the order and a clear view of the next action."
      ],
      [
        "Make operational exceptions easier to spot",
        "A short shipment, stock discrepancy, or unpaid invoice matters to more than one team. Bringing those records together gives people a place to investigate the issue and coordinate a response."
      ],
      [
        "Design around how the business works",
        "Useful ERP workflows reflect who enters information, who approves changes, and who needs the result. The dashboard illustrates one way to organize those handoffs using sample records."
      ]
    ]
  }
] as const;

export type Story = (typeof stories)[number];
