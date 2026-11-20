import { ContactPageClient } from "@/components/ContactPageClient";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { IconMail, IconPhone, IconPin } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Tell me what you are working on and where you need support.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Let’s <span className="text-gold">work</span> together
          </>
        }
        description="Tell me what you are working on and where you need support."
      />

      <section className="section-y bg-surface-cool">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="grid gap-4">
              <a
                href={`mailto:${site.emails.primary}`}
                className="card flex items-start gap-3 transition hover:border-gold"
              >
                <IconMail className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-ink">Primary email</p>
                  <p className="text-ink-muted">{site.emails.primary}</p>
                </div>
              </a>
              <a
                href={`mailto:${site.emails.secondary}`}
                className="card flex items-start gap-3 transition hover:border-gold"
              >
                <IconMail className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-ink">Secondary email</p>
                  <p className="text-ink-muted">{site.emails.secondary}</p>
                </div>
              </a>
              <a
                href={`tel:${site.phone.tel}`}
                className="card flex items-start gap-3 transition hover:border-gold"
              >
                <IconPhone className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-ink">Mobile</p>
                  <p className="text-ink-muted">{site.phone.display}</p>
                </div>
              </a>
              <div className="card flex items-start gap-3">
                <IconPin className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-ink">Location</p>
                  <p className="text-ink-muted">{site.location}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <h2 className="font-display text-xl font-semibold text-ink">
                Request a Consultation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Prefer a conversation? Use the Consultation tab to share context and an optional
                preferred time. The time is confirmed by email after review.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactPageClient />
          </div>
        </Container>
      </section>
    </>
  );
}
