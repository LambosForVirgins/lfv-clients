import { forwardRef } from "react";
import styles from "./Button.module.css";
import clsx from "classnames";

interface ButtonProps
  extends Common.ComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Common.Variant;
  size?: Common.Size;
  rounded?: boolean;
  inverted?: boolean;
  outlined?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(
  (
    { testID, children, variant = "primary", size = "medium", ...props },
    ref
  ) => {
    return (
      <button
        {...props}
        data-testid={testID}
        ref={ref}
        className={clsx(
          props.className,
          props.outlined && styles.outline,
          props.inverted && styles.inverted,
          styles.outline,
          styles[variant],
          styles[size]
        )}
      >
        {children}
        <span className={clsx(styles.frame, styles[variant])}>{children}</span>
      </button>
    );
  }
);
