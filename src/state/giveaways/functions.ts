import { getApiEndpoint } from "@/utils/locker/constants";
import { Giveaway } from "../draws/types";
import { MOCKS } from "./mocks";

export const fetchGiveaways = async (): Promise<Giveaway[]> => {
  return (await Promise.resolve(MOCKS)).filter((promo) => promo.active);
  // TODO: Restore API call or implement Solana program accounts
  return await fetch(getApiEndpoint("giveaway")).then((res) => {
    if (res.status !== 200) throw new Error("Failed to fetch giveaways");
    return res.json();
  });
};
