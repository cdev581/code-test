import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./Header.module.scss";

export default function Header() {
  const t = useTranslations("header");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.content}`}>
        <a href={t("logo.href")} className={styles.logo}>
          <Image
            priority
            src={t("logo.src")}
            alt={t("logo.alt")}
            height={30}
            width={152}
          />
        </a>
        <a href={t("github.href")} className={styles.github}>
          <Image
            priority
            src={t("github.src")}
            alt={t("github.alt")}
            height={30}
            width={30}
          />
        </a>
      </div>
    </header>
  );
}