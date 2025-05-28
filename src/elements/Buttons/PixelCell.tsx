import { forwardRef } from "react";
import styles from "./PixelCell.module.css";

export const PixelCell = forwardRef<HTMLDivElement, React.PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className={styles.outline}>
        <span className={styles.frame}>
          <span className={styles.icon}>💩</span>
          {children}
        </span>
      </div>
    );
  }
);
