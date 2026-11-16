"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { HumanConversation, HumanMessage } from "@/lib/naila/human-chat";
import styles from "./naila.module.css";
import feedback from "./human-chat-panel.module.css";

const conversationKey = "orbilect:naila:human-conversation";
const words = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

async function request(action: string, chatId: string, payload: object = {}): Promise<HumanConversation> {
  const response = await fetch("/api/naila", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(action === "start" ? { "X-Naila-Handoff": "1" } : {}) },
    body: JSON.stringify({ action: "human-" + action, chatId, ...payload }),
    signal: AbortSignal.timeout(10_000),
  });
  const data = await response.json();
  if (!response.ok) throw Error(data.error ?? "Live support is temporarily unavailable.");
  return data;
}

export function HumanChatPanel({ history, onClosed, onBack }: {
  history: HumanMessage[];
  onClosed: () => void;
  onBack: () => void;
}) {
  const [id, setId] = useState("");
  const [chat, setChat] = useState<HumanConversation>();
  const [ready, setReady] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const pendingId = useRef("");
  const updating = useRef(false);
  const revision = useRef(0);
  const closedNotice = useRef(false);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setId(sessionStorage.getItem(conversationKey) ?? ""); } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!id || chat?.rating) return;
    let cancelled = false;
    const refresh = async () => {
      if (updating.current || document.hidden) return;
      const current = revision.current;
      updating.current = true;
      try {
        const result = await request("status", id);
        if (!cancelled && current === revision.current) { setChat(result); setError(""); }
      } catch (cause) {
        if (cancelled || current !== revision.current) return;
        if (cause instanceof Error && cause.message === "Conversation unavailable.") {
          setChat(undefined);
          setId("");
          try { sessionStorage.removeItem(conversationKey); } catch {}
          return;
        }
        setError("The inbox is temporarily unavailable. We’ll retry.");
      } finally { if (current === revision.current) updating.current = false; }
    };
    void refresh();
    const timer = window.setInterval(refresh, 5000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [id, chat?.rating]);

  useEffect(() => {
    if (chat?.state === "closed" && !chat.rating && !closedNotice.current) {
      closedNotice.current = true;
      onClosed();
    }
  }, [chat?.state, chat?.rating, onClosed]);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [chat?.history.length]);

  async function submit(event: FormEvent, action: string, payload: object) {
    event.preventDefault();
    if (busy) return;
    const chatId = id || (pendingId.current ||= crypto.randomUUID());
    setBusy(true);
    revision.current += 1;
    updating.current = true;
    setError("");
    try {
      const result = await request(action, chatId, payload);
      setChat(result);
      setId(chatId);
      try { sessionStorage.setItem(conversationKey, chatId); } catch {}
      if (action === "visitor-message") setText("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
    } finally {
      setBusy(false);
      updating.current = false;
    }
  }

  const count = words(review);
  return (
    <div className={feedback.wrap}>
      {!chat && !id && ready && (
        <form className={styles.options} onSubmit={(event) => void submit(event, "start", { agreed, history })}>
          <strong>Request a human agent</strong>
          <p>Our team will see the conversation you share here. <a href="/privacy-policy#naila">How we use chat information</a></p>
          <label className={feedback.consent}><input type="checkbox" checked={agreed} required onChange={(event) => setAgreed(event.target.checked)} /> Share this conversation with the support team</label>
          <button type="submit" disabled={busy || !agreed}>Request live support</button>
          <button type="button" onClick={onBack}>Back to Naila</button>
        </form>
      )}
      {id && !chat && <p className={feedback.status} role="status">Connecting to your support chat…</p>}
      {chat && (
        <>
          <p className={feedback.status} role="status">{chat.state === "waiting" ? "Waiting for a team member…" : chat.state === "live" ? chat.agent + " joined the chat." : chat.agent + " closed the chat."}</p>
          <div className={styles.thread} ref={log} role="log" aria-label="Human support conversation">
            {chat.history.map((item, index) => <div key={index} className={item.role === "visitor" ? styles.visitor : styles.naila}>
              <strong>{item.role === "visitor" ? "You" : item.role === "agent" ? chat.agent : "Naila"}</strong>
              <p>{item.text}</p>
            </div>)}
          </div>
          {chat.state !== "closed" ? (
            <form className={styles.composer} onSubmit={(event) => void submit(event, "visitor-message", { text })}>
              <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Send your message" aria-label="Message to support" required maxLength={1000} />
              <button type="submit" disabled={busy || !text.trim()}>Send</button>
            </form>
          ) : chat.rating ? (
            <div className={styles.options} role="status">
              <strong>Thanks for your review. It helps us improve our services.</strong>
              <button type="button" onClick={onBack}>Back to Naila</button>
            </div>
          ) : (
            <form className={`${styles.options} ${feedback.review}`} onSubmit={(event) => void submit(event, "rate", { rating, text: review })}>
              <strong>Rate your chat with {chat.agent}</strong>
              <fieldset className={feedback.stars}>
                <legend>Rating out of five stars</legend>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input type="radio" name="agent-rating" value={value} checked={rating === value} required onChange={() => setRating(value)} />
                    <Star size={25} fill={rating >= value ? "currentColor" : "none"} aria-hidden="true" />
                    <span className={feedback.srOnly}>{value} {value === 1 ? "star" : "stars"}</span>
                  </label>
                ))}
              </fieldset>
              <label>Private review (optional)
                <textarea rows={3} maxLength={2000} value={review} onChange={(event) => setReview(event.target.value)} aria-describedby="human-review-count" />
              </label>
              <small id="human-review-count">{count} / 160 words</small>
              <button type="submit" disabled={busy || !rating || count > 160}>Submit review</button>
            </form>
          )}
        </>
      )}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}
