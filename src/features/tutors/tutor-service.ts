import { createClient } from "@/lib/supabase/server";

import type { Tutor } from "./tutor-types";

export async function getAdminTutors(): Promise<Tutor[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tutors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data as Tutor[];
}
