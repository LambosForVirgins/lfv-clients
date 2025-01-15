import { selectorFamily } from "recoil";
import { memberAccountAtom } from "./atoms";
import { PublicKey } from "@solana/web3.js";
import { MemberStatus } from "./types";
import { lamportsToMint } from "@/utils/locker/constants";

export const memberAuthorizedSelector = selectorFamily<
  boolean,
  PublicKey | null
>({
  key: "member-authorized-selector",
  get:
    (publicKey) =>
    ({ get }) => {
      const member = get(memberAccountAtom(publicKey));
      return !!member;
    },
});

const EPOCH_DURATION = (86400 / 4) * 1000;

export const outstandingRewardEpochsSelector = selectorFamily<
  number,
  PublicKey | null
>({
  key: "outstanding-reward-epochs-selector",
  get:
    (publicKey) =>
    ({ get }) => {
      const member = get(memberAccountAtom(publicKey));

      if (!member) return 0;

      const rewardTime = member.timeRewarded.toNumber() * 1000;
      const timeDifference = Date.now() - rewardTime;

      return Math.floor(timeDifference / EPOCH_DURATION);
    },
});

export const outstandingRewardsSelector = selectorFamily<
  number,
  PublicKey | null
>({
  key: "outstanding-rewards-selector",
  get:
    (publicKey) =>
    ({ get }) => {
      const member = get(memberAccountAtom(publicKey));
      const outstandingEpochs = get(outstandingRewardEpochsSelector(publicKey));

      if (!member) return 0;

      return (
        outstandingEpochs *
        Math.floor(lamportsToMint(member.totalMatured.toNumber()) / 100)
      );
    },
});
