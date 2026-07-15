import type { User } from "@supabase/supabase-js";

import type { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
type SupabaseMutationResult = { error: unknown | null };
type ProfilesMutationTable = {
  insert(values: ProfileInsert): Promise<SupabaseMutationResult>;
  update(values: ProfileUpdate): {
    eq(column: "id", value: string): Promise<SupabaseMutationResult>;
  };
};

function getProfilesMutationTable(supabase: SupabaseServerClient) {
  return supabase.from("profiles") as unknown as ProfilesMutationTable;
}

function getStringMetadata(user: User, key: string) {
  const value = user.user_metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getEmailPrefix(email: string | null | undefined) {
  const prefix = email?.split("@")[0]?.trim();
  return prefix || null;
}

function getDisplayName(user: User, existingProfile?: ProfileRow | null) {
  const existingDisplayName = existingProfile?.display_name?.trim() || null;

  return (
    getStringMetadata(user, "full_name") ??
    getStringMetadata(user, "name") ??
    existingDisplayName ??
    getEmailPrefix(user.email) ??
    "Parent"
  );
}

function getAvatarUrl(user: User, existingProfile?: ProfileRow | null) {
  return (
    getStringMetadata(user, "avatar_url") ??
    getStringMetadata(user, "picture") ??
    existingProfile?.avatar_url ??
    null
  );
}

function isEmpty(value: string | null | undefined) {
  return !value || !value.trim();
}

export class ProfileSetupError extends Error {
  constructor(message = "Profile setup failed") {
    super(message);
    this.name = "ProfileSetupError";
  }
}

export async function getParentProfile(
  supabase: SupabaseServerClient,
  userId: string,
): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new ProfileSetupError();
  }

  return data as ProfileRow | null;
}

export function getParentDisplayName(
  profile: Pick<ProfileRow, "display_name" | "email"> | null,
  fallbackEmail?: string | null,
) {
  const displayName = profile?.display_name?.trim() || null;

  return (
    displayName ??
    getEmailPrefix(profile?.email) ??
    getEmailPrefix(fallbackEmail) ??
    "Parent"
  );
}

export function getParentFirstName(
  profile: Pick<ProfileRow, "display_name" | "email"> | null,
  fallbackEmail?: string | null,
) {
  return getParentDisplayName(profile, fallbackEmail).split(/\s+/)[0] ?? "Parent";
}

export async function syncGoogleParentProfile(
  supabase: SupabaseServerClient,
  user: User,
): Promise<ProfileRow> {
  const existingProfile = await getParentProfile(supabase, user.id);
  const now = new Date().toISOString();
  const displayName = getDisplayName(user, existingProfile);
  const avatarUrl = getAvatarUrl(user, existingProfile);
  const email = user.email ?? existingProfile?.email ?? null;
  const profilesTable = getProfilesMutationTable(supabase);

  if (!existingProfile) {
    const profile: ProfileInsert = {
      id: user.id,
      email,
      display_name: displayName,
      avatar_url: avatarUrl,
      onboarding_status: "not_started",
      last_login_at: now,
      role: "parent",
      created_at: now,
      updated_at: now,
    };

    const { error } = await profilesTable.insert(profile);

    if (error) {
      throw new ProfileSetupError();
    }

    const createdProfile = await getParentProfile(supabase, user.id);

    if (!createdProfile) {
      throw new ProfileSetupError();
    }

    return createdProfile;
  }

  const updates: ProfileUpdate = {
    email,
    avatar_url: avatarUrl,
    last_login_at: now,
    updated_at: now,
  };

  if (isEmpty(existingProfile.display_name)) {
    updates.display_name = displayName;
  }

  const { error } = await profilesTable
    .update(updates)
    .eq("id", user.id);

  if (error) {
    throw new ProfileSetupError();
  }

  const updatedProfile = await getParentProfile(supabase, user.id);

  if (!updatedProfile) {
    throw new ProfileSetupError();
  }

  return updatedProfile;
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

  await getProfilesMutationTable(supabase).insert(profile);
}
