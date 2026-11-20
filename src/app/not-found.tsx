import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="section-y bg-white">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy-light">404</p>
        <h1 className="mt-3 font-display text-fluid-h1 font-semibold text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-ink-muted">
          The page you requested is unavailable. It may have moved or is not published yet.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/contact/" variant="secondary">
            Contact Me
          </Button>
        </div>
      </Container>
    </section>
  );
}
