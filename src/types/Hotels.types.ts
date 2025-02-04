import { HOTEL_SORT, RATINGS } from "@/lib/constants";

export type HotelSort = keyof typeof HOTEL_SORT;
export type HotelRatings = (typeof RATINGS)[number];

export type Hotel = {
  id: string;
  title: string;
  address: string;
  image: {
    src: string;
    alt: string;
  };
  rating: null | {
    ratingValue: number;
    ratingType: HotelRatings;
  };
  promotionTitle: string | null;
  offerName: string;
  price: null | {
    amount: number;
    currency: string;
  };
  savings: null | {
    amount: number;
    currency: string;
  };
  cancellationType: string;
  href: string;
};

export type HotelItemData = {
  id: string;
  property: {
    propertyId: string;
    title: string;
    address: string[];
    previewImage: {
      url: string;
      caption: string;
      imageType: string;
    };
    rating: {
      ratingValue: number;
      ratingType: HotelRatings;
    };
  };
  offer: {
    promotion: {
      title: string;
      type: string;
    };
    name: string;
    displayPrice: {
      amount: number;
      currency: string;
    };
    savings: {
      amount: number;
      currency: string;
    };
    cancellationOption: {
      cancellationType: string;
    };
  };
};

export type HotelsData = {
  results: HotelItemData[];
};