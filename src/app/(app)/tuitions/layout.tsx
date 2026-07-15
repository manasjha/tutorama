import type { ReactNode } from "react";

import { requireCompletedOnboarding } from "@/features/auth/route-gates";

type TuitionsLayoutProps = {
  children: ReactNode;
};

export default async function TuitionsLayout({ children }: TuitionsLayoutProps) {
  await requireCompletedOnboarding();

  return children;
}
