import fs from "fs/promises";
import path from "path";
import { HotelItemData, HotelSort } from "@/types/Hotels.types";

export default async function getHotelsData(sort: HotelSort | null) {
  await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate load time.
  const filePath = path.join(process.cwd(), "src", "data", "hotels.json");
  const hotels = JSON.parse(await fs.readFile(filePath, "utf-8"));

  hotels?.results?.sort((a: HotelItemData, b: HotelItemData) => {
    if (sort === "price_asc") {
      return a.offer.displayPrice.amount - b.offer.displayPrice.amount;
    } else if (sort === "price_desc") {
      return b.offer.displayPrice.amount - a.offer.displayPrice.amount;
    } else {
      return 0;
    }
  });

  return hotels;
}