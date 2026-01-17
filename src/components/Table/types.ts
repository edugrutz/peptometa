import { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  sort?: SortState;
  onSortChange?: (column:string, direction: SortDirection) => void;
  currentPage?: number;
  onPageChange?: (newPage: number) => void;
  totalPages?: number;
};

export type SortDirection = "asc" | "desc";

export type SortState = {
  column: string | null;
  direction: SortDirection;
};
