import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  children: ReactNode;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-border-soft bg-background text-text-muted",
  info: "border-info/20 bg-info/10 text-info",
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-warning/10 text-warning",
  danger: "border-error/20 bg-error/10 text-error",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
