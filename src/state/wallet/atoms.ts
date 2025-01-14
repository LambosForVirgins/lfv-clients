import { atom } from "recoil";
import { getCreditBalance } from "./functions";

export const balanceAtom = atom<{ balance: number; pending: number }>({
  key: "balance-atom",
  default: getCreditBalance(),
});
