import { selector } from "recoil";
import { memberAccountAtom } from "../subscription/atoms";
import { mintAccountAtom } from "../mints/atoms";
import { MINT } from "@/utils/locker/constants";
import { findRewardTokenMint } from "@/utils/locker";
import { publicKeyAtom } from "./atoms";
import { outstandingRewardsSelector } from "../subscription/selectors";

type OverviewItem = {
  key: string;
  media: { src: string };
  value: number;
  label: string;
};

export const overviewItemsAtom = selector<OverviewItem[]>({
  key: "overview-items-atom",
  get: ({ get }) => {
    const publicKey = get(publicKeyAtom);

    if (!publicKey) return [];

    const items: OverviewItem[] = [];
    const member = get(memberAccountAtom(publicKey));
    const tokenMint = get(mintAccountAtom({ mint: MINT, owner: publicKey }));
    const rewardMint = get(
      mintAccountAtom({
        mint: findRewardTokenMint(),
        owner: publicKey,
        decimals: 4,
      })
    );
    const outstandingRewards = get(outstandingRewardsSelector);

    if (member) {
      items.push({
        key: "total",
        media: { src: "./images/lfv.png" },
        value: member.totalAmount + tokenMint.amount,
        label: "Total Virgin",
      });
    }

    if (member?.totalMatured && member.totalMatured > 0) {
      items.push({
        key: "matured",
        media: { src: "./images/lfv.png" },
        value: member.totalMatured,
        label: "Matured Virgin",
      });
    }

    if (member?.totalReleased && member.totalReleased > 0) {
      items.push({
        key: "released",
        media: { src: "./images/lfv.png" },
        value: member.totalReleased,
        label: "Pending withdrawal",
      });
    }

    items.push({
      key: "reward",
      media: { src: "./svg/coin.svg" },
      value: rewardMint.amount,
      label: "Entries",
    });

    if (outstandingRewards > 0) {
      items.push({
        key: "claim",
        media: { src: "./svg/coin.svg" },
        value: outstandingRewards,
        label: "Unclaimed rewards",
      });
    }

    // items.push(
    //   {
    //     key: "ticket",
    //     media: { src: "./svg/present.svg" },
    //     value: 0,
    //     label: "Tickets",
    //   },
    //   {
    //     key: "streak",
    //     media: { src: "./svg/lightning.svg" },
    //     value: 0,
    //     label: "Streak",
    //   }
    // );

    return items;
  },
});
