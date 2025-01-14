import styles from "./ProgressIndicator.module.css";
import clsx from "classnames";

interface ProgressIndicatorProps extends Common.ComponentProps {
  progress: number;
  label?: string;
  size?: "small" | "medium" | "large";
}

export const ProgressIndicator = ({
  testID,
  progress = 0,
  size = "large",
  ...props
}: ProgressIndicatorProps) => {
  return (
    <div className={clsx(styles.frame, size === "small" && styles.small)}>
      <span
        className={styles.indicator}
        style={{
          width: `${Math.max(10, Math.min(Math.ceil(progress * 100), 100))}%`,
        }}
      />
      <span className={styles.label}>{props.label}</span>
    </div>
  );
};
