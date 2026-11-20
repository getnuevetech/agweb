import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const origin = (site.origin || "").replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/deploy/", "/server/"],
    },
    sitemap: origin ? `${origin}/sitemap.xml` : undefined,
  };
}
