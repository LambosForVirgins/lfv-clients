import { EntryCriteria } from "@/state/types";
import { ValidationResult } from "./types";

export const validateEntryCriteria = (
  constraints: { minBalance?: number; maxBalance?: number } | undefined,
  balance: number
): ValidationResult => {
  const isDisabled =
    (constraints?.minBalance && constraints.minBalance > balance) ||
    (constraints?.maxBalance && constraints.maxBalance < balance);

  return {
    errors: isDisabled ? [{ message: "Not enough tokens" }] : [],
  };
};
