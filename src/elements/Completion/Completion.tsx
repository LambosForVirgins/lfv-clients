import styles from "./Completion.module.css";

interface CompletionProps extends Common.ComponentProps {
  value: number;
  total: number;
}

export const Completion = ({ testID, ...props }: CompletionProps) => {
  return (
    <div className={styles.frame}>
      <span className={styles.accent}>{props.value}</span>
      <span className={styles.subsequent}>/{props.total}</span>
    </div>
  );
};
