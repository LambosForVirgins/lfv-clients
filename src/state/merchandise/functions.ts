import { MOCKS } from "./mocks";
import { Merchandise } from "./types";

export const fetchMerchandise = async (): Promise<Merchandise[]> => {
  return (await Promise.resolve(MOCKS)).filter((item) => item.active);
};
