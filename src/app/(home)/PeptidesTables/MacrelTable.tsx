"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/Table";
import { Column, SortDirection } from "@/components/Table/types";
import { getPeptidesMacrel } from "@/services/peptides";
import { IPeptideMacrel } from "@/types/peptide";

export function MacrelPeptidesTable() {

  const [sortBy, setSortBy] = useState<string>("amp_probability");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["macrel", sortBy, sortDir],
    queryFn: () => getPeptidesMacrel(sortBy, sortDir),
  });

  if (isLoading) return <p>Loading peptides...</p>;
  if (error) return <p>Error fetching peptides</p>;

  const columns: Column<IPeptideMacrel>[] = [
    { key: "sequence_id", header: "ID" },
    { key: "sequence", header: "Sequence" },
    { key: "amp_family", header: "AMP Family" },
    { key: "amp_probability", header: "AMP Probability" },
    { key: "hemolytic_probability", header: "Hemolytic Probability" },
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
