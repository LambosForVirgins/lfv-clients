import { Button } from "../Buttons/Button";
import styles from "./ContractAddress.module.css";
import clsx from "classnames";
import { useCallback, useRef, useState } from "react";

interface ContractAddressProps extends Common.ComponentProps {
  label?: string;
  mint: string;
  className?: string;
}

const CONFIRMATION_DURATION = 3000;

export const ContractAddress = ({ testID, ...props }: ContractAddressProps) => {
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const [hasCopied, setHasCopied] = useState(false);

  /**
   * Copies the mint address to clipboard and displays a
   * confirmation message for a short duration.
   */
  const copyAddress = useCallback(() => {
    if (typeof navigator.clipboard?.writeText === "function") {
      navigator.clipboard.writeText(props.mint).then(() => {
        setHasCopied(true);
      });
    } else {
      addressRef.current?.focus();
      addressRef.current?.select();
      document.execCommand("copy");
      setHasCopied(true);
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setHasCopied(false);
    }, CONFIRMATION_DURATION);
  }, [timerRef.current, props.mint]);

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
      >
        <textarea ref={addressRef} value={props.mint} />
      </span>
      <Button
        testID={`${testID}.copy`}
        size={"small"}
        data-short={"Copy"}
        disabled={hasCopied}
        onClick={copyAddress}
        className={styles.button}
      >
        <span>{hasCopied ? `Copied` : `Copy address`}</span>
      </Button>
    </span>
  );
};
