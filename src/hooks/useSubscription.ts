import { memberAccountAtom } from "@/state/subscription/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";
import { useTokenTransfer } from "./useTransferTokens";
import { numberToTier } from "@/utils/tiers/formatters";

export const useSubscription = () => {
  const { publicKey } = useWallet();

  const member = useRecoilValue(memberAccountAtom(publicKey));
  const { depositTokens, releaseTokens } = useTokenTransfer();

  const updateTier = (amount: number) => {
    // Should create a deposit transaction to upgrade the user's tier

    if (amount > 0) {
      depositTokens(amount);
    } else {
      releaseTokens(Math.abs(amount));
    }
  };

  return {
    tier: numberToTier(member?.tier),
    updateTier,
  };
};
