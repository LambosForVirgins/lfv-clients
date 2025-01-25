import { forwardRef, useCallback, useMemo } from "react";
import styles from "./MemberButton.module.css";
import clsx from "classnames";
import { Popover } from "../Popover/Popover";
import { useMembership } from "@/hooks/useMembership";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRewardMint } from "@/hooks/useTokenMint";

interface MemberButtonProps extends Common.ComponentProps {
  className?: string;
  onClick?: () => void;
}

enum MemberWalletStatus {
  Disconnected = 0,
  Connected,
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
    const { balance } = useRewardMint();

    const progress = useMemo(() => {
      if (!member?.totalAmount) return 0;
      const maturity = member.totalMatured / member.totalAmount;
      return maturity * 100;
    }, [member]);

    const labelText = useMemo(() => {
      return balance || formatShortAddress(publicKey?.toBase58());
    }, [member, publicKey, balance]);

    const status = useMemo(() => {
      if (connected) return MemberWalletStatus.Connected;

      return MemberWalletStatus.Disconnected;
    }, [connected]);

    const handleAction = useCallback(() => {
      switch (status) {
        case MemberWalletStatus.Disconnected:
          setVisible(true);
          break;
        default:
          break;
      }
    }, [status]);

    return (
      <button
        {...props}
        popoverTarget={"members"}
        ref={ref}
        data-testid={testID}
        className={clsx(props.className, styles.frame)}
        disabled={visible}
        onClick={handleAction}
      >
        {status === MemberWalletStatus.Connected ? (
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
          <span className={styles.content}>Connect wallet</span>
        )}
      </button>
    );
  }
);
