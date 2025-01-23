import { Button } from "@/elements";
import styles from "./CreateAccount.module.css";
import clsx from "classnames";
import { useInitializeAccount } from "@/hooks/useInitializeAccount";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback, useEffect, useState } from "react";
import { useTokenMint } from "@/hooks/useTokenMint";
import { useRecoilValue } from "recoil";
import { mintAccountAtom } from "@/state/mints/atoms";
import { MembershipSell } from "../MembershipSell/MembershipSell";

interface CreateAccountProps extends Common.ComponentProps {
  className?: string;
}

enum SetupStatus {
  ConnectWallet = 0,
  RequestTokens,
  PendingTokens,
  CreateAccount,
  PendingAccount,
  DepositTokens,
}

export const CreateAccount = ({ testID, ...props }: CreateAccountProps) => {
  const [status, setStatus] = useState<SetupStatus>(SetupStatus.ConnectWallet);
  const { visible, setVisible } = useWalletModal();
  const { publicKey, connected } = useWallet();
  const {
    error,
    loading,
    status: memberStatus,
    initialize,
  } = useInitializeAccount();
  const { balance, pending, requestTokens } = useTokenMint();

  const handleAction = useCallback(async () => {
    if (connected && publicKey) {
      await initialize();
    } else {
      setVisible(true);
    }
  }, [publicKey, connected]);

  useEffect(() => {
    console.log(memberStatus);
    if (!connected) {
      setStatus(SetupStatus.ConnectWallet);
    } else if (balance === 0 && !pending) {
      setStatus(SetupStatus.RequestTokens);
    } else if (pending) {
      setStatus(SetupStatus.PendingTokens);
    } else if (!!memberStatus) {
      setStatus(SetupStatus.CreateAccount);
    } else if (loading) {
      setStatus(SetupStatus.PendingAccount);
    } else {
      setStatus(SetupStatus.DepositTokens);
    }
  }, [balance, pending, loading, memberStatus, connected]);

  const renderAction = () => {
    switch (status) {
      case SetupStatus.ConnectWallet:
        return (
          <Button
            testID={`${testID}.connect`}
            disabled={visible}
            style={{ maxWidth: "200px", alignSelf: "center" }}
            onClick={handleAction}
          >
            Connect wallet
          </Button>
        );
      case SetupStatus.RequestTokens:
        return (
          <Button
            testID={`${testID}.request`}
            disabled={pending}
            style={{ maxWidth: "200px", alignSelf: "center" }}
            onClick={() => requestTokens(1_000_000)}
          >
            Request tokens
          </Button>
        );
      case SetupStatus.PendingTokens:
        return (
          <div>
            <p>Waiting for tokens</p>
          </div>
        );
      case SetupStatus.CreateAccount:
        return (
          <Button
            testID={`${testID}.connect`}
            disabled={visible}
            style={{ maxWidth: "200px", alignSelf: "center" }}
            onClick={handleAction}
          >
            Create Account
          </Button>
        );
      case SetupStatus.PendingAccount:
        return (
          <div>
            <p>Waiting for account</p>
          </div>
        );
      case SetupStatus.DepositTokens:
        return <MembershipSell testID={`${testID}.promo`} />;
      default:
        return null;
    }
  };

  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      {error && <p>{error.message}</p>}

      {renderAction()}
    </div>
  );
};
