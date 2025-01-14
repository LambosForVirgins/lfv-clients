import { type JupiterQuoteError } from "./types";
import { getSwapQuote } from "./getSwapQuote";
import { JupiterQuoteErrorCode } from "./types";

export const getTokenAvailability = async (
  balance: number
): Promise<boolean> => {
  if (balance <= 0) return false;

  return getSwapQuote(balance)
    .then(() => true)
    .catch((error: JupiterQuoteError | any) => {
      if (error.errorCode === JupiterQuoteErrorCode.TokenNotListed) {
        return false;
      }

      return false;
    });
};
