import { useState, useEffect } from "react";
import { FetchStatus } from "@/types/Fetch.types";

export default function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>("IDLE");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    if (url !== null) {
      setStatus("LOADING");
      fetch(url, { signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error has occurred.");
          }

          return res.json();
        })
        .then((data: T) => {
          setData(data);
          setStatus("COMPLETE");
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setStatus("ERROR");
          }
        });
    }

    return () => controller.abort();
  }, [url]);

  return { data, status };
}