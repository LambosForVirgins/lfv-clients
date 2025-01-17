import { memberAccountAtom } from "@/state/member/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";
import { useDepositTokens } from "./useTransferTokens";
import { useState } from "react";

export const useCancelSubscription = () => {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const member = useRecoilValue(memberAccountAtom(publicKey));
  const { withdrawTokens } = useDepositTokens();

  const cancelSubscription = () => {
    setLoading(true);
    const currentBalance = member?.totalAmount || 0;
    withdrawTokens(currentBalance);
  };

  return {
    loading,
    cancelSubscription,
  };
};
