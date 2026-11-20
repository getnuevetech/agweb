import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How this website handles inquiries and related contact information.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        showPortrait={false}
        title="Privacy Policy"
        description="How inquiry information is handled on this website."
      />
      <section className="section-y bg-white">
        <Container className="prose-like max-w-3xl space-y-6 text-ink-muted leading-relaxed">
          <p>
            This website is operated by {site.name}. Contact details shown on the site may be used
            to reach me directly by email or phone.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">Inquiries</h2>
          <p>
            When you submit the contact or consultation form, the information you provide (such as
            name, email, company, phone, topic, message, and optional preferred time) is used only
            to review and respond to your inquiry. The contact-permission checkbox covers that
            inquiry only and does not enroll you in marketing messages.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">Delivery and retention</h2>
          <p>
            Inquiry submissions are delivered to the mailbox configured for this website and may be
            stored temporarily to prevent duplicate submissions and support reliable delivery.
            Message contents are not used for advertising analytics.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">Third parties</h2>
          <p>
            Email delivery may use an SMTP provider selected for this website. No newsletter or
            scheduling provider is active unless explicitly configured and disclosed here.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
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
