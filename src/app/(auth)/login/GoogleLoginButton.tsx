"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import {
  createClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

type GoogleLoginButtonProps = {
  disabled?: boolean;
};

const googleErrorMessage = "We couldn't connect to Google. Please try again.";

function getCallbackUrl() {
  const fallbackSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = window.location.origin || fallbackSiteUrl || "http://localhost:3000";

  return `${origin.replace(/\/$/, "")}/auth/callback`;
}

export function GoogleLoginButton({ disabled = false }: GoogleLoginButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleGoogleLogin() {
    if (disabled || isConnecting) {
      return;
    }

    setErrorMessage(null);
    setIsConnecting(true);

    await trackEvent({
      eventName: analyticsEvents.googleLoginClicked,
      pagePath: "/login",
      properties: {
        auth_method: "google",
      },
    });

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured.");
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getCallbackUrl(),
        },
      });

      if (error) {
        throw error;
      }
    } catch {
      setIsConnecting(false);
      setErrorMessage(googleErrorMessage);

      await trackEvent({
        eventName: analyticsEvents.authErrorShown,
        pagePath: "/login",
        properties: {
          error_type: "google_oauth_start_failed",
        },
      });
    }
  }

  return (
    <div className="grid gap-3">
      <Button
        className="w-full"
        disabled={disabled || isConnecting}
        onClick={handleGoogleLogin}
        type="button"
      >
        {isConnecting ? "Connecting to Google..." : "Continue with Google"}
      </Button>
      {errorMessage ? (
        <p className="rounded-lg border border-error/20 bg-error/5 px-3 py-2 text-sm leading-6 text-error">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
