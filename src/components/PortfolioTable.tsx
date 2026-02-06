"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Stock } from "@/types/stock";

export default function PortfolioTable({ data }: { data: Stock[] }) {
  const columns: ColumnDef<Stock>[] = [
    { accessorKey: "name", header: "Stock" },
    { accessorKey: "purchasePrice", header: "Buy Price" },
    { accessorKey: "qty", header: "Qty" },
    { accessorKey: "cmp", header: "CMP" },
    {
      header: "Investment",
      cell: ({ row }) => row.original.purchasePrice * row.original.qty,
    },
    {
      header: "Present Value",
      cell: ({ row }) => row.original.cmp * row.original.qty,
    },
    {
      header: "Gain/Loss",
      cell: ({ row }) => {
        const inv = row.original.purchasePrice * row.original.qty;
        const pv = row.original.cmp * row.original.qty;
        const diff = pv - inv;
        return (
          <span className={diff >= 0 ? "text-green-600" : "text-red-600"}>
            {diff}
          </span>
        );
      },
    },
    { accessorKey: "pe", header: "P/E" },
    { accessorKey: "earnings", header: "Earnings" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((h) => (
              <th key={h.id} className="p-2 border">
                {flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
