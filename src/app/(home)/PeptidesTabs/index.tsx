"use client";

import { useState } from "react";
import { MacrelPeptidesTable } from "../PeptidesTables/MacrelTable";
import { AntiCPPeptidesTable } from "../PeptidesTables/AntiCPTable";

export function PeptidesTabs() {

  const [activeTab, setActiveTab] = useState<string>("anticp");

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1.5 w-fit shadow-sm">
        <button
          onClick={() => setActiveTab("anticp")}
          className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 ${
            activeTab === "anticp"
              ? "bg-slate-600 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          AntiCP Peptides
        </button>
        <button
          onClick={() => setActiveTab("macrel")}
          className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 ${
            activeTab === "macrel"
              ? "bg-slate-600 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Macrel Peptides
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6">
          {activeTab === "anticp" && <AntiCPPeptidesTable />}
          {activeTab === "macrel" && <MacrelPeptidesTable />}
        </div>
      </div>
    </div>
  );
}
