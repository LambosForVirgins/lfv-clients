import { PublicKey } from "@solana/web3.js";

import {
  RaydiumQuoteResponse,
  RaydiumSwapRequest,
  RaydiumSwapResponse,
  RaydiumTxVersion,
} from "./types";
import { InputToken, OutputToken } from "./types";

/**
 * Requests a swap transaction payload from the Raydium API server.
 *
 * @deprecated Use `createSwapTransaction` to create your own payload
 */
export const getSwapTransaction = async (
  quoteResponse: RaydiumQuoteResponse<InputToken, OutputToken>,
  publicKey: PublicKey
): Promise<string> => {
  const url = new URL(
    "https://transaction-v1.raydium.io/transaction/swap-base-in"
  );

  const response = (await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      computeUnitPriceMicroLamports: "1722351",
      swapResponse: quoteResponse,
      txVersion: RaydiumTxVersion.Version0,
      wallet: publicKey.toBase58(),
      wrapSol: true,
      unwrapSol: false,
    } as RaydiumSwapRequest<InputToken, OutputToken>),
  }).then((res) => res.json())) as RaydiumSwapResponse;

  return response.data[0].transaction;
};
