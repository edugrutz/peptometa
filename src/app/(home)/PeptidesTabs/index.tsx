"use client";

import { useState } from "react";
import { MacrelPeptidesTable } from "../PeptidesTables/MacrelTable";
import { AntiCPPeptidesTable } from "../PeptidesTables/AntiCPTable";

export function PeptidesTabs() {

  const [activeTab, setActiveTab] = useState<string>("anticp");

  return (
    <div className="px-4 md:px-8 lg:px-12 flex flex-col gap-4">
      <div className="flex gap-2">
        <button className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded border" onClick={() => setActiveTab("anticp")}>AntiCP Peptides</button>
        <button className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded border" onClick={() => setActiveTab("macrel")}>Macrel Peptides</button>
      </div>
      <div>
        {activeTab === "anticp" && <AntiCPPeptidesTable />}
        {activeTab === "macrel" && <MacrelPeptidesTable />}
      </div>
    </div>
  );
}
