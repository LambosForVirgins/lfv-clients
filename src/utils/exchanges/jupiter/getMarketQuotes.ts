import { JupiterPricingResponse, TokenMint } from "../types";
import { JupiterTokenPrice, PricingOptions } from "./getMarketPrice";
import { SolanaTokenMint } from "../tokens";
import { calculateExchangeRate } from "../../pricing/calculateExchangeRate";

export const getMarketQuotes = async (
  tokenSymbol: TokenMint,
  options: PricingOptions = {}
): Promise<JupiterTokenPrice> => {
  const baseToken = options.baseToken ?? SolanaTokenMint;
  const tokenAddresses = [tokenSymbol, baseToken];
  const url = new URL("https://birdeye-proxy.jup.ag/codex/getTokenPrices");
  url.searchParams.set("list_address", tokenAddresses.join(","));

  return await fetch(url)
    .then((res) => res.json())
    .then((res: JupiterPricingResponse) => {
      const data = res.data.getTokenPrices.map((price, index) => {
        const mintSymbol = tokenAddresses[index];
        return { ...price, mintSymbol };
      });

      const basePrice = data.find((price) => price.mintSymbol === baseToken);
      const tokenPrice = data.find((price) => price.mintSymbol === tokenSymbol);

      return {
        id: "",
        mintSymbol: tokenSymbol,
        vsToken: "Solana",
        vsTokenSymbol: baseToken,
        price: tokenPrice?.priceUsd ?? 0,
      };
    });
};

export const getExchangeRate = async (
  tokenSymbol: TokenMint,
  baseSymbol: TokenMint = SolanaTokenMint
): Promise<number> => {
  const tokenAddresses = [tokenSymbol, baseSymbol];
  const url = new URL("https://birdeye-proxy.jup.ag/codex/getTokenPrices");
  url.searchParams.set("list_address", tokenAddresses.join(","));

  return await fetch(url)
    .then((res) => res.json())
    .then((res: JupiterPricingResponse) => {
      if (res.data.getTokenPrices.length < 2) {
        throw new Error("Invalid response from Jupiter API");
      }

      const [tokenPrice, basePrice] = res.data.getTokenPrices;

      if (!tokenPrice || !basePrice) {
        throw new Error("Invalid response from Jupiter API");
      }

      return calculateExchangeRate(tokenPrice?.priceUsd, basePrice?.priceUsd);
    });
};
