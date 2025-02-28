import { CircularProgress } from "../CircularIndicator/CircularIndicator";
import styles from "./AccountAllocation.module.css";

interface AccountAllocationProps extends Common.ComponentProps {
  name: string;
  description?: string;
  marketCap: number;
  portion: number;
  remainingPortion: number;
}

export const AccountAllocation = ({
  testID,
  ...props
}: AccountAllocationProps) => {
  return (
    <span data-testid={testID} className={styles.frame}>
      <CircularProgress
        testID={`${testID}.progress`}
        percentage={props.portion}
        label={`${Math.ceil(props.portion * 1000) / 10}%`}
        size={96}
      />
      <span data-testid={`${testID}.content`} className={styles.content}>
        <span>{props.name}</span>
        {props.portion != props.remainingPortion && (
          <small>
            Initial balance $
            {Math.floor(props.marketCap * props.portion).toLocaleString()} USD
          </small>
        )}
        <span data-testid={`${testID}.remaining`} className={styles.remaining}>
          $
          {Math.floor(
            props.marketCap * props.remainingPortion
          ).toLocaleString()}{" "}
          USD
        </span>
        {props.description && <span>{props.description}</span>}
      </span>
    </span>
  );
};
