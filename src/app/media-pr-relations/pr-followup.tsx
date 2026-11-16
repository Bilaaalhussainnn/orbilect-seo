"use client";

import FinalEditorialCta from "../final-editorial-cta";

import PressKit from "./press-kit";

import { useId, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, CalendarClock, FileText, Image, Megaphone, Newspaper, ShieldCheck, Users } from "lucide-react";
import styles from "./pr-followup.module.css";

const policy = [
  { title: "Personal posts", label: "Speaking for yourself", icon: Megaphone, text: "Make it clear when you’re sharing a personal view. Send requests for interviews, quotes, or an official Orbilect SEO statement to Media & PR." },
  { title: "Client confidentiality", label: "Protecting client work", icon: ShieldCheck, text: "Get permission before sharing client names, screenshots, results, or work in progress. Keep customer information, credentials, and unpublished project details private." },
  { title: "Accuracy and corrections", label: "Getting the facts right", icon: FileText, text: "Verify facts and credit the people whose work you share. Correct material errors promptly and flag mistakes on official channels to Media & PR." },
  { title: "Respect and reporting", label: "Treating people with respect", icon: Users, text: "Respect privacy and avoid harassment. Employees can exercise their workplace rights, raise concerns, and report suspected wrongdoing." },
];

const press = [
  { title: "Story and outlet", label: "Tell us about your story", icon: Newspaper, text: "Include your publication, the subject you’re covering, and the questions you’d like us to answer.", subject: "Press enquiry", fields: ["Publication", "Story and questions", "Deadline and time zone"] },
  { title: "Interview and deadline", label: "Help us plan the interview", icon: CalendarClock, text: "Share the format, preferred dates, deadline, time zone, and the expertise you’re looking for.", subject: "Interview request", fields: ["Publication", "Topic and expertise", "Format and preferred dates", "Deadline and time zone"] },
  { title: "Brand assets", label: "Request approved materials", icon: Image, text: "Tell us which logos, images, or company descriptions you need and where they’ll appear.", subject: "Brand asset request", fields: ["Publication", "Assets needed", "Where they will appear", "Deadline and time zone"] },
];

function Scene({ item, light = false }: { item: (typeof policy)[number]; light?: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !stage.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.current.style.setProperty("--rx", y * -19 + "deg");
    stage.current.style.setProperty("--ry", x * 24 + "deg");
  }

  function reset() {
    stage.current?.style.removeProperty("--rx");
    stage.current?.style.removeProperty("--ry");
  }

  return (
    <div className={light ? styles.lightScene : styles.scene} aria-hidden="true"
      onPointerMove={tilt} onPointerLeave={reset} ref={stage}>
      <div className={styles.orbit} />
      <div className={styles.orbit} />
      <div className={styles.camera}>
        <div className={styles.stack}>
          <div className={styles.back} />
          <div className={styles.middle} />
          <div className={styles.face}>
            <div key={item.title} className={styles.glyph}>
              <Icon size={54} strokeWidth={1.45} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MediaEditorialSections() {
  const [policyIndex, setPolicy] = useState(0);
  const [pressIndex, setPress] = useState(0);
  const id = useId();
  const activePolicy = policy[policyIndex];
  const activePress = press[pressIndex];
  const body = activePress.fields.map(field => field + ": ").join("\n\n");
  const pressLink = "mailto:mediapr@orbilectseo.com?subject=" +
    encodeURIComponent(activePress.subject) + "&body=" + encodeURIComponent(body);

  return (
    <div className={styles.root}>
      <section className={styles.dark} aria-labelledby={id + "-policy"}>
        <div className={styles.inner + " " + styles.split}>
          <div>
            <h2 id={id + "-policy"}>Employee social <span>media policy</span></h2>
            <p>Find out what you can share about your work and when to bring in Media &amp; PR.</p>
            <div className={styles.options} role="group" aria-label="Social media policy topics">
              {policy.map((item, index) => (
                <button type="button" key={item.title} aria-pressed={index === policyIndex} onClick={() => setPolicy(index)}>
                  <item.icon size={18} aria-hidden="true" />{item.title}
                </button>
              ))}
            </div>
            <div className={styles.detail} aria-live="polite" aria-atomic="true">
              <div key={activePolicy.title} className={styles.reveal}>
                <h3>{activePolicy.label}</h3>
                <p>{activePolicy.text}</p>
              </div>
            </div>
          </div>
          <Scene item={activePolicy} />
        </div>
      </section>

      <section className={styles.white} aria-labelledby={id + "-press"}>
        <div className={styles.inner + " " + styles.split + " " + styles.press}>
          <div>
            <h2 id={id + "-press"}>Put together your <span>press request</span></h2>
            <p>Choose an enquiry type to see what to include and open a prefilled email.</p>
            <div className={styles.options} role="group" aria-label="Press request types">
              {press.map((item, index) => (
                <button type="button" key={item.title} aria-pressed={index === pressIndex} onClick={() => setPress(index)}>
                  <item.icon size={18} aria-hidden="true" />{item.title}
                </button>
              ))}
            </div>
            <div className={styles.detail} aria-live="polite" aria-atomic="true">
              <div key={activePress.title} className={styles.reveal}>
                <h3>{activePress.label}</h3>
                <p>{activePress.text}</p>
              </div>
            </div>
            <a className={styles.cta} href={pressLink} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
              Email Media &amp; PR 
            </a>
          </div>
          <Scene item={activePress} light />
        </div>
      </section>

      <PressKit />

      <FinalEditorialCta heading={"Explore the"} accent={"Newsroom"} description={"Read Orbilect Labs product announcements and company updates."} href={"/newsroom"} action={"Visit the Newsroom"} />
    </div>
  );
}
