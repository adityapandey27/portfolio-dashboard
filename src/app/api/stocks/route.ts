import { NextRequest, NextResponse } from "next/server";
import dummyPortfolio from "@/data/dummyPortfolio";
import { fetchAllStocks } from "../../lib/stockApi";

export async function GET(req: NextRequest) {
  try {
    const data = await fetchAllStocks(dummyPortfolio);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Failed to fetch stock data", stocks: dummyPortfolio },
      { status: 500 }
    );
  }
}