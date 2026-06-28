import { redirect } from "next/navigation";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { Input } from "@/components/ui/Input";
import { login, signUp } from "@/features/auth/auth-actions";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { appRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
    mode?: string;
  }>;
};

const errorCopy: Record<string, string> = {
  login_failed: "We could not log you in. Check your email and password.",
  signup_failed: "We could not create your account. Please try again.",
  callback_failed: "We could not complete the auth callback. Please log in again.",
  supabase_not_configured:
    "Supabase is not configured yet. Add the public Supabase URL and anon key.",
};

const messageCopy: Record<string, string> = {
  check_email:
    "Check your email to confirm your account, then return here to log in.",
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
      <div className="mx-auto grid max-w-4xl gap-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-semibold text-text-primary">
            Start with a parent account
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Use email and password for the PRD 0 foundation. Student setup and
            scheduling come next.
          </p>
        </div>

        {params.error ? (
          <ErrorState
            title="Auth needs attention"
            message={errorCopy[params.error] ?? "Please try again."}
          />
        ) : null}

        {params.message ? (
          <Card className="border-success/20 bg-success/5 text-sm text-text-primary">
            {messageCopy[params.message] ?? "You can continue when ready."}
          </Card>
        ) : null}

        {!isSupabaseConfigured() ? (
          <ErrorState
            title="Supabase setup required"
            message="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local before testing auth."
          />
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <form action={signUp} className="grid gap-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  Create account
                </h2>
                <p className="mt-1 text-sm text-text-muted">
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
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-trust-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-blue/90 disabled:opacity-60"
                disabled={!isSupabaseConfigured()}
                type="submit"
              >
                Create Your Tutorama Account
              </button>
            </form>
          </Card>

          <Card>
            <form action={login} className="grid gap-4">
              <div>
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  Log in
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Continue to the student-first Tutorama workspace.
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
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-trust-blue bg-white px-4 py-2 text-sm font-semibold text-trust-blue transition hover:bg-trust-blue/5 disabled:opacity-60"
                disabled={!isSupabaseConfigured()}
                type="submit"
              >
                Log In
              </button>
            </form>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
