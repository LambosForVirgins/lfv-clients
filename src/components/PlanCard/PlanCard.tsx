import styles from "./PlanCard.module.css";
import clsx from "classnames";

interface PlanCardProps extends Common.ComponentProps {
  title: string;
  tag?: string;
  pricing: { currency: string; amount: number }[];
  className?: string;
  selected?: boolean;
}

export const PlanCard = ({ testID, ...props }: PlanCardProps) => {
  return (
    <div
      data-testid={testID}
      className={clsx(
        props.className,
        styles.frame,
        props.selected && styles.selected
      )}
    >
      <span className={styles.tag}>{props.tag}</span>
      <h2 className={styles.title}>{props.title}</h2>
      <span className={styles.indicator}>
        <span className={styles.icon} />
      </span>
      <span className={styles.price}>
        ${props.pricing[0].amount.toFixed(2)}/wk
      </span>
    </div>
  );
};
