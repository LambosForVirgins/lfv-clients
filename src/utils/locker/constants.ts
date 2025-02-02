import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";

/** Address of the Rewards Program */
export const REWARD_PROGRAM = new PublicKey(
  import.meta.env.VITE_REWARD_PROGRAM_ADDRESS
);

export const MINT = new PublicKey(import.meta.env.VITE_MINT_ADDRESS);

export const DECIMALS = 9;

export const REWARD_FACTOR = 1000;

export const decimalFactor = new BN(10 ** DECIMALS);

export const millisecondFactor = new BN(1000);

export enum SeedKey {
  SubscriptionSeed = "subscription",
  VaultSeed = "vault",
  RewardsSeed = "reward",
}

/** Monthly milliseconds */
export const EPOCH_DURATION = 2629800 * 1000;

export const API_ENDPOINT = new URL(import.meta.env.VITE_API_ENDPOINT);

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
  return new Connection(solanaRpcUrl());
};
