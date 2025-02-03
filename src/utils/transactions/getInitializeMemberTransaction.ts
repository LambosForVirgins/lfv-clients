import { PublicKey, type TransactionInstruction } from "@solana/web3.js";
import { program } from "../locker";
import { SystemProgram } from "@solana/web3.js";
import { MINT } from "../locker/constants";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import {
  findSubscriptionAccountAddress,
  findVaultTokenAccountAddress,
} from "../locker/PDA";

export const getInitializeMemberInstruction = async (
  publicKey: PublicKey
): Promise<TransactionInstruction> => {
  const subscription = findSubscriptionAccountAddress(publicKey),
    vaultTokenAccount = findVaultTokenAccountAddress(MINT, publicKey);

  return program.methods
    .initialize()
    .accounts({
      subscription,
      signer: publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
};
