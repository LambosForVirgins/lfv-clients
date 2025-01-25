import { PublicKey, type TransactionInstruction } from "@solana/web3.js";
import { program } from "../locker";
import {
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
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
      vaultTokenAccount,
      mint: MINT,
      signer: publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  // const messageV0 = new TransactionMessage({
  //   payerKey: publicKey,
  //   recentBlockhash: latestBlock.blockhash,
  //   instructions: [instruction],
  // }).compileToV0Message();
  // Construct a versioned transaction
  return new VersionedTransaction(messageV0);
};
