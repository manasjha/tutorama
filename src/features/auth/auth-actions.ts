"use server";

import { redirect } from "next/navigation";

import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

import { ensureParentProfile } from "./profile-service";

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getSafeNext(formData: FormData) {
  const next = getFormValue(formData, "next");
  return next.startsWith("/") && !next.startsWith("//") ? next : appRoutes.dashboard;
}

function getGoogleRedirectUrl(next: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectUrl = new URL("/auth/callback", siteUrl);
  redirectUrl.searchParams.set("next", next);
  redirectUrl.searchParams.set("auth_method", "google");
  return redirectUrl.toString();
}

function getAuthErrorCode(errorMessage: string) {
  const normalizedMessage = errorMessage.toLowerCase();

  if (normalizedMessage.includes("email not confirmed")) {
    return "email_not_confirmed";
  }

  if (
    normalizedMessage.includes("invalid login credentials") ||
    normalizedMessage.includes("invalid credentials")
  ) {
    return "invalid_credentials";
  }

  return "login_failed";
}

export async function login(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`${publicRoutes.login}?error=supabase_not_configured`);
  }

  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const next = getSafeNext(formData);

  const supabase = await createClient();
  await trackEvent({
    eventName: analyticsEvents.emailLoginStarted,
    properties: { method: "email_password" },
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`${publicRoutes.login}?error=${getAuthErrorCode(error.message)}`);
  }

  await ensureParentProfile(supabase, data.user);

  await trackEvent({
    eventName: analyticsEvents.emailLoginCompleted,
    properties: { method: "email_password" },
  });

  redirect(next);
}

export async function signUp(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`${publicRoutes.login}?error=supabase_not_configured`);
  }

  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const supabase = await createClient();

  await trackEvent({
    eventName: analyticsEvents.emailSignupStarted,
    properties: { method: "email_password" },
  });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect(`${publicRoutes.login}?error=signup_failed`);
  }

  await trackEvent({
    eventName: analyticsEvents.emailSignupCompleted,
    properties: { method: "email_password" },
  });

  if (data.session) {
    await ensureParentProfile(supabase, data.user);
    redirect(appRoutes.dashboard);
  }

  redirect(`${publicRoutes.login}?message=check_email`);
}

export async function loginWithGoogle(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`${publicRoutes.login}?error=supabase_not_configured`);
  }

  const next = getSafeNext(formData);
  const supabase = await createClient();

  await trackEvent({
    eventName: analyticsEvents.googleLoginClicked,
    properties: { method: "google" },
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getGoogleRedirectUrl(next),
    },
  });

  if (error || !data.url) {
    redirect(`${publicRoutes.login}?error=oauth_failed`);
  }

  redirect(data.url);
}

export async function logout() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  await trackEvent({
    eventName: analyticsEvents.logoutClicked,
  });

  redirect(publicRoutes.login);
}
