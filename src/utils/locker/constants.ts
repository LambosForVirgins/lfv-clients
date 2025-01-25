import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";

/** Address of the Token Locker Program */
export const LOCKER_PROGRAM = new PublicKey(
  "2AxE29YrwH2VAVWm4C4hPxbeeYoSf1U4uQju6srowxFe"
);

export const MINT = new PublicKey(
  "LFVqPrRGnwYdCwFcDzShBxN2GMFmD4AoCMrjxjq4xdz"
);

export const DECIMALS = 9;

export const REWARD_FACTOR = 1000;

export const decimalFactor = new BN(10 ** DECIMALS);

export const timeFactor = new BN(1000);

export enum SeedKey {
  MemberAccount = "member_account",
  VaultTokenAccount = "vault_token_account",
}

export const EPOCH_DURATION = 600 * 1000; // (86400 / 4) * 1000;

export const API_ENDPOINT = new URL("http://localhost:3000/api/");

export const getApiEndpoint = (path: string = ""): URL => {
  return new URL(path, API_ENDPOINT);
};

export const lamportsToMint = <T extends number | BN>(lamports: T): T => {
  const adjusted = new BN(lamports).div(decimalFactor);
  if ("number" === typeof lamports) {
    return adjusted.toNumber() as T;
  }

  return adjusted as T;
};

export const amountToLamports = <T extends number | BN>(amount: T): T => {
  const adjusted = new BN(amount).mul(decimalFactor);
  if ("number" === typeof amount) {
    return adjusted.toNumber() as T;
  }

  return adjusted as T;
};

export const getRpcUrl = (): string => {
  const local = false;
  return local ? "http://127.0.0.1:8899" : clusterApiUrl("devnet");
};

export const getConnection = (): Connection => {
  return new Connection(getRpcUrl());
};
