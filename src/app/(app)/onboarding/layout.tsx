import type { ReactNode } from "react";

import { redirectCompletedOnboarding } from "@/features/auth/route-gates";

type OnboardingLayoutProps = {
  children: ReactNode;
};

export default async function OnboardingLayout({
  children,
}: OnboardingLayoutProps) {
  await redirectCompletedOnboarding();

  return children;
}
