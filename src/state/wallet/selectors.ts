import { selector } from "recoil";
import { balanceAtom } from "./atoms";

export const availableCreditSelector = selector<number>({
  key: "available-credit-selector",
  get: ({ get }) => {
    const { balance, pending } = get(balanceAtom);

    return balance - pending;
  },
});
