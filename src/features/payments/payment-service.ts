import { createClient } from "@/lib/supabase/server";

import type { Payment } from "./payment-types";

export async function getPaymentsForParent(parentId: string): Promise<Payment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data as Payment[];
}
