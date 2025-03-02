import { selector } from "recoil";
import { memberAccountAtom } from "./atoms";
import { EPOCH_DURATION, REWARD_FACTOR } from "@/utils/locker/constants";
import { differenceInMilliseconds } from "date-fns/differenceInMilliseconds";
import { Transaction } from "./types";
import { publicKeyAtom } from "../account/atoms";

export const memberAuthorizedSelector = selector<boolean>({
  key: "member-authorized-selector",
  get: ({ get }) => {
    const publicKey = get(publicKeyAtom);
    const member = get(memberAccountAtom(publicKey));
    return !!member;
  },
});

export const outstandingRewardEpochsSelector = selector<number>({
  key: "outstanding-reward-epochs-selector",
  get: ({ get }) => {
    const publicKey = get(publicKeyAtom);
    const member = get(memberAccountAtom(publicKey));

    if (member?.timeRewarded) {
      const timeDifference = differenceInMilliseconds(
        Date.now(),
        member.timeRewarded
      );
      return Math.floor(timeDifference / EPOCH_DURATION);
    }

    return 0;
  },
});

export const outstandingRewardsSelector = selector<number>({
  key: "outstanding-rewards-selector",
  get: ({ get }) => {
    const publicKey = get(publicKeyAtom);
    const member = get(memberAccountAtom(publicKey));
    const outstandingEpochs = get(outstandingRewardEpochsSelector);

    if (!member) return 0;

    return (
      (outstandingEpochs * member.totalMatured) / REWARD_FACTOR +
      member.totalRewards
    );
  },
});

type TransactionGroup = Record<string, Transaction[]>;

const getTransactionGroupKey = (transaction: Transaction): string => {
  if (transaction.type === "deposit") {
    return transaction.timeMatured.toISOString().slice(0, 10);
  }

  return transaction.timeReleased.toISOString().slice(0, 10);
};

export const pendingSlotsSelector = selector<TransactionGroup>({
  key: "pending-slots-selector",
  get: ({ get }) => {
    const publicKey = get(publicKeyAtom);
    const member = get(memberAccountAtom(publicKey));

    if (!member) return {};

    return member.slots.reduce<TransactionGroup>((groups, slot) => {
      const key = getTransactionGroupKey(slot);

      if (!groups[key]) groups[key] = [];
      groups[key].push(slot);

      return groups;
    }, {});
  },
});
