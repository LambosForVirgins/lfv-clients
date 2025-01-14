import { useCallback, useState } from "react";
import { enterDraw } from "../draws/functions";
import { DrawEntry } from "../types";
import { useRecoilValue } from "recoil";
import { dailyGiveawayDrawSelector } from "../draws/selectors";

export const useDailyGiveaway = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const draw = useRecoilValue(dailyGiveawayDrawSelector);

  const enterCurrentDraw = useCallback(
    async (details: DrawEntry) => {
      if (!draw) return;
      setPending(true);
      try {
        const result = await enterDraw(draw.id, details);

        if (result.error) {
          throw new Error(result.error);
        }

        console.log("Result", result);
        return result;
      } catch (err: any) {
        console.log(err);
        setErrors([...errors, err.message]);
        throw err;
      }
    },
    [draw, errors]
  );

  return {
    errors,
    pending,
    draw,
    enterDraw: enterCurrentDraw,
  };
};
