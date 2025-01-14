import { atom } from "recoil";
import { type GiveawayRecord } from "../types";
import { fetchGiveaways } from "./functions";

export const giveawaysAtom = atom<GiveawayRecord[]>({
  key: "giveaways-atom",
  default: fetchGiveaways(),
});
