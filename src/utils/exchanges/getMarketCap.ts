import { Connection, PublicKey } from "@solana/web3.js";

const coingeckoId = "lambosforvirgins";
const currency = "usd";
const priceApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=${currency}`;

export const getMarketCap = async (
  connection: Connection,
  mint: PublicKey
): Promise<number> => {
  try {
    // Fetch total supply of the token
    const tokenSupplyResponse = await connection.getTokenSupply(mint);
    const totalSupply = tokenSupplyResponse.value.uiAmount || 0;
    // Fetch current price of the token
    const priceData = await fetch(priceApiUrl).then((res) => res.json());
    const currentPrice = priceData[coingeckoId][currency] || 0;
    // Calculate market capitalization
    const marketCap = totalSupply * currentPrice;
    return marketCap;
  } catch (err) {
    console.log("Error fetching market cap", err);
    return 0;
  }
};
