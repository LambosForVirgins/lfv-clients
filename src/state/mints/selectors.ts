import { selectorFamily } from "recoil";
import { mintAccountAtom } from "./atoms";
import { PublicKey } from "@solana/web3.js";
import { MINT } from "@/utils/locker/constants";
import { memberAccountAtom } from "../subscription/atoms";

export const totalTokenBalanceSelector = selectorFamily<
  number,
  PublicKey | null
>({
  key: "total-token-balance-selector",
  get:
    (publicKey) =>
    ({ get }) => {
      if (!publicKey) return 0;

      const balance = get(mintAccountAtom({ mint: MINT, owner: publicKey }));
      const member = get(memberAccountAtom(publicKey));

      return (balance || 0) + (member?.totalAmount || 0);
    },
});
