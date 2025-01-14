import { memberAccountAtom } from "@/state/member/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";

export const useMembership = () => {
  const { publicKey } = useWallet();

  const memberState = useRecoilValue(memberAccountAtom(publicKey));

  return {
    publicKey,
    member: memberState,
  };
};
