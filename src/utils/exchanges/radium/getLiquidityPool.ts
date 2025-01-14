// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Working on this file
import { Pool, RaydiumFetch } from "@raydium-io/raydium-sdk-v2";
import { Connection, PublicKey } from "@solana/web3.js";

export const getLiquidityPool = async (
  connection: Connection,
  poolAddress: string
): Promise<Pool | null> => {
  const poolPubkey = new PublicKey(poolAddress);

  const pool = await RaydiumFetch.fetchPool(connection, poolPubkey);
  if (!pool) throw new Error("Failed to fetch pool information");

  return pool;
};
