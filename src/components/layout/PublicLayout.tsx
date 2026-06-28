import type { ReactNode } from "react";

import { Navbar } from "./Navbar";

type PublicLayoutProps = {
  children: ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {children}
      </main>
    </div>
  );
}
