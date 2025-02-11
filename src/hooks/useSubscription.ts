import { memberAccountAtom } from "@/state/subscription/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";
import { useTokenTransfer } from "./useTransferTokens";
import { numberToTier } from "@/utils/tiers/formatters";
import { useState } from "react";

export const useSubscription = () => {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const member = useRecoilValue(memberAccountAtom(publicKey));
  const { depositTokens, releaseTokens } = useTokenTransfer();

  const updateTier = (amount: number) => {
    // Should create a deposit transaction to upgrade the user's tier
    setLoading(true);
    if (amount > 0) {
      depositTokens(amount).finally(() => setLoading(false));
    } else {
      releaseTokens(Math.abs(amount)).finally(() => setLoading(false));
    }
  };

  return {
    tier: numberToTier(member?.tier),
    updateTier,
    loading,
  };
};
