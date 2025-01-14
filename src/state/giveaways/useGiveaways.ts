import { useRecoilValue } from "recoil";
import { giveawaysAtom } from "./atoms";
import { useCallback, useMemo, useState } from "react";
import { drawRoundsAtom } from "../draws/atoms";
import { DrawEntry, DrawStatus } from "../types";
import { enterDraw } from "../draws/functions";

export const useGiveaways = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const giveaways = useRecoilValue(giveawaysAtom);
  const draws = useRecoilValue(drawRoundsAtom);

  const currentDraw = useMemo(
    () => draws.find((draw) => draw.status === DrawStatus.Open) ?? null,
    [draws]
  );

  const enterDrawWithId = useCallback(
    async (drawId: string, details: DrawEntry) => {
      setLoading(true);
      try {
        const result = await enterDraw(drawId, details);

        if (result.error) {
          throw new Error(result.error);
        }

        console.log("Result", result);
        return result;
      } catch (err: any) {
        console.log(err);
        setErrors([...errors, err.message]);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [errors]
  );

  return {
    loading,
    giveaways,
    currentDraw,
    enterDraw: enterDrawWithId,
  };
};
