import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    "question": "What does Ecommerce SEO cover?",
    "answer": "We work on collections, product pages, internal links, filters, variants, and relevant technical checks. We prioritize the catalogue around your business goals."
  },
  {
    "question": "Can you work on Shopify or WooCommerce?",
    "answer": "Yes. We review the platform and theme before agreeing on changes, including which edits your team or developer needs to make."
  },
  {
    "question": "Should we optimize products or collections first?",
    "answer": "It depends on how shoppers search. Broader demand often needs a collection, while a specific model or product name usually needs a product page."
  },
  {
    "question": "Can you help with duplicate product URLs?",
    "answer": "We trace variants, filters, and collection paths, then recommend which URLs should be preferred and how navigation should point to them."
  },
  {
    "question": "What should we do when a product is out of stock?",
    "answer": "We consider whether it will return, whether it has a useful replacement, and what visitors need to know before recommending a page change."
  },
  {
    "question": "Do we need to rewrite every product description?",
    "answer": "We start with priority products and reusable template improvements. Original fit, compatibility, and use details often matter more than adding length everywhere."
  },
  {
    "question": "Does product schema guarantee enhanced search results?",
    "answer": "It can help eligible pages qualify for supported search features. The search engine decides what to display."
  },
  {
    "question": "Can you preserve visibility during a store migration?",
    "answer": "We map important category and product URLs, verify redirects, check key templates, and monitor the new storefront after launch."
  },
  {
    "question": "How do you measure the work?",
    "answer": "We review relevant impressions, clicks, organic landing pages, and tracked orders or revenue, taking stock and promotional periods into account."
  },
  {
    "question": "Do you also help with Shopping ads?",
    "answer": "Yes, when campaign management is in scope. We track paid media separately and can use campaign insights to inform collection and product priorities."
  }
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>Ecommerce SEO</span><br />frequently asked questions</h2>
          <div className={styles.introCard}>
            <h3>{"Before we start your project"}</h3>
            <p>Find out which pages we work on, how changes get published, and how we measure the result.</p>
          </div>
        </div>
        <div className={styles.questions}>
          {faqs.map(({ question, answer }, index) => (
            <details key={question} name="on-page-seo-faq" open={index === 0}>
              <summary>{question}<span className={styles.toggle} aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
