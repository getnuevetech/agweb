"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project, ProjectCategory } from "@/content/projects";
import { projectCategories } from "@/content/projects";
import { Button } from "./Button";
import { cx } from "@/lib/utils";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") || "All") as "All" | ProjectCategory;

  const available = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return projectCategories.filter((c) => c === "All" || present.has(c as ProjectCategory));
  }, [projects]);

  const filtered = useMemo(() => {
    if (category === "All") return projects;
    return projects.filter((p) => p.category === category);
  }, [category, projects]);

  function setCategory(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("category");
    else params.set("category", next);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {available.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cx(
              "min-h-11 rounded-full border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-base",
              category === item
                ? "border-gold bg-gold text-navy-deep"
                : "border-line bg-white text-ink hover:border-navy-light",
            )}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-surface-cool p-8 text-center">
          <p className="text-ink">No projects match this category.</p>
          <Button className="mt-4" variant="secondary" onClick={() => setCategory("All")}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {filtered.map((project) => (
            <article key={project.slug} className="card grid gap-6 md:grid-cols-[240px_1fr] md:items-center">
              <div className="overflow-hidden rounded-lg border border-line bg-surface-cool">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={project.coverAlt}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-light">
                  {project.imageClassification === "illustrative"
                    ? "Illustrative preview"
                    : "Initiative overview"}
                </p>
                <p className="mt-2 text-sm font-medium text-gold">{project.category}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink">
                  <Link href={`/projects/${project.slug}/`} className="hover:text-navy-light">
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-3 text-ink-muted">{project.summary}</p>
                <Link
                  href={`/projects/${project.slug}/`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-base"
                >
                  View Initiative →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
