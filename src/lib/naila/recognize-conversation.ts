import patterns from "./conversation-patterns.json";
const normalize = (value: string) => value.toLowerCase().replace(/[’‘]/g, "'").replace(/[.!?]+$/g, "").trim();
const questions = new Map(patterns.map(pattern => [normalize(pattern.example), pattern.question]));
export const conversationQuestion = (message: string) => questions.get(normalize(message)) ?? message;
