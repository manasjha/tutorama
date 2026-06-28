"use server";

import { redirect } from "next/navigation";

import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getSafeNext(formData: FormData) {
  const next = getFormValue(formData, "next");
  return next.startsWith("/") && !next.startsWith("//") ? next : appRoutes.dashboard;
}

export async function login(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(`${publicRoutes.login}?error=supabase_not_configured`);
  }

  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const next = getSafeNext(formData);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`${publicRoutes.login}?error=login_failed`);
  }

  await trackEvent({
    eventName: analyticsEvents.loginCompleted,
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
    eventName: analyticsEvents.signupStarted,
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
    eventName: analyticsEvents.signupCompleted,
    properties: { method: "email_password" },
  });

  if (data.session) {
    redirect(appRoutes.dashboard);
  }

  redirect(`${publicRoutes.login}?message=check_email`);
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
