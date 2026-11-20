import Image from "next/image";
import { site } from "@/content/site";
import { cx } from "@/lib/utils";

export function Portrait({
  className,
  priority = false,
  size = "lg",
}: {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-40 w-40",
    md: "h-56 w-56 md:h-64 md:w-64",
    lg: "h-64 w-64 max-w-[280px] md:h-80 md:w-80",
  };

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[1.25rem] border-2 border-gold shadow-card",
        sizes[size],
        className,
      )}
    >
      <Image
        src={site.portrait.src}
        alt={site.portrait.alt}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes="(max-width: 768px) 280px, 320px"
      />
    </div>
  );
}
