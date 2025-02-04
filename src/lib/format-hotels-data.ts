import { HotelsData, HotelItemData } from "@/types/Hotels.types";

export default function formatHotelsData(hotels: HotelsData) {
  if (!Array.isArray(hotels?.results)) {
    return [];
  }

  return (structuredClone(hotels.results)).map((hotel: HotelItemData, i: number) => {
    const { id, property, offer } = hotel ?? {};
    const { title, address, previewImage, rating } = property ?? {};
    const { name, displayPrice, savings, cancellationOption } = offer ?? {};
    let imageSrc;

    try {
      const imageUrl = new URL(previewImage?.url);
      imageUrl.searchParams.set("random", String(i));
      imageSrc = imageUrl.href;
    } catch {
      imageSrc = "/blank.svg";
    }

    return {
      id: id ?? null,
      title: title ?? "",
      address: (address ?? []).join(", "),
      image: {
        src: imageSrc,
        alt: previewImage?.caption ?? "" // Blank intentionally, don't indicate error.
      },
      rating: rating?.ratingValue != null ? rating : null,
      promotionTitle: offer?.promotion?.title ?? null,
      offerName: name ?? "",
      price: displayPrice?.amount ? displayPrice : null,
      savings: savings?.amount ? savings : null,
      cancellationType: cancellationOption?.cancellationType,
      href: "https://qantas.com.au"
    };
  });
}