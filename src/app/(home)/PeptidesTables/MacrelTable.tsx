"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/Table";
import { Column, SortDirection } from "@/components/Table/types";
import { getPeptidesMacrel } from "@/services/peptides";
import { IPeptideMacrel } from "@/types/peptide";
import { useDebounce } from "@/hooks/useDebounce";
import { PeptideDetailsModal } from "@/components/PeptideDetailsModal";

export function MacrelPeptidesTable() {

  const [sortBy, setSortBy] = useState<string>("amp_probability");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedPeptide, setSelectedPeptide] = useState<IPeptideMacrel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Range
  const from = (page - 1) * itemsPerPage;
  const to = page * itemsPerPage - 1;

  const { data: result, isLoading, error } = useQuery({
    queryKey: ["macrel", sortBy, sortDir, page, itemsPerPage, debouncedSearch],
    queryFn: () => getPeptidesMacrel(sortBy, sortDir, from, to, debouncedSearch),
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

  const handleRowClick = (peptide: IPeptideMacrel) => {
    setSelectedPeptide(peptide);
    setIsModalOpen(true);
  };

  const handleDownload = async () => {
    if (!selectedPeptide) return;

    setIsDownloading(true);
    try {
      // Create a CSV-like format for the dataset
      const data = JSON.stringify(selectedPeptide, null, 2);
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
      element.setAttribute("download", `peptide_${selectedPeptide.sequence_id}.json`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Table
        data={result?.data ?? []}
        totalPages={Math.ceil((result?.count ?? 0) / itemsPerPage)}
        columns={columns}
        keyField="sequence_id"
        onPageChange={(newPage) => setPage(newPage)}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(newItemsPerPage) => setItemsPerPage(newItemsPerPage)}
        searchTerm={search}
        onSearchChange={(newSearch) => setSearch(newSearch)}
        sort={{ column: sortBy, direction: sortDir }}
        onSortChange={(col, dir) => {
          setSortBy(col);
          setSortDir(dir);
        }}
        onRowClick={handleRowClick}
      />

      <PeptideDetailsModal<IPeptideMacrel>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        peptide={selectedPeptide!}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />
    </>
  );
}
