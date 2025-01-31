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
    const currentBalance = member?.totalAmount || 0;
    const changeInBalance = amount - currentBalance;

    if (changeInBalance > 0) {
      depositTokens(changeInBalance);
    } else {
      releaseTokens(Math.abs(changeInBalance));
    }
  };

  return {
    tier: numberToTier(member?.tier),
    updateTier,
  };
};
