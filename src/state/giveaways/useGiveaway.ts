import { useRecoilValue } from "recoil";
import { giveawaySelector } from "./selectors";
import { associatedDrawsSelector } from "../draws/selectors";

export const useGiveaway = (giveawayId: string) => {
  const giveaway = useRecoilValue(giveawaySelector(giveawayId));

  return {
    giveaway,
  };
};

export const useGiveawayDraws = (giveawayId: string) => {
  const draws = useRecoilValue(associatedDrawsSelector(giveawayId));

  return {
    draws,
  };
};
