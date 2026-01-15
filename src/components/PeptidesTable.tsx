"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Peptide = {
    id: number;
    sample_id: string;
    sequence: string;
    length: number;
    peptide_class: string;
}

export function PeptidesTable() {

    const [data, setData] = useState<Peptide[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPeptides() {
            try {
                const { data, error } = await supabase
                    .from("peptides")
                    .select("*");
                    
                if (error) throw error;

                setData(data ?? []);

                } catch (err) {
                    setError("Error fetching peptides");
                } finally {
                    setLoading(false);
                }
        }

        fetchPeptides();
    }, []);

    if (loading) return <p>Loading peptides...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="px-4 md:px-8 lg:px-12">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Sample ID</th>
                        <th className="border border-gray-300 px-4 py-2">Sequence</th>
                        <th className="border border-gray-300 px-4 py-2">Length</th>
                        <th className="border border-gray-300 px-4 py-2">Class</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((peptide) => (
                        <tr key={peptide.id}>
                            <td className="border border-gray-300 px-4 py-2">{peptide.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{peptide.sample_id}</td>
                            <td className="border border-gray-300 px-4 py-2">{peptide.sequence}</td>
                            <td className="border border-gray-300 px-4 py-2">{peptide.length}</td>
                            <td className="border border-gray-300 px-4 py-2">{peptide.peptide_class}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}