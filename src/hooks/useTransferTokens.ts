import {
  getDepositTokensTransaction,
  getReleaseTokensTransaction,
} from "@/utils/transactions/getTransferTokensTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";

export const useTokenTransfer = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const depositTokens = useCallback(
    async (amount: number) => {
      if (!publicKey || amount <= 0) return;
      console.log("depositTokens", amount);
      const transaction = await getDepositTokensTransaction(
        connection,
        publicKey,
        amount
      );

      try {
        return await sendTransaction(transaction, connection)
          .then((result) => console.log("Result", result))
          .catch((err) => console.log("err", err));
      } catch (error) {
        console.log("Error", error);
      }
    },
    [publicKey]
  );

  const releaseTokens = useCallback(
    async (amount: number) => {
      if (!publicKey || amount <= 0) return;
      const transaction = await getReleaseTokensTransaction(
        connection,
        publicKey,
        amount
      );

      try {
        await sendTransaction(transaction, connection)
          .then((result) => console.log("Result", result))
          .catch((err) => console.log("err", err));
      } catch (error) {
        console.log("Error", error);
      }
    },
    [publicKey]
  );

  return { depositTokens, releaseTokens };
};
