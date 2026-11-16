import { articleSchema, blogPath, blogSeo } from "@/lib/orbilect-search";
import SeoJsonLd from "@/components/seo/json-ld";
import HeroAudit from "@/components/lead-panel/hero-audit";
import { OrbilectHeroBrand } from "../../contact/contact-hero";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPublicationDate, getPublishedPosts, seoGuideSlug, topics } from "../blog-data";
import { ArticleSidebar, TypeTitle } from "./article-client";
import { related, sections, SeoGuide } from "./seo-guide";
import styles from "./article.module.css";

const post = getPublishedPosts().find(item => item.slug === seoGuideSlug);
if (!post) throw new Error("SEO guide is missing from the published blog records.");

export const metadata = blogSeo(post, "Learn what SEO is, how search engines work, and how to improve your website’s visibility with technical SEO, useful content, links, images, and measurement.");

const linkedin = process.env.NEXT_PUBLIC_ORBILECT_LINKEDIN ?? "https://www.linkedin.com/company/orbilect-seo/";
const x = process.env.NEXT_PUBLIC_ORBILECT_X ?? "https://x.com/orbilectseo";

export default function SeoGuidePage() {
  if (!post) return null;
  const published = new Set(getPublishedPosts().map(item => item.slug));
  const relatedTopics = related.flatMap(title => topics.find(topic => topic.title === title) ?? []);

  return (
    <main className={styles.page}>
      <SeoJsonLd data={articleSchema(post)} />
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.brand}><OrbilectHeroBrand /></div>
            <p className={styles.eyebrow}>{post.category}</p>
            <h1 aria-label={post.title}><span aria-hidden="true">What Is <TypeTitle words="Search Engine Optimization?" /></span></h1>
            <p className={styles.deck}>Learn how search engines find your site, what makes a page worth visiting, and where to start if you want to bring in more qualified customers.</p>
            <div className={styles.byline}><div><strong>{post.author.name}</strong><span>{post.author.role}</span></div>
              <time dateTime={post.publishedAt}>{formatPublicationDate(post.publishedAt)}</time>
            </div>
            <HeroAudit source="blog-hero-audit" />
          </div>
          {post.cover && <figure className={styles.cover}>
            <div className={styles.coverOrbit} aria-hidden="true" />
            <Image src={post.cover.src} alt={post.cover.alt || "Search results illustrated with a magnifying glass"}
              width={1600} height={900} sizes="(max-width: 900px) 90vw, 45vw" priority />
          </figure>}
        </div>
      </header>

      <div className={styles.layout}>
        <ArticleSidebar sections={sections} linkedin={linkedin} x={x} />
        <article className={styles.prose} aria-label={post.title}><SeoGuide /></article>
      </div>

      <section className={styles.related} aria-labelledby="related-seo">
        <div className={styles.wrap}>
          <p className={styles.relatedLabel}>Related articles</p>
          <h2 id="related-seo">Keep learning about <span>SEO</span></h2>
          <p className={styles.relatedIntro}>Set up Search Console, submit your sitemap, and check what could be keeping your pages out of search.</p>
          <ul>
            {relatedTopics.map(topic => (
              <li key={topic.slug}>
                <Link className={styles.relatedCard}
                  href={published.has(topic.slug) ? blogPath(topic.slug) : "/blogs#" + topic.slug}>
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
          <Link className={styles.newsroomButton} href="/contact?request=SEO%20for%20my%20brand#request-proposal" data-orbilect-cta="white">
            <span data-orbilect-cta-icon="" aria-hidden="true" />
            Contact us about SEO
          </Link>
        </div>
      </section>
    </main>
  );
}
