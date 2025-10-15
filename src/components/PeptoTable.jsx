import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  useReactTable, // Novo hook principal
  getCoreRowModel, // Novo gerenciador de modelos de linhas
  flexRender, // Novo renderizador de conteúdo de célula/cabeçalho
} from '@tanstack/react-table';
import { saveAs } from 'file-saver';

export default function PeptoTable() {
  const [data, setData] = useState([]);
  const [minScore, setMinScore] = useState(0.5);
  const [predictionFilter, setPredictionFilter] = useState('All');

  // --- 1. CONFIGURAÇÃO DAS COLUNAS (Usa a mesma estrutura) ---
  const columns = React.useMemo(() => [
    { accessorKey: 'Sequence_ID', header: 'ID' }, // 'accessorKey' substitui 'accessor'
    { accessorKey: 'Sequence', header: 'Sequence' },
    { accessorKey: 'Prediction', header: 'Prediction' },
    { accessorKey: 'Score', header: 'Score' },
  ], []);

  // --- 2. FILTRAGEM DE DADOS ---
  // A filtragem é feita antes de passar os dados para a tabela,
  // mantendo a sua lógica original.
  const filteredData = data.filter(row => {
    const score = parseFloat(row.Score);
    const pred = row.Prediction;
    return (!isNaN(score) && score >= minScore) &&
           (predictionFilter === 'All' || pred === predictionFilter);
  });

  // --- 3. DOWNLOAD E PARSE DO CSV ---
  useEffect(() => {
    Papa.parse(process.env.PUBLIC_URL + '/data/anticp.csv', {
      header: true,
      download: true,
      delimiter: ";",
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
      }
    });
  }, []);

  // --- 4. CONFIGURAÇÃO DA TABELA COM useReactTable (NOVO) ---
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(), // Essencial para o funcionamento básico
    // Estado de filtragem global (mantive a lógica manual acima)
    // Se fosse usar filtros internos do TanStack, seria aqui.
    debugTable: false,
  });
  
  // --- 5. FUNÇÃO DE EXPORTAÇÃO (Inalterada) ---
  const exportCSV = () => {
    // Usamos os dados filtrados, que é o que está sendo exibido na tela
    const csv = Papa.unparse(filteredData); 
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'filtered_peptides.csv');
  };

  return (
    <div className="p-4">
      {/* --- CONTROLES DE FILTRO E EXPORTAÇÃO (Inalterado) --- */}
      <div className="flex gap-4 mb-4">
        <label>
          Min Score:
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={minScore}
            onChange={(e) => setMinScore(parseFloat(e.target.value))}
            className="ml-2 p-1 border ms-2"
          />
        </label>
        <label className='ms-4'>
          Prediction:
          <select
            value={predictionFilter}
            onChange={(e) => setPredictionFilter(e.target.value)}
            className="ml-2 p-1 border ms-2"
          >
            <option>All</option>
            <option>AntiCP</option>
            <option>AMP</option>
          </select>
        </label>
        <button 
          onClick={exportCSV} 
          className="btn btn-warning ml-auto p-2 bg-blue-600 rounded ms-4 text-white" 
          style={{backgroundColor: '#2563EB'}} // Cor de fundo para garantir visibilidade
        >
          Export CSV
        </button>
      </div>

      {/* --- RENDERIZAÇÃO DA TABELA (MUITO ALTERADO) --- */}
      <table className="table min-w-full border border-gray-300">
        <thead>
          {/* Mapeia os grupos de cabeçalhos */}
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {/* Mapeia os cabeçalhos em cada grupo */}
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  colSpan={header.colSpan}
                  className="border p-2 text-left" 
                  scope='col'
                >
                  {/* Usa flexRender para renderizar o conteúdo do cabeçalho */}
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* Mapeia as linhas renderizadas */}
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-t">
              {/* Mapeia as células em cada linha */}
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2 border">
                  {/* Usa flexRender para renderizar o conteúdo da célula */}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}