import styles from "./Divider.module.css";
import clsx from "classnames";

interface DividerProps extends Common.ComponentProps {
  /**
   * Specifies the color variation of the divider.
   */
  variant?: "primary" | "secondary";
  align?: "left" | "right" | "center";
  className?: string;
}

export const Divider = ({
  testID,
  variant = "primary",
  align = "center",
  ...props
}: React.PropsWithChildren<DividerProps>) => {
  return (
    <div
      data-testid={testID}
      className={clsx(
        props.className,
        styles.frame,
        styles[variant],
        styles[align]
      )}
    >
      {props.children}
    </div>
  );
};
