import { NextResponse, type NextRequest } from "next/server";

import { appRoutes, publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? appRoutes.dashboard;

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL(`${publicRoutes.login}?error=supabase_not_configured`, request.url),
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(
    new URL(`${publicRoutes.login}?error=callback_failed`, request.url),
  );
}
