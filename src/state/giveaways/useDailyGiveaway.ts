import { useCallback, useState } from "react";
import { DrawEntry, DrawStatus } from "../draws/types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { associatedDrawsSelector, roundSelector } from "../draws/selectors";
import { DAILY_GIVEAWAY_ID } from "./mocks";

export const useDailyGiveaway = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const draws = useRecoilValue(associatedDrawsSelector(DAILY_GIVEAWAY_ID));

  const currentDraw =
    draws.find((draw) => draw.status === DrawStatus.Open) ?? null;

  const setRound = useSetRecoilState(roundSelector(DAILY_GIVEAWAY_ID));

  const enterCurrentDraw = useCallback(
    async (details: DrawEntry) => {
      if (!currentDraw) return;
      setPending(true);
      try {
        // const result = await enterDraw(currentDraw.id, details);

        // if (result.error) {
        //   throw new Error(result.error);
        // }

        // console.log("Result", result);
        // return result;
        // ! Temporary mock
        setRound((prev) => ({
          ...prev,
          entries: [...prev.entries, details],
        }));
      } catch (err: any) {
        console.log(err);
        setErrors([...errors, err.message]);
        throw err;
      }
    },
    [currentDraw, errors]
  );

  return {
    errors,
    pending,
    draw: currentDraw,
    enterDraw: enterCurrentDraw,
  };
};
