"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import styles from "./cookie-consent.module.css";

const name = "orbilect_cookie_choices_v1";
const changed = "orbilect:cookie-consent";
const openSettings = "orbilect:open-cookie-settings";
let currentChoice = "";

function readSavedChoice() {
  try {
    const saved = window.localStorage.getItem(name);
    if (saved && /^[01]{2}$/.test(saved)) return saved;
  } catch {}

  try {
    const cookie = document.cookie.split(";").map(entry => entry.trim())
      .find(entry => entry.startsWith(name + "="))?.slice(name.length + 1);
    if (cookie && /^[01]{2}$/.test(cookie)) return cookie;
  } catch {}

  return currentChoice;
}

function readChoice() {
  return readSavedChoice();
}

function subscribe(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === name || event.key === null) listener();
  }
  window.addEventListener(changed, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changed, listener);
    window.removeEventListener("storage", onStorage);
  };
}

function saveChoice(analytics: boolean, marketing: boolean) {
  currentChoice = (analytics ? "1" : "0") + (marketing ? "1" : "0");
  try { window.localStorage.setItem(name, currentChoice); } catch {}
  try {
    document.cookie = name + "=" + currentChoice + "; Max-Age=15552000; Path=/; SameSite=Lax" +
      (window.location.protocol === "https:" ? "; Secure" : "");
  } catch {}
  window.dispatchEvent(new CustomEvent(changed, { detail: { analytics, marketing } }));
}

export function CookieSettingsButton() {
  return (
    <button className={styles.settingsLink} type="button"
      onClick={() => window.dispatchEvent(new Event(openSettings))}>
      Cookie settings
    </button>
  );
}

export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "pending");
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  function manage() {
    const saved = readChoice();
    setAnalytics(saved[0] === "1");
    setMarketing(saved[1] === "1");
    setManaging(true);
  }

  useEffect(() => {
    window.addEventListener(openSettings, manage);
    return () => window.removeEventListener(openSettings, manage);
  }, []);

  function commit(allowAnalytics: boolean, allowMarketing: boolean) {
    saveChoice(allowAnalytics, allowMarketing);
    setManaging(false);
  }

  if (choice === "pending") return null;
  if (choice && !managing) return null;

  return (
    <section className={styles.banner} aria-labelledby="cookie-heading" data-lenis-prevent="">
      <div className={styles.summary}>
        <p id="cookie-heading" className={styles.title} data-reveal="off">Cookie <span>choices</span></p>
        <p>Choose optional analytics and marketing cookies. We’ll remember your choice. <Link href="/privacy-policy#cookies">Read about cookies</Link>.</p>
      </div>
      {managing && (
        <fieldset className={styles.options}>
          <legend>Optional categories</legend>
          <label><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /> Analytics</label>
          <label><input type="checkbox" checked={marketing} onChange={event => setMarketing(event.target.checked)} /> Marketing</label>
        </fieldset>
      )}
      <div className={styles.actions}>
        <button type="button" onClick={() => commit(true, true)}>Allow optional</button>
        <button type="button" onClick={() => commit(false, false)}>Reject optional</button>
        {managing
          ? <button type="button" onClick={() => commit(analytics, marketing)}>Save choices</button>
          : <button type="button" onClick={manage}>Cookie settings</button>}
        {managing && choice && <button type="button" onClick={() => setManaging(false)}>Cancel</button>}
      </div>
    </section>
  );
}
