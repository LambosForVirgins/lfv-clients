export type JupiterSwapMode = "ExactIn";

export type TokenMint<T extends string = string> = T;

export interface JupiterSwapPlan<TokenInput, TokenOutput> {
  swapInfo: {
    ammKey: string;
    label: string;
    inputMint: TokenInput;
    outputMint: TokenOutput;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: TokenOutput | string;
  };
  percent: 100;
}

export interface JupiterQuoteResponse<TokenInput, TokenOutput> {
  inputMint: TokenInput;
  inAmount: string;
  outputMint: TokenOutput;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: JupiterSwapMode;
  slippageBps: number;
  platformFee: number | null;
  priceImpactPct: string;
  routePlan: JupiterSwapPlan<TokenInput, TokenOutput>[];
  contextSlot: number;
  timeTaken: number;
}

export interface JupiterPricingResponse {
  data: {
    getTokenPrices: { priceUsd: number; timestamp: number }[];
  };
}
