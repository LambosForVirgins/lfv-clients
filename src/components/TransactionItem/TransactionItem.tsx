import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import styles from "./TransactionItem.module.css";
import { Button } from "@/elements";
import { useEffect, useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { CircularProgress } from "../CircularIndicator/CircularIndicator";

interface TransactionItemProps extends Common.ComponentProps {
  amount: number;
  targetDate: Date;
  startDate?: Date;
  onClaim: () => void;
}

export const TransactionItem = ({
  testID,
  startDate = new Date(),
  ...props
}: TransactionItemProps) => {
  const [timeString, setTimeString] = useState<string>("Pending");
  const { progress } = useCountdown({
    startDate,
    targetDate: props.targetDate,
  });

  useEffect(() => {
    if (progress >= 1) {
      setTimeString("Fully matured");
    } else {
      setTimeString(`${formatDistanceToNowStrict(props.targetDate)} remaining`);
    }
  }, [progress]);

  return (
    <li data-testid={testID} className={styles.frame}>
      <CircularProgress percentage={progress} size={46} strokeWidth={6} />
      <span>
        <div className={styles.amount}>
          {props.amount.toLocaleString()} VIRGIN
        </div>
        <small className={styles.time}>{timeString}</small>
      </span>

      <span>
        <Button
          testID={`${testID}.withdraw`}
          size={"small"}
          disabled={progress < 1}
          onClick={props.onClaim}
        >
          {progress < 1 ? "Pending" : "Claim"}
        </Button>
      </span>
    </li>
  );
};
