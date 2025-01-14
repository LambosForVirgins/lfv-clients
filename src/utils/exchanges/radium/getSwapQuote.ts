import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { VIRGINTokenMint, SolanaTokenMint } from "../tokens";
import { InputToken, OutputToken, RaydiumTxVersion } from "./types";
import { RaydiumQuoteResponse } from "./types";

interface RaydiumSwapQuoteOptions {
  highVolatility: boolean;
}

export const getSwapQuote = async (
  inputAmount: number,
  options: Partial<RaydiumSwapQuoteOptions> = {}
): Promise<RaydiumQuoteResponse<InputToken, OutputToken>> => {
  const url = new URL("https://transaction-v1.raydium.io/compute/swap-base-in");
  url.searchParams.set("inputMint", SolanaTokenMint);
  url.searchParams.set("outputMint", VIRGINTokenMint);
  url.searchParams.set(
    "amount",
    Math.round(inputAmount * LAMPORTS_PER_SOL).toString()
  );
  url.searchParams.set("slippageBps", "50");
  url.searchParams.set("txVersion", RaydiumTxVersion.Version0);

  const quoteResponse = (await fetch(url).then((res) =>
    res.json()
  )) as RaydiumQuoteResponse<InputToken, OutputToken>;

  return quoteResponse;
};
