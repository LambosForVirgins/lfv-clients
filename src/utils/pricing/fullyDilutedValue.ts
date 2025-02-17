import { CIRCULATING_SUPPLY } from "../locker/constants";

export const fullyDilutedValue = (price: number): number =>
  CIRCULATING_SUPPLY * price;
