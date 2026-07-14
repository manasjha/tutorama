import Link from "next/link";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { LandingWordmark } from "@/components/landing/LandingWordmark";
import { analyticsEvents } from "@/lib/analytics/events";
import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { launchAreaLabel } from "@/lib/constants/serviceArea";
import { cn } from "@/lib/utils/cn";

type NavbarProps = {
  isAuthenticated?: boolean;
  variant?: "default" | "landing";
  userEmail?: string | null;
};

export function Navbar({
  isAuthenticated = false,
  userEmail,
  variant = "default",
}: NavbarProps) {
  const isLanding = variant === "landing" && !isAuthenticated;
  const landingLinks = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#subjects", label: "Subjects" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ];
  const logoHref = isAuthenticated ? appRoutes.dashboard : publicRoutes.home;

  return (
    <header
      className={cn(
        "border-b",
        isLanding
          ? "sticky top-0 z-40 border-[#1B2A4A]/10 bg-[#FDF8F0]/95 backdrop-blur"
          : "border-border-soft bg-card",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        {isLanding ? (
          <LandingWordmark href={logoHref} />
        ) : (
          <Link
            className="font-heading text-xl font-semibold text-trust-blue"
            href={logoHref}
          >
            Tutorama
          </Link>
        )}
        {!isAuthenticated ? (
          <nav
            className={cn(
              "order-3 flex w-full gap-4 overflow-x-auto text-sm font-semibold md:order-none md:w-auto md:overflow-visible",
              isLanding ? "text-[#526070]" : "text-text-muted",
            )}
          >
            {landingLinks.map((link) => (
              <Link
                className={cn(
                  "shrink-0 transition",
                  isLanding ? "hover:text-[#1B2A4A]" : "hover:text-trust-blue",
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
        <nav
          className={cn(
            "flex items-center gap-3 text-sm font-medium",
            isLanding ? "text-[#526070]" : "text-text-muted",
          )}
        >
          <span className="hidden xl:inline">{launchAreaLabel}</span>
          {isAuthenticated ? (
            <span className="max-w-40 truncate text-text-primary">{userEmail}</span>
          ) : isLanding ? (
            <>
              <TrackedLink
                className="font-semibold text-[#1B2A4A] hover:text-[#26385F]"
                eventName={analyticsEvents.landingLoginClicked}
                href="/login"
                properties={{
                  cta_location: "navbar",
                  cta_text: "Log In",
                }}
              >
                Log In
              </TrackedLink>
              <TrackedLink
                className="hidden min-h-10 items-center justify-center rounded-lg bg-[#1B2A4A] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#26385F] sm:inline-flex"
                eventName={analyticsEvents.landingPrimaryCtaClicked}
                href="/login"
                properties={{
                  cta_location: "navbar",
                  cta_text: "Sign Up & Book Tuitions",
                }}
              >
                Sign Up & Book Tuitions
              </TrackedLink>
            </>
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
