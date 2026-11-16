"use client";
import { formatChatTime } from "../../lib/naila/chat-time";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Calculator, Ellipsis, Mail, Minus, Send, X } from "lucide-react";
import { type Action } from "../../lib/naila/answers";
import { scopes, services } from "../../lib/naila/quote";
import OrbilectHeroType from "../../app/_components/orbilect-hero-type";
import Link from "next/link";
import { transcriptName } from "../../lib/naila/transcript-name";
import { HumanChatPanel } from "./human-chat-panel";
import styles from "./naila.module.css";

type Message = { role: "Naila" | "You"; text: string; actions?: Action[]; sentAt?: number };
type Mode = "chat" | "services" | "scope" | "transcript" | "proposal" | "human";
const welcome: Message = { role: "Naila", text: "Hi, I’m Naila 👋 Ask me about Orbilect SEO, compare plans, or tell me what you’re building." };
const referrerText = "See our pricing";
const marks: Record<string, string> = {
  LinkedIn: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-9 7H7v8h3Zm-1.5-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM18 13c0-2-1-3-2.6-3-1 0-1.7.4-2.1 1v-1H11v8h2.7v-4.2c0-1 .5-1.5 1.2-1.5s1 .6 1 1.5V18H18Z",
  Facebook: "M14 22v-9h3l.45-3.5H14V7.25c0-1 .28-1.75 1.74-1.75h1.86V2.36A25 25 0 0 0 14.9 2C12.22 2 10.4 3.64 10.4 6.65V9.5h-3V13h3v9z",
  X: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.4 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z",
};

function SocialMark({ brand }: { brand: string }) {
  return <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    {brand === "Instagram" ? <g fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </g> : brand === "Pinterest" ? <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" /><path d="m9 20 2.4-10m-1 4.2c.5 2.8 4.8 2.1 5.8-1.7 1-3.7-1.3-6.4-4.3-6.4-3.3 0-5.2 2.5-4.9 5 .1 1 .5 1.6 1.1 2" />
    </g> : <path fill="currentColor" fillRule="evenodd" d={marks[brand]} />}
  </svg>;
}

function replyActionKey(href: string) {
  const site = "https://orbilectseo.com";
  try {
    const url = new URL(href, site);
    const origin = url.origin === "https://www.orbilectseo.com" ? site : url.origin;
    const pathname = url.pathname.replace(/\/+$/, "") || "/";
    if (url.protocol === "mailto:" || url.protocol === "tel:") return url.protocol + pathname.toLowerCase();
    return origin + pathname + url.search + url.hash;
  } catch {
    return href;
  }
}

