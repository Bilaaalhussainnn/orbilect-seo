export function formatChatTime(sentAt: number, timeZone?: string) {
  const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
  try {
    return new Intl.DateTimeFormat("en-GB", { ...options, timeZone }).format(sentAt);
  } catch {
    return new Intl.DateTimeFormat("en-GB", options).format(sentAt);
  }
}
