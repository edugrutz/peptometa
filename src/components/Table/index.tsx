"use client";

import { TableProps, SortDirection } from "./types";
import {ArrowDownUp, ArrowDown, ArrowUp, ArrowLeft, ArrowRight} from "lucide-react";

export function Table<T>({
  data,
  columns,
  keyField,
  sort,
  onSortChange,
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  searchTerm,
  onSearchChange,
  onRowClick,
}: TableProps<T>) {

  const page = currentPage ?? 1;

  function handleSort(column: string) {
    if (!onSortChange) return;

    if (sort?.column === column) {
      const nextDir: SortDirection = sort.direction === "asc" ? "desc" : "asc";
      onSortChange(column, nextDir);
    } else {
      onSortChange(column, "desc");
    }
    onPageChange?.(1);
  }

  function handlePreviousPage() {
    if (onPageChange && page > 1) {
      onPageChange(page - 1);
    }
  }

  function handleNextPage() {
    if (onPageChange && (!totalPages || page < totalPages)) {
      onPageChange(page + 1);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all bg-white placeholder-slate-400"
            placeholder="Search by sequence"
            value={searchTerm ?? ""}
            onChange={(e) => {
              onSearchChange?.(e.target.value);
              onPageChange?.(1);
            }}
          />
        </div>
        <div className="flex gap-3">
          <select
            className="border border-slate-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
            value={itemsPerPage}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              onItemsPerPageChange?.(newValue);
              onPageChange?.(1);
            }}
          >
            <option value="10">10 por página</option>
            <option value="30">30 por página</option>
            <option value="50">50 por página</option>
          </select>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              className="px-3 py-2 rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePreviousPage}
              disabled={page <= 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              className="px-3 py-2 rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={totalPages !== undefined && page >= totalPages}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <span className="px-4 py-2.5 flex items-center text-sm font-medium text-slate-600">Page {page} of {totalPages}</span>
        </div>
      </div>
      <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                {columns.map((col, index) => {
                  const isActive = sort?.column === col.key;
                  return (
                    <th
                      key={String(col.key)}
                      className={`border-slate-200 px-4 py-3 cursor-pointer select-none text-left text-xs font-semibold uppercase tracking-wider text-slate-700 ${
                        index !== columns.length - 1 ? "border-r" : ""
                      }`}
                      onClick={() => handleSort(String(col.key))}
                    >
                      <div className="flex items-center gap-2">
                        {col.header}

                        {!isActive && (
                          <ArrowDownUp className="w-4 h-4 opacity-30" />
                        )}

                        {isActive &&
                          (sort?.direction === "asc" ? (
                            <ArrowUp className="w-4 h-4 text-slate-600" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-slate-600" />
                          ))}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-slate-200">
              {data.map((row) => (
                <tr
                  key={String(row[keyField])}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col, index) => (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-3 text-sm text-slate-800 ${
                        index !== columns.length - 1 ? "border-r border-slate-100" : ""
                      }`}
                    >
                      {col.render
                        ? col.render(row)
                        : String(row[col.key as keyof T])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
