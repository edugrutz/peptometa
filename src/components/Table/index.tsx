"use client";

import { TableProps, SortDirection } from "./types";
import {ArrowDownUp, ArrowDown, ArrowUp} from "lucide-react";

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
            className="w-full border border-gray-300 px-4 py-2"
            placeholder="Search peptides..."
            value={searchTerm ?? ""}
            onChange={(e) => {
              onSearchChange?.(e.target.value);
              onPageChange?.(1);
            }}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="border border-gray-300 px-4 py-2" 
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
          <button 
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handlePreviousPage}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 flex items-center">Page {page} of {totalPages}</span>
          <button 
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={totalPages !== undefined && page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => {
              const isActive = sort?.column === col.key;
              return (
                <th
                  key={String(col.key)}
                  className="border border-gray-300 px-4 py-2 cursor-pointer select-none"
                  onClick={() => handleSort(String(col.key))}
                >
                  <div className="flex items-center justify-center gap-2">
                    {col.header}

                    {!isActive && (
                      <ArrowDownUp className="w-4 h-4 opacity-50" />
                    )}

                    {isActive &&
                      (sort?.direction === "asc" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={String(row[keyField])}>
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="border border-gray-300 px-4 py-2"
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
  );
}
