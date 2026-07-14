import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { Navbar } from "./Navbar";

type PublicLayoutProps = {
  children: ReactNode;
  mainClassName?: string;
  variant?: "default" | "landing";
};

export function PublicLayout({
  children,
  mainClassName,
  variant = "default",
}: PublicLayoutProps) {
  const isLanding = variant === "landing";

  return (
    <div
      className={cn(
        "min-h-screen text-text-primary",
        isLanding ? "bg-[#FDF8F0]" : "bg-background",
      )}
    >
      <Navbar variant={variant} />
      <main
        className={cn(
          isLanding
            ? "w-full"
            : "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16",
          mainClassName,
        )}
      >
        {children}
      </main>
    </div>
  );
}
