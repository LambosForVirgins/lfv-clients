import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { useEffect, useState } from "react";

import { MINT } from "@/utils/locker/constants";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

export const useTokenMint = () => {
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) return;

    const sourceTokenAccount = getAssociatedTokenAddressSync(
      MINT,
      publicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_PROGRAM_ID
    );

    getAccount(
      connection,
      sourceTokenAccount,
      "confirmed",
      TOKEN_PROGRAM_ID
    ).then((account) => {
      setBalance(Number(account.amount));
    });
  }, [publicKey]);

  return {
    balance,
  };
};
