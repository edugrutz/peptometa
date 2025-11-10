"use client";

import { useEffect, useMemo, useState } from "react";
import type { Peptide } from "../types/peptide";

type Props = {
  peptides: Peptide[];
  hasError: boolean;
};

const pageSizeOptions = [10, 20, 30];

export default function PeptideTable({ peptides, hasError }: Props) {
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize]);

  const filtered = useMemo(() => {
    if (!query.trim()) return peptides;
    const q = query.toLowerCase();
    return peptides.filter((peptide) => {
      return (
        peptide.name?.toLowerCase().includes(q) ||
        peptide.sra_accession?.toLowerCase().includes(q) ||
        peptide.id?.toString().toLowerCase().includes(q)
      );
    });
  }, [peptides, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filtered.slice(startIndex, startIndex + pageSize);
  const showingFrom = filtered.length ? startIndex + 1 : 0;
  const showingTo = Math.min(startIndex + currentItems.length, filtered.length);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-base font-semibold text-slate-900">
              Therapeutic peptides overview
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 text-sm text-slate-500">
                Mostrar
                <select
                  value={pageSize}
                  onChange={(event) => setPageSize(Number(event.target.value))}
                  className="rounded-xl border border-slate-200 px-3 py-1 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                itens
              </label>
              <input
                type="search"
                placeholder="Buscar por nome, ID ou SRA"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 sm:w-64"
              />
            </div>
          </div>
          <p className="text-sm text-slate-500">
            {hasError
              ? "Não foi possível carregar os dados do Supabase."
              : `${filtered.length} entradas — snapshot gerado a partir da última execução do pipeline.`}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3 text-left sm:px-8">ID</th>
              <th className="px-6 py-3 text-left sm:px-8">Peptide</th>
              <th className="px-6 py-3 text-left sm:px-8">SRA</th>
              <th className="px-6 py-3 text-left sm:px-8">Created At</th>
              <th className="px-6 py-3 text-left sm:px-8">Updated At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-900">
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-slate-500 sm:px-8"
                >
                  {hasError
                    ? "Erro ao buscar peptídeos. Verifique suas credenciais do Supabase."
                    : query
                    ? "Nenhum resultado para esta busca."
                    : "Nenhuma entrada disponível ainda. Execute o PeptoMiner pipeline para popular esta tabela."}
                </td>
              </tr>
            ) : (
              currentItems.map((peptide) => (
                <tr key={peptide.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium sm:px-8">{peptide.id}</td>
                  <td className="px-6 py-4 font-medium sm:px-8">
                    {peptide.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 sm:px-8">
                    {peptide.sra_accession}
                  </td>
                  <td className="px-6 py-4 text-slate-700 sm:px-8">
                    {peptide.created_at}
                  </td>
                  <td className="px-6 py-4 text-slate-600 sm:px-8">
                    {peptide.updated_at}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>
          Mostrando {showingFrom}-{showingTo} de {filtered.length} entradas
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-200 px-4 py-1 font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || filtered.length === 0}
            className="rounded-full border border-slate-200 px-4 py-1 font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
