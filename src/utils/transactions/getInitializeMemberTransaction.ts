import { PublicKey, type TransactionInstruction } from "@solana/web3.js";
import { program } from "../locker";
import { SystemProgram } from "@solana/web3.js";
import { findSubscriptionAccountAddress } from "../locker/PDA";

export const getInitializeMemberInstruction = async (
  publicKey: PublicKey
): Promise<TransactionInstruction> => {
  const subscription = findSubscriptionAccountAddress(publicKey);

  return program.methods
    .initialize()
    .accounts({
      subscription,
      signer: publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
};
