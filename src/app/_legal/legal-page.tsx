import PageStructuredData from "@/components/seo/page-data";
import { businessDescription, pakistanAddress, staffingLocations } from "@/lib/site-identity";
import { chequePaymentPolicy, paymentMethods, projectRefund, promotionalPayment, recurringSchedule, refundTiming, standardAdvance, standardBalance } from "@/lib/payment-policy";
import AcceptedPayments from "./accepted-payments";
import LegalHero from "./legal-hero";
import { ArticleSidebar } from "../blogs/what-is-search-engine-optimization/article-client";
import articleStyles from "../blogs/what-is-search-engine-optimization/article.module.css";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-consent";
import styles from "./legal.module.css";

const orbilectGlobalAddresses = [
  ["Canada", "7900 Hurontario Street, Brampton, ON L6Y 0P6, Canada"],
  [
    "Australia",
    "Tower One, 100 Barangaroo Avenue, Barangaroo NSW 2000, Australia"
  ],
  [
    "Qatar",
    "Commercial Bank Plaza, West Bay, Doha, Qatar"
  ],
  [
    "United Kingdom",
    "3 Hardman Square, Spinningfields, Manchester M3 3EB, United Kingdom"
  ],
  [
    "Pakistan",
    pakistanAddress
  ]
] as const;

type LegalSection = readonly [id: string, title: readonly [string, string], paragraphs: readonly string[]];

