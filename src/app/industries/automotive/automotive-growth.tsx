"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight, CalendarCheck, ChartNoAxesCombined, FileText, Gauge,
  MapPin, Megaphone, MessageSquare, Search, Star,
} from "lucide-react";
import styles from "./automotive-growth.module.css";

const autoServices = [
  { name: "Local SEO", Icon: MapPin, search: "auto repair shop near me", work: "Align your business profiles and location pages with the repairs you perform, the areas you serve, and your actual opening hours.", outcome: "Help nearby drivers find the right shop and call or book." },
  { name: "Repair service pages", Icon: FileText, search: "brake repair and inspection near me", work: "Build dedicated pages for brakes, diagnostics, tires, and other priority repairs. Explain the work, which vehicles you service, and how to schedule an appointment.", outcome: "Give drivers a direct path from a specific repair search to a booking." },
  { name: "Technical SEO", Icon: Gauge, search: "wheel alignment service in my area", work: "Check slow mobile pages, broken booking links, redirects, and indexing issues that affect your most important service pages.", outcome: "Make key pages easier to find, load, and use." },
  { name: "Review and reputation management", Icon: Star, search: "trusted transmission repair shop", work: "Review how your shop appears across profiles and help your team respond professionally to customer feedback.", outcome: "Give drivers more context before they hand over their keys." },
  { name: "Maintenance guides", Icon: Search, search: "why does my steering wheel shake when braking", work: "Publish helpful symptom guides and maintenance checklists. Connect them to the relevant inspection or repair page.", outcome: "Reach drivers while they are researching and give them a clear next step." },
  { name: "Booking improvements", Icon: CalendarCheck, search: "book a car diagnostic appointment", work: "Improve mobile call buttons, appointment forms, and estimate requests. Ask for the vehicle and symptoms where they help your team respond.", outcome: "Make it easier to turn a visit into a call or appointment request." },
  { name: "Targeted paid search", Icon: Megaphone, search: "winter tire installation offer", work: "Use paid search selectively for seasonal services, local offers, or open appointment slots while organic visibility builds.", outcome: "Support time-sensitive demand with a controlled budget." },
  { name: "Lead and booking reporting", Icon: ChartNoAxesCombined, search: "check engine light diagnostic near me", work: "Connect search activity to tracked calls, estimates, and booking requests where measurement is available.", outcome: "See which services and pages are bringing in work worth pursuing." },
];

const autoPlatforms = [
  { name: "Google reviews", copy: "Drivers often see your rating and recent feedback while comparing nearby shops in Search and Maps. Reviews that describe the repair, communication, and turnaround can help people decide whether to call.", action: "Keep your hours and booking links accurate, and respond to feedback professionally." },
  { name: "Yelp", copy: "Drivers researching a new shop can compare customer experiences around estimates, communication, and how the team handled the repair. A complete profile gives those reviews useful context.", action: "Keep your service categories, location, hours, and contact details current." },
  { name: "Better Business Bureau", copy: "Some customers check the BBB when comparing shops for expensive work. Your profile can give them another place to confirm business information and see how you handle complaints when a record is available.", action: "Review your listing and respond to complaints clearly and promptly." },
  { name: "Trustpilot", copy: "Company reviews give customers a place to read about the buying experience, follow-up, and how your business handles problems. This can be useful for multi-location brands and parts retailers selling online.", action: "Monitor feedback for recurring issues such as unclear estimates, delivery delays, or returns." },
  { name: "REVIEWS.io", copy: "Company and product reviews can help parts shoppers judge the purchase experience and see how others describe fitment, installation, and delivery.", action: "Use product feedback to improve compatibility notes and installation guidance." },
  { name: "CARFAX", copy: "Drivers can browse service-center profiles and read customer reviews. For repair shops and dealership service departments, this is another place where customers can check the service experience before booking.", action: "Check that your service-center details and contact information are accurate." },
  { name: "RepairPal", copy: "Drivers comparing repair options can look up certified shops and read customer reviews. It can be relevant for independent shops considering the RepairPal certification program.", action: "Review whether the program fits your shop and monitor your profile if you participate." },
  { name: "DealerRater", copy: "Dealership customers can review service visits as well as sales experiences. Service feedback gives drivers context about scheduling, updates, and how the team handled the visit.", action: "For a dealership, review service feedback separately from sales feedback so each team can act on it." },
];

const autoChat = [
  { tab: "Answer questions", driver: "Do you service BMW brakes?", reply: "We can help check that. What model and year do you drive, and what are you noticing when you brake?" },
  { tab: "Capture notes", driver: "My M5 shakes when I slow down.", reply: "I can pass that along to the shop. When did it start, and what is the best number to reach you?" },
  { tab: "Book appointments", driver: "Can I bring it in this Friday?", reply: "Let’s check the shop calendar for an inspection slot." },
];

