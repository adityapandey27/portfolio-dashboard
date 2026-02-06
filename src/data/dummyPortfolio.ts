import type { Stock } from "../types/stock";


const dummyPortfolio: Stock[] = [
  {
    name: "TCS",
    code: "TCS",
    exchange: "NSE",
    sector: "Technology",
    purchasePrice: 3200,  
    qty: 10,
    cmp: 3350,
  },
  {
    name: "HDFC Bank",
    code: "HDFCBANK.NS",
    exchange: "NSE",
    sector: "Financials",
    purchasePrice: 1500,
    qty: 20,
    cmp: 3350,
  },
];

export default dummyPortfolio;
