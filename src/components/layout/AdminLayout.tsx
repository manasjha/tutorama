import type { ReactNode } from "react";

import { logout } from "@/features/auth/auth-actions";

import { Button } from "../ui/Button";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

type AdminLayoutProps = {
  children: ReactNode;
  userEmail?: string | null;
};

export function AdminLayout({ children, userEmail }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar isAuthenticated userEmail={userEmail} />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:py-8">
        <div className="grid gap-4 self-start">
          <div className="rounded-2xl border border-border-soft bg-card p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-text-muted">Founder Admin</p>
            <p className="mt-1 font-heading text-lg font-semibold text-text-primary">
              Operations
            </p>
          </div>
          <Sidebar variant="admin" />
          <form action={logout}>
            <Button className="w-full" type="submit" variant="ghost">
              Log Out
            </Button>
          </form>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
