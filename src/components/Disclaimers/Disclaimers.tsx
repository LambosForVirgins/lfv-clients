import styles from "./Disclaimers.module.css";
import clsx from "classnames";

interface DisclaimersProps extends Common.ComponentProps {
  className?: string;
}

export const Disclaimers = ({ testID, ...props }: DisclaimersProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <span className={styles.content}>Disclaimers</span>
    </div>
  );
};
