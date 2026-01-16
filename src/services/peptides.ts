"use server";

import { supabase } from "@/lib/supabase/client";
import { IPeptideAntiCP, IPeptideMacrel } from "@/types/peptide";

export async function getPeptidesAntiCP(
  sortBy: string,
  sortDir: "asc" | "desc",
): Promise<IPeptideAntiCP[]> {
  const { data, error } = await supabase
    .from("anticp")
    .select("*")
    .order(sortBy, { ascending: sortDir === "asc" })
    .range(0, 30);

  if (error) throw error;
  return data ?? [];
}

export async function getPeptidesMacrel(
  sortBy: string,
  sortDir: "asc" | "desc",
): Promise<IPeptideMacrel[]> {
  const { data, error } = await supabase
    .from("macrel")
    .select("*")
    .order(sortBy, { ascending: sortDir === "asc" })
    .range(0, 30);

  if (error) throw error;
  return data ?? [];
}
