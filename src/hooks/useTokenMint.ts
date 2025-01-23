import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { MINT } from "@/utils/locker/constants";
import { UNSAFE_requestTokenMint } from "@/utils/transactions/UNSAFE_requestTokenMint";
import { useRecoilValue } from "recoil";
import { mintAccountAtom } from "@/state/mints/atoms";

export const useTokenMint = () => {
  const { publicKey } = useWallet();
  const [pending, setPending] = useState(false);
  const balance = useRecoilValue(
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
