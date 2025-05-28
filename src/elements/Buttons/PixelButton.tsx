import { forwardRef } from "react";
import styles from "./PixelButton.module.css";

export const PixelButton = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren
>(({ children }, ref) => {
  return (
    <button ref={ref} className={styles.outline}>
      <span className={styles.frame}>{children}</span>
    </button>
  );
});
