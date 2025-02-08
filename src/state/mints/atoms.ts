import { atomFamily } from "recoil";
import { effectMintAccountAtom } from "./effects";
import { PublicKey } from "@solana/web3.js";
import { DECIMALS } from "@/utils/locker/constants";

export const mintAccountAtom = atomFamily<
  number | undefined,
  { mint: PublicKey; owner: PublicKey | null; decimals?: number }
>({
  key: "mint-holding-atom",
  effects: ({ mint, owner, decimals = DECIMALS }) => [
    effectMintAccountAtom(mint, owner, decimals),
  ],
  default: undefined,
});
