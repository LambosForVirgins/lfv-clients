import { atomFamily } from "recoil";
import { effectMintAccountAtom } from "./effects";
import { PublicKey } from "@solana/web3.js";

export const mintAccountAtom = atomFamily<
  number,
  { mint: PublicKey; owner: PublicKey | null }
>({
  key: "mint-holding-atom",
  effects: ({ mint, owner }) => [effectMintAccountAtom(mint, owner)],
  default: 0,
});
