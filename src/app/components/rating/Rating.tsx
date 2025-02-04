"use client";

import { useRef, useEffect } from "react";
import { HotelRatings } from "@/types/Hotels.types";
import Circles from "./circle-rating.inline.svg";
import Stars from "./star-rating.inline.svg";

export default function Rating({ type, amount }: { type: HotelRatings; amount: number; }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const ratingLength = type === "self" ? 69 : 80;
  const rating = (ratingLength / 5) * amount;

  useEffect(() => {
    if (svgRef.current) {
      const element = svgRef.current.querySelector("path[mask]:last-child");

      if (element) {
        element.setAttribute("d", `M0 0h${rating}v15H0z`);
      }
    }
  }, [rating]);

  return (
    <div>
      <span className="sr-only">Rating: {amount}</span>
      { type === "self" ? (
        <Circles width={ratingLength} height={12} ref={svgRef}></Circles>
      ) : type === "star" ? (
        <Stars width={ratingLength} height={15} ref={svgRef}></Stars>
      ) : ""}
    </div>
  );
}