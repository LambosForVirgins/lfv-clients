import styles from './PunchCollection.module.css';

export const PunchCollection = (props: React.PropsWithChildren) => {
  return <div className={styles.frame}>{props.children}</div>;
};
