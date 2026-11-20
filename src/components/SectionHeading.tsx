import { cx } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionEyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={cx(
        "text-xs font-semibold uppercase tracking-[0.14em]",
        light ? "text-gold-light" : "text-navy-light",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : undefined,
        action ? "md:flex-row md:items-end md:justify-between md:text-left" : undefined,
      )}
    >
      <div className={cx("max-w-3xl space-y-3", align === "center" && "mx-auto")}>
        {eyebrow ? <SectionEyebrow light={light}>{eyebrow}</SectionEyebrow> : null}
        <h2
          className={cx(
            "font-display text-fluid-h2 font-semibold tracking-tight",
            light ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cx("text-base leading-relaxed", light ? "text-white/80" : "text-ink-muted")}>
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
