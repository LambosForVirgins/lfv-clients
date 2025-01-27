import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { MINT } from "@/utils/locker/constants";
import { UNSAFE_requestTokenMint } from "@/utils/transactions/UNSAFE_requestTokenMint";
import { useRecoilValue } from "recoil";
import { mintAccountAtom } from "@/state/mints/atoms";
import { findRewardTokenMint } from "@/utils/locker";

export const useTokenMint = () => {
  const { publicKey } = useWallet();
  const [pending, setPending] = useState(false);
  const lamports = useRecoilValue(
    mintAccountAtom({ mint: MINT, owner: publicKey })
  );

  const requestTokens = useCallback(
    async (amount: number) => {
      if (!publicKey) return;
      setPending(true);

      return UNSAFE_requestTokenMint(publicKey, amount);
    },
    [publicKey]
  );

  const balance = lamports / 10 ** 9;

  useEffect(() => {
    if (pending && balance > 0) {
      setPending(false);
    }
  }, [balance, pending]);

  return {
    balance,
    pending,
    requestTokens,
  };
};

export const useRewardMint = () => {
  const mint = findRewardTokenMint();
  const { publicKey } = useWallet();
  const [pending, setPending] = useState(false);
  const balance = useRecoilValue(
    mintAccountAtom({ mint, owner: publicKey, decimals: 4 })
  );

  const requestTokens = useCallback(
    async (amount: number) => {
      if (!publicKey) return;
      setPending(true);

      return UNSAFE_requestTokenMint(publicKey, amount);
    },
    [publicKey]
  );

  useEffect(() => {
    if (pending && balance > 0) {
      setPending(false);
    }
  }, [balance, pending]);

  return {
    balance,
    pending,
    requestTokens,
  };
};
