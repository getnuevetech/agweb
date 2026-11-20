import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms for using the Agboola Olomola personal website.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        showPortrait={false}
        title="Terms of Use"
        description="Terms for visiting and contacting through this website."
      />
      <section className="section-y bg-white">
        <Container className="max-w-3xl space-y-6 leading-relaxed text-ink-muted">
          <p>
            By using this website, you agree to use it for lawful purposes and to provide accurate
            information when submitting an inquiry.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">Information on this site</h2>
          <p>
            Content describes professional services and initiatives for informational purposes.
            Project pages may include illustrative previews. Engagement terms, pricing, and
            deliverables are agreed separately after requirements are understood.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">No guaranteed outcomes</h2>
          <p>
            Submitting a consultation request does not create a confirmed appointment, contract, or
            guaranteed business outcome.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">Contact</h2>
          <p>
            For questions about these terms, email{" "}
            <a className="text-navy-base underline" href={`mailto:${site.emails.primary}`}>
              {site.emails.primary}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
