import Link from "next/link";

import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { launchAreaLabel } from "@/lib/constants/serviceArea";

type NavbarProps = {
  isAuthenticated?: boolean;
  userEmail?: string | null;
};

export function Navbar({ isAuthenticated = false, userEmail }: NavbarProps) {
  const landingLinks = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#subjects", label: "Subjects" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="border-b border-border-soft bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link
          className="font-heading text-xl font-semibold text-trust-blue"
          href={isAuthenticated ? appRoutes.dashboard : publicRoutes.home}
        >
          Tutorama
        </Link>
        {!isAuthenticated ? (
          <nav className="order-3 flex w-full gap-4 overflow-x-auto text-sm font-semibold text-text-muted md:order-none md:w-auto md:overflow-visible">
            {landingLinks.map((link) => (
              <Link
                className="shrink-0 transition hover:text-trust-blue"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
        <nav className="flex items-center gap-3 text-sm font-medium text-text-muted">
          <span className="hidden lg:inline">{launchAreaLabel}</span>
          {isAuthenticated ? (
            <span className="max-w-40 truncate text-text-primary">{userEmail}</span>
          ) : (
            <>
              <Link className="text-trust-blue hover:text-trust-blue/80" href="/login">
                Log In
              </Link>
              <Link
                className="hidden min-h-10 items-center justify-center rounded-xl bg-trust-blue px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-trust-blue/90 sm:inline-flex"
                href="/login"
              >
                Sign Up & Book Tuitions
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
