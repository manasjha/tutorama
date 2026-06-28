import { redirect } from "next/navigation";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { Input } from "@/components/ui/Input";
import {
  login,
  loginWithGoogle,
  signUp,
} from "@/features/auth/auth-actions";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { appRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

import { LoginSubmitButton } from "./LoginSubmitButton";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
    mode?: string;
  }>;
};

const errorCopy: Record<string, string> = {
  callback_failed: "We could not complete login. Please try again.",
  email_not_confirmed:
    "Please confirm your email before logging in. If you expected instant login, disable email confirmation in Supabase Auth settings for this environment.",
  invalid_credentials: "That email and password did not match. Please try again.",
  login_failed: "We could not log you in. Check your email and password.",
  oauth_failed: "Google login could not start. Please try again.",
  signup_failed:
    "We could not create your account. Please check the details and try again.",
  supabase_not_configured:
    "Supabase is not configured yet. Add the public Supabase URL and anon key.",
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
  const safeNext =
    params.next?.startsWith("/") && !params.next.startsWith("//")
      ? params.next
      : appRoutes.dashboard;

  if (params.error) {
    await trackEvent({
      eventName: analyticsEvents.authErrorShown,
      pagePath: "/login",
      properties: { error_code: params.error },
    });
  }

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect(appRoutes.dashboard);
    }
  }

  return (
    <PublicLayout>
      <div className="mx-auto grid max-w-5xl gap-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase text-progress-green">
            Parent account
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-text-primary sm:text-4xl">
            Enter Tutorama
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base sm:leading-7">
            Sign up or log in to book tuitions and start setting up your
            child&apos;s learning journey.
          </p>
        </div>

        {params.error ? (
          <ErrorState
            title="Auth needs attention"
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
            title="Supabase setup required"
            message="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local before testing auth."
          />
        ) : null}

        <Card className="rounded-lg">
          <form action={loginWithGoogle} className="grid gap-4">
            <input name="next" type="hidden" value={safeNext} />
            <LoginSubmitButton
              disabled={!isSupabaseConfigured()}
              loadingText="Opening Google..."
              variant="secondary"
            >
              Continue with Google
            </LoginSubmitButton>
            <p className="text-center text-xs leading-5 text-text-muted">
              Google provider credentials are configured in Supabase, not in
              client environment variables.
            </p>
          </form>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-lg">
            <form action={signUp} className="grid gap-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  Create account
                </h2>
                <p className="mt-1 text-sm leading-6 text-text-muted">
                  For parents and guardians managing Tutorama classes.
                </p>
              </div>
              <input name="next" type="hidden" value={safeNext} />
              <Input
                autoComplete="email"
                label="Email"
                name="email"
                required
                type="email"
              />
              <Input
                autoComplete="new-password"
                helperText="Use at least 8 characters."
                label="Password"
                minLength={8}
                name="password"
                required
                type="password"
              />
              <LoginSubmitButton
                disabled={!isSupabaseConfigured()}
                loadingText="Creating account..."
              >
                Create Tutorama Account
              </LoginSubmitButton>
            </form>
          </Card>

          <Card className="rounded-lg">
            <form action={login} className="grid gap-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  Log in
                </h2>
                <p className="mt-1 text-sm leading-6 text-text-muted">
                  Continue to your Tutorama dashboard.
                </p>
              </div>
              <input name="next" type="hidden" value={safeNext} />
              <Input
                autoComplete="email"
                label="Email"
                name="email"
                required
                type="email"
              />
              <Input
                autoComplete="current-password"
                label="Password"
                name="password"
                required
                type="password"
              />
              <LoginSubmitButton
                disabled={!isSupabaseConfigured()}
                loadingText="Logging in..."
                variant="secondary"
              >
                Log In
              </LoginSubmitButton>
            </form>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
