import { TokenMint } from "../types";

export type PricingOptions = {
  baseToken?: TokenMint;
  useQNMarketCache?: boolean;
  restrictIntermediateTokens?: boolean;
};

export type JupiterTokenPrice = {
  id: string;
  mintSymbol: string;
  vsToken: string;
  vsTokenSymbol: string;
  price: number;
};

interface JupiterPricingResponse {
  data: {
    token: JupiterTokenPrice;
  };
  timeTaken: number;
}

const OPTIONS_FILTER: (keyof PricingOptions)[] = [
  "baseToken",
  "restrictIntermediateTokens",
  "useQNMarketCache",
];

/**
 *
 * @note Only available on paid RPC plans
 * @param tokenSymbol
 * @param options
 * @returns
 */
export const getAssetPrice = async (
  tokenSymbol: TokenMint,
  options: PricingOptions = {}
): Promise<JupiterTokenPrice> => {
  const url = new URL("/price", "https://public.jupiterapi.com");
  url.searchParams.set("ids", tokenSymbol);

  Object.entries(options).forEach(([key, value]) => {
    if (OPTIONS_FILTER.includes(key as keyof PricingOptions)) {
      url.searchParams.set(key, value.toString());
    }
  });

  return await fetch(url)
    .then((res) => res.json())
    .then((res: JupiterPricingResponse) => res.data.token);
};
