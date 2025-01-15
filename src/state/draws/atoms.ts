import { atom } from "recoil";
import { type DrawRound } from "../types";
import { getAllDraws } from "./functions";
import { MOCKS } from "../giveaways/mocks";

export const drawRoundsAtom = atom<DrawRound[] | [DrawRound]>({
  key: "draw-rounds-atom",
  default: MOCKS.reduce<DrawRound[]>((draws, giveaway) => {
    return draws.concat(
      giveaway.draws.map<DrawRound>((draw) => ({
        ...draw,
        giveawayId: giveaway.id,
        winner: null,
        seed: null,
      }))
    );
  }, []),
});

export const drawEntriesAtom = atom<{ drawId: string; entries: number }[]>({
  key: "draw-entries-atom",
  default: [
    { drawId: "1", entries: 0 },
    { drawId: "2", entries: 0 },
    { drawId: "3", entries: 0 },
  ],
});
