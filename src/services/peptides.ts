"use server";

import { supabase } from "@/lib/supabase/client";
import { IPeptideAntiCP, IPeptideMacrel } from "@/types/peptide";

export async function getPeptidesAntiCP(): Promise<IPeptideAntiCP[]> {
  const { data, error } = await supabase
    .from("anticp")
    .select("*");

  if (error) throw error;
  return data ?? [];
}

export async function getPeptidesMacrel(): Promise<IPeptideMacrel[]> {
  const { data, error } = await supabase
    .from("macrel")
    .select("*");

  if (error) throw error;
  return data ?? [];
}
