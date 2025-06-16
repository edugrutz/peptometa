import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useTable } from 'react-table';
import { saveAs } from 'file-saver';

export default function PeptoTable() {
  const [data, setData] = useState([]);
  const [minScore, setMinScore] = useState(0.5);
  const [predictionFilter, setPredictionFilter] = useState('All');

  // Baixa o CSV e processa os dados
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

  const filteredData = data.filter(row => {
    const score = parseFloat(row.Score);
    const pred = row.Prediction;
    return (!isNaN(score) && score >= minScore) &&
           (predictionFilter === 'All' || pred === predictionFilter);
  });

  const columns = React.useMemo(() => [
    { Header: 'ID', accessor: 'Sequence_ID' },
    { Header: 'Sequence', accessor: 'Sequence' },
    { Header: 'Prediction', accessor: 'Prediction' },
    { Header: 'Score', accessor: 'Score' },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData });

  const exportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'filtered_peptides.csv');
  };

  return (
    <div className="p-4">
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
        <button onClick={exportCSV} className="btn btn-warning ml-auto p-2 bg-blue-600 rounded ms-4">
          Export CSV
        </button>
      </div>

      <table {...getTableProps()} className="table min-w-full border border-gray-300">
        <thead>
          {headerGroups.map(group => {
            const groupProps = group.getHeaderGroupProps();
            const { key: groupKey, ...restGroupProps } = groupProps;
            return (
              <tr key={groupKey} {...restGroupProps} className="bg-gray-100">
                {group.headers.map(col => {
                  const colProps = col.getHeaderProps();
                  const { key: colKey, ...restColProps } = colProps;
                  return (
                    <th key={colKey} {...restColProps} className="border p-2 text-left" scope='col'>
                      {col.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            const { key: rowKey, ...restRowProps } = rowProps;
            return (
              <tr key={rowKey} {...restRowProps} className="border-t">
                {row.cells.map(cell => {
                  const cellProps = cell.getCellProps();
                  const { key: cellKey, ...restCellProps } = cellProps;
                  return (
                    <td key={cellKey} {...restCellProps} className="p-2 border">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
