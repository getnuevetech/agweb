import { site } from "@/content/site";
import type { Metadata } from "next";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle =
    title === site.name
      ? `${site.name} | ${site.shortTitle}`
      : `${title} | ${site.name}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      images: [{ url: site.portrait.src, alt: site.portrait.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };

  if (site.origin) {
    metadata.alternates = {
      canonical: `${site.origin.replace(/\/$/, "")}${path}`,
    };
  }

  return metadata;
}
