import type { ReactNode } from "react";
import { Container } from "./Container";
import { Portrait } from "./Portrait";
import { SectionEyebrow } from "./SectionHeading";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  showPortrait = true,
  breadcrumb,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  showPortrait?: boolean;
  breadcrumb?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/bg-hero.jpg')] bg-cover bg-center opacity-45"
      />
      <div className="relative">
        <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12">
          <div className={showPortrait ? "lg:col-span-7" : "lg:col-span-10"}>
            {breadcrumb}
            {eyebrow ? (
              <div className="mb-4">
                <SectionEyebrow light>{eyebrow}</SectionEyebrow>
              </div>
            ) : null}
            <h1 className="font-display text-fluid-h1 font-semibold tracking-tight text-balance">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                {description}
              </p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
          </div>
          {showPortrait ? (
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <Portrait priority />
            </div>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
