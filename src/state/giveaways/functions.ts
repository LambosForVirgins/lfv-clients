import { getApiEndpoint } from "@/utils/locker/constants";
import { Giveaway } from "../types";

export const fetchGiveaways = async (): Promise<Giveaway[]> => {
  return await fetch(getApiEndpoint("giveaway")).then((res) => {
    if (res.status !== 200) throw new Error("Failed to fetch giveaways");
    return res.json();
  });
};
