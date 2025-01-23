import { getWithdrawTokensTransaction } from "@/utils/transactions/getWithdrawTokensTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";

export const useWithdrawTokens = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const withdrawTokens = useCallback(async () => {
    if (!publicKey) return;
    const transaction = await getWithdrawTokensTransaction(
      connection,
      publicKey
    );

    try {
      await sendTransaction(transaction, connection)
        .then((result) => console.log("Result", result))
        .catch((err) => console.log("err", err));
    } catch (error) {
      console.log("Error", error);
    }
  }, [publicKey]);

  return { withdrawTokens };
};
