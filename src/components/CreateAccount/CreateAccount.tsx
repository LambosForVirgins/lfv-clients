import { Button } from "@/elements";
import styles from "./CreateAccount.module.css";
import clsx from "classnames";
import { useInitializeAccount } from "@/hooks/useInitializeAccount";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";
import { useTokenMint } from "@/hooks/useTokenMint";

interface CreateAccountProps extends Common.ComponentProps {
  className?: string;
}

export const CreateAccount = ({ testID, ...props }: CreateAccountProps) => {
  const { visible, setVisible } = useWalletModal();
  const { publicKey, connected } = useWallet();
  const { error, loading, status, initialize } = useInitializeAccount();
  const { balance } = useTokenMint();

  const handleAction = useCallback(async () => {
    if (connected && publicKey) {
      await initialize();
    } else {
      setVisible(true);
    }
  }, [publicKey, connected]);

  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      {error && <p>{error.message}</p>}

      {!!status ? (
        <p>Connected</p>
      ) : balance > 0 ? (
        <Button
          testID={`${testID}.connect`}
          disabled={visible}
          onClick={handleAction}
        >
          {connected && publicKey ? `Create Account` : `Connect wallet`}
        </Button>
      ) : (
        <div>
          <p>Insufficient VIRGIN balance</p>
          <Button
            testID={`${testID}.request`}
            size="small"
            onClick={() => alert("We're working on this")}
          >
            Request tokens
          </Button>
        </div>
      )}
    </div>
  );
};
