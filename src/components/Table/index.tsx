"use client";

import { TableProps, SortDirection } from "./types";
import {ArrowDownUp, ArrowDown, ArrowUp} from "lucide-react";

export function Table<T>({ data, columns, keyField, sort, onSortChange }: TableProps<T>) {

  function handleSort(column: string) {
    if (!onSortChange) return;

    if (sort?.column === column) {
      const nextDir: SortDirection = sort.direction === "asc" ? "desc" : "asc";
      onSortChange(column, nextDir);
    } else {
      onSortChange(column, "desc");
    }
  }

  return (
    <div className="overflow-x-auto">
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
