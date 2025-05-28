import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createCloseAccountInstruction,
} from "@solana/spl-token";

// Generates an instruction to close the specified token account
export const createCloseTokenAccountInstruction = (
  tokenAccount: PublicKey,
  refundRecipient: PublicKey,
  owner: PublicKey
): TransactionInstruction => {
  return createCloseAccountInstruction(
    tokenAccount,
    refundRecipient,
    owner,
    [],
    TOKEN_PROGRAM_ID
  );
};
