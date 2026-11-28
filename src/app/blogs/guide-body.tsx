import Image from "@/components/optimized-image";
import Link from "next/link";
import styles from "./what-is-search-engine-optimization/article.module.css";
import guideStyles from "./guide-visuals.module.css";
import ArticleAdditionSections from "./article-addition-sections";
import type { ArticleAdditionSection } from "./article-additions";

type Entry = string[];
type GuideSection = { id: string; lead: string; accent: string; paragraphs: string[] };

export type Guide = {
  sections: GuideSection[];
  related: string[];
  checks: [string, string][];
  sources: string[];
};

export type GuideExpansion = {
  sections: { heading: string; paragraphs: string[] }[];
  referenceImages?: { src: string; width: number; height: number; title: string; alt: string; caption: string; source: string[] }[];
  deepDive?: { id: string; title: string; paragraphs: string[] }[];
  editorialAdditions?: ArticleAdditionSection[];
  example: { heading: string; paragraphs: string[] };
  flow: { caption: string; steps: Entry[] };
  comparison: { caption: string; headings: string[]; rows: Entry[] };
  questions: Entry[];
  sources: Entry[];
  walkthrough?: {
    section: number;
    title: string;
    frames: { screen: string; fields: Entry[]; action: string; note: string }[];
    screenshot?: { src: string; width: number; height: number; alt: string; caption: string; source: Entry };
  }[];
  code?: { section: number; label: string; text: string };
  contact?: string;
};

export function expansionSections(expansion: GuideExpansion) {
  return [...(expansion.deepDive ?? []).map(({ id, title }) => ({ id, title })),
    ...(expansion.editorialAdditions ?? []).map(({ id, title }) => ({ id, title })),
    { id: "worked-example", title: expansion.example.heading },
    { id: "common-questions", title: "Common questions" },
    { id: "implementation-checks", title: "What to check next" }];
}

function Walkthrough({ panel }: { panel: NonNullable<GuideExpansion["walkthrough"]>[number] }) {
  const { screenshot } = panel;
  return (
    <figure className={styles.figure}>
      <figcaption>{panel.title}</figcaption>
      <p>Illustrated interface walkthrough with example data. Labels and available options may vary by account.</p>
      <ol className={guideStyles.frames}>
        {panel.frames.map(({ screen, fields, action, note }) => (
          <li key={screen + action}>
            <div className={guideStyles.screen}>
              <strong className={guideStyles.screenHeader}>{screen}</strong>
              <dl>{fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              <strong className={guideStyles.action}>{action}</strong>
            </div>
            <p>{note}</p>
          </li>
        ))}
      </ol>
      {screenshot && (
        <div className={guideStyles.screenshot}>
          <Image src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height}
            sizes="(max-width: 900px) 85vw, 720px" unoptimized />
          <p>{screenshot.caption} <a href={screenshot.source[1]}>{screenshot.source[0]}</a>.</p>
        </div>
      )}
    </figure>
  );
}

export default function GuideBody({ guide, expansion, related }: {
  guide: Guide;
  expansion: GuideExpansion;
  related: { slug: string; title: string }[];
}) {
  const { comparison, example } = expansion;
  const split = example.heading.lastIndexOf(" ");
  return <>
    {guide.sections.map(({ id, lead, accent, paragraphs }, index) => (
      <section key={id} aria-labelledby={id}>
        <h2 id={id}>{lead} <span>{accent}</span></h2>
        {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <h3>{expansion.sections[index].heading}</h3>
        {expansion.sections[index].paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {index === 0 && (
          <figure className={styles.figure}>
            <figcaption>{expansion.flow.caption}</figcaption>
            <ol className={`${styles.process} ${guideStyles.flow}`}>
              {expansion.flow.steps.map(([title, detail]) => (
                <li key={title}><strong>{title}</strong><span>{detail}</span></li>
              ))}
            </ol>
          </figure>
        )}
        {expansion.walkthrough?.filter(panel => panel.section === index).map(panel => <Walkthrough key={panel.title} panel={panel} />)}
        {expansion.code?.section === index && (
          <figure className={styles.figure}>
            <figcaption>{expansion.code.label}</figcaption>
            <pre className={guideStyles.code} tabIndex={0}><code>{expansion.code.text}</code></pre>
          </figure>
        )}
        {related[index] && <p className={styles.source}>
          <Link href={"/blogs/" + related[index].slug}>{related[index].title}</Link>
        </p>}
      </section>
    ))}
    {expansion.referenceImages?.map(image => <figure key={image.src} className={styles.figure}>
      <figcaption>{image.title}</figcaption>
      <div className={guideStyles.screenshot}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 900px) 85vw, 720px" unoptimized />
        <p>{image.caption} Source: <a href={image.source[1]}>{image.source[0]}</a>.</p>
      </div>
    </figure>)}
    {expansion.deepDive?.map(section => {
      const split = section.title.lastIndexOf(" ");
      return <section key={section.id} aria-labelledby={section.id}>
        <h2 id={section.id}>{section.title.slice(0, split)} <span>{section.title.slice(split + 1)}</span></h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>;
    })}
    <ArticleAdditionSections sections={expansion.editorialAdditions ?? []} />
    <section aria-labelledby="worked-example">
      <h2 id="worked-example">{example.heading.slice(0, split)} <span>{example.heading.slice(split + 1)}</span></h2>
      {example.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <div className={styles.tableWrap} role="region" aria-label={comparison.caption} tabIndex={0}>
        <table>
          <caption>{comparison.caption}</caption>
          <thead><tr>{comparison.headings.map(heading => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
          <tbody>{comparison.rows.map(([label, ...cells]) => (
            <tr key={label}><th scope="row">{label}</th>{cells.map((cell, index) => <td key={comparison.headings[index + 1]}>{cell}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    </section>
    <section aria-labelledby="common-questions">
      <h2 id="common-questions">Common <span>questions</span></h2>
      {expansion.questions.map(([question, answer]) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}
    </section>
    <section aria-labelledby="implementation-checks">
      <h2 id="implementation-checks">What to <span>check next</span></h2>
      <figure className={styles.figure}>
        <figcaption>Practical review checklist</figcaption>
        <ul className={styles.process}>
          {guide.checks.map(([label, check]) => (
            <li key={label}><strong>{label}</strong><span>{check}</span></li>
          ))}
        </ul>
      </figure>
      <h3>Further reading and official documentation</h3>
      <ul className={guideStyles.references}>
        {expansion.sources.map(([label, url]) => <li key={url}><a href={url}>{label}</a></li>)}
      </ul>
      {expansion.contact && <p><strong>{expansion.contact}</strong> <Link href="/contact#request-proposal">Contact Orbilect SEO</Link>.</p>}
    </section>
  </>;
}
