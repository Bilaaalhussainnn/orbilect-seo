"use client";

import { internationalWhatsApp, pakistanAddress, pakistanWhatsApp } from "@/lib/site-identity";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight, Mail, MapPin, X } from "lucide-react";
import world from "./world-map.json";
import styles from "./global-locations.module.css";

const locations = [
  { slug: "new-york", city: "New York", country: "United States", flag: "🇺🇸", address: "450 Park Avenue, Suite 2800, New York, NY 10022, United States", landmark: "Statue of Liberty", shift: 22 },
  { slug: "brampton", city: "Brampton", country: "Canada", flag: "🇨🇦", address: "7900 Hurontario Street, Brampton, ON L6Y 0P6, Canada", landmark: "Gage Park gazebo", shift: -22 },
  { slug: "manchester", city: "Manchester", country: "United Kingdom", flag: "🇬🇧", address: "3 Hardman Square, Spinningfields, Manchester M3 3EB, United Kingdom", landmark: "Manchester Town Hall", shift: 0 },
  { slug: "sydney", city: "Sydney", country: "Australia", flag: "🇦🇺", address: "Tower One, 100 Barangaroo Avenue, Barangaroo NSW 2000, Australia", landmark: "Sydney Opera House", shift: 0 },
  { slug: "doha", city: "Doha", country: "Qatar", flag: "🇶🇦", address: "Commercial Bank Plaza, West Bay, Doha, Qatar", landmark: "Museum of Islamic Art", shift: -17 },
  { slug: "karachi", city: "Karachi", country: "Pakistan", flag: "🇵🇰", address: pakistanAddress, landmark: "Mazar-e-Quaid", shift: 17 },
];

const { width, height, pins, routes } = world;
const pixelRatio = 2;

