import { Button } from "../Buttons/Button";
import styles from "./ContractAddress.module.css";
import clsx from "classnames";
import { prettyAddress } from "@/utils/string/prettyAddress";

interface ContractAddressProps extends Common.ComponentProps {
  label?: string;
  mint: string;
  className?: string;
}

export const ContractAddress = ({ testID, ...props }: ContractAddressProps) => {
  return (
    <span data-testid={testID} className={clsx(props.className, styles.frame)}>
      {props.label && (
        <span data-testid={`${testID}.label`} className={styles.label}>
          {props.label}
        </span>
      )}
      <span
        data-testid={`${testID}.address`}
        className={clsx(styles.address, styles.truncate)}
        data-short={prettyAddress(props.mint)}
      >
        <span>{props.mint}</span>
      </span>
      <Button
        testID={`${testID}.copy`}
        size={"small"}
        data-short={"Copy"}
        className={styles.button}
      >
        <span>Copy address</span>
      </Button>
    </span>
  );
};
