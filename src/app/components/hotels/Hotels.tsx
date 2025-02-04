"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ResultList from "@/app/components/result-list/ResultList";
import HotelHeader from "@/app/components/hotels/HotelHeader";
import HotelItem from "@/app/components/hotel-item/HotelItem";
import Loader from "@/app/components/loader/Loader";
import formatHotelsData from "@/lib/format-hotels-data";
import { HotelSort, Hotel, HotelsData } from "@/types/Hotels.types";
import { FetchStatus } from "@/types/Fetch.types";
import styles from "./Hotels.module.scss";

export default function Hotels({ defaultSort }: { defaultSort: HotelSort}) {
  const t = useTranslations("hotels");
  const [sort, setSort] = useState<HotelSort>(defaultSort);
  const [origin, setOrigin] = useState<string | null>(null);
  let url: string | null = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  if (origin !== null) {
    try {
      // Prevent the request from caching so loading animation is visible.
      url = new URL(`/api/hotels?sort=${encodeURIComponent(sort)}&bust=${Math.floor(Math.random() * 100000)}`, origin).href;
    } catch {
      url = null;
    }
  }

  return (
    <ResultList url={url}>
      {(data: HotelsData | null, status: FetchStatus) => (
        <div role="region" aria-labelledby="status" id="results">
          <HotelHeader sort={sort} setSort={setSort}>
            {(status === "LOADING" || status === "IDLE") && <strong>{t("loading")}</strong>}
            {status === "ERROR" && <strong>{t("error")}</strong>}
            {status === "COMPLETE" && <>
              <strong>{data?.results?.length ?? 0}</strong>
              {t("refine")}
              <strong>{t("city")}</strong>
            </>}
          </HotelHeader>
          <div className={styles.results}>
            <div className={`
              ${styles.loader}
              ${status === "LOADING" || status === "IDLE" ? '' : styles.hidden}
            `}>
              <Loader />
            </div>
            <ul className={`${styles.list} ${status === "COMPLETE" ? '' : styles.hidden}`}>
              {(data) && (
                formatHotelsData(data).map((hotel: Hotel, i) => (
                  <li key={hotel.id ?? `hotel${i}`} className={styles.item}>
                    <HotelItem hotel={hotel} />
                  </li>
                ))
              )}
            </ul>
            {(status === "COMPLETE" && (!data || !data?.results?.length)) && (
              <p>{t("empty")}</p>
            )}
          </div>
        </div>
      )}
    </ResultList>
  );
}