const privacy: readonly LegalSection[] = [
["orbilect-os", ["Orbilect OS", "employee data"], ["Orbilect OS is an internal workspace being developed for Orbilect employees. It is not a public customer portal or a consumer service.", "Access is restricted to individually authorised employees using approved Orbilect product email accounts. Possession of an Orbilect email address alone does not grant access to any customer record.", "Personal email accounts, shared identities and borrowed employee accounts are not permitted for Orbilect OS access.", "Before an OS module is used, its internal notice should identify its purpose, authorised users and the categories of information it handles.", "Depending on enabled modules, work records may include business contacts, enquiries, project instructions, sales activity, invoices, staffing information and support correspondence.", "Only information necessary for an approved business purpose should be entered. Staff must not upload unrelated personal files or sensitive information without an approved need and secure process.", "Client information remains confidential. Access must follow the employee\u2019s assigned role, project responsibilities and the relevant client agreement.", "Customer records must not be photographed, screen-captured, copied into personal notes, forwarded to private email or exported to personal storage without explicit written authorisation.", "Employees must not paste customer information into unapproved AI tools, public chat services or third-party applications.", "Where technical audit logging is enabled, account identifiers, access events, timestamps, device or network details and administrative actions may be recorded for security and accountability.", "The relevant employee notice must explain any monitoring actually in use. This public policy does not represent that every proposed security or monitoring feature is already implemented.", "Authorised administrators should limit access to work records and logs to legitimate operational, security, compliance or investigation needs.", "Retention periods should reflect the relevant purpose, client instructions, contractual commitments and applicable legal obligations; records should not be kept indefinitely by default.", "Access should be reviewed when roles change and removed promptly when employment or authorisation ends. Departing employees must return company materials and stop accessing work records.", "Accidental disclosures, suspicious access, missing devices and misdirected messages must be reported promptly to the designated internal contact. Do not conceal an incident or delete evidence.", "Any approved service provider must be assessed for the intended processing and covered by appropriate confidentiality and data-processing commitments.", "Cross-border access or hosting must be assessed against applicable requirements and the relevant client commitments before the processing begins.", "Privacy requests about OS records may be sent to info@orbilectseo.com for routing to the responsible Orbilect team. Identity and authority may need to be checked before information is disclosed.", "An employee must not access customer records to satisfy a privacy request independently of the authorised request-handling process.", "Orbilect SEO is a product of Orbilect Labs. Other Orbilect Labs products and services have their own applicable notices, usage rights, licences and contractual terms; this notice does not automatically authorise data sharing between products.", "Internal OS access is not a licence to reproduce or sell the platform. Organisations interested in a similar workspace should contact Orbilect Labs through https://orbilectlabs.com/.", "These requirements describe intended and required handling standards for Orbilect OS; access enforcement and implementation must be configured and verified separately in the OS application."]],
  [
    "who-we-are",
    ["Who", "we are"],
    [
      businessDescription,
      "Our New York business address is 450 Park Avenue, Suite 2800, New York, NY 10022, United States.",
      "Orbilect SEO is a brand of Orbilect Labs, whose other brands include Orbilect CX, Orbilect Reviews and Orbilect Create. This notice covers personal information handled through orbilectseo.com and related client communications. Your proposal or invoice identifies the contracting entity. The signed NDA and service agreement set out the confidentiality and service terms.",
      "For privacy questions or requests about your information, email info@orbilectseo.com. Our public contact details are also available on the Contact page."
    ]
  ],
  [
    "information",
    ["Information", "we collect"],
    [
      "When you request an audit or proposal, we collect the details you submit, such as your name, work email, phone number, website URL, selected service, and message. We may record the page or form you used so we can understand and route your enquiry.",
      "If you become a client, we may receive business and billing details, project instructions, approvals, correspondence, and materials or access you provide for the work. When you subscribe to a newsletter, we use your email address and subscription preferences to manage that subscription.",
      "Our hosting and security services may process technical information such as IP addresses, browser and device information, requested pages, timestamps, and error logs. Please avoid sending full card numbers, passwords, or sensitive personal information through a public form or ordinary email."
    ]
  ],
  [
    "sources-and-project-access",
    ["Data sources", "and access"],
    [
      "We receive information directly from you, from your authorized representatives, from the systems you connect or authorize, and from public business sources used for research or due diligence. Website and campaign work may involve data from your content management system, analytics, search or advertising accounts, CRM, or support tools. The agreed scope defines the accounts and fields we need.",
      "Where we handle information on your instructions for client work, the applicable project agreement and any data processing addendum define the parties’ roles, security duties and any permitted subcontracting. We use access for the work agreed. Use individual accounts with limited permissions or a secure access-sharing method rather than sending passwords through a form, chat or ordinary email.",
      "For staffing or careers enquiries, we may review your contact details, résumé, work samples, role availability, and related communications you provide. We use these to assess fit and communicate about the role. Use the specified application channel and leave out sensitive information unless requested through an appropriate secure process."
    ]
  ],
  [
    "investment-and-promotions",
    ["Billing", "and payment data"],
    [
      "When you request a quote, we use your contact and business details to respond and prepare the scope. We keep relevant invoice, transaction reference, amount, currency, payment date, receipt, dispute and refund records for billing, reconciliation and legal obligations.",
      standardAdvance,
      standardBalance,
      recurringSchedule,
      paymentMethods,
      "If you authorize direct debit, the payment provider handles your authorization and payment details. Our records can include the provider reference, billing schedule and authorization status. Our staff never ask for your full credit or debit card number, PIN or security code. We may confirm the last four digits of the card to match a payment or refund. Enter full card details only on the authorized processor’s payment page.",
      "Undisputed late invoices may lead to a pause or termination under the agreement. A late fee from day 32 applies only where the signed agreement specifies it and law permits it.",
      promotionalPayment,
      "Current offers include website design or redesign starting at $600 and the limited-time Starter offer starting at $500, saving $150 on the regular $650 Starter price. The written offer confirms eligibility and which invoice or term the promotional price covers. Future offers may change or end.",
      projectRefund,
      refundTiming,
      "We use the information you submit about a refund or chargeback to investigate, document the outcome and respond to the payment provider if needed. Keep your receipts and redact any unrelated financial and personal details when you send them. The Terms cover timelines, staffing cancellations, project support and third-party costs in full."
    ]
  ],
  [
    "offshore-staffing-privacy",
    ["Staffing", "and safeguards"],
    [
      "We use business contact details, job requirements, candidate assessment results and interview feedback to arrange offshore staffing, supervise delivery and coordinate handoff. Clients receive relevant shortlisted profiles and can interview and select their assigned specialist. We provide a client-shareable copy of the appointment letter with unnecessary personal data removed.",
      "For staffing, the written agreement sets an annual rate billed monthly. Early exit generally requires one month’s written notice. We use the effective end date and payment records to calculate unused prepaid staffing months and return amounts due under the agreement.",
      "Assigned staff use approved workstations at a disclosed Orbilect office. Personal phones, smartwatches, other personal electronics, pens and paper are prohibited on the production floor. These controls reduce risk and form part of our data-handling safeguards.",
      "Grant named agents only the work permissions they need. For example, a social media specialist can receive permissions to post and reply to comments while you retain control of billing and administrator settings. Use a secure invitation or access-sharing method. We remove access no longer needed and handle return or deletion under the applicable agreement and law.",
      "Where we process data on behalf of a client, we follow documented instructions and the applicable data-processing terms. Before granting offshore access, the parties identify locations and any safeguards required for international transfers."
    ]
  ],
  [
    "reviews-and-communications",
    ["Reviews", "and communications"],
    [
      "We may invite you after handoff to record an honest 30-second testimonial or send a written review. Participation is voluntary. We seek separate permission for the channels and material we may publish, such as your approved review, name, company or logo. You can contact us about withdrawing permission for future use.",
      "We use email, Zoom, Google Meet, approved social or messaging channels, and agreed project tools to communicate with clients. Your mutual NDA and service agreement set out how confidential project information may be used, shared with authorized people, returned or deleted."
    ]
  ],
  [
    "naila",
    ["Naila chat", "and reporting"],
    [
      "When you message Naila, the website sends your current message and up to 50 recent customer messages, limited to 400 characters each, to our chat endpoint to choose a reply. The current site uses a site knowledge base, a technical glossary, conversation context, and rules for replies. Adding example conversations updates our support logic and regression checks; it does not train an external language model on your messages. A signed session cookie supports chat continuity and request handling and expires after up to 24 hours. Browser storage can remember the current chat and session-related settings. An unclear question does not itself cause a persistent chat block.",
      "We keep a private record of automated chat messages and replies for support, follow-up and troubleshooting. When a chat ends, the visible conversation clears and a new session starts the next time you open it. The retention section below explains how long we keep information. Please use your agreed project channel for confidential material.",
      "You can download a transcript in your browser. If you ask us to email one, the addresses and transcript you provide are passed to our email delivery provider. If you use Naila to request a proposal, we receive the submitted contact and project details through email. Share confidential project material through your agreed project channel.",
      "If you request live help and agree to share your chat, authorized support staff can see your transcript and replies in our private inbox. You may leave a private rating and review after the agent closes the chat. We use this information to answer the enquiry and improve support. Agent ratings are separate from public reviews of our services.",
      "If optional visit tracking is enabled and you consent to analytics, we may record a visit identifier, public page path, referral origin and approximate city and country when supplied by the host. A separately configured reporting feature can count chats using a hashed chat identifier. We may use these reports to understand activity and detect misuse. These statistics have a different purpose from the delivery of a transcript you request."
    ]
  ],
  [
    "purposes",
    ["How we", "use data"],
    [
      "We use enquiry details to respond, assess your needs, and prepare an audit or proposal. For active projects, we use relevant information to deliver work, communicate about progress, manage support, issue invoices, and resolve concerns.",
      "We may also use information to maintain site security, prevent misuse, troubleshoot errors, keep business records, and comply with obligations that apply to us. We use newsletter information for the subscription you requested.",
      "Where applicable law requires a legal basis, processing may be necessary to take steps at your request or perform an agreement, meet a legal obligation, pursue legitimate business interests such as security and responding to enquiries, or act on consent. You can withdraw consent for future processing where we rely on it."
    ]
  ],
  [
    "sharing",
    ["Who receives", "your data"],
    [
      "Relevant information may be available to team members and authorized contractors working on your enquiry or project. We use service providers to operate the website and support our work. These can include Supabase for enquiry records, Resend for enquiry notifications, hosting providers, and other providers used for invoicing, project delivery, or communications.",
      "We may disclose information when required by law, to protect rights or security, or as necessary to resolve a dispute. A link to another website takes you to a service with its own privacy practices."
    ]
  ],
  [
    "platforms-and-communications",
    ["Platforms", "and providers"],
    [
      "We use Vercel hosting features where deployed there, Supabase for configured enquiry or reporting storage, and Resend for configured notifications or transcript delivery. If you contact us through WhatsApp or another social service, the platform also processes the information under its terms and privacy notices. Our project may require separate access to analytics, advertising, email, payment or design software listed or agreed in the project documents.",
      "We may use approved advertising and marketing providers for campaigns. If new tools or processing purposes are introduced, we will review the information, permissions and choices that apply, and update this policy or the relevant collection notice when required. The presence of a service name or integration on the site does not tell you that its tags or features are active on your device."
    ]
  ],
  [
    "cookies",
    ["Cookies", "and choices"],
    [
      "Cookies are small text files a website can store in your browser. They can keep a session working, remember a preference, or help a business measure how people use its website. Similar technologies can store or read information on your device.",
      "Essential storage supports requested functions such as session security or remembering your cookie choice. Our cookie control remembers your choice in browser storage and stores a preference cookie for up to 180 days. The browser preference stays saved until you change it or clear the site’s data.",
      "Analytics cookies, where used, help measure things such as which pages are visited and where errors occur. Marketing cookies, where used, can help measure advertising or tailor it. Optional analytics and marketing start disabled and are used according to your choices and applicable law. You can allow them, reject them, or choose categories individually.",
      "Use Cookie settings to change your choice. You can also clear or block cookies in your browser. Blocking essential storage may affect features that depend on it."
    ]
  ],
  [
    "newsletter",
    ["Newsletter", "and opt-outs"],
    [
      "We retain contact data to provide the requested service, maintain records and meet applicable obligations. Submitting an audit or proposal request does not subscribe you to marketing. If you opt in, we may send SEO guides, company updates and occasional offers.",
      "You can unsubscribe using the link in a marketing email or by emailing us from the address you subscribed with. We may keep a limited record of your opt-out to honor it. Essential messages about an enquiry, active project, invoice, or refund may still be sent."
    ]
  ],
  [
    "retention",
    ["Data", "retention"],
    [
      "We keep information for as long as reasonably needed for the purpose it was collected. We consider whether an enquiry or project is active, how long records are needed for support, billing or legal obligations, and whether a dispute or security issue requires preservation.",
      "We assess enquiries by whether follow-up, audit or support is outstanding. Contract, billing and payment records can be held for the applicable accounting, legal or dispute period. Marketing consent and opt-out records can be kept to document your choices. Chat and visit reporting is subject to feature configuration and operational need. You can ask about the period that applies to your record.",
      "When information is no longer needed, we delete or de-identify it as appropriate. Copies in backups may remain until those backups rotate out."
    ]
  ],
  [
    "security",
    ["Security", "and transfers"],
    [
      "We take steps designed to limit access to information and protect it in our systems. Please use the access-sharing method agreed with your project team for credentials and confidential materials.",
      staffingLocations,
      "Our team or providers may handle information in countries other than your own. Where transfer rules apply, we use the safeguards those rules require. You can contact us about how those safeguards apply to your information."
    ]
  ],
  [
    "rights",
    ["Your", "privacy rights"],
    [
      "Depending on where you live and which laws apply, you may have rights to access, correct, delete, restrict, or obtain a copy of your information, object to certain uses, or withdraw consent. You may also have the right to complain to a privacy regulator.",
      "Where legally applicable, you may also have the right to challenge how a request was handled or raise a complaint with the relevant regulator. Contact us to discuss objections to marketing or any automated processing relevant to your request.",
      "Email info@orbilectseo.com with the request and the email address you used with us. We may need to verify your identity before acting. If we need to keep some information for an obligation or dispute, we will explain the applicable limitation where we can."
    ]
  ],
  [
    "children",
    ["Children’s", "information"],
    [
      "The website and services are intended for business enquiries. If you believe a child has submitted personal information through the website, contact us so we can review it."
    ]
  ],
  [
    "changes",
    ["Policy updates", "and questions"],
    [
      "We may update this policy when our services, providers, or practices change. The current policy is published on this page. If you have questions about a change or how your information is handled, email info@orbilectseo.com."
    ]
  ]
];
const terms: readonly LegalSection[] = [
["orbilect-os", ["Orbilect OS", "acceptable use"], ["Orbilect OS is reserved for authorised Orbilect employees carrying out assigned company work. Public visitors and customers are not granted access under these website terms.", "Sign-in is limited to approved Orbilect product email accounts and requires individual authorisation. Personal email accounts and account sharing are prohibited.", "Employees may use only their own assigned identity. Credentials, recovery codes, sessions and authentication devices must not be shared or transferred.", "An approved company email address does not grant unrestricted rights to every module, account, customer or export function.", "Access is limited to the employee\u2019s current duties and permissions. Attempting to bypass role limits, impersonate colleagues or use another person\u2019s account is prohibited.", "Company and customer information may be used solely for authorised work and in accordance with client instructions, confidentiality obligations and internal procedures.", "Unauthorised screenshots, screen recordings, photographs, handwritten notes, copying, downloading, printing or exporting customer data are prohibited.", "Employees must not move company or customer records to personal devices, personal cloud accounts, messaging applications or private email without written authorisation and an approved secure method.", "Customer information must not be sold, traded, disclosed to competitors or used for personal solicitation or any unrelated purpose.", "Accessing records out of curiosity, collecting contact lists for future employment or retaining copies after authorisation ends is prohibited.", "Employees must not input customer records into unapproved AI services, browser extensions, software integrations or public collaboration tools.", "Only authorised administrators may approve exports, integrations or changes to access. An informal request from a colleague does not override security procedures.", "Any approved export must have a documented business purpose, a permitted recipient, an appropriate transfer method and an agreed retention or deletion process.", "Employees must lock unattended devices and follow the authentication, device-security and incident-reporting controls required for their role.", "Suspected compromise, mistaken access or accidental disclosure must be reported promptly through the designated internal process. Relevant evidence must be preserved.", "Records must be accurate and used responsibly. Fabricating customer activity, manipulating financial records or concealing unauthorised changes is prohibited.", "Employment ending, a role change or a revoked permission ends the corresponding right of access. Company records and access materials must be returned or removed as instructed.", "Orbilect may restrict or suspend access where reasonably necessary to investigate suspected misuse, contain an incident or protect customer information, subject to applicable obligations.", "Misuse may result in disciplinary action, including termination where lawful and justified, and recovery of losses or other remedies available under applicable law and agreements.", "Unauthorised taking or disclosure of data is a serious breach of trust. Where the facts justify it, the matter may be referred to competent authorities; any criminal penalty or regulatory fine is determined under applicable law by the relevant authority, not automatically by this policy.", "Nothing in these terms imposes an automatic employee fine, overrides employment protections or restricts legally protected reporting, whistleblowing, legal advice or disclosures required by law.", "Orbilect Labs retains its applicable rights in Orbilect OS software, interfaces, documentation and related materials, subject to third-party licences and any written agreement. Internal access grants no ownership or resale rights.", "Orbilect SEO, Orbilect OS and other Orbilect Labs products may be governed by separate licences, service terms, privacy notices and client agreements. Access to one product does not grant access to another.", "Orbilect OS is not offered for public registration through this website. Businesses seeking a similar product should contact Orbilect Labs at https://orbilectlabs.com/ for a separately agreed scope and licence.", "This public notice describes the required internal usage standards. It does not itself enable authentication, monitoring or enforcement in Orbilect OS; those controls require separate implementation in the OS project."]],
  ["naila-guidance", ["Naila", "and website examples"], [
    "Naila provides automated guidance using our published website, technical glossary, and conversation rules. It may ask a clarifying question when a request is unclear. You can continue the conversation, change the subject, request human help, or explicitly end the chat.",
    "A chat reply does not approve a discount, change a contract, confirm an audit has been performed, or create a booking unless the relevant action is actually completed and confirmed. Ask the project team to confirm availability, scope, fees, promotional eligibility, and timelines in writing.",
    "The website design gallery and cover illustrations show possible visual directions. They are not presented as completed client projects, measured client results, or fixed downloadable templates. Custom work and any integrations are defined in the accepted proposal.",
    "Published promotions may have different scopes, billing arrangements, and eligibility conditions. A conversation about an offer does not reserve or redeem it; the accepted written quote and applicable offer terms govern the purchase."
  ]],
  [
    "agreement",
    ["Your project", "agreement"],
    [
      businessDescription,
      "Orbilect SEO is a brand of Orbilect Labs. Its other brands include Orbilect CX, Orbilect Reviews and Orbilect Create. Our New York business address is 450 Park Avenue, Suite 2800, New York, NY 10022, United States.",
      "Both parties sign a mutual NDA before project work starts. All service terms are documented in our signed service agreement and any incorporated statement of work, accepted proposal or written addendum. The NDA covers confidentiality and permitted use. Your signed documents identify the contracting entity and the project-specific obligations.",
      "If an agreed project term differs from these general terms, the signed project documents govern that project to the extent permitted by applicable law. Mandatory legal rights apply."
    ]
  ],
  [
    "scope",
    ["Scope", "and approvals"],
    [
      "We agree the deliverables, milestones, client responsibilities, and fees before work begins. You agree to provide accurate information, appropriate permissions, and timely access or approvals where the work depends on them.",
      "If you request work outside the agreed scope, we will discuss its effect on cost and timing before proceeding. Delays in receiving access, materials, or approvals may require a revised schedule, which we will communicate."
    ]
  ],
  [
    "audit-and-estimates",
    ["Audits", "and estimates"],
    [
      "A free audit is a preliminary review based on the public site and information you provide. It can identify priorities in indexing, site structure and content. The full project scope, level of access, schedule and commercial terms are established in writing before paid work begins.",
      "Website copy, chatbot replies and indicative pricing are general information. If you receive an estimate or automated response, ask the project team to confirm the scope, terms and policy commitments before making a decision."
    ]
  ],
  [
    "staffing-and-delivery",
    ["Offshore", "staffing"],
    [
      staffingLocations,
      "Staffing engagements use an agreed annual rate and a 12-month staffing arrangement with monthly invoicing. The agreement identifies the employer or contracting party, supervised office, schedule, deliverables, reporting, fees, and replacement and handoff responsibilities.",
      "You can end the engagement early with at least one month’s written notice. Fees remain due for staffing delivered through the effective end date. We refund unused prepaid months after that date without a separate early-exit penalty. For example, if you prepaid 12 months and the engagement ends after month three with proper notice, we refund the nine unused months. If you pay monthly, future unused months are not billed.",
      "The exit process helps us transition the specialist and prepare your handoff. Direct refund requests and supporting receipts to refunds@orbilectseo.com. We confirm the unused period and amounts in writing."
    ]
  ],
  [
    "offshore-staffing-terms",
    ["Supervision", "and transparency"],
    [
      "We tell you which Orbilect office your specialist works from and who supervises the operation. You can interview the shortlisted candidates and make the final selection. We send a client-shareable copy of the appointment letter with personal information redacted as needed.",
      "Your designated team can communicate directly with the specialist through agreed calls and work channels. You provide authorized, task-limited access for the assignment. Staff use approved workstations. Personal phones, smartwatches, other personal electronics, pens and paper are prohibited on the production floor.",
      "The signed NDA, staffing agreement and any applicable data-processing addenda cover confidentiality, escalation, cross-border data access and the return or deletion of data. We coordinate access removal and handoff at the end of the assignment."
    ]
  ],
  [
    "campaign-and-website-accounts",
    ["Websites", "and campaigns"],
    [
      "For website projects, the scope specifies content, testing, deployment, redirects, post-launch support and whether we manage the domain or host. The client provides approvals for materials it supplies and confirms launch decisions. Third-party access, renewals, platform charges and ongoing maintenance responsibilities are set out in the project agreement.",
      "For paid media, email marketing and analytics, agree who owns accounts, approves creative and messaging, sets budgets, and reviews data permissions and campaign policies. Media spend and management fees are treated as described in the quote. Platform review, eligibility, delivery and outages can affect scheduling and performance.",
      "We rely on the legal permissions and approvals you give us for your brand assets, contact lists, content and integrations. If a project uses AI tools or automation, we agree the scope, training or reference material if relevant, approval points, limits and handoff before placing it into operation."
    ]
  ],
  [
    "fees",
    ["Fees", "and payments"],
    [
      standardAdvance,
      standardBalance,
      paymentMethods,
      chequePaymentPolicy,
      "Keep your invoices, payment confirmations and receipts so we can reconcile a payment, refund or dispute. Staff never ask for full credit or debit card numbers, PINs or security codes. We may confirm the last four digits to match a payment. Use the authorized payment provider for full card details.",
      "Promotional offers follow their own full-payment terms below. Advertising spend and approved third-party charges are itemized or otherwise disclosed in writing."
    ]
  ],
  [
    "recurring-and-late-payments",
    ["Recurring billing", "and late payment"],
    [
      recurringSchedule,
      "Where available, direct debit requires your separate authorization for the amount or calculation method and the scheduled calendar date. We communicate the next due date and any change to it under the authorization and applicable rules.",
      "Payment is due on day 30. Day 31 is the calendar day after the stated due date and is the final grace day. From day 32, a late fee can apply only if the signed agreement specifies the amount or calculation and applicable law permits it. A bona fide disputed amount is handled under the dispute process and applicable law.",
      "We may suspend or terminate affected services for unresolved nonpayment, including without additional notice where the signed agreement and applicable law allow. Any legally required notice or opportunity to remedy still applies. You remain responsible for undisputed fees already due.",
      "We may revise published prices for future work and quotes. For recurring services, we provide at least one month’s advance notice of a price change, subject to the signed agreement and applicable law. You may decline the new rate and end the recurring service on the stated notice terms without a separate early-exit penalty. Give at least one month’s written notice before ending recurring service, including staffing. Cancelling a direct debit does not settle charges already due."
    ]
  ],
  [
    "limited-time-offers",
    ["Offers", "and vouchers"],
    [
      "Current offers include website design or redesign starting at USD $600 and the limited-time Starter offer starting at USD $500, a USD $150 saving on the regular USD $650 Starter price. The written offer confirms the included work, eligibility, billing period covered by the offer, and any later regular rate.",
      promotionalPayment,
      "Discounts, vouchers and promo codes are subject to the stated eligibility, expiry and redemption limits. We can introduce, change or end offers for future purchases without prior notice. Accepted written quotes remain governed by their confirmed terms."
    ]
  ],
  [
    "remedies",
    ["Revisions", "and corrections"],
    [
      "Tell us as soon as you find a lapse, downtime or work that falls short of the agreed scope. Identify the deliverable, what you expected and any evidence. We review the issue, work toward timely delivery and quality, and agree on a correction and review date where appropriate.",
      "Depending on the issue, we may provide additional revisions, reassign the work, redeliver the affected work, reduce a fee, provide a complimentary service, or offer a discount or promo code. The agreed remedy and timeline will be confirmed in writing. Applicable rights continue to apply."
    ]
  ],
  [
    "refunds",
    ["Refund", "requests"],
    [
      projectRefund,
      "For a deliverable without credentials, the 14-day review window begins on the documented final handoff. The review period is for checking the delivered product against the agreed scope. Please tell us promptly what falls short so we can address it.",
      "Send all refund requests to refunds@orbilectseo.com with your name, company, invoice or project reference, payment receipt, affected deliverables and a short explanation. Leave full card and bank access details out of the email. Staffing prepayment refunds follow the staffing terms above. Promotional purchases follow the separate offer terms.",
      refundTiming,
      "We normally refund to the original payment method, unless the applicable rules or a documented agreement require another method."
    ]
  ],
  [
    "chargebacks",
    ["Billing", "disputes"],
    [
      "Contact refunds@orbilectseo.com about a refund or billing concern. We encourage you to give us a chance to investigate, correct the work, arrange extra revisions or resolve an invoice issue. We can still review concerns raised after the 14-day project refund window.",
      "The internal refund window does not shorten any deadline or limit any right to contact a card issuer, payment provider, regulator or court. We may respond to a chargeback with the relevant invoice, receipt and delivery records. Where we have evidence of fraud or misuse, we may seek appropriate lawful remedies in a court with jurisdiction."
    ]
  ],
  [
    "estimates",
    ["SEO estimates", "and results"],
    [
      "SEO is a continuous process. We never promise a specific number of visitors, a particular ranking or a fixed date for results. Improvements can take months and may be modest. They depend on your industry, competition, demand, site history, implementation timing and search engine changes.",
      "Slow, limited or uneven ranking or traffic gains alone do not qualify for a refund when we delivered the agreed SEO work. This does not change your rights if the work itself fell short of the written scope or applicable law requires a remedy."
    ]
  ],
  [
    "deadlines",
    ["Delivery", "and delays"],
    [
      "We aim to deliver the work by the dates we agree in writing. If a confirmed deadline is at risk, we will explain why, share the revised schedule, and tell you what we can do to reduce the impact.",
      "If we miss a confirmed deadline for reasons within our control, we will agree a suitable remedy with you in writing. Depending on the impact and project scope, this may be a percentage discount, an additional feature at no charge, or redoing affected website work at no charge. If warranted, the remedy can include redoing the website. Other rights available to you continue to apply."
    ]
  ],
  [
    "support",
    ["Project", "support"],
    [
      "We provide 12 months of complimentary bug support from handoff for in-scope websites, web apps, mobile apps and custom software. It covers reproducible defects in the delivered work against the agreed scope. New features, third-party outages, vendor changes and client modifications are handled separately unless agreed in writing.",
      "For other standard services, we may offer goodwill assistance. Any specific support period, response commitment or service-level remedy is set out in the written agreement. Applicable legal rights remain available.",
      "Use the agreed project contact and include the affected deliverable, steps to reproduce the issue and useful examples."
    ]
  ],
  [
    "access-and-ownership",
    ["Access", "and ownership"],
    [
      "Grant named staff the minimum agent-level permissions needed for their tasks. For social channels, that can mean permission to post and respond to comments while your team alone keeps ownership, administrator access, billing and recovery controls. Use a role invitation or secure access-sharing method. Review and revoke permissions that are no longer needed.",
      "Each party retains its pre-existing materials, code, trademarks and brand assets. Written authorization and the agreed scope govern permitted use. We use client brand assets only to perform authorized work. Deliverable ownership or licensing transfers according to the signed agreement. Third-party software and media retain their original license terms.",
      "Orbilect SEO’s original website copy, design, original software and media are protected by applicable copyright and other intellectual property rights. Reproduction, republication, resale or representing our protected work as your own requires written permission unless a license or law allows it. We may enforce our rights and seek applicable remedies for infringement."
    ]
  ],
  [
    "third-parties",
    ["Third-party", "tools"],
    [
      "Third-party costs, where required, are separate from our service fees unless included in the accepted quote. These can include web hosting, domain registration, Android or other app-store fees, backend databases, paid APIs, software licenses, subscriptions and media spend. We identify these charges and obtain approval where required by the agreement.",
      "After we hand over control of your accounts, you are responsible for renewal dates, billing settings, backups and keeping your hosting, domains and subscriptions active, unless you retain us under a separate maintenance agreement."
    ]
  ],
  [
    "agentic-ai-fees",
    ["Agentic AI", "fees and API charges"],
    [
      "Agentic AI development costs more than a standard chatbot. It can carry out multi-step workflows and use connected tools, which requires additional integration, safeguards and testing. Our written quote sets out the implementation fee and any agreed ongoing support or monitoring fees.",
      "If the project requires the OpenAI API, including access to ChatGPT models, or any other third-party API, the provider’s usage, subscription and licensing charges are billed separately from Orbilect SEO’s service fees. The written quote identifies known API dependencies and whether you pay the provider directly or we invoice the approved charges. Usage-based costs can vary with actual use."
    ]
  ],
  [
    "handoff-and-ending",
    ["Handoff", "and cancellation"],
    [
      "The project agreement establishes duration, renewal, cancellation, notice and the effect of an early end. Where payment, access or approval is delayed, we may agree to reschedule work or pause affected tasks under the project terms. Any outstanding amounts, handoff items and third-party commitments will be handled under the applicable agreement.",
      "The agreed handoff can include deliverables, relevant access or asset transfer, and support instructions. At project end, review account access, transfer or remove team permissions and agree how client material should be returned or retained, subject to obligations that require preservation."
    ]
  ],
  [
    "website-use",
    ["Conduct", "and complaints"],
    [
      "Use authorized channels and be courteous to our staff. Project communications may use email, Zoom, Google Meet, LinkedIn, approved social channels and other agreed project tools. Threats, harassment, bribery or improper pressure on staff to change a price are prohibited. Send genuine pricing requests through your authorized contact.",
      "We may suspend or terminate services where we have a reasonable basis to believe there is fraud, a scam, serious misconduct, a security risk or material contractual breach, subject to the signed agreement and applicable law.",
      "For a service concern, we encourage you to contact us so we can investigate and correct it. You may provide honest feedback, post lawful reviews, report concerns to authorities or use any legal remedy. Keep private credentials and protected confidential information out of public communications. Jurisdiction and dispute procedures follow the written agreement and applicable law."
    ]
  ],
  [
    "confidentiality",
    ["Mutual NDA", "and conflicts"],
    [
      "Both parties protect the other’s nonpublic business practices, work, pricing, client data, credentials, brand materials and trade secrets. Use confidential information for the agreed engagement and share it only with people who need it for that purpose and have equivalent confidentiality obligations. Take reasonable steps to secure it and return or delete it as agreed when the work ends.",
      "Typical NDA exceptions cover information already lawfully known, independently developed, lawfully received without a duty of confidentiality, made public without breach, or required to be disclosed by law. The NDA sets the confidentiality term, permitted disclosures, handling of compelled disclosures and which duties continue after the engagement.",
      "Disclose any actual or potential conflict involving a direct competitor before sharing project information or assigning overlapping work. Any engagement-specific exclusivity applies only as expressly defined and accepted in writing, subject to applicable law."
    ]
  ],
  [
    "testimonials",
    ["Feedback", "and testimonials"],
    [
      "After handoff, we may ask for an honest 30-second video about your experience. A written review is equally welcome, and either is voluntary. We will ask for separate permission before publishing your feedback, name or approved brand assets on our website or other agreed channels.",
      "Your feedback or permission to publish it does not affect delivery, credential handoff, support, refunds or your right to complain."
    ]
  ],
  [
    "privacy-and-updates",
    ["Privacy", "and updates"],
    [
      "Our Privacy Policy explains how we handle enquiries, use cookies, and manage newsletter subscriptions. You can opt out of marketing emails through the unsubscribe option or by emailing us from the subscribed address.",
      "Updates to these website terms apply as stated when published. Changes to an existing project agreement follow the process in that agreement."
    ]
  ]
];

