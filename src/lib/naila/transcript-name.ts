export function transcriptName(channel: "Naila" | "LC", at = new Date()) {
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(at);
  const part = (type: string) => date.find(item => item.type === type)?.value;
  return "Orbilect SEO Chat Transcript - " + channel + " (" +
    [part("month"), part("day"), part("year")].join("/") + ")";
}
