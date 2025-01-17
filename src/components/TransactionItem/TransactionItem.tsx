import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import styles from "./TransactionItem.module.css";
import { Button } from "@/elements";
import { useEffect, useMemo, useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";

interface TransactionItemProps extends Common.ComponentProps {
  type: "deposit" | "withdraw";
  amount: number;
  targetDate: Date;
  timeCreated: Date;
  onClaim: () => void;
}

export const TransactionItem = ({ testID, ...props }: TransactionItemProps) => {
  const [timeString, setTimeString] = useState<string>("");
  const { progress } = useCountdown({
    startDate: props.type === "deposit" ? props.timeCreated : new Date(),
    targetDate: props.targetDate,
  });

  useEffect(() => {
    if (progress >= 1) setTimeString("Matured");

    setTimeString(`${formatDistanceToNowStrict(props.targetDate)} remaining`);
  }, [progress]);

  return (
    <li data-testid={testID} className={styles.frame}>
      <span>
        <img alt="Lock icon" />
      </span>
      <span className={styles.amount}>
        {props.amount.toLocaleString()} VIRGIN
        <ProgressIndicator testID={`${testID}.progress`} progress={progress} />
      </span>
      <span className={styles.time}>{timeString}</span>
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
