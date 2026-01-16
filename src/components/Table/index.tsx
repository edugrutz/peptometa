"use client";

import { TableProps } from "./types";

export function Table<T>({ data, columns, keyField }: TableProps<T>) {
  return (
    <div className="px-4 md:px-8 lg:px-12 overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="border border-gray-300 px-4 py-2"
              >
                {col.header}
              </th>
            ))}
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
