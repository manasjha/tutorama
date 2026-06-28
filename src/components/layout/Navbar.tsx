import Link from "next/link";

import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { launchAreaLabel } from "@/lib/constants/serviceArea";

type NavbarProps = {
  isAuthenticated?: boolean;
  userEmail?: string | null;
};

export function Navbar({ isAuthenticated = false, userEmail }: NavbarProps) {
  return (
    <header className="border-b border-border-soft bg-card">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          className="font-heading text-xl font-semibold text-trust-blue"
          href={isAuthenticated ? appRoutes.dashboard : publicRoutes.home}
        >
          Tutorama
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-text-muted">
          <span className="hidden sm:inline">{launchAreaLabel}</span>
          {isAuthenticated ? (
            <span className="max-w-40 truncate text-text-primary">{userEmail}</span>
          ) : (
            <Link className="text-trust-blue hover:text-trust-blue/80" href="/login">
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
