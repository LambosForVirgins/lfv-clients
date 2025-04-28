import { findVaultTokenAccountAddress } from "@/utils/locker";
import {
  getDepositTokensTransaction,
  getReleaseTokensTransaction,
} from "@/utils/transactions/getTransferTokensTransaction";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MINT } from "../utils/locker/constants";

export const useTokenTransfer = () => {
  const { connection } = useConnection();
  const [vaultExists, setVaultExists] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    if (publicKey) {
      const vaultTokenAccount = findVaultTokenAccountAddress(MINT, publicKey);
      connection
        .getAccountInfo(vaultTokenAccount)
        .then((info) => setVaultExists(info !== null))
        .catch((err) => {
          console.log(err);
          setVaultExists(false);
        });
    }
  }, [connection, publicKey]);

  const depositTokens = useCallback(
    async (amount: number) => {
      if (!publicKey || amount <= 0) return;
      const transaction = await getDepositTokensTransaction(
        publicKey,
        amount,
        !vaultExists
      );

      try {
        return await sendTransaction(transaction, connection)
          .then((result) => console.log("Result", result))
          .catch((err) => console.log("err", err));
      } catch (error) {
        console.log("Error", error);
      }
    },
    [publicKey, vaultExists]
  );

  const releaseTokens = useCallback(
    async (amount: number) => {
      if (!publicKey || amount <= 0) return;
      const transaction = await getReleaseTokensTransaction(
        publicKey,
        amount,
        !vaultExists
      );

      try {
        await sendTransaction(transaction, connection)
          .then((result) => console.log("Result", result))
          .catch((err) => console.log("err", err));
      } catch (error) {
        console.log("Error", error);
      }
    },
    [publicKey, vaultExists]
  );

  return { depositTokens, releaseTokens };
};
