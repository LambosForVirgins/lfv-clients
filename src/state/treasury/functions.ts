import { getCdnEndpoint } from "@/utils/locker/constants";

type PriceTime = number;
type PriceNumber = number;
type PriceRecord = {
  id: number;
  price: PriceNumber;
  time: PriceTime;
};

interface PriceHistoryResponse {
  data: PriceRecord[];
  errors: any[] | null;
}

// Sort in ascending order
const sortPriceHistory = (history: PriceRecord[]) =>
  history.sort((a, b) => a.id - b.id);

export const getPriceHistory = async (): Promise<[number, number][]> => {
  return fetch(getCdnEndpoint("json/price/history.json"))
    .then((res) => res.json())
    .then((response: PriceHistoryResponse) => {
      return sortPriceHistory(response.data).map<[number, number]>((item) => [
        item.time,
        item.price,
      ]);
    })
    .catch((error) => {
      console.error("Error fetching market price", error);
      return [];
    });
};
