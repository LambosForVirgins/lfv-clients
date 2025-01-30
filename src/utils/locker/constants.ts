import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";

console.log("Constants env", import.meta.env);

/** Address of the Rewards Program */
export const LOCKER_PROGRAM = new PublicKey(
  import.meta.env.VITE_REWARD_PROGRAM_ADDRESS ||
    "9QZ5nMuz1cH4Nb7mWwSDrXy5zMWg1DT6TSjdgga933wU"
);

export const MINT = new PublicKey(
  import.meta.env.VITE_MINT_ADDRESS ||
    "LFVqPrRGnwYdCwFcDzShBxN2GMFmD4AoCMrjxjq4xdz"
);

export const REWARD_MINT = new PublicKey(
  import.meta.env.VITE_REWARD_MINT_ADDRESS ||
    "8MvGosSYqUBwpKTJZp2oQHM2siNaPNcA4dAeHehqR1wr"
);

export const DECIMALS = 9;

export const REWARD_FACTOR = 1000;

export const decimalFactor = new BN(10 ** DECIMALS);

export const millisecondFactor = new BN(1000);

export enum SeedKey {
  SubscriptionSeed = "subscription",
  VaultSeed = "vault",
  RewardsSeed = "rewards",
}

/** Monthly milliseconds */
export const EPOCH_DURATION = 2629800 * 1000;

export const API_ENDPOINT = new URL(
  import.meta.env.VITE_API_ENDPOINT || "https://api.lambosforvirgins.com"
);

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

export const solanaRpcUrl = (): string => {
  return import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl("devnet");
};

export const getConnection = (): Connection => {
  console.log("connection", import.meta.env.VITE_SOLANA_RPC_URL);
  return new Connection(solanaRpcUrl());
};
