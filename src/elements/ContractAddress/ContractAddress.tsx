import { Button } from "../Buttons/Button";
import styles from "./ContractAddress.module.css";
import clsx from "classnames";
import { prettyAddress } from "@/utils/string/prettyAddress";
import { useCallback, useMemo, useRef, useState } from "react";

interface ContractAddressProps extends Common.ComponentProps {
  label?: string;
  mint: string;
  className?: string;
}

const CONFIRMATION_DURATION = 3000;

export const ContractAddress = ({ testID, ...props }: ContractAddressProps) => {
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const [error, setError] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const copySupported = useMemo(
    () =>
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function",
    [navigator.clipboard]
  );
  /**
   * Copies the mint address to clipboard and displays a
   * confirmation message for a short duration.
   */
  const copyAddress = useCallback(() => {
    if (!copySupported) {
      // Fallback for unsupported browsers
      addressRef.current?.focus();
      addressRef.current?.select();
      document.execCommand("copy");
      return;
    }

    navigator.clipboard.writeText(props.mint).then(() => {
      setHasCopied(true);
    });

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setHasCopied(false);
    }, CONFIRMATION_DURATION);
  }, [timerRef.current, props.mint, copySupported]);

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
        <textarea ref={addressRef} value={props.mint} disabled />
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
