"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HotelSort } from "@/types/Hotels.types";
import { HOTEL_SORT } from "@/lib/constants";
import styles from "./Hotels.module.scss";

type HeaderProps = {
  children: ReactNode,
  sort: HotelSort;
  setSort: (value: HotelSort) => void;
};

export default function HotelHeader({ sort, setSort, children }: HeaderProps) {
  const t = useTranslations("hotels");

  return (
    <header className={styles.header}>
      <Image src={t("logo.src")} alt={t("logo.alt")} height={30} width={152} priority />
      <div className={styles.refine}>
        <h2 className={styles.title} id="status" aria-live="polite">
          {children}
        </h2>
        <div className={styles.sort}>
          <label className={styles["sort-label"]} htmlFor="hotels-results-sort">
            {t("sort")}
          </label>
          <select
            id="hotels-results-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as HotelSort)}
            aria-controls="results"
          >
            {(Object.values(HOTEL_SORT)).map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}