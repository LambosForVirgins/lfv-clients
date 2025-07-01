import styles from "./Layouts.module.css";

export const InlineLayout = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.inline}>{children}</div>;
};
