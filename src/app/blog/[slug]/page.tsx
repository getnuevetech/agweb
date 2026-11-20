import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import {
  estimateReadingMinutes,
  getArticle,
  getPublishedArticles,
} from "@/content/articles";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const published = getPublishedArticles();
  // Static export requires at least one path while articles remain unpublished.
  if (published.length === 0) {
    return [{ slug: "__unpublished__" }];
  }
  return published.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const article = getArticle(slug);
    if (!article) return {};
    return pageMetadata({
      title: article.title,
      description: article.seoDescription,
      path: `/blog/${article.slug}/`,
    });
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "__unpublished__") notFound();
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getPublishedArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        showPortrait={false}
        breadcrumb={
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blog/" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white">{article.category}</li>
            </ol>
          </nav>
        }
        title={article.title}
        description={`${article.author}${article.publishedAt ? ` · ${article.publishedAt}` : ""} · ${estimateReadingMinutes(article)} min read`}
      />

      <section className="section-y bg-white">
        <Container className="grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.coverAlt}
              className="mb-8 aspect-[16/9] w-full rounded-xl object-cover"
            />
            <div className="mx-auto max-w-[720px] space-y-8 text-[1.05rem] leading-8 text-ink md:text-lg md:leading-[1.9]">
              {article.body.map((section) => (
                <section key={section.heading} id={section.heading.toLowerCase().replace(/\s+/g, "-")}>
                  <div className="gold-rule" />
                  <h2 className="font-display text-2xl font-semibold text-ink">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-ink-muted">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>

          {article.body.length >= 3 ? (
            <aside className="lg:col-span-4">
              <div className="card sticky top-28">
                <h2 className="font-semibold text-ink">In this article</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {article.body.map((section) => (
                    <li key={section.heading}>
                      <a
                        href={`#${section.heading.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-navy-base hover:underline"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </Container>
      </section>

      {related.length ? (
        <section className="section-y bg-surface-cool">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-ink">Related articles</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="card">
                  <h3 className="font-semibold text-ink">
                    <Link href={`/blog/${item.slug}/`}>{item.title}</Link>
                  </h3>
                  <Link href={`/blog/${item.slug}/`} className="mt-3 inline-block text-sm font-semibold text-navy-base">
                    Read article →
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-navy-deep text-white">
        <Container className="py-14 text-center">
          <h2 className="font-display text-fluid-h2 font-semibold">
            Let’s Talk About Your IT Operations
          </h2>
          <Button href="/contact/?intent=consultation&service=support-leadership" className="mt-6">
            Discuss your IT operations
          </Button>
        </Container>
      </section>
    </>
  );
}
