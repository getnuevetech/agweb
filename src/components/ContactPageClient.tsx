"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { services } from "@/content/services";

function ContactFormFromQuery() {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get("intent");
  const serviceSlug = searchParams.get("service") || "";
  const projectSlug = searchParams.get("project") || "";
  const service = services.find((item) => item.slug === serviceSlug);

  return (
    <ContactForm
      initialIntent={intentParam === "consultation" ? "consultation" : "message"}
      initialTopic={service?.topic || ""}
      projectContext={projectSlug || ""}
    />
  );
}

export function ContactPageClient() {
  return (
    <Suspense fallback={<div className="card p-8 text-ink-muted">Loading form…</div>}>
      <ContactFormFromQuery />
    </Suspense>
  );
}
