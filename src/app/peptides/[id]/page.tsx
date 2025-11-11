import Link from "next/link";
import { notFound } from "next/navigation";
import type { Peptide } from "../../../types/peptide";
import { supabase } from "../../../lib/supabase";

type PageParams = {
  id: string;
};

type PageProps = {
  params: Promise<PageParams> | PageParams;
};

async function getPeptide(id: string) {
  const normalizedId = Number(id);
  const matchValue = Number.isNaN(normalizedId) ? id : normalizedId;

  const { data, error } = await supabase
    .from("samples")
    .select("id, name, sra_accession, created_at, updated_at")
    .eq("id", matchValue)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch peptide", { id, error });
  }

  return data as Peptide | null;
}

export default async function PeptideDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const peptide = await getPeptide(id);

  if (!peptide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex w-full flex-col gap-6 px-4 py-12 sm:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-600"
        >
          <span aria-hidden="true">←</span>
          Voltar para a lista
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
          <div className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-wide text-slate-500">
              Peptídeo
            </span>
            <h1 className="text-3xl font-semibold text-slate-900">
              {peptide.name}
            </h1>
            <p className="text-sm text-slate-500">
              Esta página exibirá informações adicionais sobre o peptídeo em
              futuras iterações.
            </p>
          </div>

          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                ID
              </dt>
              <dd className="text-lg font-semibold text-slate-900">
                {peptide.id}
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                SRA accession
              </dt>
              <dd className="font-mono text-sm text-slate-700">
                {peptide.sra_accession}
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Criado em
              </dt>
              <dd className="text-sm text-slate-700">{peptide.created_at}</dd>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Atualizado em
              </dt>
              <dd className="text-sm text-slate-700">{peptide.updated_at}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
