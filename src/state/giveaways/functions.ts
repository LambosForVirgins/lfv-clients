import { getApiEndpoint } from "@/utils/locker/constants";
import { Giveaway } from "../types";
import { MOCKS } from "./mocks";

export const fetchGiveaways = async (): Promise<Giveaway[]> => {
  return Promise.resolve(MOCKS);
  // TODO: Restore API call or implement Solana program accounts
  return await fetch(getApiEndpoint("giveaway")).then((res) => {
    if (res.status !== 200) throw new Error("Failed to fetch giveaways");
    return res.json();
  });
};
