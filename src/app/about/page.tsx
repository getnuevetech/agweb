import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { publishedExperiences } from "@/content/experience";
import { pageMetadata } from "@/lib/seo";
import { IconCalendar, IconDocument, serviceIcons } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "About",
  description:
    "I help organizations connect practical IT operations with business goals.",
  path: "/about/",
});

const approach = [
  {
    title: "Understand",
    description: "Learn the business context, the current environment, and the outcome that matters.",
    icon: "consult" as const,
  },
  {
    title: "Plan",
    description: "Translate requirements into a practical scope, priorities, and implementation steps.",
    icon: "strategy" as const,
  },
  {
    title: "Deliver",
    description: "Coordinate the technical work, test key workflows, and document the result.",
    icon: "systems" as const,
  },
  {
    title: "Support",
    description: "Review operation, clarify ownership, and identify the next improvements.",
    icon: "support" as const,
  },
];

const focusAreas = [
  {
    title: "IT Operations",
    description: "Reliable day-to-day systems and support that keep work moving.",
  },
  {
    title: "Systems Integration",
    description: "Connecting tools and workflows so information moves with purpose.",
  },
  {
    title: "Business Automation",
    description: "Repeatable processes that reduce avoidable manual effort.",
  },
  {
    title: "Digital Products",
    description: "Requirements, user journeys, and implementation planning.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        portraitVariant="about"
        title={
          <>
            Technology with a <span className="text-gold">business mindset</span>
          </>
        }
        description="I help organizations connect practical IT operations with business goals."
        actions={
          <>
            <Button href="/resume/" icon={<IconDocument className="h-4 w-4" />}>
              View Resume
            </Button>
            <Button href="/contact/" variant="secondaryOnDark" icon={<IconCalendar className="h-4 w-4" />}>
              Contact Me
            </Button>
          </>
        }
      />

      <section className="section-y bg-white">
        <Container className="max-w-3xl">
          <div className="gold-rule" />
          <h2 className="font-display text-fluid-h2 font-semibold text-ink">
            Technology with a business mindset
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted">
            <p>
              I’m Agboola Olomola, a Houston-based technology professional working across IT
              operations, technical consulting, systems implementation, and digital solutions. I
              enjoy understanding how people use technology, identifying where processes break down,
              and turning business requirements into practical technical work.
            </p>
            <p>
              My background spans user support, network and infrastructure services, systems
              integration, and technology product initiatives. I combine hands-on problem-solving
              with requirements analysis, documentation, and coordination across technical and
              business stakeholders.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-y bg-surface-cool">
        <Container>
          <SectionHeading title="My Approach" description="A clear way of working from context to continuous improvement." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((item) => {
              const Icon = serviceIcons[item.icon];
              return (
                <article key={item.title} className="card">
                  <Icon className="mb-3 h-6 w-6 text-gold" />
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/bg-band.jpg')] bg-cover bg-center opacity-30"
        />
        <Container className="relative py-16 md:py-20">
          <SectionHeading light title="Areas of Focus" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((item) => (
              <article key={item.title}>
                <div className="gold-rule" />
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/75">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            title="Experience and Initiatives"
            description="Professional background references across consulting, technical support, and IT engineering."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {publishedExperiences.map((item) => (
              <article key={item.id} className="card">
                <h3 className="font-display text-xl font-semibold text-ink">{item.organization}</h3>
                <p className="mt-2 text-sm font-medium text-gold">{item.role}</p>
                <p className="mt-3 text-sm text-ink-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-deep text-white">
        <Container className="relative py-16 text-center md:py-20">
          <h2 className="font-display text-fluid-h2 font-semibold">
            Let’s discuss your technology needs.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Share the challenge, the system you are improving, or the idea you want to develop.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact/?intent=consultation">Request a Consultation</Button>
            <Button href="/contact/" variant="secondaryOnDark">
              Contact Me
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
