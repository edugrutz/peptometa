import PeptideTable from "../components/PeptideTable";
import { supabase } from "../lib/supabase";
import type { Peptide } from "../types/peptide";

export default async function Home() {
  const { data, error } = await supabase
    .from("samples")
    .select("id, name, sra_accession, created_at, updated_at")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to fetch peptides from Supabase:", error);
  }

  const peptides: Peptide[] = (data ?? []).sort((a, b) => {
    const aNumeric = Number(a.id);
    const bNumeric = Number(b.id);

    if (!Number.isNaN(aNumeric) && !Number.isNaN(bNumeric)) {
      return aNumeric - bNumeric;
    }

    return String(a.id).localeCompare(String(b.id));
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex w-full flex-col gap-8 px-4 py-12 sm:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Peptometa
          </h1>
          <p className="text-lg text-slate-600">
            Tool for visualizing therapeutic peptides identified using the
            PeptoMiner pipeline.
          </p>
        </div>

        <PeptideTable peptides={peptides} hasError={Boolean(error)} />
      </section>
    </main>
  );
}
