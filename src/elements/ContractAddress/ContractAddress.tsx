import { PublicKey } from "@solana/web3.js";
import { Button } from "../Buttons/Button";
import styles from "./ContractAddress.module.css";
import clsx from "classnames";

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
      >
        {props.mint.substring(0, props.mint.length - 4)}
      </span>
      <span data-testid={`${testID}.address`} className={styles.address}>
        {props.mint.substring(props.mint.length - 4)}
      </span>
      <Button testID={`${testID}.copy`} size={"small"}>
        Copy address
      </Button>
    </span>
  );
};
