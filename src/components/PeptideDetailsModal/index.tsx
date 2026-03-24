"use client";

import { Modal } from "@/components/Modal";
import { Download } from "lucide-react";

interface PeptideDetailsModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  peptide: T;
  onDownload: () => void;
  isDownloading?: boolean;
}

export function PeptideDetailsModal<T>({
  isOpen,
  onClose,
  peptide,
  onDownload,
  isDownloading = false,
}: PeptideDetailsModalProps<T>) {
  if (!peptide) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Peptide Details">
      <div className="space-y-6">
        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(peptide).map(([key, value]) => {
            // Format the key to be more readable
            const formattedKey = key
              .replace(/_/g, " ")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {formattedKey}
                </p>
                <p className="mt-2 text-lg font-medium text-gray-900 break-all">
                  {typeof value === "number"
                    ? value.toFixed(4)
                    : String(value)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Download button */}
        <div className="border-t border-gray-200 pt-6 flex justify-end">
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Downloading..." : "Download Dataset"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
