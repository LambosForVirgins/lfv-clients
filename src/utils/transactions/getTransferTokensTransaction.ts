import { PublicKey, Transaction } from "@solana/web3.js";
import { program } from "../locker";

import { amountToLamports, MINT } from "@/utils/locker/constants";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SystemProgram } from "@solana/web3.js";
import { BN } from "bn.js";
import { TransferMethod } from "../locker/setup";
import {
  findSubscriptionAccountAddress,
  findVaultTokenAccountAddress,
} from "../locker/PDA";
import { getInitializeVaultInstruction } from "./getInitializeVaultTransaction";

const getTransferTokensInstruction = async (
  publicKey: PublicKey,
  method: TransferMethod,
  amount: number,
  initialize: boolean
): Promise<Transaction> => {
  const transaction = new Transaction(),
    lamports = amountToLamports(new BN(amount)),
    subscription = findSubscriptionAccountAddress(publicKey),
    vaultTokenAccount = findVaultTokenAccountAddress(MINT, publicKey),
    sourceTokenAccount = getAssociatedTokenAddressSync(MINT, publicKey);

  if (initialize) {
    // Initialize the vault token account
    transaction.add(getInitializeVaultInstruction(publicKey));
  }

  transaction.add(
    await method(lamports)
      .accounts({
        subscription,
        vaultTokenAccount,
        sourceTokenAccount,
        mint: MINT,
        signer: publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
  );

  return transaction;
};

export const getReleaseTokensTransaction = async (
  publicKey: PublicKey,
  amount: number,
  initialize: boolean = false
): Promise<Transaction> =>
  getTransferTokensInstruction(
    publicKey,
    program.methods.release,
    amount,
    initialize
  );

export const getDepositTokensTransaction = async (
  publicKey: PublicKey,
  amount: number,
  initialize: boolean = false
): Promise<Transaction> =>
  getTransferTokensInstruction(
    publicKey,
    program.methods.deposit,
    amount,
    initialize
  );
