"use client";

import { useState } from "react";
import { BriefcaseBusiness, ChevronRight, MapPin, UsersRound } from "lucide-react";
import { staffingLocations } from "@/lib/site-identity";
import { Depth } from "./depth";
import HomeCta from "./home-cta";
import deck from "./delivery.module.css";
import styles from "./workbench.module.css";

const tracks = [
  { title: "Offshore staffing", icon: UsersRound, href: "/staffing", cta: "Explore staffing",
    intro: "Add dedicated capacity in SEO, content, paid media, design, development, or analytics.",
    steps: [["Define the role", "Set the outcomes, skills, hours, and approval process before choosing a specialist."], ["Review experience", "Discuss relevant work samples and decide how to assess candidates for your team."], ["Plan onboarding", "Agree on access, tools, coverage, and regular performance check-ins."]] },
  { title: "Careers at Orbilect SEO", icon: BriefcaseBusiness, href: "/careers", cta: "Explore careers",
    intro: "See how search, creative, engineering, and delivery teams work together.",
    steps: [["Find your team", "Explore editorial, technical SEO, paid media, design, and other delivery disciplines."], ["Review requirements", "Read the role and schedule details and prepare work samples that show your contribution."], ["Check openings", "Visit Careers for current vacancies and the applicable application process."]] },
] as const;

function TrackCard({ track }: { track: (typeof tracks)[number] }) {
  const [selected, setSelected] = useState(0);
  return (
    <Depth>
      <article className={deck.teamCard}>
        <span className={deck.tileIcon}><track.icon size={25} aria-hidden="true" /></span>
        <h3>{track.title}</h3>
        <p>{track.intro}</p>
        <div className={deck.trackButtons} role="group" aria-label={track.title + " steps"}>
          {track.steps.map(([step], index) => <button type="button" aria-pressed={index === selected} key={step} onClick={() => setSelected(index)}>{step}<ChevronRight size={14} aria-hidden="true" /></button>)}
        </div>
        <p className={deck.stepDetail} aria-live="polite">{track.steps[selected][1]}</p>
        <HomeCta href={track.href}>{track.cta}</HomeCta>
      </article>
    </Depth>
  );
}

export default function Teams() {
  return (
    <section id="staffing-and-careers" className={styles.dark} aria-labelledby="teams-title">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <p data-site-eyebrow="" data-reveal="off">Staffing and careers</p>
          <h2 data-site-heading="" id="teams-title">Build your team or <span>join ours</span></h2>
          <p className={deck.location}><MapPin size={18} aria-hidden="true" />{staffingLocations}</p>
        </div>
        <div className={deck.trackGrid}>{tracks.map(track => <TrackCard track={track} key={track.title} />)}</div>
      </div>
    </section>
  );
}
