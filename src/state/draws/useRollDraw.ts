import { useEffect, useState } from "react";
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
      // const result = await rollDraw(drawId);

      // setRound(result);
      // console.log(result);
      setSelected(Math.floor(Math.random() * 10));
      // setLoading(false);

      // return result;
      return null;
    } catch (err) {
      setLoading(false);
      return null;
    }
  };

  return { roll: rollDrawHash, selected, loading };
};
