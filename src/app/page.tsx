import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Portrait } from "@/components/Portrait";
import { SectionHeading } from "@/components/SectionHeading";
import { publishedExperiences, qualitativeHighlights } from "@/content/experience";
import { getPublishedProjects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import {
  IconArrow,
  IconCalendar,
  IconDocument,
  IconMail,
  IconPhone,
  IconPin,
  serviceIcons,
} from "@/components/Icons";

export const metadata = pageMetadata({
  title: site.name,
  description:
    "I help organizations build, secure, and scale reliable technology solutions — from IT operations and infrastructure to business technology strategy and product innovation.",
  path: "/",
});

const expertise = [
  {
    title: "IT Infrastructure & Systems Administration",
    description: "Design, implement, and manage reliable environments your teams can depend on.",
    icon: "systems" as const,
    href: "/services/#systems-administration",
  },
  {
    title: "IT Support & Operations Leadership",
    description: "Strengthen support operations, ownership, and day-to-day service delivery.",
    icon: "support" as const,
    href: "/services/#support-leadership",
  },
  {
    title: "Business Technology Strategy",
    description: "Align technology decisions with business priorities and practical constraints.",
    icon: "consult" as const,
    href: "/services/#it-consulting",
  },
  {
    title: "Product Innovation & Delivery",
    description: "Move product requirements from idea through implementation planning.",
    icon: "strategy" as const,
    href: "/services/#product-strategy",
  },
];

export default function HomePage() {
  const projects = getPublishedProjects().slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/bg-hero.jpg')] bg-cover bg-center opacity-45"
        />
        <Container className="relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
              Technology • People • Business Impact
            </p>
            <h1 className="mt-4 font-display text-fluid-h1 font-semibold tracking-tight text-balance">
              IT Consultant, Systems Administrator &{" "}
              <span className="text-gold">Technology Strategist</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              I help organizations build, secure, and scale reliable technology solutions — from IT
              operations and infrastructure to business technology strategy and product innovation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/resume/" icon={<IconDocument className="h-4 w-4" />}>
                View Resume
              </Button>
              <Button
                href="/contact/?intent=consultation"
                variant="secondaryOnDark"
                icon={<IconCalendar className="h-4 w-4" />}
              >
                Request a Consultation
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <Portrait priority variant="home" />
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About Me"
              title="A Technology Leader with a Business Mindset"
              description="I’m Agboola Olomola, an IT consultant, systems administrator, and technology entrepreneur. My work connects hands-on technical problem-solving with business requirements, service delivery, and digital product development."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {qualitativeHighlights.map((item) => (
                <div key={item.title} className="rounded-xl border border-line bg-surface-cool p-4">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              ))}
            </div>
            <Button href="/about/" className="mt-8" variant="secondary" icon={<IconArrow className="h-4 w-4" />}>
              More About Me
            </Button>
          </div>
          <div className="lg:col-span-7">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-navy-light">
              Core Expertise
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {expertise.map((item) => {
                const Icon = serviceIcons[item.icon];
                return (
                  <Link key={item.title} href={item.href} className="card block transition hover:border-gold">
                    <Icon className="mb-3 h-6 w-6 text-gold" />
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/bg-band.jpg')] bg-cover bg-center opacity-35"
        />
        <Container className="relative grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <SectionHeading
            light
            eyebrow="Experience Highlights"
            title="A Track Record of Delivering Technology Impact"
            description="Technology consulting, technical support and field services, and IT engineering grounded in practical delivery."
          />
          <ol className="space-y-6 border-l border-gold/50 pl-6">
            {publishedExperiences.map((item) => (
              <li key={item.id} className="relative">
                <span className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full bg-gold" />
                <h3 className="font-semibold text-white">{item.role}</h3>
                <p className="text-sm text-gold-light">{item.organization}</p>
                <p className="mt-2 text-sm text-white/75">{item.summary}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="Projects"
            title="Selected Work & Initiatives"
            description="Approved initiatives across communications, digital platforms, and operational workflows."
            action={
              <Link href="/projects/" className="text-sm font-semibold text-navy-base">
                View All Projects →
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="card">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-light">
                  {project.category}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
                </h3>
                <p className="mt-3 text-sm text-ink-muted">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-surface-cool px-3 py-1 text-xs font-medium text-ink">
                    {project.category}
                  </span>
                  <span className="rounded-full bg-surface-cool px-3 py-1 text-xs font-medium text-ink">
                    Initiative
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-surface-cool">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Services"
            title="How I Can Help"
            description="Practical technology support across consulting, systems, support leadership, and product strategy."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <article key={service.slug} className="card bg-white text-center md:text-left">
                  <Icon className="mx-auto mb-3 h-7 w-7 text-gold md:mx-0" />
                  <h3 className="font-semibold text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{service.cardDescription}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container className="grid gap-8 lg:grid-cols-3 lg:items-center">
          <div>
            <SectionHeading
              title="Let’s Work Together"
              description="Share the challenge, the system you are improving, or the idea you want to develop."
            />
          </div>
          <ul className="space-y-4 text-sm text-ink">
            <li className="flex items-center gap-3">
              <IconMail className="h-5 w-5 text-gold" />
              <a href={`mailto:${site.emails.primary}`}>{site.emails.primary}</a>
            </li>
            <li className="flex items-center gap-3">
              <IconPhone className="h-5 w-5 text-gold" />
              <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
            </li>
            <li className="flex items-center gap-3">
              <IconPin className="h-5 w-5 text-gold" />
              {site.location}
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            <Button href="/contact/?intent=consultation">Request a Consultation</Button>
            <Button href="/contact/" variant="secondary">
              Send a Message
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
