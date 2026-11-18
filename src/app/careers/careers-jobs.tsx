"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { ArrowUpRight, BriefcaseBusiness, Check, FileText, Search, Sparkles } from "lucide-react";
import styles from "./careers-jobs.module.css";

const jobsUrl = "https://www.mustakbil.com/ws/embed/jobs/142737";

export default function CareersJobs() {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function resize(event: MessageEvent) {
      if (!/^https:\/\/[a-z]+\.mustakbil\.com$/.test(event.origin) ||
          event.source !== frame.current?.contentWindow ||
          !event.data || event.data.type !== "mustakbil-jobs-height") return;
      const height = event.data.height;
      if (typeof height !== "number" || !Number.isFinite(height) || height <= 0) return;
      if (frame.current) frame.current.style.height = `${Math.min(20000, Math.max(240, Math.ceil(height)))}px`;
    }
    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--rx", `${(0.5 - (event.clientY - box.top) / box.height) * 16}deg`);
    event.currentTarget.style.setProperty("--ry", `${((event.clientX - box.left) / box.width - 0.5) * 20}deg`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--rx");
    event.currentTarget.style.removeProperty("--ry");
  }

  return (
    <section id="mustakbil-jobs" className={styles.section} aria-labelledby="mustakbil-jobs-title">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <header className={styles.heading}>
            <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Opportunities at Orbilect SEO</p>
            <h2 id="mustakbil-jobs-title">Your next chapter.<br /><span>Our next teammate.</span></h2>
            <p>Bring your curiosity, your craft, and your ambition. Explore our openings on Mustakbil and find where your skills could make a difference.</p>
            <a href="#mustakbil-job-board" className={styles.cta} data-orbilect-cta="white">
              <span data-orbilect-cta-icon="" aria-hidden="true" />Explore opportunities
            </a>
          </header>

          <div className={styles.scene} onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
            <div className={styles.orbit} />
            <div className={styles.stack}>
              <div className={styles.backCard} />
              <div className={styles.middleCard} />
              <div className={styles.frontCard}>
                <div className={styles.windowBar}><i /><i /><i /><span>Orbilect SEO · Careers</span></div>
                <div className={styles.artBody}>
                  <div className={styles.briefcase}><BriefcaseBusiness size={34} strokeWidth={1.5} /></div>
                  <span className={styles.artTitle}>Make your next move.</span>
                  <div className={styles.artLines}><i /><i /></div>
                  <div className={styles.artAction}><span>Explore opportunities</span><ArrowUpRight size={16} /></div>
                </div>
              </div>
              <span className={styles.floatingSearch}><Search size={23} /></span>
              <span className={styles.floatingSpark}><Sparkles size={22} /></span>
              <span className={styles.floatingFile}><FileText size={22} /><Check size={14} /></span>
            </div>
          </div>
        </div>

        <div id="mustakbil-job-board" className={styles.board}>
          <div className={styles.boardHeader}>
            <div><p className={styles.boardEyebrow}>Find your fit</p><h3>Current opportunities</h3></div>
            <a href={jobsUrl} target="_blank" rel="noopener noreferrer">Open jobs on Mustakbil <ArrowUpRight size={16} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a>
          </div>
          <iframe ref={frame} src={jobsUrl} title="Jobs at Orbilect SEO" loading="lazy"
            className={styles.frame} data-mustakbil-jobs="" />
          <p className={styles.boardNote}>Job listings and applications are provided by Mustakbil. If the board doesn’t load, use the link above to open it directly.</p>
        </div>
      </div>
    </section>
  );
}
