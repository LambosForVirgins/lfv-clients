import { forwardRef, useMemo } from "react";
import styles from "./MemberButton.module.css";
import clsx from "classnames";
import { Popover } from "../Popover/Popover";
import { useMembership } from "@/hooks/useMembership";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface MemberButtonProps extends Common.ComponentProps {
  className?: string;
  onClick?: () => void;
}

const formatShortAddress = (address: string | undefined | null) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const MemberButton = forwardRef<HTMLButtonElement, MemberButtonProps>(
  ({ testID, ...props }, ref) => {
    const { visible, setVisible } = useWalletModal();
    const { connect, select, wallets, connected, disconnect } = useWallet();
    const { member, publicKey } = useMembership();

    const progress = useMemo(() => {
      if (!member?.totalAmount) return 0;
      // TODO: Use native BN functions. Debug why BN functions like div() are not working
      const maturity =
        member.totalMatured.toNumber() / member.totalAmount.toNumber();
      return maturity * 100;
    }, [member]);

    const labelText = useMemo(() => {
      return (
        member?.totalEntries.toNumber() ||
        formatShortAddress(publicKey?.toBase58())
      );
    }, [member, publicKey]);

    return (
      <button
        {...props}
        popoverTarget={"members"}
        ref={ref}
        data-testid={testID}
        className={clsx(props.className, styles.frame)}
        disabled={visible}
        onClick={
          connected
            ? undefined
            : () => {
                setVisible(true);
                // TODO: Should have a wallet selection step, or present the modal
                // const phantomWallet = wallets
                //   .filter((wallet) => wallet.readyState === "Installed")
                //   .map((wallet) => wallet.adapter.name)
                //   .find((name) => name.match(/Phantom/gi));
                // if (phantomWallet) {
                //   select(phantomWallet);
                //   connect().catch(() => {
                //     // Silently catch because any errors are caught by the context `onError` handler
                //   });
                // }
              }
        }
      >
        {connected ? (
          <>
            <span
              data-testid={`${testID}.badge`}
              className={clsx(styles.icon, styles.badge)}
            />
            <span data-testid={`${testID}.content`} className={styles.content}>
              <span data-testid={`${testID}.label`}>{labelText}</span>
              <span
                data-testid={`${testID}.progress`}
                className={styles.progress}
              >
                <span
                  className={styles.indicator}
                  style={{ width: `${progress}%` }}
                />
              </span>
            </span>
            <span
              data-testid={`${testID}.indicator`}
              className={clsx(styles.icon, styles.more)}
            />
            <Popover
              testID={`${testID}.options`}
              id="members"
              onDisconnect={disconnect}
            />
          </>
        ) : (
          <span className={styles.content}>Connect</span>
        )}
      </button>
    );
  }
);
