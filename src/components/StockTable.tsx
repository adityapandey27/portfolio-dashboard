import { Stock } from "@/types/stock";

interface StockTableProps {
  stocks: Stock[];
}

export default function StockTable({ stocks }: StockTableProps) {
  return (
    <table className="min-w-[700px] w-full text-sm">
      
      <thead className="text-zinc-400 border-b border-zinc-800">
        <tr>
          <th className="py-3 text-left">Stock</th>
          <th>Qty</th>
          <th>Buy</th>
          <th>CMP</th>
          <th>Investment</th>
          <th>Present Value</th>
          <th>Gain/Loss</th>
          <th>P/E</th>
          <th>Sector</th>
        </tr>
      </thead>

      <tbody>
        {stocks.map((s) => {
          const investment = s.purchasePrice * s.qty;
          const presentValue = s.cmp * s.qty;
          const gain = presentValue - investment;

          return (
            <tr
              key={s.code}
                className="border-b border-zinc-800 hover:bg-zinc-800/40 text-center"
            >
              <td className="py-3 text-left">{s.name}</td>
              <td>{s.qty}</td>
              <td>₹{s.purchasePrice}</td>
              <td>₹{s.cmp}</td>
              <td>₹{investment}</td>
              <td>₹{presentValue}</td>
              <td className={gain >= 0 ? "text-emerald-400" : "text-red-500"}>
                {gain >= 0 ? "+" : ""}₹{gain}
              </td>
              <td>{s.pe}</td>
              <td>{s.sector}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
