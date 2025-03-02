import { selector } from "recoil";
import { TreasuryHolding, TreasuryWalletGroup, VestingAccount } from "./types";
import {
  marketPricesAtom,
  treasuryWalletGroupsAtom,
  treasuryWalletsAtom,
  vestedAccountsAtom,
  vestingAccountAtom,
} from "./atoms";
import { mergeAndSortSchedules } from "./utils";
import { fullyDilutedValue } from "@/utils/pricing/fullyDilutedValue";
import { publicKeyAtom } from "../account/atoms";

const vestingAccountCollectionSelector = selector<string[]>({
  key: "vesting-account-collection-selector",
  get: ({ get }) => {
    const publicKey = get(publicKeyAtom);
    if (!publicKey) return [];

    return get(vestedAccountsAtom)[publicKey.toBase58()] || [];
  },
});

export const vestingAccountSelector = selector<VestingAccount | null>({
  key: "vesting-account-selector",
  get: async ({ get }) => {
    const publicKey = get(publicKeyAtom);
    if (!publicKey) return null;

    const collection = get(vestingAccountCollectionSelector);

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

const TOTAL_SUPPLY = 894_999_997;

export const circulatingSupplySelector = selector<number>({
  key: "circulating-supply-selector",
  get: () => 0,
});

export const terminatedSupplySelector = selector<number>({
  key: "terminated-supply-selector",
  get: () => 0,
});

export const stakedSupplySelector = selector<number>({
  key: "staked-supply-selector",
  get: () => 0,
});

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

      const remainingPortion = amount / TOTAL_SUPPLY;

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

export const marketCapSelector = selector<number>({
  key: "market-cap-selector",
  get: ({ get }) => {
    const dataPoints = get(marketPricesAtom);
    const lastDataPoint = dataPoints[dataPoints.length - 1];
    const lastPrice = lastDataPoint[1];

    return Math.floor(fullyDilutedValue(lastPrice));
  },
});
