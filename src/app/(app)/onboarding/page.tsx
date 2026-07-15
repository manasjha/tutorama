import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { getAuthenticatedParentSession } from "@/features/auth/route-gates";
import { getParentFirstName } from "@/features/auth/profile-service";
import { getAnalyticsOnboardingStatus } from "@/features/auth/routing";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { appRoutes } from "@/lib/constants/routes";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const { profile, user } = await getAuthenticatedParentSession();
  const firstName = getParentFirstName(profile, user.email);

  await trackEvent({
    eventName: analyticsEvents.onboardingPageViewed,
    pagePath: appRoutes.onboarding,
    properties: {
      onboarding_status: getAnalyticsOnboardingStatus(profile?.onboarding_status),
    },
    userId: user.id,
  });

  return (
    <PageShell
      title={`Welcome to Tutorama, ${firstName}`}
      description="Let's set up your child's learning profile so we can understand their class, subjects, and tutoring requirement."
    >
      <Card className="max-w-2xl rounded-lg">
        <div className="grid gap-4">
          <p className="text-sm leading-6 text-text-muted">
            Your profile helps Tutorama match the right learning support around
            your child&apos;s needs.
          </p>
          <Link
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-trust-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-blue/90 sm:w-fit"
            href={appRoutes.profile}
          >
            Set Up Your Child&apos;s Profile
          </Link>
        </div>
      </Card>
    </PageShell>
  );
}
