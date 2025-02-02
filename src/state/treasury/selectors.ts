import { selectorFamily } from "recoil";
import { VestingAccount } from "./types";
import { vestedAccountsAtom, vestingAccountAtom } from "./atoms";
import { mergeAndSortSchedules } from "./utils";

const vestingAccountCollectionSelector = selectorFamily<
  string[],
  string | undefined
>({
  key: "vesting-account-collection-selector",
  get:
    (publicKey) =>
    ({ get }) => {
      if (!publicKey) return [];

      return get(vestedAccountsAtom)[publicKey] || [];
    },
});

export const vestingAccountSelector = selectorFamily<
  VestingAccount | null,
  string | undefined
>({
  key: "vesting-account-selector",
  get:
    (publicKey) =>
    async ({ get }) => {
      if (!publicKey) return null;

      const collection = get(vestingAccountCollectionSelector(publicKey));

      return collection.reduce<VestingAccount | null>((account, publicKey) => {
        // Loads the current account from atom memory or fetches
        const data = get(vestingAccountAtom(publicKey));
        if (!data) return account;

        return {
          ...data,
          schedules: mergeAndSortSchedules(account?.schedules, data.schedules),
        };
      }, null);
    },
});
