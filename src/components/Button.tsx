import Link from "next/link";
import { cx } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondaryOnDark" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-gold to-gold-light text-navy-deep hover:brightness-95 focus-visible:ring-gold",
  secondary:
    "border border-navy-base text-navy-base bg-transparent hover:bg-navy-base/5 focus-visible:ring-navy-base",
  secondaryOnDark:
    "border border-white text-white bg-transparent hover:bg-white/10 focus-visible:ring-white",
  ghost:
    "text-navy-base hover:text-navy-light underline-offset-4 hover:underline focus-visible:ring-navy-base",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  icon?: ReactNode;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button({
  children,
  className,
  variant = "primary",
  icon,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
