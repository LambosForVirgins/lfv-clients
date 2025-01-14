import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { DrawRound } from "../types";
import { roundSelector } from "./selectors";
import { rollDraw } from "./functions";

export const useRollDraw = (drawId: string) => {
  const [loading, setLoading] = useState(false);
  const setRound = useSetRecoilState(roundSelector(drawId));
  const [selected, setSelected] = useState(0);

  const rollDrawHash = async (): Promise<DrawRound | null> => {
    try {
      setLoading(true);
      const result = await rollDraw(drawId);

      setRound(result);
      console.log(result);
      setSelected(result.events.length);
      setLoading(false);

      return result;
    } catch (err) {
      setLoading(false);
      return null;
    }
  };

  return { roll: rollDrawHash, selected, loading };
};
