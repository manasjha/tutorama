import type { User } from "@supabase/supabase-js";

import type { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

function getStringMetadata(user: User, key: string) {
  const value = user.user_metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function ensureParentProfile(
  supabase: SupabaseServerClient,
  user: User | null,
) {
  if (!user) {
    return;
  }

  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (data) {
    return;
  }

  const profile: ProfileInsert = {
    id: user.id,
    email: user.email,
    display_name:
      getStringMetadata(user, "display_name") ??
      getStringMetadata(user, "full_name") ??
      getStringMetadata(user, "name"),
    role: "parent",
  };

  const profilesTable = supabase.from("profiles") as unknown as {
    insert(values: ProfileInsert[]): Promise<unknown>;
  };

  await profilesTable.insert([profile]);
}
