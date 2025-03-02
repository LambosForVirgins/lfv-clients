import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import styles from "./TransactionItem.module.css";
import { Button } from "@/elements";
import { useEffect, useMemo, useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { CircularProgress } from "../CircularIndicator/CircularIndicator";
import { REWARD_FACTOR } from "@/utils/locker/constants";

interface TransactionItemProps extends Common.ComponentProps {
  amount: number;
  targetDate: Date;
  startDate?: Date;
  media?: { src?: string };
  action: { label?: string; onClick: () => void };
  loading?: boolean;
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

  const totalLapsedCycles = useMemo(() => {
    const cycleDuration = targetDate.getTime() - startDate.getTime();
    return Math.floor((Date.now() - startDate.getTime()) / cycleDuration);
  }, [targetDate, startDate, progress]);

  const outstandingRewards = useMemo(() => {
    return Math.floor(props.amount / REWARD_FACTOR) * totalLapsedCycles;
  }, [totalLapsedCycles, props.amount]);

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
        {outstandingRewards > 0 && (
          <span className={styles.badge}>{outstandingRewards}</span>
        )}
      </CircularProgress>
      <span>
        <h3 className={styles.amount}>
          +{props.amount.toLocaleString()} VIRGIN
        </h3>
        <small className={styles.time}>{timeString}</small>
      </span>

      <span>
        <Button
          testID={`${testID}.withdraw`}
          size={"small"}
          disabled={props.loading || !isMatured}
          onClick={props.action.onClick}
        >
          {isMatured ? props.action.label : "Pending"}
        </Button>
      </span>
    </li>
  );
};
