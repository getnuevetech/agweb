import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getProject, getPublishedProjects, getRelatedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    if (!project) return {};
    return pageMetadata({
      title: project.title,
      description: project.seoDescription,
      path: `/projects/${project.slug}/`,
    });
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);
  const sections = [
    { title: "The opportunity", body: project.sections.opportunity },
    { title: "My contribution", body: project.sections.contribution },
    { title: "Workflow focus", body: project.sections.workflow },
    { title: "Current scope", body: project.sections.scope },
  ];

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
                <Link href="/projects/" className="hover:text-white">
                  Projects
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white">{project.title}</li>
            </ol>
          </nav>
        }
        title={project.title}
        description={project.summary}
        actions={
          <Button href={`/contact/?intent=consultation&project=${project.slug}`}>
            Discuss a similar project
          </Button>
        }
      />

      <section className="section-y bg-white">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverImage}
                alt={project.coverAlt}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            {project.imageClassification === "illustrative" ? (
              <p className="mt-3 text-sm text-ink-muted">Illustrative preview</p>
            ) : null}
            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <div className="gold-rule" />
                  <h2 className="font-display text-2xl font-semibold text-ink">{section.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-muted">{section.body}</p>
                </section>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="card sticky top-28 space-y-4 bg-surface-cool">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-light">
                  Category
                </p>
                <p className="mt-1 font-medium text-ink">{project.category}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-light">
                  Focus
                </p>
                <p className="mt-1 font-medium text-ink">{project.focus}</p>
              </div>
              {project.role ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-light">
                    Role
                  </p>
                  <p className="mt-1 font-medium text-ink">{project.role}</p>
                </div>
              ) : null}
              <Button
                href={`/contact/?intent=consultation&project=${project.slug}`}
                className="w-full"
              >
                Discuss a similar project
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {related.length ? (
        <section className="section-y bg-surface-cool">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-ink">Related initiatives</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <article key={item.slug} className="card">
                  <p className="text-sm text-gold">{item.category}</p>
                  <h3 className="mt-2 font-semibold text-ink">
                    <Link href={`/projects/${item.slug}/`}>{item.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{item.summary}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-navy-deep text-white">
        <Container className="py-14 text-center">
          <h2 className="font-display text-fluid-h2 font-semibold">
            Let’s Talk About a Similar Project
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Share the challenge you are solving and we can discuss a practical next step.
          </p>
          <Button
            href={`/contact/?intent=consultation&project=${project.slug}`}
            className="mt-6"
          >
            Discuss a similar project
          </Button>
        </Container>
      </section>
    </>
  );
}
