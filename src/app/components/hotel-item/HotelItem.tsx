"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Rating from "@/app/components/rating/Rating";
import { Hotel } from "@/types/Hotels.types";
import styles from "./HotelItem.module.scss";

export default function HotelItem({ hotel }: { hotel: Hotel }) {
  const t = useTranslations("hotels");

  const handleItemClick = (event: React.MouseEvent, href: string) => {
    if (!(event.target instanceof HTMLAnchorElement)) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={styles.item} onClick={e => handleItemClick(e, hotel.href)}>
      <div className={styles.depiction}>
        <Image
          src={hotel.image.src}
          alt={hotel.image.alt}
          width={150}
          height={125}
          className={styles.image}
          unoptimized
        />
        <div className={styles.promotion}>{hotel.promotionTitle}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.details}>
          <h3 className={styles.title}>
            <a href={hotel.href} target="_blank" rel="noopener noreferrer">
              {hotel.title}
            </a>
            {hotel.rating && (
              <Rating amount={hotel?.rating?.ratingValue} type={hotel?.rating?.ratingType}>
              </Rating>
            )}
          </h3>
          <div className={styles.address}>{hotel.address}</div>
          <div className={styles.offer}>{hotel.offerName}</div>
          <div className={styles.cancellation}>{t(`cancellation.${hotel.cancellationType}`)}</div>
        </div>
        <div className={styles.pricing}>
          <div className={styles.duration}>
            {t("total")} ({hotel?.price?.currency ?? ""})
          </div>
          <div className={styles.price}><sup>{t("sign")}</sup>{hotel?.price?.amount ?? ""}</div>
          <div className={styles.saving}>
            {hotel.savings && <> {t("save")} {t("sign")}{hotel?.savings?.amount ?? ""}~</>}
          </div>
        </div>
      </div>
    </div>
  );
}