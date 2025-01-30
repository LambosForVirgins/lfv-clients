import { memberAccountAtom } from "@/state/subscription/atoms";
import { getInitializeMemberInstruction } from "@/utils/transactions/getInitializeMemberTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletSignTransactionError,
  WalletSendTransactionError,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import { useCallback, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Transaction } from "@solana/web3.js";

const handleSendError = (error: any): InitializeAccountError => {
  if (error instanceof WalletNotConnectedError) {
    console.error("Wallet is not connected.");
    return {
      message: "Please connect your wallet.",
    };
  } else if (error instanceof WalletSendTransactionError) {
    console.error("Error sending transaction:", error.message);
    return {
      message: "Transaction failed. Please try again.",
    };
  } else if (error instanceof WalletSignTransactionError) {
    console.error("Error signing transaction:", error.message);
    return {
      message: "Transaction signing failed. Ensure your wallet is unlocked.",
    };
  } else {
    console.error("Unknown error occurred:", error);
    return {
      message:
        "An unknown error occurred. Please check your connection and try again.",
    };
  }
};

type InitializeAccountError = {
  message: string;
};

export const useInitializeSubscription = () => {
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const { publicKey, sendTransaction } = useWallet();
  const [error, setError] = useState<InitializeAccountError | null>(null);
  const member = useRecoilValue(memberAccountAtom(publicKey));

  const status = useMemo(() => {
    return member?.status;
  }, [member]);

  const initialize = useCallback(async () => {
    if (!publicKey || loading) return;
    setError(null);
    setLoading(true);

    try {
      const transaction = new Transaction().add(
        await getInitializeMemberInstruction(publicKey)
      );

      const txHash = await sendTransaction(transaction, connection).catch(
        (err) => {
          throw new WalletSendTransactionError(err.message);
        }
      );

      await connection.confirmTransaction(txHash, "finalized");
    } catch (error) {
      setError(handleSendError(error));
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  return {
    error,
    loading,
    status,
    initialize,
  };
};
