import { memberAccountAtom } from "@/state/member/atoms";
import { lamportsToMint } from "@/utils/locker/constants";
import { useWallet } from "@solana/wallet-adapter-react";
import BN from "bn.js";
import { useRecoilValue } from "recoil";
import { useDepositTokens } from "./useDepositTokens";
import { useState } from "react";

export const useCancelSubscription = () => {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const member = useRecoilValue(memberAccountAtom(publicKey));
  const { withdrawTokens } = useDepositTokens();

  const cancelSubscription = () => {
    setLoading(true);
    const currentBalance = member?.totalAmount || new BN(0);
    withdrawTokens(lamportsToMint(currentBalance).toNumber());
  };

  return {
    loading,
    cancelSubscription,
  };
};
