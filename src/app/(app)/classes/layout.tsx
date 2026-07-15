import type { ReactNode } from "react";

import { requireCompletedOnboarding } from "@/features/auth/route-gates";

type ClassesLayoutProps = {
  children: ReactNode;
};

export default async function ClassesLayout({ children }: ClassesLayoutProps) {
  await requireCompletedOnboarding();

  return children;
}
