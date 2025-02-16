interface RaydiumPriceResponse<T extends string> {
  id: string;
  success: boolean;
  data: Record<T, string>;
}

export const getMarketPrice = async (token: string): Promise<number> => {
  return fetch(
    "https://api-v3.raydium.io/mint/price?mints=7kB8ZkSBJr2uiBWfveqkVBN7EpZMFom5PqeWUB62DCRD"
  )
    .then((res) => res.json())
    .then((data: RaydiumPriceResponse<typeof token>) =>
      Math.floor(parseFloat(data.data[token]) * Math.pow(10, 9))
    )
    .catch((error) => {
      console.error("Error fetching market price", error);
      return 0;
    });
};
