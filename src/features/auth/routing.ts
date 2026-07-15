import { appRoutes } from "@/lib/constants/routes";

import { onboardingStatuses, type OnboardingStatus } from "./auth-types";

export function isOnboardingStatus(
  status: string | null | undefined,
): status is OnboardingStatus {
  return onboardingStatuses.includes(status as OnboardingStatus);
}

export function getAnalyticsOnboardingStatus(
  status: string | null | undefined,
) {
  if (!status) {
    return "missing";
  }

  return isOnboardingStatus(status) ? status : "invalid";
}

export function getPostLoginDestination(status: string | null | undefined) {
  return status === "completed" ? appRoutes.dashboard : appRoutes.onboarding;
}

export function hasCompletedOnboarding(status: string | null | undefined) {
  return getPostLoginDestination(status) === appRoutes.dashboard;
}
