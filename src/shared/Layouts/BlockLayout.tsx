import styles from "./Layouts.module.css";

export const BlockLayout = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.block}>{children}</div>;
};
