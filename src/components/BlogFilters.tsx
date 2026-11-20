"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  articleCategories,
  estimateReadingMinutes,
  type Article,
  type ArticleCategory,
} from "@/content/articles";
import { Button } from "./Button";
import { IconSearch } from "./Icons";
import { cx } from "@/lib/utils";

export function BlogFilters({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") || "All") as "All" | ArticleCategory;
  const q = searchParams.get("q") || "";
  const [draft, setDraft] = useState(q);

  const available = useMemo(() => {
    const present = new Set(articles.map((a) => a.category));
    return articleCategories.filter((c) => c === "All" || present.has(c as ArticleCategory));
  }, [articles]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return articles.filter((article) => {
      const categoryOk = category === "All" || article.category === category;
      if (!categoryOk) return false;
      if (!query) return true;
      const haystack = [article.title, article.excerpt, article.category, ...article.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [articles, category, q]);

  function pushParams(next: { category?: string; q?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory = next.category ?? category;
    const nextQ = next.q ?? q;
    if (!nextCategory || nextCategory === "All") params.delete("category");
    else params.set("category", nextCategory);
    if (!nextQ) params.delete("q");
    else params.set("q", nextQ);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function onSearch(event: FormEvent) {
    event.preventDefault();
    pushParams({ q: draft });
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row" role="search">
        <label className="sr-only" htmlFor="article-search">
          Search articles
        </label>
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            id="article-search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-lg border border-line py-2.5 pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-base"
          />
        </div>
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
        {available.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => pushParams({ category: item })}
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

      <p className="sr-only" aria-live="polite">
        {filtered.length} articles found
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-surface-cool p-8 text-center">
          <p className="text-ink">No articles match your search. Try another term or clear the filters.</p>
          <Button
            className="mt-4"
            variant="secondary"
            onClick={() => {
              setDraft("");
              pushParams({ category: "All", q: "" });
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <article key={article.slug} className="card flex flex-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.coverImage}
                alt={article.coverAlt}
                className="mb-4 aspect-[16/9] w-full rounded-lg object-cover"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-light">
                {article.category}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                <Link href={`/blog/${article.slug}/`}>{article.title}</Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink-muted">{article.excerpt}</p>
              <p className="mt-3 text-xs text-ink-muted">
                {estimateReadingMinutes(article)} min read
              </p>
              <Link
                href={`/blog/${article.slug}/`}
                className="mt-4 text-sm font-semibold text-navy-base"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
