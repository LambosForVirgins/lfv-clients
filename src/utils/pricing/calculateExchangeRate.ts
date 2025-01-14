/**
 * Calculates the exchange rate between two tokens valued
 * against the same underlying asset, typically USD.
 *
 * @param tokenA - The value of the first token.
 * @param tokenB - The value of the second token.
 * @returns The exchange rate indicating how many units of the second
 * token are equivalent to one unit of the first token.
 */
export const calculateExchangeRate = (
  tokenA: number,
  tokenB: number
): number => {
  if (tokenA <= 0 || tokenB <= 0) {
    throw new Error("USD values for tokens must be greater than zero.");
  }

  return tokenA / tokenB;
};
