import { memberAccountAtom } from "@/state/subscription/atoms";
import { pendingSlotsSelector } from "@/state/subscription/selectors";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";

export const useMembership = () => {
  const { publicKey } = useWallet();
  const transactions = useRecoilValue(pendingSlotsSelector);
  const memberState = useRecoilValue(memberAccountAtom(publicKey));

  return {
    transactions,
    publicKey,
    member: memberState,
  };
};
