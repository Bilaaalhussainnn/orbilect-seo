"use client";

import { useId, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight, Cpu, Globe, Smartphone, Sparkles } from "lucide-react";
import styles from "./industry-brief.module.css";

const topics = [
  { name: "AI", icon: Sparkles },
  { name: "Tech", icon: Cpu },
  { name: "Websites", icon: Globe },
  { name: "Apps", icon: Smartphone },
] as const;

type Topic = (typeof topics)[number]["name"];

function topicFor(url: string): Topic {
  if (/set-up-shop-in-chatgpt|latest-search-upgrade|creator-discovery-and-outreach/.test(url)) return "Websites";
  if (/email-outage|nvidia-powered-ai-data-centres|nebius-tests|voice-id-tech|aws-marketplace/.test(url)) return "Tech";
  if (/chatgpt-wallet|elevenlabs-new-app|muse-can-now|office-suite|november-features-devices|odessia|animated-gifs|grok-bot/.test(url)) return "Apps";
  return "AI";
}

const formatDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
});

export default function BriefScene({ stories }: { stories: string[][] }) {
  const [turn, setTurn] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const id = useId();
  const active = ((turn % topics.length) + topics.length) % topics.length;
  const groups = topics.map(({ name }) => stories.filter(([, , , , url]) => topicFor(url) === name));

  function select(index: number) {
    if (index === active) {
      setExpanded(value => !value);
      return;
    }

    const forward = (index - active + topics.length) % topics.length;
    setTurn(turn + (forward > 2 ? forward - topics.length : forward));
    setExpanded(true);
  }

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    stage.style.setProperty("--pitch", ((event.clientY - bounds.top) / bounds.height - .5) * -20 + "deg");
    stage.style.setProperty("--yaw", ((event.clientX - bounds.left) / bounds.width - .5) * 24 + "deg");
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--pitch");
    event.currentTarget.style.removeProperty("--yaw");
  }

  return (
    <div className={styles.topicArchive}>
      <div className={styles.topicStage} onPointerMove={tilt} onPointerLeave={reset} aria-hidden="true">
        <div className={styles.topicOrbit} />
        <div className={styles.topicOrbit} />
        <div className={styles.topicRig}>
          <div className={styles.topicRotor} style={{ "--turn": -turn * 90 + "deg" } as CSSProperties}>
            {topics.map(({ name, icon: Icon }, index) => (
              <div key={name} className={styles.topicFace} data-active={active === index}
                style={{ "--angle": index * 90 + "deg" } as CSSProperties}>
                <Icon size={38} strokeWidth={1.6} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className={styles.topicHeading}>Latest stories</h3>
      <div className={styles.topicControls} role="group" aria-label="Story topics">
        {topics.map(({ name, icon: Icon }, index) => (
          <button key={name} type="button" id={id + "-topic-" + index}
            aria-expanded={expanded && active === index}
            aria-controls={id + "-panel-" + index}
            onClick={() => select(index)}>
            <Icon size={17} aria-hidden="true" />
            {name}
          </button>
        ))}
      </div>

      {topics.map(({ name }, index) => (
        <div key={name} className={styles.topicPanel} id={id + "-panel-" + index}
          role="region" aria-labelledby={id + "-topic-" + index}
          hidden={!expanded || active !== index}>
          <ul className={styles.topicList}>
            {groups[index].map(([day, publisher, title, summary, url]) => {
              const date = day.length === 5 ? "2026-" + day : day;
              return (
                <li key={url}>
                  <a className={styles.topicArticle} href={url}>
                    <div>
                      <p className={styles.meta}>{publisher} · <time dateTime={date}>{formatDate.format(new Date(date))}</time></p>
                      <h4>{title}</h4>
                      <p className={styles.summary}>{summary}</p>
                    </div>
                    <ArrowUpRight className={styles.topicArrow} size={18} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
