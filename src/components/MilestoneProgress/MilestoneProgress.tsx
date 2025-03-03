import styles from "./MilestoneProgress.module.css";

interface MilestoneProgressProps extends Common.ComponentProps {
  progress: number;
}

export const MilestoneProgress = ({
  testID,
  ...props
}: MilestoneProgressProps) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <span className={styles.head}>
        <h3>Releases</h3>
        <span>{`${3}/30`}</span>
      </span>
      <span data-testid={`${testID}.channel`} className={styles.channel}>
        <span data-testid={`${testID}.progress`} className={styles.progress} />
        <span data-testid={`${testID}.indicator`} className={styles.icon} />
        <span data-testid={`${testID}.indicator`} className={styles.icon} />
        <span data-testid={`${testID}.indicator`} className={styles.icon} />
        <span data-testid={`${testID}.indicator`} className={styles.icon} />
      </span>
    </div>
  );
};
