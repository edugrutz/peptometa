"use server";

import { supabase } from "@/lib/supabase/client";
import { IPeptideAntiCP, IPeptideMacrel } from "@/types/peptide";
import { PaginationResult } from "@/types/pagination";
import { SortDirection } from "@/components/Table/types";

export async function getPeptidesAntiCP(
  sortBy: string,
  sortDir: SortDirection,
  from: number,
  to: number,
): Promise<PaginationResult<IPeptideAntiCP>> {
  const { data, error, count } = await supabase
    .from("anticp")
    .select("*", {count: "exact"})
    .order(sortBy, { ascending: sortDir === "asc" })
    .range(from, to);

  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
}

export async function getPeptidesMacrel(
  sortBy: string,
  sortDir: SortDirection,
  from: number,
  to: number,
): Promise<PaginationResult<IPeptideMacrel>> {
  const { data, error, count } = await supabase
    .from("macrel")
    .select("*", { count: "exact" })
    .order(sortBy, { ascending: sortDir === "asc" })
    .range(from, to);

  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
}