function linkedText(text: string) {
  return text.split(/(refunds@orbilectseo\.com|info@orbilectseo\.com)/g).map((part, index) =>
    part.includes("@orbilectseo.com")
      ? <a key={index} href={"mailto:" + part}>{part}</a>
      : part
  );
}

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const sections = isPrivacy ? privacy : terms;
  return (
    <main className={articleStyles.page + " " + styles.page}>
      <PageStructuredData route={isPrivacy ? "/privacy-policy" : "/terms-and-conditions"} />
      <LegalHero isPrivacy={isPrivacy} />
      <p className={styles.reviewed}>Updated <time dateTime="2026-11-22">22 November 2026</time></p>
      <div className={articleStyles.layout}>
        <ArticleSidebar
          contentsLabel="On this page"
          sections={sections.map(([id, title]) => ({ id, title: title.join(" ") }))}
        />
        <div className={styles.copy}>
          {sections.map(([id, [lead, accent], paragraphs]) => (
            <section id={id} key={id} aria-labelledby={id + "-title"}>
              <h2 data-site-heading="" id={id + "-title"} data-orbilect-title="">{lead} <span>{accent}</span></h2>
              {id === "fees" && <AcceptedPayments />}
              {paragraphs.map(paragraph => paragraph === chequePaymentPolicy
                ? <p key={paragraph} className={styles.chequeNotice}><strong>{paragraph}</strong></p>
                : <p key={paragraph}>{linkedText(paragraph)}</p>)}
              {(id === "who-we-are" || id === "agreement") && (
                <>
                  <p>
                    Orbilect SEO provides services worldwide. We agree meeting
                    times, delivery dates, and project-specific response times
                    with you in your preferred time zone.
                  </p>
                  <p>Orbilect Labs also lists the following business locations.</p>
                  <ul aria-label="Orbilect Labs international business addresses">
                    {orbilectGlobalAddresses.map(([country, address]) => (
                      <li key={country}><strong>{country}</strong> — {address}</li>
                    ))}
                  </ul>
                </>
              )}
              {id === "estimates" && <p><a href="https://developers.google.com/search/docs/fundamentals/do-i-need-seo">Read Google Search Central’s guide to hiring an SEO</a>.</p>}
              {id === "investment-and-promotions" && <p><Link href="/terms-and-conditions#fees">Read the full payment terms</Link>.</p>}
              {id === "reviews-and-communications" && <p><Link href="/terms-and-conditions#confidentiality">Read the mutual NDA and confidentiality terms</Link>.</p>}
              {id === "orbilect-os" && <p><a href="https://orbilectlabs.com/" target="_blank" rel="noopener noreferrer">Contact Orbilect Labs about a similar internal workspace</a>.</p>}
              {id === "cookies" && <CookieSettingsButton />}
              {id === "newsletter" && <a href="mailto:info@orbilectseo.com?subject=Unsubscribe%20from%20Orbilect%20SEO">Unsubscribe by email</a>}
              {id === "privacy-and-updates" && <Link href="/privacy-policy">Read the Privacy Policy</Link>}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
