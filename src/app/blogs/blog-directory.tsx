"use client";

import { useState } from "react";
import Image from "@/components/optimized-image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon, Search } from "lucide-react";
import { categories, formatPublicationDate, getPublishedPosts, topics } from "./blog-data";
import type { PublishedPost, Topic } from "./blog-data";
import styles from "./blog-directory.module.css";

const readingPaths = [
  { category: "SEO & Search", title: "Get found in search", detail: "Set up Google Search Console, check indexing, and improve your Google Business Profile." },
  { category: "Website Tutorials", title: "Build or launch a website", detail: "Compare hosting and follow setup guides for WordPress, Webflow, Shopify, and other platforms." },
  { category: "Paid Media & CRO", title: "Improve campaigns and conversions", detail: "Review ad spend, find where landing pages lose visitors, and check whether leads are tracked accurately." },
  { category: "Industry & Business", title: "Apply SEO to your industry", detail: "See how clinics, real estate businesses, SaaS teams, and online stores approach search and marketing." },
  { category: "AI & Automation", title: "Put AI to work", detail: "Explore support chatbots, keyword research, appointment booking, and where human review fits." },
  { category: "Tech News & Digital Marketing", title: "Keep up with platform changes", detail: "Understand what search updates, privacy changes, and new discovery habits mean for your marketing." },
] satisfies { category: (typeof categories)[number]; title: string; detail: string }[];

const featured = [topics[0], topics[1], topics[7]];

function BlogCard({ topic, post, compact = false }: { topic: Topic; post?: PublishedPost; compact?: boolean }) {
  const href = post ? "/blogs/" + post.slug : undefined;
  const words = (post?.title ?? topic.title).split(" ");
  const split = Math.max(1, Math.floor(words.length / 2));
  const title = <>{words.slice(0, split).join(" ")}{" "}<span>{words.slice(split).join(" ")}</span></>;
  return (
    <article id={topic.slug} className={styles.card} style={{ scrollMarginTop: "8rem" }}>
      <div className={styles.cover} aria-hidden={topic.cover ? undefined : true}>
        {topic.cover ? (
          <Image
            src={topic.cover.src}
            alt={topic.cover.alt}
            fill
            sizes={compact ? "(max-width: 610px) calc(100vw - 3rem), 315px" : "(max-width: 620px) 90vw, (max-width: 950px) 45vw, 30vw"}
          />
        ) : (
          <ImageIcon size={30} strokeWidth={1.5} />
        )}
      </div>
      <p className={styles.category}>{topic.category}</p>
      <h3 className={styles.articleTitle}>
        {href ? <Link href={href} className={styles.articleTitleLink}>{title}</Link> : title}
      </h3>
      <p className={styles.summary}>{topic.summary}</p>
      {href && (
        <div className={styles.articleAction}>
          <Link href={href} data-orbilect-cta="blue" aria-label={post ? "Read " + post.title : undefined}>
            <span data-orbilect-cta-icon="" aria-hidden="true" />
            Read this blog
          </Link>
        </div>
      )}
      <div className={styles.meta}>
        <div><strong>{topic.author.name}</strong><span>{topic.author.role}</span></div>
        {post ? (
          <time dateTime={post.publishedAt}>{formatPublicationDate(post.publishedAt)}</time>
        ) : (
          <span className={styles.previewDate}>Coming soon</span>
        )}
      </div>
    </article>
  );
}

export function HomeBlogCards() {
  const recent = getPublishedPosts().slice(0, 4);
  return (
    <div className={styles.homeGrid}>
      {recent.map(post => <BlogCard key={post.slug} topic={post} post={post} compact />)}
      {featured.filter(topic => !recent.some(post => post.slug === topic.slug))
        .slice(0, 4 - recent.length)
        .map(topic => <BlogCard key={topic.slug} topic={topic} compact />)}
    </div>
  );
}

export function BlogDirectory() {
  const [category, setCategory] = useState<(typeof categories)[number] | "All">("All");
  const [query, setQuery] = useState("");
  const published = getPublishedPosts();
  const posts = new Map(published.map(post => [post.slug, post]));
  const catalogue = [...published, ...topics.filter(topic => !posts.has(topic.slug))];
  const search = query.trim().toLowerCase();
  const results = catalogue.filter(topic =>
    (category === "All" || category === topic.category) &&
    [topic.title, topic.summary, topic.author.name].some(text => text.toLowerCase().includes(search))
  );

  return (
    <>
      <section className={styles.readingIntro} aria-labelledby="blog-intro-title">
        <div className={styles.readingLayout}>
          <div className={styles.readingLead}>
            <header>
              <p className={styles.libraryLabel}>Guides and tutorials</p>
              <h2 id="blog-intro-title">What you’ll <span>learn here</span></h2>
            </header>
            <p>Start with a question about your website or marketing. Our guides walk you through the setup, explain what can go wrong, and show what to check after making a change.</p>
            <div className={styles.readingTip}>
              <strong>Working on your first website?</strong>
              <p>Start with Website Tutorials for the build. Then use SEO &amp; Search to verify your site, submit a sitemap, and check whether your key pages can appear in search.</p>
            </div>
          </div>
          <ul className={styles.readingGrid}>
            {readingPaths.map(({ category: topic, title, detail }) => (
              <li key={topic}>
                <a href="#blog-library-heading" className={styles.readingLink} onClick={() => {
                  setCategory(topic);
                  setQuery("");
                  document.getElementById("blog-library-heading")?.focus({ preventScroll: true });
                }}>
                  <span><strong>{title}</strong><span>{detail}</span></span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="blog-library" className={styles.section} aria-labelledby="blog-library-heading">
      <div className={styles.wrap}>
        <header className={styles.libraryHeading}>
          <p className={styles.libraryLabel}>Browse by topic</p>
          <h2 id="blog-library-heading" tabIndex={-1}>Explore the <span>blog library</span></h2>
        </header>
        <p className={styles.intro}>Find tutorials, technical explainers, industry coverage, and practical marketing advice.</p>
        <div className={styles.controls}>
          <div className={styles.filters} role="group" aria-label="Filter by category">
            {(["All", ...categories] as const).map(item => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <label className={styles.search}>
            <Search size={18} aria-hidden="true" />
            <input type="search" aria-label="Search the blog library" placeholder="Search topics or authors"
              value={query} onChange={event => setQuery(event.target.value)} />
          </label>
        </div>
        <p className={styles.count} aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</p>
        {results.length ? (
          <div className={styles.grid}>
            {results.map(topic => <BlogCard key={topic.slug} topic={topic} post={posts.get(topic.slug)} />)}
          </div>
        ) : (
          <p className={styles.empty}>No matching topics. <button type="button" onClick={() => { setCategory("All"); setQuery(""); }}>Clear filters</button></p>
        )}
        <a className={styles.top} href="#blog-library">Back to filters <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
    </>
  );
}
