import { forwardRef } from "react";
import styles from "./Button.module.css";
import clsx from "classnames";

export type ButtonVariant = "primary" | "secondary" | "muted";

export type ButtonSize = "mini" | "small" | "medium" | "large";

interface ButtonProps
  extends Common.ComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  inverted?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ testID, text, loading, inverted, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      data-testid={testID}
      className={clsx(
        props.className,
        styles.frame,
        props.variant === "muted" && styles.muted,
        props.size === "small" && styles.small,
        props.size === "mini" && styles.mini,
        inverted && styles.inverted
      )}
      disabled={props.disabled || loading}
    >
      {props.children || text}
    </button>
  );
});