function unseenReplyActions(history: Message[], actions?: Action[]) {
  if (!actions?.length) return undefined;
  const seen = new Set(history.flatMap(message => (message.actions ?? []).map(action => replyActionKey(action.href))));
  const unique = actions.filter(action => {
    const key = replyActionKey(action.href);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique.length ? unique : undefined;
}

const chatStorageKey = "orbilect:naila:chat:v1";
const quoteHref = "/pricing#pricing-checklist";
const idleMinimized = "I’m minimizing this chat for now. You can reopen it and pick up right where we left off.";
const idleWarning = "Still have questions? I’m here to help.";

export default function Naila({ humanChatEnabled = false }: { humanChatEnabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const [timeZone, setTimeZone] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [lastActivity, setLastActivity] = useState(0);
  const [warned, setWarned] = useState(false);
  const [notice, setNotice] = useState("");
  const [restored, setRestored] = useState(false);
  const activity = useRef(0);
  const chatReportId = useRef("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [selection, setSelection] = useState<string[]>([]);
  const [scope, setScope] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const thread = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const interacted = useRef(false);
  const requesting = useRef(false);

  function chime() {
    const context = audio.current;
    if (context?.state !== "running") return;
    const tone = context.createOscillator();
    const level = context.createGain();
    const start = context.currentTime;
    tone.frequency.setValueAtTime(660, start);
    tone.frequency.setValueAtTime(880, start + .075);
    level.gain.setValueAtTime(.04, start);
    level.gain.exponentialRampToValueAtTime(.001, start + .22);
    tone.connect(level);
    level.connect(context.destination);
    tone.start(start);
    tone.stop(start + .22);
  }

  useEffect(() => {
    function enableChime() {
      try {
        const context = audio.current ?? new AudioContext();
        audio.current = context;
        void context.resume().catch(() => {});
      } catch {
        // Chat stays usable when audio is unavailable.
      }
      document.removeEventListener("click", enableChime, true);
    }

    document.addEventListener("click", enableChime, true);
    return () => {
      document.removeEventListener("click", enableChime, true);
      const context = audio.current;
      audio.current = null;
      if (context && context.state !== "closed") {
        void context.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    try {
      if (Number(sessionStorage.getItem("naila-block-until")) > Date.now()) {
        setBlocked(true);
        return;
      }
    } catch {}
    const timer = window.setTimeout(() => {
      if (!interacted.current) {
        setPeek(true);
        chime();
      }
    }, 20_000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) input.current?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    if (thread.current) thread.current.scrollTop = thread.current.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(chatStorageKey);
      if (raw) {
        interacted.current = true;
        const saved = JSON.parse(raw);
        if (saved && Array.isArray(saved.messages) && saved.messages.length > 0) {
          const savedDraft = typeof saved.draft === "string" ? saved.draft : "";
          const savedTime = Number.isFinite(saved.at) ? Math.min(saved.at, Date.now()) : Date.now();
          activity.current = savedTime;
          chatReportId.current = typeof saved.reportId === "string" ? saved.reportId : "";
          setTimeZone(typeof saved.timeZone === "string" ? saved.timeZone : undefined);
          setLastActivity(savedTime);
          const history: Message[] = saved.messages;
          setMessages(history.some(message => message.role === "You") ? history :
            history.filter(message => message.text !== idleWarning && message.text !== idleMinimized));
          setText(savedDraft);
        }
      }
    } catch {}
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored || !lastActivity) return;
    try {
      localStorage.setItem(chatStorageKey, JSON.stringify({ draft: text, at: lastActivity, messages, warned, reportId: chatReportId.current, timeZone }));
    } catch {}
  }, [restored, lastActivity, messages, warned, timeZone, text]);

  const hasVisitorMessage = messages.some(message => message.role === "You");

  useEffect(() => {
    if (!open || !hasVisitorMessage || !lastActivity || busy || mode !== "chat" || text.trim()) return;
    function checkIdle() {
      if (activity.current !== lastActivity || requesting.current) return;
      const now = Date.now();
      const elapsed = now - lastActivity;
      if (elapsed >= 300_000) {
        activity.current = 0;
        setMessages(items => [...items, { role: "Naila", text: idleMinimized, sentAt: now }]);
        setPeek(false);
        setNotice("");
        setOpen(false);
      } else if (elapsed >= 180_000 && !warned) {
        setWarned(true);
        setMessages(items => [...items, { role: "Naila", text: idleWarning, sentAt: now }]);
      }
    }

    const timeout = window.setTimeout(checkIdle,
      Math.max(0, lastActivity + (warned ? 300_000 : 180_000) - Date.now()));
    document.addEventListener("visibilitychange", checkIdle);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", checkIdle);
    };
  }, [open, hasVisitorMessage, lastActivity, warned, busy, mode, text]);

  function touchChat() {
    const now = Date.now();
    activity.current = now;
    setLastActivity(now);
    setWarned(false);
    setNotice("");
  }

  function show() {
    if (blocked) return;
    const openedAt = Date.now();
    setMessages(items => items[0] === welcome ? [{ ...welcome, sentAt: openedAt }, ...items.slice(1)] : items);
    interacted.current = true;
    setPeek(false);
    touchChat();
    setOpen(true);
  }
  const optionsMenu = useRef<HTMLDetailsElement>(null);
  const transcriptEmail = useRef<HTMLInputElement>(null);

  function close() {
    setNotice("");
    interacted.current = true;
    setPeek(false);
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }

  function setPanel(next: Mode) {
    setError("");
    setMode(next);
  }
  function reply(text: string, actions?: Action[]) {
    const sentAt = Date.now();
    setMessages(items => [...items, { role: "Naila", text, actions: unseenReplyActions(items, actions), sentAt }]);
    chime();
  }

  async function run(payload: Record<string, unknown>) {
    if (requesting.current || blocked) return;
    requesting.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/naila", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(12_000),
      });
      const requestTimeZone = response.headers.get("x-naila-timezone");
      if (requestTimeZone) setTimeZone(requestTimeZone);
      const data = await response.json();
      if (data.blocked) {
        setBlocked(true);
        setOpen(false);
        setPeek(false);
        try { sessionStorage.setItem("naila-block-until", String(Date.now() + 86400_000)); } catch {}
        return;
      }
      if (!response.ok) throw Error(data.error ?? "Naila is unavailable. Please try again.");
      if (payload.action === "quote") {
        const base = data.monthlyUsd === null ? "" : "Your plan starts at $" + data.monthlyUsd.toLocaleString("en-US") + " USD/month. ";
        reply("Alright. " + base + (data.manual ? "The custom scope needs a specialist’s review." : "We can review the deliverables with you."),
          [{ text: referrerText, href: "/pricing#seo-plans" }]);
        setPanel("proposal");
      } else {
        reply(data.text, data.actions);
        if (payload.action !== "message") { setPanel("chat"); setDetails(""); }
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
    } finally {
      setBusy(false);
      requesting.current = false;
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = text.replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}|[\uFE0F\u20E3\u200D]/gu, "").trim();
    if (!message || busy || requesting.current) return;
    touchChat();
    setMessages(items => [...items, { role: "You", text: message, sentAt: Date.now() }]);
    chatReportId.current ||= crypto.randomUUID();
    void run({ previousMessage: [...messages].reverse().find(item => item.role === "You")?.text ?? "", action: "message", chatId: chatReportId.current, text: message });
    setText("");
  }

  async function sendDetails(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    touchChat();
    if (mode === "transcript") {
      const transcript = messages.map(item => "[" + item.role + (item.sentAt ? "|" + formatChatTime(item.sentAt, timeZone) : "") + "] " + item.text.replace(/\n/g, "\n  ") + (item.actions?.map(link => "\n" + link.text + ": " + link.href).join("") ?? "")).join("\n\n");
      if (transcript.length > 6500) {
        setError("This chat is too long to email. Use Download to save the full transcript.");
        return;
      }
      await run({ action: "transcript", email: email.trim(), transcript });
      return;
    }
    await run({ action: "proposal", email: email.trim(), details: selection.join(", ") + " — " + scope + "\n" + details });
  }

  function download() {
    const content = messages.map(item => item.role + (item.sentAt ? " (" + formatChatTime(item.sentAt, timeZone) + ")" : "") + ": " + item.text).join("\n\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = transcriptName("Naila").replaceAll("/", "-") + ".txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (blocked) return <span className={styles.blocked} role="status">Naila is temporarily unavailable.</span>;
  return (
    <div className={styles.widget} data-lenis-prevent="">
      {(peek || notice) && !open && (
        <div className={styles.peek} role="status">
          <button type="button" onClick={show}>{notice === idleWarning ? <>Still have questions?<br />I’m here to help.</> : notice || "Need help with SEO?"}</button>
          <button type="button" aria-label="Dismiss Naila greeting" onClick={close}><X size={14} /></button>
        </div>
      )}
      {(open || mode === "human") && (
        <section id={open ? "naila-chat" : undefined} className={styles.panel} style={!open ? { display: "none" } : undefined} aria-label="Naila chat" onKeyDown={event => {
          if (event.key !== "Escape") return;
          const menu = optionsMenu.current;
          if (menu?.open) {
            event.stopPropagation();
            menu.open = false;
            menu.querySelector("summary")?.focus();
          } else {
            close();
          }
        }}>
          <header className={styles.header}>
            <Image src="/naila/naila-portrait.webp" alt="" width={34} height={34} />
            <div className={styles.identity}>
              <strong>Naila</strong>
              <OrbilectHeroType lead="Your guide to" accent="SEO and digital growth" />
            </div>
            {mode !== "human" && <details className={styles.chatOptions} ref={optionsMenu} onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
            }}>
              <summary aria-label="Chat options" title="Chat options"><Ellipsis size={19} aria-hidden="true" /></summary>
              <div className={styles.chatOptionsList}>
                <button type="button" onClick={() => {
                  if (optionsMenu.current) optionsMenu.current.open = false;
                  setPanel("transcript");
                  requestAnimationFrame(() => transcriptEmail.current?.focus());
                }}><Mail size={16} aria-hidden="true" />Send transcript</button>
                {humanChatEnabled && <button type="button" onClick={() => {
                  if (optionsMenu.current) optionsMenu.current.open = false;
                  setPanel("human");
                }}>Talk to a person</button>}
                <Link href={quoteHref} onClick={() => {
                  if (optionsMenu.current) optionsMenu.current.open = false;
                }}><Calculator size={16} aria-hidden="true" />Get a quote</Link>
              </div>
            </details>}
            <button type="button" aria-label="Minimize chat" title="Minimize chat" onClick={close}><Minus size={19} aria-hidden="true" /></button>
          </header>
          {mode === "human" ? <HumanChatPanel
            history={messages.map(({ role, text }) => ({ role: role === "You" ? "visitor" : "assistant", text }))}
            onClosed={() => { if (!open) setNotice("Rate your support chat"); }}
            onBack={() => setPanel("chat")} /> : <>
          <div className={styles.thread} ref={thread} role="log" aria-label="Conversation" aria-live="polite">
            {messages.map((item, index) => (
              <div key={index} className={item.role === "You" ? styles.visitor : styles.naila}>
                <div className={styles.sender}>
                  {item.role === "Naila" && <Image src="/naila/naila-portrait.webp" alt="" width={24} height={24} />}
                  <strong>{item.role}</strong>
                  {item.sentAt && <time dateTime={new Date(item.sentAt).toISOString()}>{formatChatTime(item.sentAt, timeZone)}</time>}
                </div>
                <p>{item.text}</p>
                {item.actions?.map(action => (
                  <a key={action.href} className={styles.action} href={action.href}>
                    {action.brand && <SocialMark brand={action.brand} />}
                    {action.text}<ArrowUpRight aria-hidden="true" size={12} />
                  </a>
                ))}
              </div>
            ))}
            {busy && <p className={styles.typing} aria-label="Naila is typing"><i /><i /><i /></p>}
          </div>
          {mode === "services" && <div className={styles.options}>
            <strong>Which services do you need?</strong>
            {services.map(service => (
              <label key={service}><input type="checkbox" checked={selection.includes(service)} onChange={() => {
                setSelection(previous => previous.includes(service) ? previous.filter(item => item !== service) :
                  [...previous.filter(item => !(["Starter SEO", "Essential SEO"].includes(service) && ["Starter SEO", "Essential SEO"].includes(item))), service]);
              }} />{service}</label>
            ))}
            <button type="button" disabled={!selection.length} onClick={() => setPanel("scope")}>Next</button>
          </div>}
          {mode === "scope" && <div className={styles.options}>
            <strong>What is the scope?</strong>
            {scopes.map(item => <button key={item} type="button" disabled={busy} onClick={() => {
              setScope(item);
              void run({ action: "quote", services: selection, scope: item });
            }}>{item}</button>)}
          </div>}
          {["transcript", "proposal"].includes(mode) && (
            <form className={styles.options} onSubmit={sendDetails}>
              <strong>{mode === "transcript" ? "Email your transcript" : "Request a formal quotation"}</strong>
              <label>{mode === "proposal" ? "Email address" : "Email addresses (comma-separated)"}<input ref={mode === "transcript" ? transcriptEmail : undefined} type="email" multiple={mode !== "proposal"} required maxLength={mode === "proposal" ? 254 : 2048} value={email} onChange={event => setEmail(event.target.value)} /></label>
              {mode !== "transcript" && <label>What would you like to achieve?
                <textarea required maxLength={800} value={details} onChange={event => setDetails(event.target.value)} />
              </label>}
              <button type="submit" disabled={busy}>Send</button>
              {mode === "transcript" && <button type="button" onClick={download}>Download</button>}
            </form>
          )}
          {error && <p className={styles.error} role="alert">{error}</p>}
          {mode !== "chat" && <button className={styles.back} type="button" onClick={() => setPanel("chat")}>Back to chat</button>}
          <form className={styles.composer} onSubmit={submit}>
            <input ref={input} value={text} placeholder="What can I help you with?" aria-label="Type a message" maxLength={1000}
              onChange={event => { setText(event.currentTarget.value); touchChat(); }} />
            <button type="submit" aria-label="Send message" disabled={busy || !text.trim()}><Send size={16} /></button>
          </form>
          </>}
          <footer className={styles.footer}><a href="https://orbilectlabs.com"><Image src="/naila/orbilect-labs.jpg" alt="" width={18} height={18} />Powered by Orbilect Labs</a></footer>
        </section>
      )}
      {!open && (
        <button className={styles.launch} type="button" ref={trigger} aria-expanded={false} aria-label="Open Naila chat" onClick={show}>
          <span className={styles.launchPortrait} aria-hidden="true">
            <Image src="/naila/naila-portrait.webp" alt="" width={68} height={68} />
          </span>
        </button>
      )}
    </div>
  );
}
