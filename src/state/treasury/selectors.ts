import { selector, selectorFamily } from "recoil";
import { TreasuryHolding, TreasuryWalletGroup, VestingAccount } from "./types";
import {
  treasuryWalletGroupsAtom,
  treasuryWalletsAtom,
  vestedAccountsAtom,
  vestingAccountAtom,
} from "./atoms";
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

export const tokenGroupSelector = selector<TreasuryWalletGroup[]>({
  key: "token-allocation-selector",
  get: ({ get }) => {
    const grouping = get(treasuryWalletGroupsAtom);
    const wallets = get(treasuryWalletsAtom);
    // Link split wallets into their treasury groups
    return wallets.reduce<TreasuryWalletGroup[]>(
      (allocation, wallet) => {
        const group = allocation.find(
          ({ type, category }) =>
            type === wallet.type && category === wallet.category
        );

        if (group) {
          group.wallets.push(wallet);
        }

        return allocation;
      },
      [...grouping]
    );
  },
});

export interface TokenAllocation extends TreasuryWalletGroup {
  name: string;
  portion: number;
  remainingPortion: number;
  holding: TreasuryHolding[];
}

const TOKEN_SYMBOL = "VIRGIN";

const CIRCULATING_SUPPLY = 894_999_997;

export const tokenAllocationSelector = selector<TokenAllocation[]>({
  key: "token-allocation-selector",
  get: ({ get }) => {
    const grouping = get(treasuryWalletGroupsAtom);
    const wallets = get(treasuryWalletsAtom);
    const allocation: TokenAllocation[] = [];

    grouping.forEach((group) => {
      const amount = wallets.reduce<number>(
        (total, { type, category, department, holdings }) => {
          if (
            group.type === type &&
            group.category === category &&
            group.department === department
          ) {
            const token = holdings.find(
              ({ symbol }) => symbol === TOKEN_SYMBOL
            );
            if (token) return total + token.amount;
          }

          return total;
        },
        0
      );

      const remainingPortion = amount / CIRCULATING_SUPPLY;

      allocation.push({
        name: group.label,
        portion: group.portion,
        remainingPortion,
        holding: [{ amount, symbol: TOKEN_SYMBOL }],
        label: group.label,
        type: group.type,
        category: group.category,
        department: group.department,
        wallets: [],
      });
    });

    return allocation;
  },
});
