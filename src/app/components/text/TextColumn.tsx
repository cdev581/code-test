import { ReactNode } from "react";
import styles from "./Text.module.scss";

type Tag = "p" | "strong" | "code" | "ul" | "li";

type TextColumnProps = {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode
};

export default function TextColumn({ children }: TextColumnProps) {
  return (
    <div className={styles.column}>
      {children({
        p: (chunks: ReactNode) => <p>{chunks}</p>,
        strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
        code: (chunks: ReactNode) => <code>{chunks}</code>,
        ul: (chunks: ReactNode) => <ul>{chunks}</ul>,
        li: (chunks: ReactNode) => <li>{chunks}</li>
      })}
    </div>
  );
}