export type IndustryGrowthCopy = {
  industry: string;
  businesses: string;
  overview: string;
  reviewIntro: string;
  redesign: string;
  services: Array<{ name: string; search: string; work: string; outcome: string }>;
  platforms: typeof autoPlatforms;
  chat: typeof autoChat;
};

export default function AutomotiveGrowth({ content }: { content?: IndustryGrowthCopy } = {}) {
  const services = content
    ? content.services.map((service, index) => ({ ...service, Icon: autoServices[index]?.Icon ?? Search }))
    : autoServices;
  const platforms = content?.platforms ?? autoPlatforms;
  const chat = content?.chat ?? autoChat;
  const [serviceIndex, setServiceIndex] = useState(0);
  const [platformIndex, setPlatformIndex] = useState(0);
  const [chatIndex, setChatIndex] = useState(0);
  const service = services[serviceIndex];
  const platform = platforms[platformIndex];
  const example = chat[chatIndex];

  return (
    <>
      <section className={styles.light} aria-labelledby="auto-growth-services">
        <div className={styles.wrap}>
          <header className={styles.head}>
            <p className={styles.eyebrow} data-site-eyebrow="">{content ? content.industry + " marketing services" : "Automotive marketing services"}</p>
            <h2 id="auto-growth-services" data-orbilect-title="">{content ? <>Reach people <span>ready to act</span></> : <>Get more of the jobs <span>your shop wants</span></>}</h2>
            <p>{content?.overview ?? "See how eight services help drivers find your shop, understand what you offer, and book the right repair."}</p>
          </header>

          <div className={styles.serviceExplorer}>
            <div className={styles.servicePicker} role="group" aria-label={content ? "Choose a " + content.industry + " marketing service" : "Choose an automotive marketing service"}>
              {services.map(({ name, Icon }, index) => (
                <button key={name} type="button" aria-pressed={index === serviceIndex}
                  aria-controls="auto-service-example" onClick={() => setServiceIndex(index)}>
                  <Icon size={19} aria-hidden="true" />
                  <span>{name}</span>
                  <ArrowUpRight size={14} aria-hidden="true" className={styles.serviceArrow} />
                </button>
              ))}
            </div>
            <div id="auto-service-example" className={styles.serviceStage} aria-live="polite">
              <div className={styles.serviceStory} key={service.name}>
                <div className={styles.searchMock}>
                  <span>{content ? "Example customer search" : "Example driver search"}</span>
                  <div><Search size={17} aria-hidden="true" /><strong>{service.search}</strong></div>
                </div>
                <ol className={styles.bookingPath}>
                  <li><small>What Orbilect improves</small><p>{service.work}</p></li>
                  <li><small>{content ? "What your business gains" : "What your shop gains"}</small><strong>{service.outcome}</strong></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.reviews} aria-labelledby="auto-reviews-heading">
        <div className={styles.wrap}>
          <header className={styles.head}>
            <p className={styles.eyebrow} data-site-eyebrow="">Reviews and reputation</p>
            <h2 id="auto-reviews-heading" data-orbilect-title="">Earn trust <span>before the first call</span></h2>
            <p>{content?.reviewIntro ?? "Before approving a repair, drivers want to know how your shop handles estimates, delays, and problems. Choose a platform to see what your shop can do there."}</p>
          </header>

          <div className={styles.reviewControls} role="group" aria-label="Review and reputation platforms">
            {platforms.map(({ name }, index) => (
              <button key={name} type="button" aria-pressed={index === platformIndex}
                aria-controls="auto-review-example" onClick={() => setPlatformIndex(index)}>{name}</button>
            ))}
          </div>
          <div id="auto-review-example" className={styles.reviewCopy} aria-live="polite">
            <div key={platform.name}>
              <h3>{platform.name}</h3><p>{platform.copy}</p><p><strong>What to do:</strong> {platform.action}</p>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}




const redesignPriceParts = ["From ", "$600", " one time only!"];

function RedesignPrice() {
  const price = useRef<HTMLParagraphElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const element = price.current;
    if (!element || !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      setPlay(true);
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={price} className={styles.price} data-price-playing={play ? "" : undefined} data-reveal="off">
      <span className={styles.priceForReaders}>{redesignPriceParts.join("")}</span>
      <span aria-hidden="true">
        {redesignPriceParts.map((part, index) => {
          const offset = redesignPriceParts.slice(0, index).join("").length;
          return (
            <span key={part} className={index === 1 ? styles.priceBadge : undefined}>
              {Array.from(part, (character, letter) => (
                <span key={letter} className={styles.priceLetter}
                  style={{ animationDuration: (80 + (offset + letter) * 44) + "ms" }}>
                  {character}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </p>
  );
}
