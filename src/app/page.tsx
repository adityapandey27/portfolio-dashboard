"use client";

import { useEffect, useState } from "react";
import { Stock } from "../types/stock";
import SummaryCards from "../components/SummaryCards";
import ViewByFilter from "../components/ViewByFilter";
import DashboardContent from "@/components/DashboardContent";

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [viewBy, setViewBy] = useState<"sector" | "exchange">("sector");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stocks");
      if (!res.ok) throw new Error("Failed to fetch stock data");
      const data: Stock[] = await res.json();
      setStocks(data);
      setError("");
    } catch (err) {
      setError("Unable to fetch stock data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStocks();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Portfolio Dashboard</h1>

      <SummaryCards stocks={stocks} />

      <ViewByFilter viewBy={viewBy} setViewBy={setViewBy} />

      <DashboardContent
        stocks={stocks}
        loading={loading}
        error={error}
        type={viewBy}
      />
    </div>
  );
}
