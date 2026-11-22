export const idleWarning = "Still have questions? This chat will end in two minutes if you’re inactive.";
export const closingMessage = "Thanks for contacting Orbilect SEO. Feel free to reach out to us again.";
export const warnAfter = 3 * 60_000;
export const closeAfter = 5 * 60_000;
export type CloseReason = "declined" | "inactive" | "last-tab";

export function declinesHelp(message: string) {
  const text = message.toLowerCase().replace(/[’‘;]/g, "'").trim()
    .replace(/^(?:hi|hello|hey)[\s,.!]+/, "").replace(/[.!?,]+$/g, "").trim()
    .replace(/^(?:no[, ]+)?(?:thanks|thank you)[,!. ]+(?=that|i |nothing|bye)/, "")
    .replace(/^no[, ]+(?=that|nothing|i )/, "");
  if (/^(?:that(?:'ll| will) be all|that(?:'s| is) all)[,. ]+(?:i )?(?:don't|do not) need (?:any )?(?:further |more )?help$/.test(text)) return true;
  return /^(?:no(?:[ ,]+(?:thanks|thank you|i'm (?:good|all set)))?|nope|not (?:now|right now))$/.test(text) ||
    /^(?:i(?:'m| am) (?:good|all set|fine)|that(?:'s| is|'ll| will)(?: be)? all|nothing (?:else|more)|bye|goodbye)(?: for now)?(?:[ ,.]+(?:thanks|thank you|bye|goodbye))*$/.test(text) ||
    /^(?:no[ ,]+)?(?:i\s+)?(?:don'?t|do not) (?:need|want) (?:(?:any |further |more ){0,2})(?:help|assistance|support|anything(?: else)?)(?: right now)?(?:[ ,]+(?:thanks|thank you))?$/.test(text) ||
    /^(?:please )?(?:end|close|stop) (?:this|the) chat$/.test(text);
}
