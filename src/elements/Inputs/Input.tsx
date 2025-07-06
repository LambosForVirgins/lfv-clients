import { forwardRef } from "react";
import styles from "./Input.module.css";
import clsx from "classnames";

interface InputProps
  extends Common.ComponentProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  rounded?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ testID, rounded, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(props.className, styles.frame)}
      />
    );
  }
);
