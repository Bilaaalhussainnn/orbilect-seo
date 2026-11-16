"use client";

import IndustrySearchDevices from "../industry-search-devices";

const modes = [
  { query: "used hybrid SUVs near me", title: "Local hybrid SUV inventory" },
  { query: "brake repair near me", title: "Brake repair and inspections" },
  { query: "Front brake pads for BMW M5 CS", title: "Brake parts and fitment" },
];

export default function AutomotiveVisual({ mode }: { mode: number }) {
  const example = modes[mode] ?? modes[0];
  return <IndustrySearchDevices slug="automotive" query={example.query} title={example.title} />;
}
