import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { expertiseTags, publishedExperiences } from "@/content/experience";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { IconDocument, IconMail, IconPhone, IconPin } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "A summary of professional background in IT operations, technical consulting, systems implementation, and digital solutions.",
  path: "/resume/",
});

export default function ResumePage() {
  return (
    <>
      <PageHero
        title={
          <>
            Experience and <span className="text-gold">capabilities</span>
          </>
        }
        description="A summary of my professional background in IT operations, technical consulting, systems implementation, and digital solutions."
        actions={
          <>
            {site.resumePdf ? (
              <Button href={site.resumePdf} icon={<IconDocument className="h-4 w-4" />}>
                Download PDF
              </Button>
            ) : (
              <p className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white/85">
                Resume download is being updated. Contact me for a copy.
              </p>
            )}
            <Button href="/contact/" variant="secondaryOnDark">
              Contact Me
            </Button>
          </>
        }
      />

      <section className="section-y bg-white">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <div>
              <div className="gold-rule" />
              <h2 className="font-display text-2xl font-semibold text-ink">Professional Profile</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Technology professional with a broad background across IT engineering, user support,
                network services, systems implementation, software solutions, and technology
                consulting. Experience includes building and supporting technology environments,
                coordinating technical service delivery, and developing cloud, communications, and
                digital-product initiatives.
              </p>
            </div>

            <div>
              <div className="gold-rule" />
              <h2 className="font-display text-2xl font-semibold text-ink">Professional Experience</h2>
              <div className="mt-6 space-y-8">
                {publishedExperiences.map((item) => (
                  <article key={item.id}>
                    <h3 className="text-lg font-semibold text-ink">{item.role}</h3>
                    <p className="text-sm font-medium text-gold">{item.organization}</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div className="card bg-surface-cool">
              <h2 className="font-semibold text-ink">Expertise</h2>
              <ul className="mt-4 space-y-3">
                {expertiseTags.map((tag) => (
                  <li key={tag} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" aria-hidden />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="font-semibold text-ink">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                <li className="flex items-center gap-2">
                  <IconPin className="h-4 w-4 text-gold" />
                  {site.location}
                </li>
                <li className="flex items-center gap-2">
                  <IconMail className="h-4 w-4 text-gold" />
                  <a href={`mailto:${site.emails.primary}`}>{site.emails.primary}</a>
                </li>
                <li className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4 text-gold" />
                  <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
