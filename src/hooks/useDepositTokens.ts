import {
  getDepositTokensTransaction,
  getWithdrawTokensTransaction,
} from "@/utils/transactions/getTransferTokensTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";

export const useDepositTokens = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const depositTokens = useCallback(
    async (amount: number) => {
      if (!publicKey || amount <= 0) return;
      const transaction = await getDepositTokensTransaction(
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

  const withdrawTokens = useCallback(
    async (amount: number) => {
      console.log("withdrawTokens", amount);
      if (!publicKey || amount <= 0) return;
      const transaction = await getWithdrawTokensTransaction(
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

  return { depositTokens, withdrawTokens };
};
