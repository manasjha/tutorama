import { redirect } from "next/navigation";

import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

import { getParentProfile } from "./profile-service";
import { getPostLoginDestination, hasCompletedOnboarding } from "./routing";

export async function getAuthenticatedParentSession() {
  if (!isSupabaseConfigured()) {
    redirect(`${publicRoutes.login}?error=supabase_not_configured`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(publicRoutes.login);
  }

  const profile = await getParentProfile(supabase, user.id).catch(() => null);

  return { profile, supabase, user };
}

export async function requireCompletedOnboarding() {
  const { profile } = await getAuthenticatedParentSession();

  if (!hasCompletedOnboarding(profile?.onboarding_status)) {
    redirect(appRoutes.onboarding);
  }
}

export async function redirectCompletedOnboarding() {
  const { profile } = await getAuthenticatedParentSession();

  if (getPostLoginDestination(profile?.onboarding_status) === appRoutes.dashboard) {
    redirect(appRoutes.dashboard);
  }
}
