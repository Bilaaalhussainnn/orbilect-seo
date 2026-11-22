import { pageSeo } from "@/lib/orbilect-search";
import editorialType from "../editorial-index.module.css";
import IndustryBrief from "./industry-brief";
import newsStyles from "./newsroom.module.css";
import { NewsroomStories } from "./newsroom-stories";
import type { Metadata } from "next";
import CorporatePage from "../_components/corporate-pages/corporate-page";

const content = {
  "label": "Newsroom",
  "title": [
    "News from",
    "Orbilect SEO"
  ],
  "description": "Find company announcements, service updates, and perspectives from the Orbilect SEO team.",
  "sectionLabel": "News and announcements",
  "sectionTitle": [
    "What you’ll find",
    "in our newsroom"
  ],
  "topics": [
    {
      "title": "Company announcements",
      "copy": "Find official statements and updates about Orbilect SEO as the agency develops."
    },
    {
      "title": "Service updates",
      "copy": "See what’s changing across our SEO, digital marketing, and website services, and what those changes mean for clients."
    },
    {
      "title": "Research and perspectives",
      "copy": "Read our perspectives on search visibility, customer journeys, and the work behind them."
    }
  ],
  "action": {
    "label": "Media & PR relations",
    "href": "/media-pr-relations"
  }
} as const;

const seoBaseMetadata: Metadata = {
  title: content.label,
  description: content.description,
};

export default function Page() {
  return <div className={editorialType.index}>{<CorporatePage route="/newsroom" content={content}>
      <section className={newsStyles.intro} aria-labelledby="newsroom-introduction">
        <div className={newsStyles.wrap}>
          <header className={newsStyles.heading}>
            <p className={newsStyles.eyebrow} data-site-eyebrow="">{content.sectionLabel}</p>
            <h2 id="newsroom-introduction">
              {content.sectionTitle[0]} <span>{content.sectionTitle[1]}</span>
            </h2>
          </header>
          <div className={`${newsStyles.grid} ${newsStyles.introTopics}`}>
            {content.topics.map(({ title, copy }) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <NewsroomStories />
    </CorporatePage>}<IndustryBrief /></div>;
}


// Orbilect search metadata
export const metadata = pageSeo("/newsroom", seoBaseMetadata as import("next").Metadata);
