
import YahooFinance from "yahoo-finance2";
import { Stock } from "@/types/stock";

const yahooFinance = new YahooFinance();

export async function fetchStockData(stock: Stock): Promise<Stock> {
  try {
    const quote: any = await yahooFinance.quote(stock.code);

    return {
      ...stock,
      cmp: quote?.regularMarketPrice ?? stock.purchasePrice,
      pe: quote?.trailingPE ?? 0,
      earnings: quote?.trailingEps
        ? `₹${(quote.trailingEps * stock.qty).toFixed(2)}`
        : "N/A",
    };
  } catch (error) {
    console.error(`Error fetching ${stock.code}:`, error);
    return { ...stock, cmp: stock.purchasePrice, pe: 0, earnings: "N/A" };
  }
}
export async function fetchAllStocks(stocks: Stock[]): Promise<Stock[]> {
  const promises = stocks.map(fetchStockData);
  return Promise.all(promises);
}