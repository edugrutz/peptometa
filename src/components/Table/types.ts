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
};
