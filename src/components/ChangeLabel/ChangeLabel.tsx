import styles from "./ChangeLabel.module.css";
import clsx from "classnames";

interface ChangeLabelProps extends Common.ComponentProps {
  amount: number;
  percentage: number;
}

export const ChangeLabel = ({ testID, ...props }: ChangeLabelProps) => {
  const prefix = props.amount > 0 ? "+" : "",
    isNegative = props.amount < 0;

  return (
    <span
      data-testid={testID}
      className={clsx(styles.frame, isNegative && styles.negative)}
    >
      <span data-testid={`${testID}.amount`} className={styles.amount}>
        {`${prefix}${props.amount.toLocaleString()}`}
      </span>
      <span data-testid={`${testID}.percentage`} className={styles.percentage}>
        {`${prefix}${props.percentage.toFixed(2)}%`}
      </span>
    </span>
  );
};
