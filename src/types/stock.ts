export interface Stock {
  name: string;
  code: string;
  exchange: "NSE" | "BSE";
  sector: string;
  purchasePrice: number;
  qty: number;
  cmp: number;
  pe?: number;
  earnings?: string;
}
