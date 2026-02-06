import { Stock } from "@/types/stock";
import SectorSummary from "./SectorSummary";
import StockTable from "./StockTable";

interface DashboardContentProps {
  stocks: Stock[];
  loading: boolean;
  error?: string;
  type: "sector" | "exchange";
}

export default function DashboardContent({
  stocks,
  loading,
  error,
  type,
}: DashboardContentProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-zinc-700 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-64 bg-zinc-700 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 font-medium p-6 bg-zinc-800 rounded-xl">
        {error}
      </div>
    );
  }

  if (!stocks.length) {
    return (
      <div className="text-zinc-400 font-medium p-6 bg-zinc-800 rounded-xl">
        No stocks in your portfolio.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectorSummary stocks={stocks} type={type} />
      <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 overflow-x-auto">
        <StockTable stocks={stocks} />
      </div>
    </div>
  );
}
