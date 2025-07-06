import { forwardRef } from "react";
import styles from "./Cell.module.css";
import clsx from "classnames";

interface CellProps extends Common.ComponentProps {
  variant?: Common.Variant;
  className?: string;
}

export const Cell = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<CellProps>
>(({ testID, children, variant = "primary", ...props }, ref) => {
  return (
    <div ref={ref} data-testid={testID} className={styles.outline}>
      <div className={clsx(props.className, styles.frame)}>
        <div className={styles.icon}>💩</div>
        {children}
      </div>
    </div>
  );
});
