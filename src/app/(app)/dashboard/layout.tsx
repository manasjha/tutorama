import type { ReactNode } from "react";

import { requireCompletedOnboarding } from "@/features/auth/route-gates";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  await requireCompletedOnboarding();

  return children;
}
