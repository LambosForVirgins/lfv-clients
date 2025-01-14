import { PublicKey } from "@solana/web3.js";

import { JupiterQuoteResponse } from "../types";
import { InputToken, OutputToken } from "./types";

export const getSwapTransaction = async (
  quoteResponse: JupiterQuoteResponse<InputToken, OutputToken>,
  publicKey: PublicKey
): Promise<string> => {
  const url = new URL("/swap", "https://public.jupiterapi.com");

  const { swapTransaction } = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      allowOptimizedWrappedSolTokenAccount: true,
      asLegacyTransaction: false,
      correctLastValidBlockHeight: true,
      dynamicComputeUnitLimit: true,
      dynamicSlippage: { maxBps: 300 },
      prioritizationFeeLamports: {
        priorityLevelWithMaxLamports: {
          global: false,
          maxLamports: 4_000_000,
          priorityLevel: "veryHigh",
        },
      },
      quoteResponse,
      userPublicKey: publicKey?.toString(),
      wrapAndUnwrapSol: true,
    }),
  }).then((res) => res.json());

  return swapTransaction;
};
