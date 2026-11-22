import { articleSchema, blogPath, blogSeo } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import HeroAudit from "@/components/lead-panel/hero-audit";
import { OrbilectHeroBrand } from "../../contact/contact-hero";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "@/components/optimized-image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPublicationDate, getPublishedPosts } from "../blog-data";
import { ArticleSidebar, TypeTitle } from "../what-is-search-engine-optimization/article-client";
import GuideBody, { expansionSections } from "../guide-body";
import { findPublishedGuide, getPublishedGuides } from "../published-guides";
import styles from "../what-is-search-engine-optimization/article.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedGuides().map(({ post }) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = findPublishedGuide((await params).slug);
  if (!entry) notFound();
  return blogSeo(entry.post);
}

const linkedin = process.env.NEXT_PUBLIC_ORBILECT_LINKEDIN ?? "https://www.linkedin.com/company/orbilect-seo/";
const x = process.env.NEXT_PUBLIC_ORBILECT_X ?? "https://x.com/orbilectseo";

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const entry = findPublishedGuide(slug);
  if (!entry) notFound();
  const { post, guide, expansion } = entry;
  const posts = getPublishedPosts();

  const relatedTopics = guide.related.flatMap(id => posts.find(topic => topic.slug === id) ?? []);
  const sections = [
    ...guide.sections.map(({ id, lead, accent }) => ({ id, title: lead + " " + accent })),
    ...expansionSections(expansion),
  ];
  const words = post.title.split(" ");
  const split = Math.ceil(words.length / 2);
  const lead = words.slice(0, split).join(" ");
  const accent = words.slice(split).join(" ");

  return (
    <main className={styles.page}>
      <SeoJsonLd data={{ ...articleSchema(post), dateModified: "2026-11-22", citation: expansion.sources.map(([name, url]) => ({ "@type": "CreativeWork", name, url })) }} />
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.brand}><OrbilectHeroBrand /></div>
            <p className={styles.eyebrow}>{post.category}</p>
            <h1 aria-label={post.title}><span aria-hidden="true">{lead} <TypeTitle words={accent} /></span></h1>
            <p className={styles.deck}>{post.summary}</p>
            <div className={styles.byline}><div><strong>{post.author.name}</strong><span>{post.author.role}</span></div>
              <time dateTime={post.publishedAt}>{formatPublicationDate(post.publishedAt)}</time>
              <span>Updated <time dateTime="2026-11-22">22 November 2026</time></span>
            </div>
            <HeroAudit source="blog-hero-audit" />
          </div>
          {post.cover && <figure className={styles.cover}>
            <div className={styles.coverOrbit} aria-hidden="true" />
            <Image src={post.cover.src} alt={post.cover.alt}
              width={1600} height={900} sizes="(max-width: 900px) 90vw, 45vw" priority />
          </figure>}
        </div>
      </header>

      <div className={styles.layout}>
        <ArticleSidebar sections={sections} linkedin={linkedin} x={x} />
        <article className={styles.prose} aria-label={post.title}><GuideBody guide={guide} expansion={expansion} related={relatedTopics} /></article>
      </div>

      <section className={styles.related} aria-labelledby="related-seo">
        <div className={styles.wrap}>
          <p className={styles.relatedLabel}>Related articles</p>
          <h2 id="related-seo">Keep <span>learning</span></h2>
          <p className={styles.relatedIntro}>Explore related guides for your next step.</p>
          <ul>
            {relatedTopics.map(topic => (
              <li key={topic.slug}>
                <Link className={styles.relatedCard}
                  href={blogPath(topic.slug)}>
                  {topic.cover && (
                    <Image className={styles.relatedImage} src={topic.cover.src} alt=""
                      width={1600} height={900}
                      sizes="(max-width: 560px) 90vw, (max-width: 850px) 45vw, 25vw" />
                  )}
                  <div className={styles.relatedBody}>
                    <p>{topic.category}</p>
                    <h3>{topic.title}</h3>
                    <p>{topic.summary}</p>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="seo-contact">
        <div className={styles.wrap}>
          <div>
            <h2 id="seo-contact">Want help with <span>SEO for your brand?</span></h2>
            <p>Send us your website and the questions you have about SEO. Tell us what you want to improve, whether that’s local visibility, ecommerce sales, or better-qualified enquiries.</p>
          </div>
          <div className={styles.ctaArt} aria-hidden="true">
            <span><ArrowUpRight size={28} /></span>
          </div>
          <Link className={styles.newsroomButton} href={"/contact?request=" + encodeURIComponent(post.title) + "#request-proposal"} data-orbilect-cta="white">
            <span data-orbilect-cta-icon="" aria-hidden="true" />
            Contact us about SEO
          </Link>
        </div>
      </section>
    </main>
  );
}
