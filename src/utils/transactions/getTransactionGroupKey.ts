import { Transaction } from "@/state/subscription/types";

export const getTransactionGroupKey = (transaction: Transaction): string => {
  if (transaction.type === "deposit") {
    return transaction.timeMatured.toISOString().slice(0, 10);
  }

  return transaction.timeReleased.toISOString().slice(0, 10);
};
