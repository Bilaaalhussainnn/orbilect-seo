export const services = ["Starter SEO", "Essential SEO", "Technical SEO", "PPC management", "Website redesign", "Content writing", "Custom project"] as const;
export const scopes = ["One website with a focused scope", "Larger or multi-site project"] as const;

export function calculateQuote(selected: string[], scope: string) {
  if (!selected.length || selected.some(item => !services.some(service => service === item)) ||
    !scopes.some(item => item === scope) || new Set(selected).size !== selected.length ||
    (selected.includes("Starter SEO") && selected.includes("Essential SEO"))) throw new Error("Choose valid services and scope.");
  const known = selected.includes("Starter SEO") ? 600 : selected.includes("Essential SEO") ? 1500 : 0;
  const manual = selected.some(item => !["Starter SEO", "Essential SEO"].includes(item)) || scope === scopes[1];
  return { monthlyUsd: known || null, manual };
}
