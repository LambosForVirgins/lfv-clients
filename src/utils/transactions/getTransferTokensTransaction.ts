import { Connection, PublicKey } from "@solana/web3.js";
import { program } from "../locker";

import { amountToLamports, MINT } from "@/utils/locker/constants";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { BN } from "bn.js";
import { TransferMethod } from "../locker/setup";
import {
  findSubscriptionAccountAddress,
  findVaultTokenAccountAddress,
} from "../locker/PDA";

const getTransferTokensInstruction = async (
  connection: Connection,
  publicKey: PublicKey,
  method: TransferMethod,
  amount: number
) => {
  const latestBlock = await connection.getLatestBlockhash(),
    lamports = amountToLamports(new BN(amount)),
    subscription = findSubscriptionAccountAddress(publicKey),
    vaultTokenAccount = findVaultTokenAccountAddress(MINT, publicKey),
    sourceTokenAccount = getAssociatedTokenAddressSync(MINT, publicKey);

  const instruction = await method(lamports)
    .accounts({
      subscription,
      vaultTokenAccount,
      sourceTokenAccount,
      mint: MINT,
      signer: publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const messageV0 = new TransactionMessage({
    payerKey: publicKey,
    recentBlockhash: latestBlock.blockhash,
    instructions: [instruction],
  }).compileToV0Message();
  // Construct a versioned transaction
  return new VersionedTransaction(messageV0);
};

export const getWithdrawTokensTransaction = async (
  connection: Connection,
  publicKey: PublicKey,
  amount: number
) =>
  getTransferTokensInstruction(
    connection,
    publicKey,
    program.methods.release,
    amount
  );

export const getDepositTokensTransaction = async (
  connection: Connection,
  publicKey: PublicKey,
  amount: number
) =>
  getTransferTokensInstruction(
    connection,
    publicKey,
    program.methods.deposit,
    amount
  );
