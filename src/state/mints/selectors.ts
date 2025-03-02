import { selector } from "recoil";
import { mintAccountAtom } from "./atoms";
import { MINT } from "@/utils/locker/constants";
import { memberAccountAtom } from "../subscription/atoms";
import { publicKeyAtom } from "../account/atoms";

export const totalTokenBalanceSelector = selector<number>({
  key: "total-token-balance-selector",
  get: ({ get }) => {
    const publicKey = get(publicKeyAtom);

    if (publicKey) {
      const tokenMint = get(mintAccountAtom({ mint: MINT, owner: publicKey }));
      const member = get(memberAccountAtom(publicKey));

      return tokenMint.amount + (member?.totalAmount || 0);
    }

    return 0;
  },
});
