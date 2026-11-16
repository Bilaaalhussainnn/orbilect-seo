"use client";

import { proposalServices } from "@/lib/leads/sources";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SeoRequestPrefill() {
  const params = useSearchParams();
  const request = params.get("request");
  const service = params.get("service");
  const website = params.get("website");
  const details = params.get("details");

  useEffect(() => {
    if (!request && !service) return;

    const form = document.querySelector<HTMLFormElement>("#request-proposal form, form#request-proposal");
    if (!form) return;

    const urlField = form.querySelector<HTMLInputElement>(
      'input[name="website"], input[name="websiteUrl"], input[name="url"], input[type="url"]',
    );
    const serviceField = form.querySelector<HTMLSelectElement>('select[name="service"]');
    if (service && serviceField && !serviceField.value && proposalServices.some((option) => option === service)) {
      serviceField.value = service;
      serviceField.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const messageField = form.querySelector<HTMLTextAreaElement>('textarea[name="message"], textarea');
    const notes = [request, details, urlField ? null : website].filter(Boolean).join("\n");

    if (website && urlField && !urlField.value) {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(urlField, website);
      urlField.dispatchEvent(new Event("input", { bubbles: true }));
    }

    if (notes && messageField && !messageField.value) {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set?.call(messageField, notes);
      messageField.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, [request, service, website, details]);

  return null;
}
