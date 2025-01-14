import styles from "./StorePage.module.css";

export const StorePage = ({
  testID = "store",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <h1>Store</h1>
    </div>
  );
};
