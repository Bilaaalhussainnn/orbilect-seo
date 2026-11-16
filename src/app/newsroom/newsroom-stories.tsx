import HeroAudit from "@/components/lead-panel/hero-audit";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stories, type Story } from "./stories";
import styles from "./newsroom.module.css";

function StoryImage({ story, sizes }: { story: Story; sizes: string }) {
  return (
    <figure className={styles.figure}>
      <Image src={`/newsroom/${story.slug}.png`} alt={story.alt}
        width={1536} height={1024} sizes={sizes} />
    </figure>
  );
}

export function NewsroomStories() {
  return (
    <section className={styles.section} aria-labelledby="product-news">
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} data-site-eyebrow="">Orbilect Labs product news</p>
          <h2 id="product-news">Inside the <span>products we build</span></h2>
          <p>Explore the problems our teams are working on, from business operations and customer support to reviews and website creation.</p>
        </header>
        <div className={styles.grid}>
          {stories.map((story) => (
            <article key={story.slug} className={styles.card}>
              <Link className={styles.cardLink} href={`/newsroom/${story.slug}`}>
                <StoryImage story={story} sizes="(max-width: 640px) 90vw, (max-width: 1020px) 45vw, 360px" />
                <div className={styles.cardCopy}>
                  <p className={styles.category}>{story.category}</p>
                  <h3>{story.title}</h3>
                  <p>{story.summary}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={18} /></span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoryPage({ story }: { story: Story }) {
  return (
    <main className={styles.article}>
      <header className={styles.articleHero}>
        <div className={styles.wrap}>
          <Link className={styles.back} href="/newsroom">← Back to Newsroom</Link>
          <p className={styles.eyebrow}>{story.category}</p>
          <h1>{story.title}</h1>
          <p className={styles.dek}>{story.summary}</p>
          <HeroAudit />
        </div>
      </header>
      <div className={styles.articleBody}>
        <StoryImage story={story} sizes="(max-width: 850px) 92vw, 850px" />
        {story.sections.map(([heading, copy]) => (
          <section className={styles.chapter} key={heading}>
            <h2>{heading}</h2>
            <p>{copy}</p>
          </section>
        ))}
        <div className={styles.articlePress}>
          <strong>Media enquiries</strong>
          <a href="mailto:mediapr@orbilectseo.com">mediapr@orbilectseo.com</a>
        </div>
      </div>
    </main>
  );
}
