"use client";

import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import type { Action } from "@/lib/naila/answers";
import { closeAfter, closingMessage, idleWarning, warnAfter, type CloseReason } from "@/lib/naila/conversation";

export type Message = { role: "Naila" | "You"; text: string; actions?: Action[]; sentAt?: number };
type Conversation = { id: string; at: number; warned: boolean; messages: Message[]; humanId?: string };
const storageKey = "orbilect:naila:chat:v2";
const tabPrefix = "orbilect:naila:tab:";
const peerMaxIdle = 130_000;

function storedConversation(raw?: string | null): Conversation | null {
  try {
    const value = JSON.parse(raw === undefined ? localStorage.getItem(storageKey) ?? "null" : raw ?? "null");
    return value && typeof value.id === "string" && Number.isFinite(value.at) && Array.isArray(value.messages)
      ? value : null;
  } catch { return null; }
}

function hasOtherTab(ownKey: string) {
  try {
    return Object.keys(localStorage).some(key => key !== ownKey && key.startsWith(tabPrefix) &&
      Date.now() - Number(localStorage.getItem(key)) < peerMaxIdle);
  } catch { return false; }
}

function report(action: "chat-close" | "chat-warning", chat: Conversation, reason?: CloseReason) {
  if (!chat.humanId && !chat.messages.some(message => message.role === "You")) return;
  const body = JSON.stringify({ action, chatId: chat.id, cycle: chat.at, reason, humanId: chat.humanId });
  if (reason === "last-tab" && navigator.sendBeacon?.("/api/naila", new Blob([body], { type: "application/json" }))) return;
  void fetch("/api/naila", { method: "POST", headers: { "Content-Type": "application/json" },
    body, keepalive: true }).catch(() => {});
}

export function useNailaConversation(welcome: Message) {
  const current = useRef<Conversation | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [closing, setClosing] = useState<Message[] | null>(null);
  const unavailable = useRef(false);
  const clearClosing = useCallback(() => setClosing(null), []);

  function update(next: Conversation | null, publish = true) {
    current.current = next;
    setConversation(next);
    if (!publish) return;
    try {
      if (next) localStorage.setItem(storageKey, JSON.stringify(next));
      else localStorage.removeItem(storageKey);
    } catch { unavailable.current = true; }
  }

  function finish(reason: CloseReason, expectedId?: string) {
    const active = unavailable.current ? current.current : storedConversation();
    if (!active || (expectedId && active.id !== expectedId)) return;
    update(null);
    setClosing([...active.messages, { role: "Naila", text: closingMessage, sentAt: Date.now() }]);
    if (reason !== "declined") report("chat-close", active, reason);
  }

  const tick = useEffectEvent(() => {
    const active = unavailable.current ? current.current : storedConversation();
    if (!active) return;
    const elapsed = Date.now() - active.at;
    if (elapsed >= closeAfter) {
      finish("inactive", active.id);
    } else if (elapsed >= warnAfter && !active.warned) {
      update({ ...active, warned: true, messages: [
        ...active.messages, { role: "Naila", text: idleWarning, sentAt: Date.now() },
      ] });
      report("chat-warning", active);
    }
  });

  const syncFromTab = useEffectEvent((next: Conversation | null, previous: Conversation | null) => {
    if (!next && previous && current.current?.id === previous.id) {
      setClosing([...previous.messages, { role: "Naila", text: closingMessage, sentAt: Date.now() }]);
    }
    update(next, false);
  });

  const leave = useEffectEvent((tab: string) => {
    try { localStorage.removeItem(tab); } catch {}
    if (!hasOtherTab(tab)) finish("last-tab");
  });

  useEffect(() => {
    const tab = tabPrefix + crypto.randomUUID();
    let departed = false;
    const register = () => {
      if (departed) return;
      try {
        for (const key of Object.keys(localStorage)) {
          if (key.startsWith(tabPrefix) && Date.now() - Number(localStorage.getItem(key)) >= peerMaxIdle) localStorage.removeItem(key);
        }
        localStorage.setItem(tab, String(Date.now()));
      } catch { unavailable.current = true; }
    };
    const active = storedConversation();
    const hadPeer = hasOtherTab(tab);
    register();
    syncFromTab(active, null);
    if (active && !hadPeer) leave(tab);
    register();
    const observe = (event: StorageEvent) => {
      if (event.key === storageKey) syncFromTab(storedConversation(event.newValue), storedConversation(event.oldValue));
    };
    const pagehide = () => { departed = true; leave(tab); };
    const pageshow = () => { departed = false; register(); syncFromTab(storedConversation(), current.current); tick(); };
    const visibility = () => { register(); tick(); };
    const heartbeat = window.setInterval(register, 15_000);
    window.addEventListener("storage", observe);
    window.addEventListener("pagehide", pagehide);
    window.addEventListener("pageshow", pageshow);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("storage", observe);
      window.removeEventListener("pagehide", pagehide);
      window.removeEventListener("pageshow", pageshow);
      document.removeEventListener("visibilitychange", visibility);
      try { localStorage.removeItem(tab); } catch {}
    };
  }, []);

  useEffect(() => {
    if (!conversation) return;
    const deadline = conversation.at + (conversation.warned ? closeAfter : warnAfter);
    const timer = window.setTimeout(() => tick(), Math.max(0, deadline - Date.now()));
    return () => window.clearTimeout(timer);
  }, [conversation]);

  function start() {
    const active = (unavailable.current ? current.current : storedConversation());
    if (active) {
      update(active, false);
      return active;
    }
    const now = Date.now();
    const next = { id: crypto.randomUUID(), at: now, warned: false, messages: [{ ...welcome, sentAt: now }] };
    setClosing(null);
    update(next);
    return next;
  }

  function add(make: (messages: Message[]) => Message, visitorActivity = false, expectedId?: string) {
    const active = unavailable.current ? current.current : storedConversation();
    if (!active || (expectedId && active.id !== expectedId)) return;
    update({ ...active, ...(visitorActivity ? { at: Date.now(), warned: false } : {}),
      messages: [...active.messages, make(active.messages)] });
    return active;
  }

  function touch() {
    const active = unavailable.current ? current.current : storedConversation();
    if (active) update({ ...active, at: Date.now(), warned: false });
  }

  return { messages: closing ?? conversation?.messages ?? [welcome], closing: closing !== null,
    clearClosing, current, start, add, finish, touch,
    attachHumanChat: (humanId: string) => {
      const active = unavailable.current ? current.current : storedConversation();
      if (active && active.humanId !== humanId) update({ ...active, humanId });
    },
  };
}
