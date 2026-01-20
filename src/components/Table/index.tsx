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
  onSearchChange 
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
    <div className="overflow-x-auto flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Search by sequence"
            value={searchTerm ?? ""}
            onChange={(e) => {
              onSearchChange?.(e.target.value);
              onPageChange?.(1);
            }}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="border border-gray-300 px-4 py-2 rounded" 
            value={itemsPerPage}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              onItemsPerPageChange?.(newValue);
              onPageChange?.(1);
            }}
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <div className="flex">
            <button 
              className="px-3 py-2 border border-gray-300 rounded-s hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handlePreviousPage}
              disabled={page <= 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              className="px-3 py-2 border border-gray-300 rounded-e hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={totalPages !== undefined && page >= totalPages}
            >
              <ArrowRight className="w-4 h-4"  />
            </button>
          </div>
          <span className="px-4 py-2 flex items-center">Page {page} of {totalPages}</span>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col, index) => {
                const isActive = sort?.column === col.key;
                return (
                  <th
                    key={String(col.key)}
                    className={`border-gray-300 px-4 py-3 cursor-pointer select-none text-left text-xs font-semibold uppercase tracking-wider ${
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
                          <ArrowUp className="w-4 h-4 text-neutral-700" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-neutral-700" />
                        ))}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
  
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={String(row[keyField])} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, index) => (
                  <td
                    key={String(col.key)}
                    className={`px-4 py-3 text-sm ${
                      index !== columns.length - 1 ? "border-r border-gray-100" : ""
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
  );
}
