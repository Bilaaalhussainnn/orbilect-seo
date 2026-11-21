import generated from "./design-media.json";
const media = generated as Record<string, { src: string; srcSet?: string }>;
export function designPreview(src: string) { return media[src] ?? { src }; }
