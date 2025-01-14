import { DefaultValue, selectorFamily } from "recoil";
import { type GiveawayRecord } from "../types";
import { giveawaysAtom } from "./atoms";
import { drawEntriesAtom } from "../draws/atoms";

export const giveawaySelector = selectorFamily<GiveawayRecord, string>({
  key: "giveaways-selector",
  get:
    (giveawayId: string) =>
    ({ get }) => {
      const rounds = get(giveawaysAtom);
      const record = rounds.find(({ id }) => id === giveawayId);
      if (!record) throw new Error("Giveaway not found");

      return record;
    },
  set:
    (giveawayId: string) =>
    ({ set }, newValue: GiveawayRecord | DefaultValue) => {
      if (newValue instanceof DefaultValue) return;

      set(giveawaysAtom, (prev) => {
        const index = prev.findIndex(({ id }) => id === giveawayId);
        const updated = [...prev];
        if (index) {
          updated[index] = newValue;
        } else {
          updated.push(newValue);
        }

        return updated;
      });
    },
});

export const drawEntryCountSelector = selectorFamily<number, string>({
  key: "draw-entry-count-selector",
  get:
    (drawId: string) =>
    ({ get }) => {
      const entries = get(drawEntriesAtom);
      const record = entries.find(({ drawId: id }) => id === drawId);
      return record?.entries ?? 0;
    },
});
