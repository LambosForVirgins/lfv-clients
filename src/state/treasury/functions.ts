interface RaydiumPriceResponse<T extends string> {
  id: string;
  success: boolean;
  data: Record<T, string>;
}

interface PriceHistoryResponse {
  data: [number, number][];
  errors: any[] | null;
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

export const getPriceHistory = async (): Promise<[number, number][]> => {
  return fetch("https://api.lambosforvirgins.com/ticker")
    .then((res) => res.json())
    .then((response: PriceHistoryResponse) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching market price", error);
      return [];
    });
};
