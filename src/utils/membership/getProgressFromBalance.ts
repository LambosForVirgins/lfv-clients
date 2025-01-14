import { EntryCriteria } from "@/state/types";

export const getProgressFromBalance = (
  constraints: { minBalance?: number; maxBalance?: number } | undefined,
  balance: number
) => {
  if (!constraints) {
    return 0;
  }
  console.log(constraints.minBalance, constraints.maxBalance, balance);
  const min = constraints.minBalance || 0;
  const max = constraints.maxBalance || balance;
  // Get the percentage of the balance between the min and max
  return balance / min;
};
