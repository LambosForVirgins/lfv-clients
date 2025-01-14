import React, { forwardRef } from "react";
import styles from "./BoostButton.module.css";
import clsx from "classnames";

interface BoostButtonProps extends Common.ComponentProps {
  progress?: number;
  label: string;
  icon?: string;
  highlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const BoostButton = forwardRef<HTMLButtonElement, BoostButtonProps>(
  (
    { testID, progress = 0, label, icon = "lighting", highlight, ...props },
    ref
  ) => {
    // Clamp progress between 0 and 100
    const normalizedProgress = Math.min(Math.max(progress, 0), 100);

    return (
      <button
        ref={ref}
        {...props}
        className={clsx(styles.frame, highlight && styles.highlight)}
        disabled={props.disabled}
      >
        <span className={styles.label}>{label}</span>
      </button>
    );
  }
);
