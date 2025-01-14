import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { VIRGINTokenMint, SolanaTokenMint } from "../tokens";
import { JupiterQuoteError, type InputToken, type OutputToken } from "./types";
import { JupiterQuoteResponse } from "../types";

interface SwapQuoteOptions {
  highVolatility?: boolean;
}

/**
 *
 * @param inputAmount The amount of Solana (SOL) to swap for VIRGIN
 * @returns
 */
export const getSwapQuote = async (
  inputAmount: number,
  options: SwapQuoteOptions = {}
): Promise<JupiterQuoteResponse<InputToken, OutputToken>> => {
  const url = new URL("/quote", "https://public.jupiterapi.com");
  url.searchParams.set("inputMint", SolanaTokenMint);
  url.searchParams.set("outputMint", VIRGINTokenMint);
  url.searchParams.set(
    "amount",
    Math.round(inputAmount * LAMPORTS_PER_SOL).toString()
  );

  if (options.highVolatility) {
    url.searchParams.set("autoSlippage", "true");
    url.searchParams.set("maxAutoSlippageBps", "100");
  } else {
    url.searchParams.set("slippageBps", "50");
  }

  const quoteResponse = await fetch(url)
    .then<JupiterQuoteResponse<InputToken, OutputToken>>((res) => res.json())
    .then(
      (
        res: JupiterQuoteResponse<InputToken, OutputToken> | JupiterQuoteError
      ) => {
        if ("error" in res && "errorCode" in res) {
          throw res;
        }

        return res;
      }
    )
    .catch((err: JupiterQuoteError | Error) => {
      throw err;
    });

  return quoteResponse;
};
