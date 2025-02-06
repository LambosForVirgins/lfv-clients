import styles from "./Divider.module.css";
import clsx from "classnames";

interface DividerProps extends Common.ComponentProps {
  /**
   * Specifies the color variation of the divider.
   */
  variant?: "primary" | "secondary";
  label?: string;
}

export const Divider = ({
  testID,
  variant = "primary",
  ...props
}: DividerProps) => {
  return (
    <hr
      data-testid={testID}
      className={clsx(styles.frame, styles[variant])}
      data-label={props.label}
    />
  );
};
