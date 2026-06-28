import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-soft bg-card p-6 shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
