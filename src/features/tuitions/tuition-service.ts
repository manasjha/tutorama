import { createClient } from "@/lib/supabase/server";

import type { Tuition } from "./tuition-types";

export async function getTuitionsForParent(parentId: string): Promise<Tuition[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tuitions")
    .select("*")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data as Tuition[];
}

export async function getTuitionForParent(
  parentId: string,
  tuitionId: string,
): Promise<Tuition | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tuitions")
    .select("*")
    .eq("parent_id", parentId)
    .eq("id", tuitionId)
    .maybeSingle();

  if (error) {
    return null;
  }

  return data as Tuition | null;
}
