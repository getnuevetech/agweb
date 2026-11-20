import { cx } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-content px-5 md:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
