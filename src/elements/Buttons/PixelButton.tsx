import { forwardRef } from "react";
import styles from "./PixelButton.module.css";
import clsx from "classnames";

interface ButtonProps
  extends Common.ComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  outlined?: boolean;
}

export const PixelButton = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ testID, children, variant = "primary", ...props }, ref) => {
  return (
    <button
      {...props}
      data-testid={testID}
      ref={ref}
      className={styles.outline}
    >
      {children}
      <span className={clsx(styles.frame, styles[variant])}>{children}</span>
    </button>
  );
});
