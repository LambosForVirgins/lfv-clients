import { DefaultValue, selector, selectorFamily } from "recoil";
import { DrawRound } from "../types";
import { drawRoundsAtom } from "./atoms";

export const drawRoundSelector = selectorFamily<DrawRound | null, string>({
  key: "draw-round-selector",
  get:
    (drawId: string) =>
    ({ get }) => {
      const rounds = get(drawRoundsAtom);
      return rounds.find((round) => round.id === drawId) ?? null;
    },
  set:
    (drawId: string) =>
    ({ set }, newValue: DrawRound | DefaultValue | null) => {
      if (!newValue || newValue instanceof DefaultValue) return;

      set(drawRoundsAtom, (prev) => {
        const updated = [...prev];
        updated.map((round) => {
          if (round.id === drawId) {
            return newValue;
          }
          return round;
        });
        return updated;
      });
    },
});

export const roundSelector = selectorFamily<DrawRound, string>({
  key: "current-round-selector",
  get:
    (drawId: string) =>
    ({ get }) => {
      const rounds = get(drawRoundsAtom);
      return rounds[rounds.length - 1];
    },
  set:
    (drawId: string) =>
    ({ set }, newValue: DrawRound | DefaultValue) => {
      if (newValue instanceof DefaultValue) return;

      set(drawRoundsAtom, (prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = newValue;
        return updated;
      });
    },
});

export const associatedDrawsSelector = selectorFamily<DrawRound[], string>({
  key: "associated-draws-selector",
  get:
    (giveawayId: string) =>
    ({ get }) => {
      const rounds = get(drawRoundsAtom);
      return rounds.filter((round) => round.giveawayId === giveawayId);
    },
});

export const dailyGiveawayDrawSelector = selector<DrawRound | null>({
  key: "daily-giveaway-draw-selector",
  get: ({ get }) => {
    const draws = get(associatedDrawsSelector("giveaway-bc923fbe"));

    return draws[draws.length - 1] ?? null;
  },
  set: ({ set }, newValue) => {
    if (newValue === null || newValue instanceof DefaultValue) return;

    set(drawRoundsAtom, (prev) => {
      return [...prev, newValue];
    });
  },
});