export default function GlobalLocations() {
  const baseRef = useRef<HTMLCanvasElement>(null);
  const motionRef = useRef<HTMLCanvasElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const dialogId = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const location = selected === null ? null : locations[selected];

  useEffect(() => {
    const base = baseRef.current?.getContext("2d");
    const motionCanvas = motionRef.current;
    const moving = motionCanvas?.getContext("2d");
    if (!base || !moving || !motionCanvas) return;

    base.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    base.clearRect(0, 0, width, height);
    base.fillStyle = "#26354a";
    base.fill(new Path2D(world.land));
    base.strokeStyle = "#0b1320";
    base.lineWidth = 0.75;
    base.stroke(new Path2D(world.borders));

    base.setLineDash([4, 6]);
    base.lineWidth = 1.6;
    base.strokeStyle = "#428aff";
    for (const points of routes) {
      base.beginPath();
      base.moveTo(points[0][0], points[0][1]);
      for (const [x, y] of points.slice(1)) base.lineTo(x, y);
      base.stroke();
    }
    base.setLineDash([]);
    base.fillStyle = "#a4c8ff";
    for (const [x, y] of pins) {
      base.beginPath();
      base.arc(x, y, 3.2, 0, Math.PI * 2);
      base.fill();
    }

    moving.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;

    function draw(now: number) {
      if (!moving || !visible || preference.matches) return;
      moving.clearRect(0, 0, width, height);
      moving.fillStyle = "#d8e9ff";
      routes.forEach((points, index) => {
        const step = Math.floor((now / 34 + index * 11) % points.length);
        const [x, y] = points[step];
        moving.beginPath();
        moving.arc(x, y, 3, 0, Math.PI * 2);
        moving.fill();
      });
      frame = requestAnimationFrame(draw);
    }

    function sync() {
      cancelAnimationFrame(frame);
      moving?.clearRect(0, 0, width, height);
      if (visible && !preference.matches) frame = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(motionCanvas);
    preference.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const popup = dialog.current;
    if (selected !== null && popup && !popup.open) popup.showModal();
  }, [selected]);

  function openLocation(index: number, event: MouseEvent<HTMLButtonElement>) {
    trigger.current = event.currentTarget;
    setSelected(index);
  }

  return (
    <section id="global-locations" className={styles.section} aria-labelledby={headingId}>
      <div className={styles.wrap}>
        <p data-site-eyebrow="" data-reveal="off">Our presence worldwide</p>
        <h2 data-site-heading="" id={headingId} data-orbilect-title="">Explore our <span>global locations</span></h2>
        <p className={styles.intro}>Select a city for its address and contact options.</p>
        <div className={styles.map}>
          <canvas ref={baseRef} width={width * pixelRatio} height={height * pixelRatio} aria-hidden="true" />
          <canvas ref={motionRef} width={width * pixelRatio} height={height * pixelRatio} aria-hidden="true" />
          {locations.map(({ city, shift }, index) => (
            <button key={city} type="button" className={styles.pin}
              style={{ left: pins[index][0] / width * 100 + "%", top: pins[index][1] / height * 100 + "%", "--shift": shift + "px" } as CSSProperties}
              title={city} aria-label={"View " + city} aria-haspopup="dialog"
              onClick={event => openLocation(index, event)}>
              <MapPin size={22} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <dialog ref={dialog} className={styles.dialog} aria-labelledby={dialogId}
        onClose={() => {
          setSelected(null);
          trigger.current?.focus({ preventScroll: true });
        }}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.modal} data-globe-office-panel="">
          <button className={styles.close} type="button" aria-label="Close location"
            onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
          {location && (
            <>
              <figure className={styles.figure}>
                <Image key={location.slug} src={"/locations/" + location.slug + ".webp"}
                  width={512} height={512} unoptimized alt={"Illustration of " + location.landmark} />
                <figcaption>{location.landmark}</figcaption>
              </figure>
              <div className={styles.details}>
                <p><span aria-hidden="true">{location.flag}</span> {location.country}</p>
                <h2 id={dialogId} data-globe-office-city="">{location.city}</h2>
                <address><MapPin size={17} aria-hidden="true" /><span>{location.address}</span></address>
                <GlobeOfficeActions isKarachi={location.slug === "karachi"} />
                
              </div>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}


function WhatsAppIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"
          aria-hidden="true" style={{ flexShrink: 0 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.297-.497.1-.198.05-.372-.024-.52-.075-.15-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.435-9.883 9.888-9.883a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.002 5.45-4.437 9.883-9.885 9.883m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.158 11.892c0 2.096.547 4.142 1.588 5.945L.058 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
        </svg>
  );
}

function GlobeOfficeActions({ isKarachi }: { isKarachi: boolean }) {
  const whatsapp = isKarachi ? pakistanWhatsApp : internationalWhatsApp;
  const iconStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    boxSizing: "border-box" as const,
    border: "1px solid #6585ad",
    borderRadius: "50%",
    color: "inherit",
  };

  return (
    <div data-globe-office-actions="" style={{ display: "grid", justifyItems: "start", gap: 8, margin: "4px 0 0" }}>
      <a data-globe-office-phone="" href={isKarachi ? whatsapp.href : "tel:+16466400070"} style={{ display: "inline-flex", alignItems: "center", gap: 8, margin: 0 }}>
        {isKarachi ? <WhatsAppIcon /> : (<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.7 3.3a2 2 0 0 1-.5 2.1l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5l2.9.5a2 2 0 0 1 1.7 1.8Z" />
        </svg>)}
        <span>{isKarachi ? "WhatsApp" : "Phone"} <span style={{ whiteSpace: "nowrap" }}>{isKarachi ? whatsapp.display : "+1 (646) 640-0070"}</span></span>
      </a>
      {!isKarachi && (
        <a data-globe-office-phone="" href={whatsapp.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, margin: 0 }}>
          <WhatsAppIcon />
          <span>WhatsApp <span style={{ whiteSpace: "nowrap" }}>{whatsapp.display}</span></span>
        </a>
      )}
      <div data-globe-office-icons="" role="group" aria-label="Email and social links" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <a href="mailto:info@orbilectseo.com" aria-label="Email Orbilect SEO" title="Email" style={iconStyle}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="2.5" y="5" width="19" height="14" rx="2" />
            <path d="m3.5 6.5 8.5 6 8.5-6" />
          </svg>
        </a>
        <a href="https://www.instagram.com/orbilectseo/" aria-label="Orbilect SEO on Instagram" title="Instagram" style={iconStyle}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="https://www.facebook.com/orbilectseo/" aria-label="Orbilect SEO on Facebook" title="Facebook" style={iconStyle}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 22v-9h3l.45-3.5H14V7.25c0-1 .28-1.75 1.74-1.75h1.86V2.36A25 25 0 0 0 14.9 2C12.22 2 10.4 3.64 10.4 6.65V9.5h-3V13h3v9z" />
          </svg>
        </a>
        <a href="https://www.pinterest.com/orbilectseo/" aria-label="Orbilect SEO on Pinterest" title="Pinterest" style={iconStyle}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="m9 20 2.4-10m-1 4.2c.5 2.8 4.8 2.1 5.8-1.7 1-3.7-1.3-6.4-4.3-6.4-3.3 0-5.2 2.5-4.9 5 .1 1 .5 1.6 1.1 2" />
          </svg>
        </a>
        <a href="https://x.com/orbilectseo" aria-label="Orbilect SEO on X" title="X (Twitter)" style={iconStyle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.4 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
