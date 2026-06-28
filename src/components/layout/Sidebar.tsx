import Link from "next/link";

import { adminRoutes, appRoutes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

type NavItem = {
  label: string;
  href: string;
};

const appNavItems: NavItem[] = [
  { label: "Dashboard", href: appRoutes.dashboard },
  { label: "Profile", href: appRoutes.profile },
  { label: "Tuitions", href: appRoutes.tuitions },
  { label: "Schedule", href: appRoutes.scheduleClass },
];

const adminNavItems: NavItem[] = [
  { label: "Overview", href: adminRoutes.dashboard },
  { label: "Students", href: adminRoutes.students },
  { label: "Tuitions", href: adminRoutes.tuitions },
  { label: "Classes", href: adminRoutes.classes },
  { label: "Tutors", href: adminRoutes.tutors },
  { label: "Payments", href: adminRoutes.payments },
];

type SidebarProps = {
  variant?: "app" | "admin";
  className?: string;
};

export function Sidebar({ variant = "app", className }: SidebarProps) {
  const items = variant === "admin" ? adminNavItems : appNavItems;

  return (
    <aside className={cn("rounded-2xl border border-border-soft bg-card p-3", className)}>
      <nav className="grid gap-1">
        {items.map((item) => (
          <Link
            className="rounded-xl px-3 py-2 text-sm font-medium text-text-muted transition hover:bg-background hover:text-text-primary"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
