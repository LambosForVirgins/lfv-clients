import { memberAccountAtom } from "@/state/subscription/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";
import { useTokenTransfer } from "./useTransferTokens";
import { useState } from "react";

export const useCancelSubscription = () => {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const member = useRecoilValue(memberAccountAtom(publicKey));
  const { releaseTokens } = useTokenTransfer();

  const cancelSubscription = () => {
    setLoading(true);
    const currentBalance = member?.totalAmount || 0;
    releaseTokens(currentBalance);
  };

  return {
    loading,
    cancelSubscription,
  };
};
