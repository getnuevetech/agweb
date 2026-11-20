import { Suspense } from "react";
import { BlogFilters } from "@/components/BlogFilters";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getPublishedArticles } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Practical observations on IT operations, automation, systems integration, and digital product development.",
  path: "/blog/",
});

export default function BlogPage() {
  const articles = getPublishedArticles();

  return (
    <>
      <PageHero
        portraitVariant="blog"
        title={
          <>
            Notes on <span className="text-gold">technology</span> and business
          </>
        }
        description="Practical observations on IT operations, automation, systems integration, and digital product development."
      />

      <section className="section-y bg-white">
        <Container>
          {articles.length === 0 ? (
            <div className="rounded-xl border border-line bg-surface-cool p-10 text-center">
              <p className="text-lg text-ink">Articles are being prepared.</p>
              <p className="mt-2 text-ink-muted">
                Draft topics are in review and will appear here once published.
              </p>
              <Button href="/contact/" className="mt-6" variant="secondary">
                Contact Me
              </Button>
            </div>
          ) : (
            <Suspense fallback={<p className="text-ink-muted">Loading articles…</p>}>
              <BlogFilters articles={articles} />
            </Suspense>
          )}
        </Container>
      </section>
    </>
  );
}
