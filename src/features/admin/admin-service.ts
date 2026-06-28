import { createClient } from "@/lib/supabase/server";

import type { Profile } from "./admin-types";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return null;
  }

  return data as Profile | null;
}

export async function isAdminUser(userId: string) {
  const profile = await getProfile(userId);
  return profile?.role === "admin";
}
