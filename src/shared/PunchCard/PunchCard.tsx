import styles from './PunchCard.module.css';

interface PunchCardProps extends Common.ComponentProps {
  title: string;
  description: string;
}

export const PunchCard = ({
  testID = 'punch-card',
  ...props
}: React.PropsWithChildren<PunchCardProps>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <span className={styles.header}>
        <span className={styles.icon} />
        <h3>{props.title}</h3>
      </span>
      <span className={styles.body}>{props.description}</span>
    </div>
  );
};
