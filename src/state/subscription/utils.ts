import { decimalFactor, millisecondFactor } from "@/utils/locker/constants";
import { SubscriptionAccountStruct } from "@/utils/locker/setup";
import { Member, Transaction } from "./types";
import { v5 as generateHash } from "uuid";
import BN from "bn.js";

const NAMESPACE = "e1e690c7-1da1-4063-90b7-599db1294277";

const isInitialAccount = (account: SubscriptionAccountStruct): boolean =>
  account.timeCreated.eq(account.timeRewarded) && account.totalMatured.isZero();

const dateFromBigNumber = (bigNumber: BN): Date => {
  return new Date(bigNumber.mul(millisecondFactor).toNumber());
};

export const mapTransactionFromStruct = (
  slots: SubscriptionAccountStruct["slots"]
) =>
  slots.reduce<Transaction[]>((slots, { withdraw, deposit }) => {
    if (withdraw) {
      slots.push({
        key: generateHash(`withdraw-${withdraw.amount}`, NAMESPACE),
        type: "withdraw",
        amount: withdraw.amount.div(decimalFactor).toNumber(),
        timeReleased: dateFromBigNumber(withdraw.timeReleased),
      });
    }

    if (deposit) {
      slots.push({
        key: generateHash(`deposit-${deposit.amount}`, NAMESPACE),
        type: "deposit",
        amount: deposit.amount.div(decimalFactor).toNumber(),
        timeCreated: dateFromBigNumber(deposit.timeCreated),
        timeMatured: dateFromBigNumber(deposit.timeMatured),
      });
    }

    return slots;
  }, []);

export const mapMemberFromStruct = (
  account: SubscriptionAccountStruct
): Member => {
  return {
    status: account.status,
    tier: account.tier,
    totalAmount: account.totalAmount.div(decimalFactor).toNumber(),
    totalMatured: account.totalMatured.div(decimalFactor).toNumber(),
    totalReleased: account.totalReleased.div(decimalFactor).toNumber(),
    totalRewards: account.totalRewards.toNumber(),
    timeCreated: dateFromBigNumber(account.timeCreated),
    timeRewarded: isInitialAccount(account)
      ? null
      : dateFromBigNumber(account.timeRewarded),
    slots: mapTransactionFromStruct(account.slots),
  };
};
