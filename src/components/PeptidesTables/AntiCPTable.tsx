"use client";

import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/Table";
import { Column } from "@/components/Table/types";
import { getPeptidesAntiCP } from "@/services/peptides";
import { IPeptideAntiCP } from "@/types/peptide";

export function AntiCPPeptidesTable() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["anticp"],
    queryFn: getPeptidesAntiCP,
  });

  if (isLoading) return <p>Loading peptides...</p>;
  if (error) return <p>Error fetching peptides</p>;

  const columns: Column<IPeptideAntiCP>[] = [
    { key: "sequence_id", header: "ID" },
    { key: "sequence", header: "Sequence" },
    { key: "score", header: "AntiCP Score" },
  ];

  return <Table data={data} columns={columns} keyField="sequence_id" />;
}
