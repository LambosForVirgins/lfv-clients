import styles from "./SummaryList.module.css";
import clsx from "classnames";

interface SummaryListProps extends Common.ComponentProps {
  title: string;
  tag?: string;
  pricing: { currency: string; amount: number }[];
  className?: string;
  selected?: boolean;
  items: { label: string; description?: string }[];
}

export const SummaryList = ({ testID, ...props }: SummaryListProps) => {
  return (
    <div
      data-testid={testID}
      className={clsx(
        props.className,
        styles.frame,
        props.selected && styles.selected
      )}
    >
      <span className={clsx(styles.title, styles.pill)}>{props.title}</span>
      {props.items.map((item) => (
        <div className={styles.item} key={item.label}>
          <span className={styles.icon} />
          <span className={styles.row}>
            <span className={styles.label}>{item.label}</span>
            {item.description && (
              <span className={styles.description}>{item.description}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
