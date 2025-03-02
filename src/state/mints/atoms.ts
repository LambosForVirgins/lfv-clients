import { atomFamily } from "recoil";
import { effectMintAccountAtom } from "./effects";
import { DECIMALS } from "@/utils/locker/constants";
import { type TokenMint } from "./types";
import { PublicKey } from "@solana/web3.js";

type MintAccountParams = {
  mint: PublicKey;
  owner: PublicKey | null;
  decimals?: number;
};

export const mintAccountAtom = atomFamily<TokenMint, MintAccountParams>({
  key: "mint-holding-atom",
  effects: ({ mint, owner, decimals = DECIMALS }) => [
    effectMintAccountAtom(mint, owner, decimals),
  ],
  default: ({ mint }) => ({
    mint,
    amount: 0,
    isInitialized: false,
  }),
});
