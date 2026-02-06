import { Stock } from "@/types/stock";

interface SectorSummaryProps {
  stocks: Stock[];
  type: "sector" | "exchange";
}

function groupBy(stocks: Stock[], key: "sector" | "exchange") {
  return stocks.reduce(
    (acc, stock) => {
      const k = stock[key];
      if (!acc[k]) acc[k] = [];
      acc[k].push(stock);
      return acc;
    },
    {} as Record<string, Stock[]>,
  );
}

export default function SectorSummary({ stocks, type }: SectorSummaryProps) {
  if (!stocks.length) return null;
  const grouped = groupBy(stocks, type);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
      {Object.keys(grouped).map((sector) => {
        const items = grouped[sector];

        const investment = items.reduce(
          (sum, s) => sum + s.purchasePrice * s.qty,
          0,
        );
        const present = items.reduce((sum, s) => sum + (s.cmp || 0) * s.qty, 0);
        const gain = present - investment;

        return (
          <div
            key={sector}
            className="p-5 rounded-xl shadow bg-zinc-800 border border-zinc-700"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">{sector}</h3>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div>
                <p className="text-zinc-400">Investment</p>
                <p className="text-white font-medium">
                  ₹{investment.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-zinc-400">Present Value</p>
                <p className="text-white font-medium">
                  ₹{present.toLocaleString()}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-zinc-400">Gain / Loss</p>
                <p
                  className={`font-semibold ${
                    gain >= 0 ? "text-emerald-400" : "text-red-500"
                  }`}
                >
                  {gain >= 0 ? "+" : ""}₹{gain.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
