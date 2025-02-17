import { Button } from "../Buttons/Button";
import styles from "./ContractAddress.module.css";
import clsx from "classnames";
import { prettyAddress } from "@/utils/string/prettyAddress";
import { useRef, useState } from "react";

interface ContractAddressProps extends Common.ComponentProps {
  label?: string;
  mint: string;
  className?: string;
}

const CONFIRMATION_DURATION = 3000;

export const ContractAddress = ({ testID, ...props }: ContractAddressProps) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const [hasCopied, setHasCopied] = useState(false);
  // Copy the address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(props.mint);
    setHasCopied(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setHasCopied(false);
    }, CONFIRMATION_DURATION);
  };

  return (
    <span
      data-testid={testID}
      className={clsx(
        props.className,
        styles.frame,
        hasCopied && styles.copied
      )}
    >
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
        disabled={hasCopied}
        onClick={copyAddress}
        className={styles.button}
      >
        <span>Copy address</span>
      </Button>
    </span>
  );
};
