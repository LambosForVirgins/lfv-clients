import { selectorFamily } from "recoil";
import { memberAccountAtom } from "../subscription/atoms";
import { PublicKey } from "@solana/web3.js";
import { mintAccountAtom } from "../mints/atoms";
import { MINT } from "@/utils/locker/constants";
import { findRewardTokenMint } from "@/utils/locker";

type OverviewItem = {
  key: string;
  media: { src: string };
  value: number;
  label: string;
};

export const overviewItemsAtom = selectorFamily<
  OverviewItem[],
  PublicKey | null
>({
  key: "overview-items-atom",
  get:
    (publicKey) =>
    ({ get }) => {
      if (!publicKey) return [];

      const rewardMint = findRewardTokenMint();
      const member = get(memberAccountAtom(publicKey));
      const tokenBalance =
        get(mintAccountAtom({ mint: MINT, owner: publicKey })) || 0;
      const rewardBalance =
        get(
          mintAccountAtom({ mint: rewardMint, owner: publicKey, decimals: 4 })
        ) || 0;

      if (!member) return [];

      return [
        {
          key: "total",
          media: { src: "./images/lfv.png" },
          value: member.totalAmount + tokenBalance,
          label: "Total Virgin",
        },
        {
          key: "reward",
          media: { src: "./svg/coin.svg" },
          value: rewardBalance,
          label: "Entries",
        },
        {
          key: "ticket",
          media: { src: "./svg/present.svg" },
          value: 0,
          label: "Tickets",
        },
        {
          key: "streak",
          media: { src: "./svg/lightning.svg" },
          value: 0,
          label: "Streak",
        },
      ];
    },
});
