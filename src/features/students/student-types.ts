import type { Database } from "@/types/database";

export type StudentProfile =
  Database["public"]["Tables"]["student_profiles"]["Row"];
