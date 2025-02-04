import { ReactNode, ReactElement } from "react";
import styles from "./Text.module.scss";

type TextProps = {
  heading: ReactElement<HTMLHeadingElement>;
  sub?: string;
  children: ReactNode;
};

export default function Text({ heading, sub, children }: TextProps) {
  return (
    <div className={styles.text}>
      {heading}
      {sub && <p className={styles.sub}>{sub}</p>}
      <div className={styles.columns}>
        {children}
      </div>
    </div>
  );
}
