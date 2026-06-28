import { createClient } from "@/lib/supabase/server";

import type { ClassSession } from "./class-types";

export async function getClassesForParent(
  parentId: string,
): Promise<ClassSession[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("parent_id", parentId)
    .order("scheduled_start_at", { ascending: true, nullsFirst: false });

  if (error) {
    return [];
  }

  return data as ClassSession[];
}

export async function getClassForParent(
  parentId: string,
  classId: string,
): Promise<ClassSession | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("parent_id", parentId)
    .eq("id", classId)
    .maybeSingle();

  if (error) {
    return null;
  }

  return data as ClassSession | null;
}
