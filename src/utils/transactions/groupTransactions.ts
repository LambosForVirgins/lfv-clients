import { Transaction, TransactionGroup } from "@/state/subscription/types";
import { getTransactionGroupKey } from "./getTransactionGroupKey";

export const groupTransactions = (transactions: Transaction[]) =>
  transactions.reduce<TransactionGroup>((groups, slot) => {
    const key = getTransactionGroupKey(slot);

    if (!groups[key]) groups[key] = [];
    groups[key].push(slot);

    return groups;
  }, {});
