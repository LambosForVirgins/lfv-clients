import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import styles from "./TransactionItem.module.css";
import { Button } from "@/elements";
import { useEffect, useMemo, useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { CircularProgress } from "../CircularIndicator/CircularIndicator";

interface TransactionItemProps extends Common.ComponentProps {
  amount: number;
  targetDate: Date;
  startDate?: Date;
  media?: { src?: string };
  onClaim: () => void;
}

export const TransactionItem = ({
  testID,
  startDate = new Date(),
  targetDate,
  ...props
}: TransactionItemProps) => {
  const [timeString, setTimeString] = useState<string>("Pending");
  const { progress } = useCountdown({ startDate, targetDate });

  const isMatured = useMemo(
    () => targetDate.getTime() < Date.now(),
    [targetDate, progress]
  );

  useEffect(() => {
    if (targetDate.getTime() < Date.now()) {
      setTimeString("Fully matured");
    } else {
      setTimeString(`${formatDistanceToNowStrict(targetDate)} remaining`);
    }
  }, [progress]);

  return (
    <li data-testid={testID} className={styles.frame}>
      <CircularProgress
        testID={`${testID}.progress`}
        percentage={progress}
        size={46}
        strokeWidth={6}
      >
        <img src={props.media?.src} width={"100%"} />
      </CircularProgress>
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
          disabled={!isMatured}
          onClick={props.onClaim}
        >
          {isMatured ? "Claim" : "Pending"}
        </Button>
      </span>
    </li>
  );
};
