import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { howWeWork, serviceFaqs, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { serviceIcons } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "From IT operations to digital product planning, start with the problem you need to solve.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services • IT Support • Operations • Product"
        title={
          <>
            Practical technology support for{" "}
            <span className="text-gold">your business</span>
          </>
        }
        description="From IT operations to digital product planning, start with the problem you need to solve."
        actions={
          <>
            <Button href="/contact/?intent=consultation">Request a Consultation</Button>
            <Button href="#core-services" variant="secondaryOnDark">
              View Services
            </Button>
          </>
        }
      />

      <section id="core-services" className="section-y bg-white scroll-mt-28">
        <Container>
          <SectionHeading title="Core Technology Services" />
          <nav aria-label="Service sections" className="mt-6 flex flex-wrap gap-3 text-sm">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="rounded-full border border-line px-3 py-2 font-medium text-navy-base hover:border-navy-light"
              >
                {service.title}
              </a>
            ))}
          </nav>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <article id={service.slug} key={service.slug} className="card scroll-mt-28">
                  <Icon className="mb-3 h-7 w-7 text-gold" />
                  <h2 className="font-display text-2xl font-semibold text-ink">{service.title}</h2>
                  <p className="mt-3 text-ink-muted">{service.introduction}</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-ink">Suitable topics</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-ink-muted">
                        {service.suitableTopics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">Typical outputs</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-ink-muted">
                        {service.typicalOutputs.map((output) => (
                          <li key={output}>{output}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link
                    href={`/contact/?intent=consultation&service=${service.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold text-navy-base"
                  >
                    Discuss this service →
                  </Link>
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
          <SectionHeading
            light
            align="center"
            title="A Clear, Practical Process"
            description="How we work from discovery through review."
          />
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {howWeWork.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-gold">0{index + 1}</p>
                <h3 className="mt-2 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/75">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container className="max-w-3xl">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-8">
            <FaqAccordion items={serviceFaqs} />
          </div>
        </Container>
      </section>

      <section className="bg-gold-light/40">
        <Container className="flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
          <p className="font-display text-2xl font-semibold text-ink">
            Ready to discuss your needs?
          </p>
          <Button href="/contact/?intent=consultation">Request a Consultation →</Button>
        </Container>
      </section>
    </>
  );
}
