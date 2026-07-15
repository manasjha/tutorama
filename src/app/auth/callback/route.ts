import { NextResponse, type NextRequest } from "next/server";

import { syncGoogleParentProfile } from "@/features/auth/profile-service";
import {
  getAnalyticsOnboardingStatus,
  getPostLoginDestination,
} from "@/features/auth/routing";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL(`${publicRoutes.login}?error=supabase_not_configured`, request.url),
    );
  }

  if (!code) {
    await trackEvent({
      eventName: analyticsEvents.authErrorShown,
      pagePath: "/auth/callback",
      properties: { error_type: "missing_google_code" },
    });

    return NextResponse.redirect(
      new URL(`${publicRoutes.login}?error=google_callback_failed`, request.url),
    );
  }

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    await trackEvent({
      eventName: analyticsEvents.authErrorShown,
      pagePath: "/auth/callback",
      properties: { error_type: "google_code_exchange_failed" },
    });

    return NextResponse.redirect(
      new URL(`${publicRoutes.login}?error=google_callback_failed`, request.url),
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut();

    await trackEvent({
      eventName: analyticsEvents.authErrorShown,
      pagePath: "/auth/callback",
      properties: { error_type: "google_user_missing" },
    });

    return NextResponse.redirect(
      new URL(`${publicRoutes.login}?error=google_callback_failed`, request.url),
    );
  }

  try {
    const profile = await syncGoogleParentProfile(supabase, user);
    const destination = getPostLoginDestination(profile.onboarding_status);
    const onboardingStatus = getAnalyticsOnboardingStatus(
      profile.onboarding_status,
    );

    await trackEvent({
      eventName: analyticsEvents.googleLoginCompleted,
      pagePath: "/auth/callback",
      properties: { auth_method: "google" },
      userId: user.id,
    });

    await trackEvent({
      eventName: analyticsEvents.postLoginRouted,
      pagePath: "/auth/callback",
      properties: {
        auth_method: "google",
        destination,
        onboarding_status: onboardingStatus,
      },
      userId: user.id,
    });

    return NextResponse.redirect(new URL(destination, request.url));
  } catch {
    await supabase.auth.signOut();

    await trackEvent({
      eventName: analyticsEvents.authErrorShown,
      pagePath: "/auth/callback",
      properties: { error_type: "profile_setup_failed" },
      userId: user.id,
    });

    return NextResponse.redirect(
      new URL(`${publicRoutes.login}?error=profile_setup_failed`, request.url),
    );
  }
}
