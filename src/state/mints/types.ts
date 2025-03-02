import { PublicKey } from "@solana/web3.js";

export type TokenMint = {
  mint: PublicKey | null;
  amount: number;
  isInitialized: boolean;
};
