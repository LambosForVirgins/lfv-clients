import React, { forwardRef } from "react";
import styles from "./HeaderButton.module.css";
import clsx from "classnames";

interface HeaderButtonProps extends Common.ComponentProps {
  progress?: number;
  label: string;
  icon?: string;
  highlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({ testID, progress = 0, label, icon, highlight, ...props }, ref) => {
    // Clamp progress between 0 and 100
    const normalizedProgress = Math.min(Math.max(progress, 0), 100);

    return (
      <button
        ref={ref}
        {...props}
        className={clsx(styles.frame, highlight && styles.highlight)}
        disabled={props.disabled}
      >
        {icon ? (
          <img
            src={`./svg/${icon}.svg`}
            alt={label}
            width={"70%"}
            height={"70%"}
            style={{ fill: "#ffcd02" }}
          />
        ) : (
          <span className={styles.label}>{label}</span>
        )}
      </button>
    );
  }
);
