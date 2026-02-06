import { Stock } from "@/types/stock";

export default function SummaryCards({ stocks }: { stocks: Stock[] }) {
  const totals = stocks.reduce(
    (acc, s) => {
      const inv = s.purchasePrice * s.qty;
      const val = (s.cmp || 0) * s.qty;
      acc.investment += inv;
      acc.value += val;
      acc.gain += val - inv;
      return acc;
    },
    { investment: 0, value: 0, gain: 0 },
  );

  const returnPct =
    totals.investment === 0 ? 0 : (totals.gain / totals.investment) * 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mb-4">
      <Card title="Investment" value={`₹${totals.investment.toFixed(0)}`} />
      <Card title="Current Value" value={`₹${totals.value.toFixed(0)}`} />
      <Card
        title="Gain/Loss"
        value={`₹${totals.gain.toFixed(0)}`}
        positive={totals.gain >= 0}
      />
      <Card title="Return %" value={`${returnPct.toFixed(2)}%`} />
    </div>
  );
}

function Card({
  title,
  value,
  positive,
}: {
  title: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-md shadow ">
      <p className="text-gray-500">{title}</p>
      <p
        className={`text-md font-bold ${
          positive === undefined
            ? ""
            : positive
              ? "text-green-600"
              : "text-red-600"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
