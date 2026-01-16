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

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["anticp", sortBy, sortDir],
    queryFn: () => getPeptidesAntiCP(sortBy, sortDir),
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
      data={data}
      columns={columns}
      keyField="sequence_id"
      sort={{ column: sortBy, direction: sortDir }}
      onSortChange={(col, dir) => {
        setSortBy(col);
        setSortDir(dir);
      }}
    />
  );
}
