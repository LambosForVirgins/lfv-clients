import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { drawRoundSelector } from "./selectors";
import { enterDraw, getCurrentDraw } from "./functions";
import { type DrawEntry } from "../types";

export const useDraw = (drawId: string) => {
  const [round, setRound] = useRecoilState(drawRoundSelector(drawId));

  useEffect(() => {
    getCurrentDraw().then((draw) => {
      if (!draw) return;
      setRound(draw);
    });
  }, [setRound]);

  const enterSelectedDraw = async (details: DrawEntry) => {
    return await enterDraw(drawId, details);
  };

  return {
    draw: round,
    enterDraw: enterSelectedDraw,
  };
};
