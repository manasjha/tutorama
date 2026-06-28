import { createClient } from "@/lib/supabase/server";

import type { StudentProfile } from "./student-types";

export async function getFirstStudentProfile(
  parentId: string,
): Promise<StudentProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return null;
  }

  return data as StudentProfile | null;
}
