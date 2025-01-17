import { memberAccountAtom } from "@/state/member/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";
import { useDepositTokens } from "./useTransferTokens";
import { numberToTier } from "@/utils/tiers/formatters";

export const useSubscription = () => {
  const { publicKey } = useWallet();

  const member = useRecoilValue(memberAccountAtom(publicKey));
  const { depositTokens, withdrawTokens } = useDepositTokens();

  const updateTier = (amount: number) => {
    // Should create a deposit transaction to upgrade the user's tier
    const currentBalance = member?.totalAmount || 0;
    const changeInBalance = amount - currentBalance;

    if (changeInBalance > 0) {
      depositTokens(changeInBalance);
    } else {
      withdrawTokens(Math.abs(changeInBalance));
    }
  };

  return {
    tier: numberToTier(member?.tier),
    updateTier,
  };
};
