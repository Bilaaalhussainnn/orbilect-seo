"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWebMCP } from "use-webmcp-tool";
import { publicToolAnnotations, publicToolDefinitions } from "@/lib/agents/tools";

async function callPublicTool(name: string, input: unknown, signal?: AbortSignal) {
  const response = await fetch("/mcp", {
    method: "POST", signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(8000)]) : AbortSignal.timeout(8000),
    credentials: "omit", headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", "MCP-Protocol-Version": "2025-11-25" },
    body: JSON.stringify({ jsonrpc: "2.0", id: crypto.randomUUID(), method: "tools/call", params: { name, arguments: input } }),
  });
  const payload = await response.json();
  if (!response.ok || payload.error || !payload.result?.content) throw new Error("The public information tool is unavailable. Use the linked public website pages instead.");
  return payload.result;
}
export default function PublicWebMcp() {
  const pathname = usePathname();
  const enabled = Boolean(pathname && !/^\/(?:api|admin|internal)(?:\/|$)/.test(pathname));
  useEffect(() => {

    // Earlier WebMCP implementations exposed navigator.modelContext. Keep them
    // usable without manufacturing an API in browsers that do not support it.
    type LegacyContext = { registerTool: (tool: object, options?: {signal: AbortSignal}) => void | Promise<void>; unregisterTool?: (name: string) => void };
    const legacy = (navigator as Navigator & { modelContext?: LegacyContext }).modelContext;
    if (!enabled || document.modelContext || !legacy?.registerTool) return;
    const controller = new AbortController();
    const names: string[] = [];
    for (const tool of publicToolDefinitions) {
      Promise.resolve(legacy.registerTool({ ...tool, annotations: publicToolAnnotations,
        execute: (input: unknown) => callPublicTool(tool.name,input,controller.signal) }, { signal: controller.signal }))
        .then(()=>{ if(controller.signal.aborted) legacy.unregisterTool?.(tool.name); else names.push(tool.name); }).catch(()=>{});
    }
    return () => { controller.abort(); for(const name of names) legacy.unregisterTool?.(name); };
  },[enabled]);
  const [search,read,contact] = publicToolDefinitions;
  useWebMCP({ ...search, enabled, annotations: publicToolAnnotations, execute: (input, {signal}) => callPublicTool(search.name,input,signal) });
  useWebMCP({ ...read, enabled, annotations: publicToolAnnotations, execute: (input, {signal}) => callPublicTool(read.name,input,signal) });
  useWebMCP({ ...contact, enabled, annotations: publicToolAnnotations, execute: (input, {signal}) => callPublicTool(contact.name,input,signal) });
  return null;
}
