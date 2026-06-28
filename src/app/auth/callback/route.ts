import { NextResponse, type NextRequest } from "next/server";

import { ensureParentProfile } from "@/features/auth/profile-service";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextParam = requestUrl.searchParams.get("next");
  const next =
    nextParam?.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : appRoutes.dashboard;
  const authMethod = requestUrl.searchParams.get("auth_method");

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL(`${publicRoutes.login}?error=supabase_not_configured`, request.url),
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await ensureParentProfile(supabase, user);

      if (authMethod === "google") {
        await trackEvent({
          eventName: analyticsEvents.googleLoginCompleted,
          properties: { method: "google" },
          userId: user?.id,
        });
      }

      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  await trackEvent({
    eventName: analyticsEvents.authErrorShown,
    properties: { error_code: "callback_failed" },
  });

  return NextResponse.redirect(
    new URL(`${publicRoutes.login}?error=callback_failed`, request.url),
  );
}
