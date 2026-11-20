import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/content/articles";
import { getPublishedProjects } from "@/content/projects";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = (site.origin || "").replace(/\/$/, "") || "https://example.invalid";
  const staticRoutes = [
    "",
    "/about/",
    "/resume/",
    "/services/",
    "/projects/",
    "/blog/",
    "/contact/",
    "/privacy/",
    "/terms/",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${origin}${route || "/"}`,
    lastModified: new Date(),
  }));

  for (const project of getPublishedProjects()) {
    entries.push({
      url: `${origin}/projects/${project.slug}/`,
      lastModified: new Date(),
    });
  }

  for (const article of getPublishedArticles()) {
    entries.push({
      url: `${origin}/blog/${article.slug}/`,
      lastModified: new Date(),
    });
  }

  return entries;
}
