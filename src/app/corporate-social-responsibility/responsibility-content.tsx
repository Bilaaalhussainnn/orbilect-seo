import ResponsibilityReveal from "./responsibility-reveal";
import styles from "./responsibility-content.module.css";

const sections = [
  {
    "id": "business-ethics",
    "label": "Corporate social responsibility",
    "title": "Our values and",
    "accent": "business ethics",
    "intro": "At Orbilect SEO, we believe trust comes from how we work. We explain our recommendations, take ownership of our commitments, and report what the evidence shows.",
    "cards": [
      [
        "Integrity in our work",
        "We set realistic expectations for SEO, explain what goes into our recommendations, and report progress honestly."
      ],
      [
        "Fair and lawful conduct",
        "We are committed to following applicable laws and regulations in the markets where we operate and honoring the agreements we make."
      ],
      [
        "Responsible use of information",
        "We handle client and employee information with care, limit access to those who need it, and use it for legitimate business purposes."
      ]
    ]
  },
  {
    "id": "corporate-governance",
    "label": "Accountability and oversight",
    "title": "Corporate",
    "accent": "governance",
    "intro": "Corporate governance defines who makes decisions, how those decisions are reviewed, and who follows through. We are dedicated to making that accountability clear in our client work, internal operations, and business relationships.",
    "cards": [
      [
        "Clear ownership",
        "Assign responsibility for commitments, reviews, and follow-up so people know who to turn to when an issue needs attention."
      ],
      [
        "Thoughtful oversight",
        "Consider conflicts of interest, data access, and supplier risks before making decisions that affect clients, employees, or partners."
      ],
      [
        "Follow-through on concerns",
        "Take concerns seriously, review what happened, and communicate the next steps to the people affected."
      ]
    ]
  },
  {
    "id": "stakeholders",
    "label": "Our responsibilities",
    "title": "Our commitment",
    "accent": "to stakeholders",
    "intro": "Our work affects the people who hire us, work with us, and use the websites we help improve. We listen to their feedback and consider it when making decisions.",
    "cards": [
      [
        "Clients",
        "Agree on what we’ll deliver and when, explain changes early, and make reports easy to understand."
      ],
      [
        "Employees",
        "Treat people fairly, support professional development, and give employees a way to raise concerns and be heard."
      ],
      [
        "Partners and suppliers",
        "Set clear terms, respect agreements, and communicate promptly when decisions affect our work together."
      ],
      [
        "Communities",
        "Help make online information easier to find, understand, and use through accessible design and clear content."
      ]
    ]
  }
];

export default function ResponsibilityContent() {
  return sections.map(({ id, label, title, accent, intro, cards }) => (
    <section key={id} className={id === "corporate-governance" ? styles.dark : styles.light}
      aria-labelledby={id}>
      <div className={styles.inner}>
        <ResponsibilityReveal />
        <header className={styles.heading}>
          <p className={styles.label}>{label}</p>
          <h2 id={id}>{title} <span>{accent}</span></h2>
          <p className={styles.intro}>{intro}</p>
        </header>
        <ul className={styles.cards}>
          {cards.map(([heading, copy]) => (
            <li key={heading}>
              <h3>{heading}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ));
}
