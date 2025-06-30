import styles from "./ExampleWrapper.module.css";
import clsx from "classnames";

interface ExampleWrapperProps extends Partial<Common.ComponentProps> {
  title?: string;
  message?: string;
  variant?: "positive" | "negative";
}

export const ExampleWrapper = ({
  testID = "example",
  title = `Do`,
  variant = "positive",
  ...props
}: React.PropsWithChildren<ExampleWrapperProps>) => {
  return (
    <div className={styles.frame}>
      <div>{props.children}</div>
      <span className={clsx(styles.pill, styles[variant])}>
        {/* <Icon testID={`${testID}.icon`} icon={'cross'} /> */}
        <span className={clsx(styles.title)}>{title}</span>
      </span>
      {props.message && <span>{props.message}</span>}
    </div>
  );
};
