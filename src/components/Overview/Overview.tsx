import styles from "./Overview.module.css";

type OverviewItem = {
  key: string;
  media: { src: string };
  value: number;
  label: string;
};

// totalBalance: number;
// rewardBalance: number;
// ticketAmount: number;
// streakCount: number;

interface OverviewProps extends Common.ComponentProps {
  items: OverviewItem[];
  className?: string;
}

export const Overview = ({ testID, ...props }: OverviewProps) => {
  return (
    <span data-testid={testID} className={styles.frame}>
      {props.items.map((item) => (
        <span key={item.key} className={styles.box}>
          <img
            alt="VIRGIN"
            src={item.media.src}
            style={{ borderRadius: "100vw" }}
          />
          <h4>{item.value.toLocaleString()}</h4>
          <p>{item.label}</p>
        </span>
      ))}
    </span>
  );
};
