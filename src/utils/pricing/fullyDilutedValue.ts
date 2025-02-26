import { TOTAL_SUPPLY } from "../locker/constants";

export const fullyDilutedValue = (price: number): number =>
  TOTAL_SUPPLY * price;
