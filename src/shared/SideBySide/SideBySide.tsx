import styles from "./SideBySide.module.css";

export const SideBySide = ({
  testID = "sidebyside",
  ...props
}: React.PropsWithChildren<Common.ComponentProps>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      {props.children}
    </div>
  );
};
