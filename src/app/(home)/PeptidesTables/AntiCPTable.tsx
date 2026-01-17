"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/Table";
import { Column, SortDirection } from "@/components/Table/types";
import { getPeptidesAntiCP } from "@/services/peptides";
import { IPeptideAntiCP } from "@/types/peptide";

export function AntiCPPeptidesTable() {

  const [sortBy, setSortBy] = useState<string>("score");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Range
  const from = (page - 1) * itemsPerPage;
  const to = page * itemsPerPage - 1;

  const { data: result, isLoading, error} = useQuery({
    queryKey: ["anticp", sortBy, sortDir, page, itemsPerPage],
    queryFn: () => getPeptidesAntiCP(sortBy, sortDir, from, to),
  });

  if (isLoading) return <p>Loading peptides...</p>;
  if (error) return <p>Error fetching peptides</p>;

  const columns: Column<IPeptideAntiCP>[] = [
    { key: "sequence_id", header: "ID" },
    { key: "sequence", header: "Sequence" },
    { key: "score", header: "AntiCP Score" },
  ];

  return (
    <Table
      data={result?.data ?? []}
      totalPages={Math.ceil((result?.count ?? 0) / itemsPerPage)}
      columns={columns}
      keyField="sequence_id"
      onPageChange={(newPage) => setPage(newPage)}
      currentPage={page}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={(newItemsPerPage) => setItemsPerPage(newItemsPerPage)}
      sort={{ column: sortBy, direction: sortDir }}
      onSortChange={(col, dir) => {
        setSortBy(col);
        setSortDir(dir);
      }}
    />
  );
}
