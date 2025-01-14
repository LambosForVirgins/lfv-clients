import { VIRGINTokenMint, SolanaTokenMint } from "../tokens";

export type InputToken = typeof SolanaTokenMint;
export type OutputToken = typeof VIRGINTokenMint;

export enum JupiterQuoteErrorCode {
  TokenNotListed = "TOKEN_NOT_TRADABLE",
  RouteNotFound = "COULD_NOT_FIND_ANY_ROUTE",
}

export interface JupiterQuoteError {
  error: string;
  errorCode: JupiterQuoteErrorCode | string;
}
