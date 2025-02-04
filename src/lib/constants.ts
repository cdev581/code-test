export const HOTEL_SORT = {
  price_asc: { value: "price_asc", label: "Price low-high" },
  price_desc: { value: "price_desc", label: "Price high-low" }
} as const;

export const FETCH_STATUS = ["IDLE", "COMPLETE", "LOADING", "ERROR"] as const;

export const CANCELLATION_VALUES = ["price-asc", "price-desc"] as const;

export const RATINGS = ["self", "star"] as const;