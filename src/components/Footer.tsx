import Link from "next/link";
import { services } from "@/content/services";
import { navLinks, site } from "@/content/site";
import { Container } from "./Container";
import { IconLinkedIn, IconMail, IconPhone, IconPin } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/bg-footer.jpg')] bg-cover bg-center opacity-35"
      />
      <div className="relative">
        <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-gold">{site.monogram}</span>
              <span className="font-medium">{site.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/75">{site.brandLine}</p>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/20 text-gold hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Agboola Olomola on LinkedIn (opens in a new tab)"
            >
              <IconLinkedIn className="h-5 w-5" />
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-gold-light">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-gold-light">
              Services
            </h2>
            <ul className="space-y-2 text-sm text-white/80">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/#${service.slug}`}
                    className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold-light">
              Contact
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a className="inline-flex items-center gap-2 hover:text-white" href={`mailto:${site.emails.primary}`}>
                  <IconMail className="h-4 w-4 text-gold" />
                  {site.emails.primary}
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-white" href={`mailto:${site.emails.secondary}`}>
                  <IconMail className="h-4 w-4 text-gold" />
                  {site.emails.secondary}
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-white" href={`tel:${site.phone.tel}`}>
                  <IconPhone className="h-4 w-4 text-gold" />
                  {site.phone.display}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <IconPin className="h-4 w-4 text-gold" />
                {site.location}
              </li>
            </ul>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="flex flex-col gap-3 py-5 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy/" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms/" className="hover:text-white">
                Terms of Use
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
