import {
  createBurnInstruction,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";

// Generates an instruction to burn all tokens in the specified token account
export const createBurnAllTokensInstruction = async (
  connection: Connection,
  tokenAccount: PublicKey,
  mint: PublicKey,
  owner: PublicKey
): Promise<TransactionInstruction> => {
  const accountInfo = await getAccount(connection, tokenAccount);
  const amountToBurn = accountInfo.amount;

  return createBurnInstruction(
    tokenAccount,
    mint,
    owner,
    BigInt(amountToBurn.toString()),
    [],
    TOKEN_PROGRAM_ID
  );
};
