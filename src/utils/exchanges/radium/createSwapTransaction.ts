// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck Working on this file
import {
  MakeSwapInstructionParam,
  TokenAmount,
} from "@raydium-io/raydium-sdk-v2";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getLiquidityPool } from "./getLiquidityPool";

export const createSwapTransaction = async (
  connection: Connection,
  userPublicKey: PublicKey,
  poolAddress: string,
  inputTokenMint: PublicKey,
  outputTokenMint: PublicKey,
  amountIn: number, // Input token amount in smallest units
  slippage: number = 0.01 // Default slippage tolerance (1%)
): Promise<Transaction> => {
  const pool = await getLiquidityPool(connection, poolAddress);
  const tokenAmountIn = new TokenAmount(amountIn, pool.mintDecimals);

  const swapInput: MakeSwapInstructionParam = {
    connection,
    pool,
    user: userPublicKey,
    inputTokenMint,
    outputTokenMint,
    amountIn: tokenAmountIn,
    slippage,
  };

  const { transaction } = await SwapBuilder.makeSwapTransaction(swapInput);

  return transaction;
};
