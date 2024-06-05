import React from 'react';

interface TableRowProps {
  label: string;
  value: number | string;
}

const TableRow: React.FC<TableRowProps> = ({ label, value }) => {

  if (label === "HPP (Rp/Kg)" || label === "Nett Profit Rp./Ekor" || label === "Nett Profit Rp./Kg") {
    return (
      <tr>
        <td className="border w-full px-4 py-2 bg-green-600 text-white">{label}</td>
        <td className="border w-full px-4 py-2 bg-green-600 text-white">{typeof value === 'number' ? value.toFixed(2) : value}</td>
      </tr>
    );
  } else if (label === "Nilai Tukar USD. Ke Rp") {
    return (
      <tr>
        <td className="border w-full px-4 py-2 bg-yellow-500 text-white">{label}</td>
        <td className="border w-full px-4 py-2 bg-yellow-500 text-white">{typeof value === 'number' ? value.toFixed(2) : value}</td>
      </tr>
    )
  }

  return (
    <tr>
      <td className="border w-full px-4 py-2">{label}</td>
      <td className="border w-full px-4 py-2">{typeof value === 'number' ? value.toFixed(2) : value}</td>
    </tr>
  );
};

export interface TableResultProps {
  data?: {
    [key: string]: number | string;
  };
}

const TableResult: React.FC<TableResultProps> = ({ data }) => {
  if (data) {
    return (
      <div className="max-w-2xl mx-auto my-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key} label={key} value={value} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default TableResult;