import { memberAccountAtom } from "@/state/member/atoms";
import { amountToLamports, lamportsToMint } from "@/utils/locker/constants";
import { useWallet } from "@solana/wallet-adapter-react";
import BN from "bn.js";
import { useRecoilValue } from "recoil";
import { useDepositTokens } from "./useTransferTokens";
import { numberToTier } from "@/utils/tiers/formatters";

export const useSubscription = () => {
  const { publicKey } = useWallet();

  const member = useRecoilValue(memberAccountAtom(publicKey));
  const { depositTokens, withdrawTokens } = useDepositTokens();

  const updateTier = (amount: number) => {
    // Should create a deposit transaction to upgrade the user's tier
    const currentBalance = member?.totalAmount || new BN(0);
    const tierBalance = amountToLamports(new BN(amount));
    const changeInBalance = tierBalance.sub(currentBalance);

    if (changeInBalance.gt(new BN(0))) {
      depositTokens(lamportsToMint(changeInBalance).toNumber());
    } else {
      withdrawTokens(lamportsToMint(changeInBalance).abs().toNumber());
    }
  };

  return {
    tier: numberToTier(member?.tier),
    updateTier,
  };
};
