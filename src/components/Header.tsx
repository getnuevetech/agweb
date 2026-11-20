"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navLinks, site } from "@/content/site";
import { cx } from "@/lib/utils";
import { Container } from "./Container";
import { Button } from "./Button";
import { IconClose, IconMenu } from "./Icons";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/projects")) return pathname.startsWith("/projects");
  if (href.startsWith("/blog")) return pathname.startsWith("/blog");
  return pathname === href || pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b border-transparent bg-navy-deep/95 text-white backdrop-blur",
        scrolled && "border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
      )}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span className="font-display text-xl font-bold text-gold">{site.monogram}</span>
          <span className="text-sm font-medium tracking-wide text-white md:text-base">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  active ? "text-gold" : "text-white/85 hover:text-white",
                )}
              >
                <span className="relative">
                  {link.label}
                  {active ? (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-gold" />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/20 text-white lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-0 top-[68px] z-40 bg-navy-deep lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <Container className="flex h-full flex-col py-8">
            <nav aria-label="Mobile primary" className="flex flex-1 flex-col gap-2">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "rounded-lg px-2 py-3 font-display text-3xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      active ? "text-gold" : "text-white",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="space-y-4 border-t border-white/10 pt-6">
              <Button href="/contact/?intent=consultation" variant="primary" className="w-full">
                Request a Consultation
              </Button>
              <p className="flex items-center gap-2 text-sm text-white/70">
                <span>{site.locationShort}</span>
              </p>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
