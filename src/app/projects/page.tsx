import { Suspense } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ProjectFilters } from "@/components/ProjectFilters";
import { getPublishedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Explore technology and product initiatives across communications, digital platforms, and operational workflows.",
  path: "/projects/",
});

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <>
      <PageHero
        portraitVariant="projects"
        eyebrow="Projects • Initiatives • Solutions"
        title={
          <>
            Selected <span className="text-gold">work and initiatives</span>
          </>
        }
        description="Explore technology and product initiatives across communications, digital platforms, and operational workflows."
        actions={
          <>
            <Button href="#project-list">View All Projects</Button>
            <Button href="/contact/?intent=consultation" variant="secondaryOnDark">
              Discuss an Initiative
            </Button>
          </>
        }
      />

      <section id="project-list" className="section-y bg-white scroll-mt-28">
        <Container>
          {projects.length === 0 ? (
            <div className="rounded-xl border border-line bg-surface-cool p-10 text-center">
              <p className="text-ink">Project details are being prepared.</p>
              <Button href="/contact/" className="mt-4" variant="secondary">
                Contact Me
              </Button>
            </div>
          ) : (
            <Suspense fallback={<p className="text-ink-muted">Loading projects…</p>}>
              <ProjectFilters projects={projects} />
            </Suspense>
          )}
        </Container>
      </section>
    </>
  );
}
