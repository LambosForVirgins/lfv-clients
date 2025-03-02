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

      const member = get(memberAccountAtom(publicKey));
      const tokenMint = get(mintAccountAtom({ mint: MINT, owner: publicKey }));
      const rewardMint = get(
        mintAccountAtom({
          mint: findRewardTokenMint(),
          owner: publicKey,
          decimals: 4,
        })
      );

      if (!member) return [];

      return [
        {
          key: "total",
          media: { src: "./images/lfv.png" },
          value: member.totalAmount + tokenMint.amount,
          label: "Total Virgin",
        },
        {
          key: "reward",
          media: { src: "./svg/coin.svg" },
          value: rewardMint.amount,
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
