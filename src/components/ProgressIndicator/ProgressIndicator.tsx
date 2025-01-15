import { useMarketCap } from "@/state/marketCap";
import styles from "./ProgressIndicator.module.css";
import clsx from "classnames";

interface ProgressIndicatorProps extends Common.ComponentProps {
  progress?: number;
  label?: string;
  size?: "small" | "medium" | "large";
}

export const ProgressIndicator = ({
  testID,
  size = "large",
  ...props
}: ProgressIndicatorProps) => {
  const { marketCapDiluted } = useMarketCap();

  const progress = marketCapDiluted / 100_000_000;
  const label = `$${Math.floor(marketCapDiluted / 100_000) / 10} Million`;

  return (
    <div className={clsx(styles.frame, size === "small" && styles.small)}>
      <span
        className={styles.indicator}
        style={{
          width: `${Math.max(10, Math.min(Math.ceil(progress * 100), 100))}%`,
        }}
      />
      <span className={styles.label}>{label}</span>
    </div>
  );
};
