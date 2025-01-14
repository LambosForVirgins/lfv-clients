import { EntryCriteria } from "@/state/types";
import { ValidationResult } from "./types";

export const validateEntryCriteria = (
  criteria: EntryCriteria[],
  balance: number
): ValidationResult => {
  const isDisabled = criteria.some((criterion) => {
    if (criterion.type === "balance" && criterion.value) {
      if (criterion.value instanceof Array) {
        return balance < criterion.value[0] || balance > criterion.value[1];
      }

      return balance < criterion.value;
    }
    return false;
  });

  return {
    errors: isDisabled ? [{ message: "Not enough tokens" }] : [],
  };
};
