import styles from "./Overview.module.css";

interface OverviewProps extends Common.ComponentProps {
  totalBalance: number;
  rewardBalance: number;
  ticketAmount: number;
  streakCount: number;
  className?: string;
}

export const Overview = ({ testID, ...props }: OverviewProps) => {
  return (
    <span data-testid={testID} className={styles.frame}>
      <span className={styles.box}>
        <img
          alt="VIRGIN"
          src="./images/lfv.png"
          style={{ borderRadius: "100vw" }}
        />
        <h4>{props.totalBalance.toLocaleString()}</h4>
        <p>Total Virgins</p>
      </span>
      <span className={styles.box}>
        <img alt="VIRGIN" src="./svg/coin.svg" />
        <h4>{props.rewardBalance.toLocaleString()}</h4>
        <p>Entries</p>
      </span>
      <span className={styles.box}>
        <img
          alt="Tickets"
          src="./svg/present.svg"
          style={{ fill: "var(--primary-light)" }}
        />
        <h4>{props.ticketAmount.toLocaleString()}</h4>
        <p>Tickets</p>
      </span>
      <span className={styles.box}>
        <img
          src={`./svg/lightning.svg`}
          alt={"icon"}
          style={{ fill: "#ffcd02" }}
        />
        <h4>{props.streakCount} Day</h4>
        <p>Streak</p>
      </span>
    </span>
  );
};
