import { getSwapQuote } from "./getSwapQuote";
import { type RaydiumQuoteError, RaydiumQuoteErrorCode } from "./types";

export const getTokenAvailability = async (
  balance: number
): Promise<boolean> => {
  if (balance <= 0) return false;

  return getSwapQuote(balance)
    .then(() => true)
    .catch((error: RaydiumQuoteError | any) => {
      if (error.errorCode === RaydiumQuoteErrorCode.RouteNotFound) {
        return false;
      }

      return false;
    });
};
