import { NextResponse } from "next/server";
import { HotelSort } from "@/types/Hotels.types";
import getHotelsData from "@/lib/get-hotels-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort") as HotelSort;
  const hotels = await getHotelsData(sort);

  return NextResponse.json(hotels);
}