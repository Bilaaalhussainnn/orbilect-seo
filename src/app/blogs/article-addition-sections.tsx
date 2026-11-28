import type { ArticleAdditionSection } from "./article-additions";
import styles from "./what-is-search-engine-optimization/article.module.css";

export default function ArticleAdditionSections({ sections }: { sections: ArticleAdditionSection[] }) {
  return sections.map(({ id, title, paragraphs, sources }) => {
    const split = title.lastIndexOf(" ");
    return <section key={id} aria-labelledby={id}>
      <h2 id={id}>{title.slice(0, split)} <span>{title.slice(split + 1)}</span></h2>
      {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <p className={styles.source}>{sources.map(([label, url]) => <a key={url} href={url}>{label}</a>)}</p>
    </section>;
  });
}
