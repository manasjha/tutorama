export const onboardingStatuses = [
  "not_started",
  "in_progress",
  "completed",
] as const;

export type OnboardingStatus = (typeof onboardingStatuses)[number];

export type AuthActionState = {
  error?: string;
  message?: string;
};
