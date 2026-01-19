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
  search?: string
): Promise<PaginationResult<IPeptideAntiCP>> {
  let query = supabase
    .from("anticp")
    .select("*", {count: "exact"});

  if (search) {
    query = query.ilike('sequence', `%${search}%`);
  }

  const { data, error, count } = await query
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
  search?: string
): Promise<PaginationResult<IPeptideMacrel>> {
  let query = supabase
    .from("macrel")
    .select("*", { count: "exact" });

  if (search) {
    query = query.ilike('sequence', `%${search}%`);
  }

  const { data, error, count } = await query
    .order(sortBy, { ascending: sortDir === "asc" })
    .range(from, to);

  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
}
