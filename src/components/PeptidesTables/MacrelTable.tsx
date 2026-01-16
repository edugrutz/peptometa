"use client";

import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/Table";
import { Column } from "@/components/Table/types";
import { getPeptidesMacrel } from "@/services/peptides";
import { IPeptideMacrel } from "@/types/peptide";

export function MacrelPeptidesTable() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["macrel"],
    queryFn: getPeptidesMacrel,
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

  return <Table data={data} columns={columns} keyField="sequence_id" />;
}
