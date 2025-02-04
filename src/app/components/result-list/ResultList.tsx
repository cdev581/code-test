"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import useFetch from "@/hooks/useFetch";
import { ErrorBoundary } from "react-error-boundary";
import { FetchStatus } from "@/types/Fetch.types";

type ResultListProps<T> = {
  children: (data: T | null, status: FetchStatus) => ReactNode;
  url: string | null
};

export default function ResultList<T>({ children, url }: ResultListProps<T>) {
  const { data, status } = useFetch<T>(url);
  const t = useTranslations("hotels");

  return (
    <section>
      <ErrorBoundary fallback={<p>{t("error")}</p>}>
        {children(data, status)}
      </ErrorBoundary>
    </section>
  );
}