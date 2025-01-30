import { atom } from "recoil";
import { fetchMerchandise } from "./functions";
import { Merchandise } from "./types";

export const merchandiseAtom = atom<Merchandise[]>({
  key: "merchandise-atom",
  default: fetchMerchandise(),
});
