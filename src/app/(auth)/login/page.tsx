import { redirect } from "next/navigation";
import Link from "next/link";

import { LandingWordmark } from "@/components/landing/LandingWordmark";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { getParentProfile } from "@/features/auth/profile-service";
import {
  getAnalyticsOnboardingStatus,
  getPostLoginDestination,
} from "@/features/auth/routing";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

import { GoogleLoginButton } from "./GoogleLoginButton";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
    mode?: string;
  }>;
};

const errorCopy: Record<string, string> = {
  callback_failed:
    "Your Google sign-in could not be completed. Please return to login and try again.",
  email_not_confirmed:
    "Please finish confirming your email, then try again.",
  invalid_credentials: "That email and password did not match. Please try again.",
  login_failed: "We could not log you in. Check your email and password.",
  google_callback_failed:
    "Your Google sign-in could not be completed. Please return to login and try again.",
  oauth_failed: "We couldn't connect to Google. Please try again.",
  profile_setup_failed:
    "You're signed in, but we couldn't finish setting up your Tutorama account. Please try again.",
  signup_failed:
    "We could not create your account. Please check the details and try again.",
  supabase_not_configured:
    "Google sign-in is not available in this environment yet.",
};

const messageCopy: Record<string, string> = {
  check_email:
    "Check your email to confirm your account, then return here to log in with the same email and password.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  await trackEvent({
    eventName: analyticsEvents.loginPageViewed,
    pagePath: "/login",
  });

  const params = await searchParams;
  const errorType = params.error && errorCopy[params.error] ? params.error : "unknown";

  if (params.error) {
    await trackEvent({
      eventName: analyticsEvents.authErrorShown,
      pagePath: "/login",
      properties: { error_type: errorType },
    });
  }

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const profile = await getParentProfile(supabase, user.id).catch(() => null);
      const destination = getPostLoginDestination(profile?.onboarding_status);

      await trackEvent({
        eventName: analyticsEvents.postLoginRouted,
        pagePath: "/login",
        userId: user.id,
        properties: {
          auth_method: "existing_session",
          destination,
          onboarding_status: getAnalyticsOnboardingStatus(
            profile?.onboarding_status,
          ),
        },
      });

      redirect(destination);
    }
  }

  return (
    <PublicLayout showNavbar={false}>
      <div className="mx-auto grid max-w-xl gap-6">
        <div className="mx-auto grid max-w-2xl justify-items-center text-center">
          <LandingWordmark />
          <h1 className="mt-2 font-heading text-3xl font-semibold text-text-primary sm:text-4xl">
            Enter Tutorama
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base sm:leading-7">
            Continue with Google to access your child&apos;s Tutorama setup,
            classes, and progress updates.
          </p>
        </div>

        {params.error ? (
          <ErrorState
            title="Sign-in needs attention"
            message={errorCopy[params.error] ?? "Please try again."}
          />
        ) : null}

        {params.message ? (
          <Card className="rounded-lg border-success/20 bg-success/5 text-sm leading-6 text-text-primary">
            {messageCopy[params.message] ?? "You can continue when ready."}
          </Card>
        ) : null}

        {!isSupabaseConfigured() ? (
          <ErrorState
            title="Google sign-in unavailable"
            message="Google sign-in is not available in this environment yet."
          />
        ) : null}

        <Card className="rounded-lg">
          <div className="grid gap-4">
            <GoogleLoginButton disabled={!isSupabaseConfigured()} />
            <p className="text-center text-xs leading-5 text-text-muted">
              We use your basic Google profile to create and secure your
              Tutorama account.
            </p>
          </div>
        </Card>

        <Link
          className="justify-self-center text-sm font-semibold text-trust-blue hover:text-trust-blue/80"
          href={publicRoutes.home}
        >
          Back to Tutorama
        </Link>
      </div>
    </PublicLayout>
  );
}
