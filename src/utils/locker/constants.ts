import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";

/** Address of the Token Locker Program */
export const LOCKER_PROGRAM = new PublicKey(
  "LFV1t2uUvpEZuhduXTepyimVJ35ZANUThNPH8yp1w7o"
);

export const MINT = new PublicKey(
  "7kB8ZkSBJr2uiBWfveqkVBN7EpZMFom5PqeWUB62DCRD"
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

export const API_ENDPOINT = new URL("https://api.lambosforvirgins.com");

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
